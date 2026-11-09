import snapshot from "./instagram-feed.json";

/**
 * Shared types for the photography feed.
 *
 * Live data comes from /api/instagram, which calls Meta on the server so the
 * access token never reaches the browser. instagram-feed.json is only a
 * fallback for when the live call can't succeed.
 */

export type InstagramPost = {
  id: string;
  /** Instagram CDN URL when live, or a local /photography/... path from the snapshot. */
  src: string;
  width: number | null;
  height: number | null;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  caption: string | null;
  /** First meaningful caption line, hashtags stripped. */
  title: string | null;
  permalink: string;
  timestamp: string;
};

export type InstagramFeed = {
  handle: string | null;
  /** Instagram CDN URL for the profile picture; rotates like media URLs. */
  avatarUrl: string | null;
  /** Total posts on the account, which can exceed what we fetched. */
  mediaCount: number | null;
  /** "live" straight from the API, "fallback" from the committed snapshot. */
  source: "live" | "fallback";
  /** True when serving the last good payload because the live call failed. */
  stale?: boolean;
  /** Only set on fallback — why the live call didn't work. Never includes the token. */
  reason?: string;
  fetchedAt: string | null;
  posts: InstagramPost[];
};

/* ----------------------------------------------------------- snapshot ---- */

type Snapshot = {
  handle: string | null;
  syncedAt: string | null;
  posts: InstagramPost[];
};

const snap = snapshot as Snapshot;

export const snapshotPosts: InstagramPost[] = snap.posts ?? [];
export const snapshotHandle: string | null = snap.handle;

/* -------------------------------------------------------- normalising ---- */

/** Raw shape of one item from the Instagram media edge. */
export type RawMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  children?: { data?: { media_type?: string; media_url?: string }[] };
};

/** First caption line that isn't a hashtag pile — Instagram captions run long. */
export function titleFromCaption(caption?: string | null): string | null {
  if (!caption) return null;
  const line = caption.split("\n").find((l) => l.trim() && !l.trim().startsWith("#"));
  if (!line) return null;
  const cleaned = line.replace(/#[\w.]+/g, "").replace(/\s+/g, " ").trim();
  return cleaned || null;
}

/** The displayable still for a post, whatever its media type. */
export function stillUrlFor(media: RawMedia): string | null {
  if (media.media_type === "VIDEO") return media.thumbnail_url ?? null;
  if (media.media_type === "CAROUSEL_ALBUM") {
    // The Graph API already returns the first child's image as media_url.
    if (media.media_url) return media.media_url;
    const children = media.children?.data ?? [];
    const firstImage = children.find((c) => c.media_type === "IMAGE");
    return firstImage?.media_url ?? children[0]?.media_url ?? null;
  }
  return media.media_url ?? null;
}

export function normalizeMedia(media: RawMedia): InstagramPost | null {
  const src = stillUrlFor(media);
  if (!src || !media.permalink || !media.timestamp) return null;

  return {
    id: String(media.id),
    src,
    // Meta doesn't return dimensions on the media edge. The grid lays photos
    // out at their natural aspect ratio instead of guessing, so this stays null.
    width: null,
    height: null,
    mediaType: media.media_type ?? "IMAGE",
    caption: media.caption ?? null,
    title: titleFromCaption(media.caption),
    permalink: media.permalink,
    timestamp: media.timestamp,
  };
}

/* ------------------------------------------------------------ helpers ---- */

export function profileUrlFor(handle: string | null): string {
  return handle ? `https://instagram.com/${handle}` : "https://instagram.com/";
}

/** Fixed locale and timezone so the string never depends on the viewer. */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
