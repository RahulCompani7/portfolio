# GitHub — live panel in the Skills section

Contribution calendar, language distribution, pinned repositories and recent
public activity, inside section 04 rather than as a section of its own. It
backs up the hand-written skill chips with measured data.

## The easy one

After Instagram (60 days) and Spotify (6 months), this integration is the
relief: **a classic personal access token has no expiry requirement**, so set
it once and never think about it again.

## Setup

1. [github.com/settings/tokens](https://github.com/settings/tokens) →
   **Generate new token (classic)**
2. Note: `portfolio site`. Expiration: **No expiration**
3. **Select no scopes at all.** Leave every checkbox unticked — the panel only
   reads public data, and a scopeless token can do nothing else if it leaks.
4. Copy it into `.env.local`:

```
GITHUB_TOKEN=ghp_...
GITHUB_USERNAME=RahulCompani7
```

5. Add both in **Vercel → Settings → Environment Variables**, ticking Preview
   as well as Production, then redeploy.

### Why a token at all, for public data?

Unauthenticated requests are capped at 60/hour **per IP**, and Vercel's egress
addresses are shared with other customers — an unauthenticated panel would
rate-limit almost immediately. Authenticated gives 5,000/hour.

The contribution calendar is also GraphQL-only, and GitHub's GraphQL API
requires authentication even for public data.

## How it works

One GraphQL query covers the profile, calendar, pinned repos and per-repo
language byte counts; one REST call fetches recent public events. Both cache
for an hour (`GITHUB_REVALIDATE_SECONDS`).

Language percentages are computed from actual bytes across your non-fork
public repos, not from the `primaryLanguage` label — so a repo that's 70% TS
and 30% CSS contributes proportionally.

The calendar bands each day 0–4 against **your own busiest day** rather than a
fixed scale, which is what GitHub does; a quiet year still shows contrast
instead of a uniformly pale grid. Colours come from the site accent rather
than GitHub's green, so it sits inside the page's palette in both themes.

Pinned repositories fall back to your most-starred repos if you haven't
pinned any.

## Failure behaviour

Same as the other two: the last successful payload is kept in memory and
served if a later call fails, the panel hides itself in production when there
has never been a successful fetch, and a dev-only placeholder shows the reason
locally. A failure of the activity call alone doesn't sink the rest of the
panel.
