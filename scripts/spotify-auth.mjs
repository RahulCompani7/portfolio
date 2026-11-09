#!/usr/bin/env node
/**
 * One-time Spotify authorization.
 *
 * Spotify has no permanent token. This script does the OAuth round trip for
 * you and writes the refresh token straight into .env.local, so the value
 * never passes through a terminal you might screenshot or a chat window.
 *
 * Run it once now, and again whenever the refresh token expires — Spotify
 * caps those at 6 months as of July 2026.
 *
 *   npm run spotify:auth
 *
 * Needs in .env.local first:
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *
 * And this exact redirect URI registered on your Spotify app:
 *   http://127.0.0.1:8888/callback
 */

import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENV_FILE = path.join(ROOT, ".env.local");

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;

const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-recently-played",
  "user-top-read",
].join(" ");

/* ---------------------------------------------------------------- env ---- */

async function readEnv() {
  if (!existsSync(ENV_FILE)) return {};
  const text = await readFile(ENV_FILE, "utf8");
  const out = {};
  for (const line of text.split("\n")) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i.exec(line);
    if (match) out[match[1]] = match[2].replace(/^["']|["']$/g, "").trim();
  }
  return out;
}

/** Rewrites one key in place, preserving comments and the rest of the file. */
async function writeEnvValue(key, value) {
  const existing = existsSync(ENV_FILE) ? await readFile(ENV_FILE, "utf8") : "";
  const lines = existing.split("\n");
  const index = lines.findIndex((l) => l.startsWith(`${key}=`));

  if (index === -1) {
    const spacer = existing.endsWith("\n") || existing === "" ? "" : "\n";
    await writeFile(ENV_FILE, `${existing}${spacer}${key}=${value}\n`);
  } else {
    lines[index] = `${key}=${value}`;
    await writeFile(ENV_FILE, lines.join("\n"));
  }
}

/* --------------------------------------------------------------- main ---- */

const env = await readEnv();
const clientId = process.env.SPOTIFY_CLIENT_ID || env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    [
      "Missing Spotify credentials.",
      "",
      "Add these to .env.local first (from developer.spotify.com/dashboard):",
      "  SPOTIFY_CLIENT_ID=...",
      "  SPOTIFY_CLIENT_SECRET=...",
      "",
      `And register this redirect URI on the app: ${REDIRECT_URI}`,
    ].join("\n")
  );
  process.exit(1);
}

const state = randomBytes(16).toString("hex");

const authorizeUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    state,
    // Force the consent screen so re-authorizing always issues a fresh token.
    show_dialog: "true",
  });

const page = (title, body) =>
  `<!doctype html><meta charset="utf-8"><title>${title}</title>` +
  `<body style="font:16px/1.6 -apple-system,BlinkMacSystemFont,sans-serif;background:#06090b;color:#dfe6e3;` +
  `display:grid;place-items:center;height:100vh;margin:0;text-align:center">` +
  `<div><h1 style="color:#35d07f;font-size:22px;margin:0 0 10px">${title}</h1>${body}</div>`;

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const error = url.searchParams.get("error");
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");

  const finish = (status, title, body, exitCode) => {
    res.writeHead(status, { "Content-Type": "text/html" }).end(page(title, body));
    server.close();
    process.exitCode = exitCode;
  };

  if (error) return finish(400, "Authorization declined", `<p>${error}</p>`, 1);
  if (!code) return finish(400, "No code returned", "<p>Try again.</p>", 1);
  if (returnedState !== state) {
    return finish(400, "State mismatch", "<p>Possible interference — run the command again.</p>", 1);
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const body = await response.json();

    if (!response.ok || !body.refresh_token) {
      const detail = body.error_description || body.error || `HTTP ${response.status}`;
      return finish(400, "Token exchange failed", `<p>${detail}</p>`, 1);
    }

    await writeEnvValue("SPOTIFY_REFRESH_TOKEN", body.refresh_token);

    const expires = new Date(Date.now() + 182 * 86400_000).toISOString().slice(0, 10);
    console.log("\n✓ Refresh token written to .env.local (not printed here, on purpose).");
    console.log(`  Spotify expires refresh tokens after ~6 months — around ${expires}.`);
    console.log("  Re-run `npm run spotify:auth` then. Restart the dev server to pick it up.\n");
    console.log("  For production, copy the value from .env.local into Vercel as SPOTIFY_REFRESH_TOKEN.\n");

    finish(200, "Connected", "<p>Refresh token saved to .env.local. You can close this tab.</p>", 0);
  } catch (e) {
    finish(500, "Something went wrong", `<p>${e.message}</p>`, 1);
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("\nOpen this URL in your browser and approve access:\n");
  console.log(authorizeUrl);
  console.log(`\nWaiting for the redirect to ${REDIRECT_URI} …`);
  console.log("(If Spotify says the redirect URI is invalid, register that exact URL on your app.)\n");
});
