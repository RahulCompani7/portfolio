/**
 * Shared types for the music section.
 *
 * Live data comes from /api/spotify, which holds the credentials server-side.
 * Nothing here touches the network.
 *
 * Note on fields: Spotify's February 2026 changes removed `popularity` and
 * `followers` from artists and tracks, so there are no "X% popular" or
 * follower-count displays to build — don't add them back expecting data.
 */

export type SpotifyTrack = {
  id: string;
  title: string;
  /** All credited artists, already joined for display. */
  artists: string;
  album: string | null;
  albumArt: string | null;
  /** Release year of the album, when Spotify gives one. Feeds the decade spread. */
  releaseYear: number | null;
  url: string;
  /** Only on the currently-playing item. */
  isPlaying?: boolean;
  durationMs?: number | null;
  progressMs?: number | null;
  /** Only on recently-played items. */
  playedAt?: string | null;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  imageUrl: string | null;
  /** Trimmed for the card; the full list is aggregated into the fingerprint. */
  genres: string[];
  url: string;
};

/** One genre and how many of the top artists carry it. */
export type GenreWeight = { name: string; count: number };

/** Tracks grouped by the decade their album came out. */
export type DecadeBucket = { decade: number; count: number };

/**
 * Colour sampled from the current album art, server-side.
 * `safe` is lightness-clamped so it stays legible in both themes; `raw` is the
 * untouched average for soft glows where contrast doesn't matter.
 */
export type ArtColour = { raw: string; safe: string };

export type SpotifyProfile = {
  name: string | null;
  url: string | null;
  avatarUrl: string | null;
};

export type SpotifyFeed = {
  profile: SpotifyProfile | null;
  /** Null whenever nothing is playing right now. */
  nowPlaying: SpotifyTrack | null;
  recent: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  topTracks: SpotifyTrack[];
  /** Aggregated across top artists — the "this month sounds like" line. */
  genres: GenreWeight[];
  /** Release-decade distribution across a wider sample of top tracks. */
  decades: DecadeBucket[];
  yearRange: { min: number; max: number } | null;
  /** Dominant colour of the current album art, or null when nothing is playing. */
  artColour: ArtColour | null;
  source: "live" | "unavailable";
  /** True when serving the last good payload because the live call failed. */
  stale?: boolean;
  /** Only set when unavailable. Never contains credentials. */
  reason?: string;
  fetchedAt: string | null;
};

/* --------------------------------------------------------- raw shapes ---- */

type RawImage = { url?: string; width?: number; height?: number };

export type RawTrack = {
  id?: string;
  name?: string;
  artists?: { name?: string }[];
  album?: { name?: string; images?: RawImage[]; release_date?: string };
  duration_ms?: number;
  external_urls?: { spotify?: string };
};

export type RawArtist = {
  id?: string;
  name?: string;
  images?: RawImage[];
  genres?: string[];
  external_urls?: { spotify?: string };
};

/** Spotify returns images largest-first; pick one near the size we render. */
export function pickImage(images: RawImage[] | undefined, minWidth = 160): string | null {
  if (!images?.length) return null;
  const sorted = [...images].sort((a, b) => (a.width ?? 0) - (b.width ?? 0));
  const match = sorted.find((i) => (i.width ?? 0) >= minWidth);
  return match?.url ?? sorted[sorted.length - 1]?.url ?? null;
}

export function normalizeTrack(
  raw: RawTrack | undefined | null,
  extra: Partial<SpotifyTrack> = {}
): SpotifyTrack | null {
  if (!raw?.id || !raw.name) return null;

  return {
    id: raw.id,
    title: raw.name,
    artists: (raw.artists ?? []).map((a) => a.name).filter(Boolean).join(", ") || "Unknown artist",
    album: raw.album?.name ?? null,
    albumArt: pickImage(raw.album?.images, 160),
    releaseYear: parseReleaseYear(raw.album?.release_date),
    url: raw.external_urls?.spotify ?? `https://open.spotify.com/track/${raw.id}`,
    durationMs: raw.duration_ms ?? null,
    ...extra,
  };
}

export function normalizeArtist(raw: RawArtist | undefined | null): SpotifyArtist | null {
  if (!raw?.id || !raw.name) return null;

  return {
    id: raw.id,
    name: raw.name,
    imageUrl: pickImage(raw.images, 160),
    genres: (raw.genres ?? []).slice(0, 2),
    url: raw.external_urls?.spotify ?? `https://open.spotify.com/artist/${raw.id}`,
  };
}

/* ------------------------------------------------------------ display ---- */

/** "3:47" from milliseconds. */
export function formatDuration(ms: number | null | undefined): string {
  if (!ms || ms < 0) return "";
  const total = Math.round(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Coarse relative time — "2h ago". Deliberately low-resolution so server and
 * client don't disagree over a few seconds and trigger a hydration warning.
 */
export function formatPlayedAt(iso: string | null | undefined): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";

  const minutes = Math.round((Date.now() - then) / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  return days === 1 ? "yesterday" : `${days}d ago`;
}

/* ------------------------------------------------------ aggregations ---- */

/** Spotify's release_date is "YYYY", "YYYY-MM" or "YYYY-MM-DD". */
export function parseReleaseYear(releaseDate?: string | null): number | null {
  if (!releaseDate) return null;
  const year = Number.parseInt(releaseDate.slice(0, 4), 10);
  if (!Number.isFinite(year) || year < 1900 || year > 2200) return null;
  return year;
}

/**
 * Counts how many of the top artists share each genre. Spotify tags generously
 * (an artist can carry six), so the frequent ones genuinely characterise taste
 * rather than describing one outlier.
 */
export function aggregateGenres(artists: { genres?: string[] }[], limit = 8): GenreWeight[] {
  const counts = new Map<string, number>();

  for (const artist of artists) {
    for (const genre of artist.genres ?? []) {
      const name = genre.trim().toLowerCase();
      if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    // Frequency first, then alphabetical so equal counts stay in a stable order.
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function aggregateDecades(years: (number | null)[]): {
  decades: DecadeBucket[];
  yearRange: { min: number; max: number } | null;
} {
  const present = years.filter((y): y is number => y !== null);
  if (present.length === 0) return { decades: [], yearRange: null };

  const counts = new Map<number, number>();
  for (const year of present) {
    const decade = Math.floor(year / 10) * 10;
    counts.set(decade, (counts.get(decade) ?? 0) + 1);
  }

  return {
    decades: [...counts.entries()]
      .map(([decade, count]) => ({ decade, count }))
      .sort((a, b) => a.decade - b.decade),
    yearRange: { min: Math.min(...present), max: Math.max(...present) },
  };
}
