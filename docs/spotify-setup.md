# Spotify — live music section

Section 07 shows what's playing right now, your top artists and tracks, and
recently played. Credentials stay server-side in `app/api/spotify/route.ts`.

## There is no permanent token

Worth stating plainly, because it's the first thing people ask.

| | Lifetime | Who handles it |
|---|---|---|
| Access token | 1 hour | **Automatic** — the route refreshes it, cached in memory |
| Refresh token | ~6 months | **You** — re-run `npm run spotify:auth` |

Spotify [started expiring refresh tokens](https://developer.spotify.com/blog/2026-06-18-refresh-token-expiration)
in mid-2026: new apps immediately, existing apps from 20 July 2026. Refreshing
the access token does **not** extend the refresh token's clock. When it lapses,
Spotify returns `invalid_grant` and the only remedy is re-authorizing in a
browser. No setting, scope or plan changes this.

So: hands-off for six months at a time, then a 30-second command. When it does
expire the section hides itself rather than breaking the page, and the reason
is logged server-side.

## Setup

### 1. Create the app

[developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) →
**Create app**. Any name. Under *Redirect URIs* add exactly:

```
http://127.0.0.1:8888/callback
```

Use `127.0.0.1`, not `localhost` — Spotify rejects the latter for loopback.

Tick the **Web API** checkbox. Save, then copy the Client ID and Client Secret.

> Since February 2026 the app owner needs **Spotify Premium** for Development
> Mode, and an app may authorize at most 5 users. Fine for a personal site.
> Extended quota now requires a registered business with 250k monthly users,
> so there's no upgrade path — and none needed.

### 2. Credentials

In `.env.local`:

```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
```

### 3. Authorize

```bash
npm run spotify:auth
```

It prints a URL, waits on `127.0.0.1:8888`, and on approval writes
`SPOTIFY_REFRESH_TOKEN` into `.env.local` itself. The token is never printed to
the terminal — nothing to accidentally screenshot or paste.

Restart the dev server afterwards.

### 4. Production

Copy all three values into **Vercel → Settings → Environment Variables**:
`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`. Redeploy.

The redirect URI only matters for the local auth step, so Vercel doesn't need
one.

## Options

```
SPOTIFY_REVALIDATE_SECONDS=30   # how often now-playing is re-queried
SPOTIFY_TOP_RANGE=short_term    # short_term (4 wks) | medium_term (6 mo) | long_term
```

The client also polls `/api/spotify` every 45s while the tab is visible, so the
now-playing card keeps up without a reload.

## What the API can and can't do any more

Spotify has cut a lot. Confirmed against the
[February 2026 changelog](https://developer.spotify.com/documentation/web-api/references/changes/february-2026):

**Available and used here** — `/me`, `/me/player/currently-playing`,
`/me/player/recently-played`, `/me/top/artists`, `/me/top/tracks`.

**Gone, so don't plan features around them:**

- `/audio-features` and `/audio-analysis` — deprecated 27 November 2024, now
  403 for new apps. This is what used to give valence, energy, danceability and
  tempo, i.e. every data-driven "mood of this song" feature. There is no
  replacement.
- `/recommendations`, `/artists/{id}/top-tracks`, `/browse/new-releases`,
  `/markets`, `/users/{id}`, and all the batch `GET /tracks`, `/albums`,
  `/artists` endpoints.
- `popularity` and `followers` fields on artists and tracks.

## Rate limits

Top artists and tracks cache for 6 hours, recently played for 5 minutes, now
playing for 30 seconds. Access tokens are cached in memory per server instance
so traffic bursts don't trigger a token exchange each time. Development Mode
quota is shared across all apps under one developer account.
