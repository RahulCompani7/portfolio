import { NextResponse } from "next/server";
import sharp from "sharp";
import {
  aggregateDecades,
  aggregateGenres,
  normalizeArtist,
  normalizeTrack,
  pickImage,
  type ArtColour,
  type RawArtist,
  type RawTrack,
  type SpotifyArtist,
  type SpotifyFeed,
  type SpotifyTrack,
} from "@/lib/spotify";

/**
 * Live music feed.
 *
 * Credentials stay on the server. The browser only ever sees track titles,
 * artwork URLs and a pre-computed colour.
 *
 * Token model, because it surprises people:
 *   - the ACCESS token lasts 1 hour and is refreshed here automatically;
 *   - the REFRESH token lasts 6 months (Spotify's July 2026 change) and cannot
 *     be extended by refreshing. When it lapses Spotify answers `invalid_grant`
 *     and someone has to re-authorize via `npm run spotify:auth`.
 *
 * There is no permanent-token option. When it dies the section hides itself
 * rather than breaking the page, and the reason is logged server-side.
 */

// sharp needs the Node runtime, not Edge.
export const runtime = "nodejs";

const ACCOUNTS = "https://accounts.spotify.com/api/token";
const API = "https://api.spotify.com/v1";

const REVALIDATE_NOW_PLAYING = Number(process.env.SPOTIFY_REVALIDATE_SECONDS ?? 30);
const REVALIDATE_RECENT = 300;
const REVALIDATE_TOP = 21_600; // 6 hours — taste doesn't move hourly.

const TOP_TIME_RANGE = process.env.SPOTIFY_TOP_RANGE?.trim() || "short_term";

/** Wider samples feed the fingerprint and decade spread than we display. */
const ARTIST_SAMPLE = 20;
const TRACK_SAMPLE = 50;
const ARTISTS_SHOWN = 8;
const TRACKS_SHOWN = 5;

/* ----------------------------------------------------------- auth ------- */

let cachedToken: { value: string; expiresAt: number } | null = null;

/**
 * The last payload we successfully built. When the refresh token finally
 * expires, visitors keep seeing real data instead of the section vanishing;
 * only a cold start with no successful fetch shows nothing at all.
 */
let lastGoodFeed: SpotifyFeed | null = null;

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID?.trim();
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET?.trim();
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN?.trim();

  if (!clientId || !clientSecret) throw new Error("SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET not set");
  if (!refreshToken) throw new Error("SPOTIFY_REFRESH_TOKEN not set — run `npm run spotify:auth`");

  // Refresh a minute early so a request never races the expiry.
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) return cachedToken.value;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(ACCOUNTS, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    cache: "no-store",
  });

  const body = (await response.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !body.access_token) {
    if (body.error === "invalid_grant") {
      throw new Error(
        "refresh token rejected (invalid_grant) — it has expired or been revoked; " +
          "re-authorize with `npm run spotify:auth`"
      );
    }
    throw new Error(`token refresh failed: ${body.error_description ?? body.error ?? response.status}`);
  }

  cachedToken = { value: body.access_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return cachedToken.value;
}

/**
 * Returns null on 204 (nothing playing) and on 403/404, which Spotify uses for
 * "no active device" — both are normal states, not failures.
 */
async function api<T>(path: string, token: string, revalidate: number): Promise<T | null> {
  const response = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate },
  });

  if (response.status === 204 || response.status === 404 || response.status === 403) return null;

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`${path} → HTTP ${response.status} ${detail.slice(0, 160)}`);
  }

  return (await response.json()) as T;
}

/* --------------------------------------------------------- art colour --- */

const toHex = (r: number, g: number, b: number) =>
  "#" + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;

  if (d === 0) return { h: 0, s: 0, l };

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;

  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  if (s === 0) {
    const v = l * 255;
    return [v, v, v] as const;
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t: number) => {
    let tc = t;
    if (tc < 0) tc += 1;
    if (tc > 1) tc -= 1;
    if (tc < 1 / 6) return p + (q - p) * 6 * tc;
    if (tc < 1 / 2) return q;
    if (tc < 2 / 3) return p + (q - p) * (2 / 3 - tc) * 6;
    return p;
  };
  return [channel(h + 1 / 3) * 255, channel(h) * 255, channel(h - 1 / 3) * 255] as const;
}

/** Album art URLs are immutable, so colours can be remembered indefinitely. */
const colourCache = new Map<string, ArtColour>();

/**
 * Picks a representative colour rather than a flat average: a 4×4 downsample,
 * then the most saturated cell. Averaging whole covers tends to produce mud.
 */
async function colourFromArt(url: string): Promise<ArtColour | null> {
  const cached = colourCache.get(url);
  if (cached) return cached;

  try {
    const response = await fetch(url, { next: { revalidate: 86_400 } });
    if (!response.ok) return null;

    const input = Buffer.from(await response.arrayBuffer());
    const { data } = await sharp(input)
      .resize(4, 4, { fit: "cover" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let best = { r: 0, g: 0, b: 0, score: -1 };
    let sum = { r: 0, g: 0, b: 0, n: 0 };

    for (let i = 0; i + 2 < data.length; i += 3) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      sum = { r: sum.r + r, g: sum.g + g, b: sum.b + b, n: sum.n + 1 };

      const { s, l } = rgbToHsl(r, g, b);
      // Favour saturated mid-tones; near-black and blown-out cells score low.
      const score = s * (1 - Math.abs(l - 0.5) * 1.4);
      if (score > best.score) best = { r, g, b, score };
    }

    if (sum.n === 0) return null;

    const chosen =
      best.score > 0.08
        ? best
        : { r: sum.r / sum.n, g: sum.g / sum.n, b: sum.b / sum.n, score: 0 };

    const { h, s, l } = rgbToHsl(chosen.r, chosen.g, chosen.b);
    // Clamp so the colour stays legible against both the light and dark themes.
    const [sr, sg, sb] = hslToRgb(h, Math.max(0.32, Math.min(0.82, s)), Math.max(0.38, Math.min(0.58, l)));

    const colour: ArtColour = {
      raw: toHex(chosen.r, chosen.g, chosen.b),
      safe: toHex(sr, sg, sb),
    };

    // Keep the cache from growing without bound across a long-lived instance.
    if (colourCache.size > 200) colourCache.clear();
    colourCache.set(url, colour);

    return colour;
  } catch {
    // A missing colour is cosmetic — never fail the feed over it.
    return null;
  }
}

/* --------------------------------------------------------------- GET ---- */

function unavailable(reason: string): SpotifyFeed {
  return {
    profile: null,
    nowPlaying: null,
    recent: [],
    topArtists: [],
    topTracks: [],
    genres: [],
    decades: [],
    yearRange: null,
    artColour: null,
    source: "unavailable",
    reason,
    fetchedAt: null,
  };
}

export async function GET() {
  try {
    const token = await getAccessToken();

    type NowPlaying = { is_playing?: boolean; progress_ms?: number; item?: RawTrack };
    type Recent = { items?: { track?: RawTrack; played_at?: string }[] };
    type TopArtists = { items?: RawArtist[] };
    type TopTracks = { items?: RawTrack[] };
    type Me = {
      display_name?: string;
      images?: { url?: string; width?: number }[];
      external_urls?: { spotify?: string };
    };

    const [me, nowRaw, recentRaw, artistsRaw, tracksRaw] = await Promise.all([
      api<Me>("/me", token, REVALIDATE_TOP),
      api<NowPlaying>("/me/player/currently-playing", token, REVALIDATE_NOW_PLAYING),
      api<Recent>("/me/player/recently-played?limit=10", token, REVALIDATE_RECENT),
      api<TopArtists>(`/me/top/artists?limit=${ARTIST_SAMPLE}&time_range=${TOP_TIME_RANGE}`, token, REVALIDATE_TOP),
      api<TopTracks>(`/me/top/tracks?limit=${TRACK_SAMPLE}&time_range=${TOP_TIME_RANGE}`, token, REVALIDATE_TOP),
    ]);

    const nowPlaying = nowRaw?.item
      ? normalizeTrack(nowRaw.item, {
          isPlaying: nowRaw.is_playing ?? false,
          progressMs: nowRaw.progress_ms ?? null,
        })
      : null;

    const recent: SpotifyTrack[] = (recentRaw?.items ?? [])
      .map((entry) => normalizeTrack(entry.track, { playedAt: entry.played_at ?? null }))
      .filter((t): t is SpotifyTrack => t !== null)
      // Spotify repeats a track each time it was played; one row each is enough.
      .filter((track, i, all) => all.findIndex((t) => t.id === track.id) === i);

    const allArtists: SpotifyArtist[] = (artistsRaw?.items ?? [])
      .map(normalizeArtist)
      .filter((a): a is SpotifyArtist => a !== null);

    const allTracks: SpotifyTrack[] = (tracksRaw?.items ?? [])
      .map((t) => normalizeTrack(t))
      .filter((t): t is SpotifyTrack => t !== null);

    // Aggregate over the full sample, display only the head of each list.
    const genres = aggregateGenres(artistsRaw?.items ?? []);
    const { decades, yearRange } = aggregateDecades(allTracks.map((t) => t.releaseYear));

    const artColour = nowPlaying?.albumArt ? await colourFromArt(nowPlaying.albumArt) : null;

    const feed: SpotifyFeed = {
      profile: me
        ? {
            name: me.display_name ?? null,
            url: me.external_urls?.spotify ?? null,
            avatarUrl: pickImage(me.images, 100),
          }
        : null,
      nowPlaying,
      recent,
      topArtists: allArtists.slice(0, ARTISTS_SHOWN),
      topTracks: allTracks.slice(0, TRACKS_SHOWN),
      genres,
      decades,
      yearRange,
      artColour,
      source: "live",
      fetchedAt: new Date().toISOString(),
    };

    lastGoodFeed = feed;
    return NextResponse.json(feed);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown error";
    // Logged server-side only; never contains the client secret or tokens.
    console.error(`[spotify] ${reason}`);

    if (lastGoodFeed) {
      // Serve the last known state rather than blanking the section. The
      // now-playing card is meaningless once stale, so drop just that.
      return NextResponse.json({ ...lastGoodFeed, nowPlaying: null, stale: true, reason });
    }

    return NextResponse.json(unavailable(reason));
  }
}
