import { NextResponse } from "next/server";
import {
  contributionLevel,
  describeEvent,
  type ContributionDay,
  type GithubActivity,
  type GithubFeed,
  type GithubRepo,
  type LanguageShare,
} from "@/lib/github";

/**
 * Live GitHub panel data.
 *
 * The token stays server-side. Unlike the other two integrations this one can
 * be genuinely permanent: a classic personal access token has no expiry
 * requirement, so with no scopes selected (public data only) it never needs
 * renewing.
 *
 * A token is still worth having even for public data — unauthenticated
 * requests are limited to 60/hour per IP, and Vercel's egress IPs are shared,
 * so an unauthenticated panel would rate-limit almost immediately.
 */

const GRAPHQL = "https://api.github.com/graphql";
const REST = "https://api.github.com";

const REVALIDATE = Number(process.env.GITHUB_REVALIDATE_SECONDS ?? 3600);
const USERNAME = process.env.GITHUB_USERNAME?.trim() || "RahulCompani7";

const QUERY = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      login
      name
      url
      avatarUrl
      followers {
        totalCount
      }
      repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
        totalCount
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            updatedAt
            primaryLanguage {
              name
              color
            }
          }
        }
      }
      topRepositories: repositories(
        first: 50
        ownerAffiliations: OWNER
        privacy: PUBLIC
        isFork: false
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          updatedAt
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

type RawRepo = {
  name?: string;
  description?: string | null;
  url?: string;
  stargazerCount?: number;
  forkCount?: number;
  updatedAt?: string;
  primaryLanguage?: { name?: string; color?: string } | null;
  languages?: { edges?: { size?: number; node?: { name?: string; color?: string } }[] };
};

type GraphqlResponse = {
  data?: {
    user?: {
      login?: string;
      name?: string | null;
      url?: string;
      avatarUrl?: string;
      followers?: { totalCount?: number };
      repositories?: { totalCount?: number };
      contributionsCollection?: {
        totalCommitContributions?: number;
        totalPullRequestContributions?: number;
        totalIssueContributions?: number;
        contributionCalendar?: {
          totalContributions?: number;
          weeks?: { contributionDays?: { date?: string; contributionCount?: number }[] }[];
        };
      };
      pinnedItems?: { nodes?: RawRepo[] };
      topRepositories?: { nodes?: RawRepo[] };
    } | null;
  };
  errors?: { message?: string }[];
};

function toRepo(raw: RawRepo): GithubRepo | null {
  if (!raw?.name || !raw.url) return null;
  return {
    name: raw.name,
    description: raw.description ?? null,
    url: raw.url,
    stars: raw.stargazerCount ?? 0,
    forks: raw.forkCount ?? 0,
    language: raw.primaryLanguage?.name ?? null,
    languageColor: raw.primaryLanguage?.color ?? null,
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  };
}

/** Last payload we successfully built — see the other routes for rationale. */
let lastGoodFeed: GithubFeed | null = null;

function unavailable(reason: string): GithubFeed {
  return {
    profile: null,
    calendar: null,
    pinned: [],
    languages: [],
    activity: [],
    source: "unavailable",
    reason,
    fetchedAt: null,
  };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!token) {
    return NextResponse.json(unavailable("GITHUB_TOKEN is not set"));
  }

  try {
    const [graph, events] = await Promise.all([
      fetch(GRAPHQL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          // GitHub rejects API requests without a User-Agent.
          "User-Agent": "portfolio-site",
        },
        body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
        next: { revalidate: REVALIDATE },
      }),
      fetch(`${REST}/users/${USERNAME}/events/public?per_page=30`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-site",
        },
        next: { revalidate: REVALIDATE },
      }),
    ]);

    if (!graph.ok) {
      throw new Error(`GraphQL HTTP ${graph.status}${graph.status === 401 ? " — token rejected" : ""}`);
    }

    const body = (await graph.json()) as GraphqlResponse;

    if (body.errors?.length) {
      throw new Error(body.errors.map((e) => e.message).filter(Boolean).join("; ") || "GraphQL error");
    }

    const user = body.data?.user;
    if (!user?.login) throw new Error(`no public user named ${USERNAME}`);

    /* ---- contribution calendar ---- */
    const rawWeeks = user.contributionsCollection?.contributionCalendar?.weeks ?? [];
    const allCounts = rawWeeks.flatMap((w) => (w.contributionDays ?? []).map((d) => d.contributionCount ?? 0));
    const busiest = allCounts.length ? Math.max(...allCounts) : 0;

    const weeks: ContributionDay[][] = rawWeeks.map((week) =>
      (week.contributionDays ?? [])
        .filter((d) => d.date)
        .map((d) => {
          const count = d.contributionCount ?? 0;
          return { date: d.date as string, count, level: contributionLevel(count, busiest) };
        })
    );

    /* ---- language shares across non-fork public repos ---- */
    const byLanguage = new Map<string, { size: number; color: string | null }>();
    for (const repo of user.topRepositories?.nodes ?? []) {
      for (const edge of repo?.languages?.edges ?? []) {
        const name = edge.node?.name;
        if (!name) continue;
        const existing = byLanguage.get(name);
        byLanguage.set(name, {
          size: (existing?.size ?? 0) + (edge.size ?? 0),
          color: existing?.color ?? edge.node?.color ?? null,
        });
      }
    }

    const totalBytes = [...byLanguage.values()].reduce((sum, l) => sum + l.size, 0);
    const languages: LanguageShare[] = totalBytes
      ? [...byLanguage.entries()]
          .map(([name, l]) => ({ name, color: l.color, percent: (l.size / totalBytes) * 100 }))
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 8)
      : [];

    /* ---- pinned, falling back to most-starred ---- */
    const pinnedRaw = user.pinnedItems?.nodes?.filter(Boolean) ?? [];
    const source = pinnedRaw.length ? pinnedRaw : (user.topRepositories?.nodes ?? []).slice(0, 6);
    const pinned = source.map(toRepo).filter((r): r is GithubRepo => r !== null);

    /* ---- recent activity (REST; a failure here shouldn't sink the panel) ---- */
    let activity: GithubActivity[] = [];
    if (events.ok) {
      const raw = (await events.json()) as Parameters<typeof describeEvent>[0][];
      activity = raw
        .map(describeEvent)
        .filter((a): a is GithubActivity => a !== null)
        .slice(0, 5);
    }

    const feed: GithubFeed = {
      profile: {
        login: user.login,
        name: user.name ?? null,
        url: user.url ?? `https://github.com/${user.login}`,
        avatarUrl: user.avatarUrl ?? null,
        followers: user.followers?.totalCount ?? 0,
        publicRepos: user.repositories?.totalCount ?? 0,
      },
      calendar: {
        total: user.contributionsCollection?.contributionCalendar?.totalContributions ?? 0,
        weeks,
        commits: user.contributionsCollection?.totalCommitContributions ?? 0,
        pullRequests: user.contributionsCollection?.totalPullRequestContributions ?? 0,
        issues: user.contributionsCollection?.totalIssueContributions ?? 0,
      },
      pinned,
      languages,
      activity,
      source: "live",
      fetchedAt: new Date().toISOString(),
    };

    lastGoodFeed = feed;
    return NextResponse.json(feed);
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown error";
    // Logged server-side only; never contains the token.
    console.error(`[github] ${reason}`);

    if (lastGoodFeed) {
      return NextResponse.json({ ...lastGoodFeed, stale: true, reason });
    }

    return NextResponse.json(unavailable(reason));
  }
}
