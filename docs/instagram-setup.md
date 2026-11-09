# Instagram — live photography feed

The gallery pulls from Instagram automatically. Post a photo, it shows up on the
site. No commands to run, no commits, no deploy.

## How it works

`app/api/instagram/route.ts` calls Meta **on the server**, so the access token
never reaches the browser. The route itself isn't cached — Next doesn't cache
route handlers by default — but the upstream calls are, via
`fetch(..., { next: { revalidate } })`.

Every visitor gets current data, while Meta sees at most one request per
revalidation window (30 minutes by default). A new post appears within that
window on its own.

`<Photography />` fetches that route on mount and renders the frames full-bleed.

### Which host and why — read this before changing anything

Meta's **Unified login** setup issues **Facebook-style tokens** that start with
`EA`. Those authenticate against **`graph.facebook.com`**, *not*
`graph.instagram.com`, and they address the account by its **numeric Instagram
user ID** rather than `/me`.

This cost us an evening of debugging, so to be explicit:

| Setup | Token prefix | Host | Addressing |
|---|---|---|---|
| Instagram Login (older) | `IG…` | `graph.instagram.com` | `/me` |
| Unified login (what we use) | `EA…` | `graph.facebook.com` | `/{ig-user-id}` |

Sending an `EA` token to `graph.instagram.com` returns
`Invalid OAuth access token - Cannot parse access token` (code 190) — which
reads like an expired token but actually means *wrong host*. Regenerating the
token will not fix it.

### Images come straight from Instagram's CDN

`media_url` values are signed links that expire after a few days. Because the
feed re-fetches every 30 minutes, the URLs are always refreshed well before they
lapse. They render with `unoptimized` so Next's image optimizer doesn't
re-process every frame each time the signature rotates.

### The fallback

If the live call fails, the route serves a committed snapshot from
`lib/instagram-feed.json` with `source: "fallback"` and a `reason`. The section
degrades to slightly stale photos instead of vanishing. Refresh that snapshot
occasionally with `npm run instagram:snapshot`, or don't.

## Setup

### 1. Instagram account must be Creator or Business

Instagram app → **Settings → Account type and tools → Switch to professional
account** → **Creator**. Personal accounts have no public API at all.

### 2. Meta app

[developers.facebook.com/apps](https://developers.facebook.com/apps) → create an
app → add the **Instagram** product → use case **Manage messaging & content on
Instagram**. A business portfolio is mandatory for Unified login; any name works
as long as it isn't a generic word (Meta rejects "portfolio", "business", etc.).

### 3. Connect the account and generate a token

**Use cases → Customize → API setup with Unified login → Generate access
tokens.** Add `aurah.lens`, authorize, generate.

The dialog shows the token **once**, and — importantly — also shows the
**Instagram user ID** next to the account name. You need both.

### 4. Environment variables

`.env.local` for local dev (gitignored):

```
IG_ACCESS_TOKEN=EA...                  # from the token dialog
IG_USER_ID=17841466898715400           # shown in the same dialog; not a secret
```

Add the same two in **Vercel → Settings → Environment Variables**, then redeploy.
Without them the live site shows nothing while local works.

Optional:

```
IG_REVALIDATE_SECONDS=1800   # how often Meta is re-queried (default 30 min)
IG_MAX_POSTS=9               # frames to show
IG_INCLUDE_VIDEO=true        # include video thumbnails (default: images only)
IG_API_VERSION=v21.0         # Graph API version (default v21.0)
```

### 5. Verify before restarting the dev server

```bash
cd ~/Library/projects/portfolio
TOKEN=$(grep '^IG_ACCESS_TOKEN=' .env.local | cut -d= -f2-)
ID=$(grep '^IG_USER_ID=' .env.local | cut -d= -f2-)
curl -s "https://graph.facebook.com/v21.0/$ID/media?fields=id,media_type,permalink&limit=3&access_token=$TOKEN"
```

Posts back means you're done — restart `npm run dev`.

⚠️ **Never paste that response anywhere.** Meta embeds the access token inside
the `paging.next` URL. Limiting the response with `fields` as above still
includes paging. If you need to share output, strip the `paging` block first.

## Token expiry

Tokens last about 60 days. When one lapses the site doesn't break — the route
falls back to the snapshot and logs the reason server-side. Generate a new one
from the same dialog and update both `.env.local` and Vercel.

There's no CLI refresh for Unified-login tokens; `--refresh` was removed from
the snapshot script because the Instagram refresh endpoint doesn't accept them.

Fully hands-off rotation would need a writable store (Vercel KV, Edge Config)
since env vars are read-only at runtime — roughly an hour of work if a
twice-a-year chore isn't acceptable.

## Quality note

Instagram re-encodes uploads to roughly 1080px wide and crops to its own aspect
ratios, so these frames are compressed versions of whatever you originally shot.
The component reads a normalized post array — point it at your own full-resolution
exports instead and nothing else has to change.
