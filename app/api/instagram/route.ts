import { NextResponse } from "next/server";
import {
  normalizeMedia,
  snapshotHandle,
  snapshotPosts,
  type InstagramFeed,
  type InstagramPost,
  type RawMedia,
} from "@/lib/instagram";

/**
 * Live photography feed.
 *
 * Runs on the server so IG_ACCESS_TOKEN never reaches the browser. The handler
 * itself isn't cached (Next doesn't cache route handlers by default), but the
 * upstream calls are, so visitors always get current data while Meta sees at
 * most one request per revalidation window. New posts appear on their own.
 *
 * Host note: Meta's "Unified login" setup issues Facebook-style tokens (they
 * start with EA, not IG). Those authenticate against graph.facebook.com, not
 * graph.instagram.com, and address the account by its numeric Instagram user
 * ID rather than /me. Hence IG_USER_ID. Sending an EA token to
 * graph.instagram.com returns "Cannot parse access token", which looks like an
 * expiry problem but isn't.
 */

const GRAPH_HOST = "https://graph.facebook.com";
const API_VERSION = process.env.IG_API_VERSION?.trim() || "v21.0";

const REVALIDATE_SECONDS = Number(process.env.IG_REVALIDATE_SECONDS ?? 1800);
const MAX_POSTS = Number(process.env.IG_MAX_POSTS ?? 60);
const INCLUDE_VIDEO = process.env.IG_INCLUDE_VIDEO === "true";

/** Meta caps the media edge well below this; paging picks up the rest. */
const PAGE_SIZE = 50;
const MAX_PAGES = 4;

const MEDIA_FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url}";

function endpoint(pathname: string, params: Record<string, string>) {
  const url = new URL(`${GRAPH_HOST}/${API_VERSION}${pathname}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url.toString();
}

/**
 * Never let a URL reach the response or the logs — it carries the token as a
 * query parameter, and Meta echoes it back inside paging links too.
 */
async function graphFetch<T>(url: string, label: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error(`${label}: Meta returned a non-JSON response (HTTP ${response.status})`);
  }

  const error = (body as { error?: { message?: string; code?: number } }).error;
  if (!response.ok || error) {
    const detail = error?.message ?? `HTTP ${response.status}`;
    const hint =
      error?.code === 190
        ? " — the token is invalid or expired; generate a new one from the Unified login panel"
        : "";
    throw new Error(`${label}: ${detail}${hint}`);
  }

  return body as T;
}

type ProfileResponse = {
  username?: string;
  profile_picture_url?: string;
  media_count?: number;
};

/**
 * profile_picture_url and media_count need instagram_basic. If the token is
 * scoped more narrowly, fall back to the username alone rather than losing the
 * whole section over an avatar.
 */
async function fetchProfile(userId: string, token: string): Promise<ProfileResponse> {
  try {
    return await graphFetch<ProfileResponse>(
      endpoint(`/${userId}`, {
        fields: "username,profile_picture_url,media_count",
        access_token: token,
      }),
      "profile"
    );
  } catch {
    return await graphFetch<ProfileResponse>(
      endpoint(`/${userId}`, { fields: "username", access_token: token }),
      "profile"
    );
  }
}

type MediaResponse = {
  data?: RawMedia[];
  paging?: { cursors?: { after?: string }; next?: string };
};

/** Walk the media edge until we have enough posts or run out of pages. */
async function fetchAllMedia(userId: string, token: string): Promise<RawMedia[]> {
  const collected: RawMedia[] = [];
  let after: string | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const params: Record<string, string> = {
      fields: MEDIA_FIELDS,
      limit: String(PAGE_SIZE),
      access_token: token,
    };
    if (after) params.after = after;

    const body = await graphFetch<MediaResponse>(
      endpoint(`/${userId}/media`, params),
      "media"
    );

    collected.push(...(body.data ?? []));

    after = body.paging?.cursors?.after;
    // No further page, or Meta stopped returning a next link.
    if (!after || !body.paging?.next || collected.length >= MAX_POSTS) break;
  }

  return collected;
}

/** Last payload we successfully built — see the Spotify route for rationale. */
let lastGoodFeed: InstagramFeed | null = null;

function fallback(reason: string): InstagramFeed {
  return {
    handle: snapshotHandle,
    avatarUrl: null,
    mediaCount: snapshotPosts.length || null,
    source: "fallback",
    reason,
    fetchedAt: null,
    posts: snapshotPosts,
  };
}

export async function GET() {
  const token = process.env.IG_ACCESS_TOKEN?.trim();
  const userId = process.env.IG_USER_ID?.trim();

  if (!token) return NextResponse.json(fallback("IG_ACCESS_TOKEN is not set"));
  if (!userId) return NextResponse.json(fallback("IG_USER_ID is not set"));

  try {
    const [profile, media] = await Promise.all([
      fetchProfile(userId, token),
      fetchAllMedia(userId, token),
    ]);

    const posts: InstagramPost[] = media
      .filter((item) => INCLUDE_VIDEO || item.media_type !== "VIDEO")
      .map(normalizeMedia)
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, MAX_POSTS);

    if (posts.length === 0) {
      return NextResponse.json(fallback("Meta returned no usable media"));
    }

    const feed: InstagramFeed = {
      handle: profile.username ?? snapshotHandle,
      avatarUrl: profile.profile_picture_url ?? null,
      mediaCount: profile.media_count ?? posts.length,
      source: "live",
      fetchedAt: new Date().toISOString(),
      posts,
    };

    lastGoodFeed = feed;
    return NextResponse.json(feed);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown error";
    // Logged server-side for debugging; the token is never part of this string.
    console.error(`[instagram] live fetch failed — ${reason}`);

    // Prefer the last live payload; fall back to the committed snapshot only
    // on a cold start. Instagram's CDN URLs expire, so a long-stale in-memory
    // copy will eventually 403 on images — the snapshot uses local files.
    if (lastGoodFeed) {
      return NextResponse.json({ ...lastGoodFeed, source: "fallback", stale: true, reason });
    }

    return NextResponse.json(fallback(reason));
  }
}
