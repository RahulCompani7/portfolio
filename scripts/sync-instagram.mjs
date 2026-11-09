#!/usr/bin/env node
/**
 * Refreshes the OFFLINE FALLBACK snapshot.
 *
 * The live gallery does not use this script — app/api/instagram/route.ts pulls
 * from Instagram on the server and new posts appear on their own. This exists
 * only so the section has something to show when the live call can't succeed:
 * an expired token, a Meta outage, a local run with no token set.
 *
 * It copies images into public/photography/ and writes lib/instagram-feed.json.
 * Commit both. Re-run it every few months, or never — the site works either way.
 *
 * Usage
 *   node scripts/sync-instagram.mjs              refresh the fallback snapshot
 *   node scripts/sync-instagram.mjs --dry-run    show what would change
 *   node scripts/sync-instagram.mjs --refresh    (removed — regenerate in the dashboard)
 *
 * Environment (.env.local, which is gitignored)
 *   IG_ACCESS_TOKEN   required — token from the Unified login panel (starts with EA)
 *   IG_USER_ID        required — numeric Instagram account id
 *   IG_MAX_POSTS      optional — how many to keep (default 9)
 *   IG_API_VERSION    optional — e.g. v23.0; omit to use the API default
 *   IG_INCLUDE_VIDEO  optional — "true" to include video thumbnails
 *
 * Tokens last 60 days. Run --refresh every month or so; an expired token
 * cannot be refreshed and you'll have to reconnect the app by hand.
 */

import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGE_DIR = path.join(ROOT, "public", "photography");
const MANIFEST = path.join(ROOT, "lib", "instagram-feed.json");

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run");
const REFRESH = args.has("--refresh");

/* ---------------------------------------------------------------- env ---- */

/** Minimal .env parser so the script stays dependency-free. */
async function loadEnvLocal() {
  const file = path.join(ROOT, ".env.local");
  if (!existsSync(file)) return;
  const text = await readFile(file, "utf8");
  for (const line of text.split("\n")) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i.exec(line);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

/** Never print a token; only ever show enough to identify which one it is. */
const mask = (token) =>
  !token ? "(unset)" : `${token.slice(0, 4)}…${token.slice(-4)} (${token.length} chars)`;

/* ---------------------------------------------------------------- api ---- */

const BASE = "https://graph.facebook.com";
const API_VERSION = process.env.IG_API_VERSION?.trim() || "v21.0";

function endpoint(pathname, params = {}) {
  const url = new URL(`${BASE}/${API_VERSION}${pathname}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }
  return url;
}

async function apiGet(url) {
  const response = await fetch(url);
  const text = await response.text();

  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`Instagram returned non-JSON (HTTP ${response.status}): ${text.slice(0, 300)}`);
  }

  if (!response.ok || body.error) {
    const error = body.error ?? {};
    const detail = [error.message, error.error_user_msg].filter(Boolean).join(" — ");
    throw new Error(
      `Instagram API error (HTTP ${response.status})` +
        (detail ? `: ${detail}` : `: ${text.slice(0, 300)}`) +
        (error.code === 190
          ? "\n\nThat code means the token is invalid or expired. Tokens cannot be " +
            "refreshed once expired — reconnect the app to get a new one."
          : "")
    );
  }

  return body;
}

/* ------------------------------------------------------------ imaging ---- */

/** Read intrinsic dimensions straight from the file header, no dependencies. */
function imageSize(buffer) {
  // PNG: 8-byte signature, then IHDR with width/height as big-endian uint32.
  if (buffer.length > 24 && buffer.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // JPEG: walk the segment markers to the start-of-frame, which holds the size.
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      const isStartOfFrame =
        marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isStartOfFrame) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      const length = buffer.readUInt16BE(offset + 2);
      if (length < 2) break;
      offset += 2 + length;
    }
  }

  return { width: null, height: null };
}

function extensionFor(url, contentType) {
  if (contentType?.includes("png")) return ".png";
  if (contentType?.includes("webp")) return ".webp";
  const fromUrl = /\.(jpe?g|png|webp)(?:\?|$)/i.exec(url)?.[1]?.toLowerCase();
  if (fromUrl) return fromUrl === "jpeg" ? ".jpg" : `.${fromUrl}`;
  return ".jpg";
}

async function downloadImage(url, basename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`image download failed (HTTP ${response.status})`);

  const buffer = Buffer.from(await response.arrayBuffer());
  const extension = extensionFor(url, response.headers.get("content-type"));
  const filename = `${basename}${extension}`;

  if (!DRY_RUN) await writeFile(path.join(IMAGE_DIR, filename), buffer);

  return { filename, bytes: buffer.length, ...imageSize(buffer) };
}

/* ----------------------------------------------------------- shaping ----- */

/** Instagram ids are numeric, but sanitise anyway — these become filenames. */
const safeId = (id) => String(id).replace(/[^A-Za-z0-9_-]/g, "");

/** First line of the caption, trimmed — the rest is usually hashtags. */
function titleFromCaption(caption) {
  if (!caption) return null;
  const firstLine = caption.split("\n").find((line) => line.trim() && !line.trim().startsWith("#"));
  if (!firstLine) return null;
  const withoutTags = firstLine.replace(/#[\w.]+/g, "").replace(/\s+/g, " ").trim();
  return withoutTags || null;
}

/** The displayable still for a post, whatever its media type. */
function stillUrlFor(media) {
  if (media.media_type === "IMAGE") return media.media_url ?? null;
  if (media.media_type === "VIDEO") return media.thumbnail_url ?? null;
  if (media.media_type === "CAROUSEL_ALBUM") {
    const children = media.children?.data ?? [];
    const firstImage = children.find((child) => child.media_type === "IMAGE");
    return firstImage?.media_url ?? children[0]?.media_url ?? null;
  }
  return media.media_url ?? null;
}

/* -------------------------------------------------------------- main ----- */

async function main() {
  await loadEnvLocal();

  const token = process.env.IG_ACCESS_TOKEN?.trim();
  if (!token) {
    console.error(
      [
        "Missing IG_ACCESS_TOKEN.",
        "",
        "Create .env.local in the project root with:",
        "  IG_ACCESS_TOKEN=your_long_lived_token",
        "",
        "See docs/instagram-setup.md for how to get one.",
      ].join("\n")
    );
    process.exitCode = 1;
    return;
  }

  if (REFRESH) {
    console.error(
      "Token refresh isn't available for Unified-login tokens from here.\n" +
        "Generate a new one: Use cases > Customize > API setup with Unified login\n" +
        "> Generate access tokens, then replace IG_ACCESS_TOKEN in .env.local."
    );
    process.exitCode = 1;
    return;
  }

  const maxPosts = Number(process.env.IG_MAX_POSTS ?? 9);
  const includeVideo = process.env.IG_INCLUDE_VIDEO === "true";

  console.log(`Token ${mask(token)}`);

  const userId = process.env.IG_USER_ID?.trim();
  if (!userId) {
    console.error("Missing IG_USER_ID. It's shown in the token dialog; add it to .env.local.");
    process.exitCode = 1;
    return;
  }

  const profile = await apiGet(endpoint(`/${userId}`, { fields: "username", access_token: token }));
  console.log(`Account @${profile.username}`);

  const media = await apiGet(
    endpoint(`/${userId}/media`, {
      fields:
        "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url}",
      limit: 50,
      access_token: token,
    })
  );

  const candidates = (media.data ?? [])
    .filter((item) => includeVideo || item.media_type !== "VIDEO")
    .slice(0, maxPosts);

  if (!candidates.length) {
    console.warn("No media came back. Nothing written — leaving the existing manifest alone.");
    return;
  }

  await mkdir(IMAGE_DIR, { recursive: true });

  const posts = [];
  for (const [index, item] of candidates.entries()) {
    const stillUrl = stillUrlFor(item);
    if (!stillUrl) {
      console.warn(`  ${index + 1}. ${item.id} — no displayable image, skipped`);
      continue;
    }

    try {
      const file = await downloadImage(stillUrl, safeId(item.id));
      posts.push({
        id: safeId(item.id),
        src: `/photography/${file.filename}`,
        width: file.width,
        height: file.height,
        mediaType: item.media_type,
        caption: item.caption ?? null,
        title: titleFromCaption(item.caption),
        permalink: item.permalink,
        timestamp: item.timestamp,
      });
      const size = file.width ? `${file.width}×${file.height}` : "size unknown";
      console.log(`  ${index + 1}. ${file.filename} — ${size}, ${Math.round(file.bytes / 1024)} KB`);
    } catch (error) {
      console.warn(`  ${index + 1}. ${item.id} — ${error.message}`);
    }
  }

  if (!posts.length) {
    console.error("Every download failed. Manifest left untouched.");
    process.exitCode = 1;
    return;
  }

  const manifest = {
    handle: profile.username ?? null,
    syncedAt: new Date().toISOString(),
    posts,
  };

  if (DRY_RUN) {
    console.log(`\nDry run — would write ${posts.length} posts to lib/instagram-feed.json`);
    return;
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  // Drop images from previous syncs that are no longer in the feed.
  const keep = new Set(posts.map((post) => path.basename(post.src)));
  for (const filename of await readdir(IMAGE_DIR)) {
    if (!keep.has(filename)) {
      await unlink(path.join(IMAGE_DIR, filename));
      console.log(`  removed stale ${filename}`);
    }
  }

  console.log(`\nSynced ${posts.length} posts. Commit public/photography/ and lib/instagram-feed.json.`);
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exitCode = 1;
});
