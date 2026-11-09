/**
 * Shared types for the GitHub panel inside the Skills section.
 *
 * Live data comes from /api/github, which holds the token server-side.
 * Nothing here touches the network.
 */

export type GithubProfile = {
  login: string;
  name: string | null;
  url: string;
  avatarUrl: string | null;
  followers: number;
  publicRepos: number;
};

/** One day in the contribution calendar. `level` is 0–4 for colour banding. */
export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionCalendar = {
  total: number;
  /** Columns, each 7 days (or fewer at the very start and end of the range). */
  weeks: ContributionDay[][];
  commits: number;
  pullRequests: number;
  issues: number;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
  updatedAt: string;
};

export type LanguageShare = {
  name: string;
  color: string | null;
  /** Share of bytes across all non-fork public repos, 0–100. */
  percent: number;
};

export type GithubActivity = {
  id: string;
  /** Short human sentence, e.g. "pushed 3 commits to portfolio". */
  text: string;
  repo: string;
  url: string;
  at: string;
};

export type GithubFeed = {
  profile: GithubProfile | null;
  calendar: ContributionCalendar | null;
  pinned: GithubRepo[];
  languages: LanguageShare[];
  activity: GithubActivity[];
  source: "live" | "unavailable";
  /** Only set when unavailable or stale. Never contains the token. */
  reason?: string;
  stale?: boolean;
  fetchedAt: string | null;
};

/* ------------------------------------------------------------ helpers --- */

/**
 * Buckets a day's commit count into 0–4.
 *
 * GitHub bands against the user's own busiest day rather than a fixed scale,
 * so a quiet year still shows contrast instead of a uniformly pale grid.
 */
export function contributionLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (max <= 0) return 0;
  const ratio = count / max;
  if (ratio > 0.66) return 4;
  if (ratio > 0.4) return 3;
  if (ratio > 0.15) return 2;
  return 1;
}

/** "Jan", "Feb" … for the month strip above the calendar. */
export function monthLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
}

/** Coarse relative time, low-resolution so server and client agree. */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";

  const minutes = Math.round((Date.now() - then) / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 31) return days === 1 ? "yesterday" : `${days}d ago`;

  const months = Math.round(days / 30);
  return months < 12 ? `${months}mo ago` : `${Math.round(months / 12)}y ago`;
}

/** Turns a raw GitHub events-API entry into one readable line, or null. */
export function describeEvent(event: {
  id?: string;
  type?: string;
  repo?: { name?: string };
  payload?: {
    commits?: unknown[];
    ref_type?: string;
    action?: string;
    pull_request?: { title?: string; html_url?: string };
    issue?: { title?: string; html_url?: string };
  };
  created_at?: string;
}): GithubActivity | null {
  const repo = event.repo?.name;
  if (!repo || !event.id || !event.created_at) return null;

  const short = repo.split("/")[1] ?? repo;
  const repoUrl = `https://github.com/${repo}`;
  const base = { id: event.id, repo: short, at: event.created_at };

  switch (event.type) {
    case "PushEvent": {
      const n = event.payload?.commits?.length ?? 0;
      if (n === 0) return null;
      return { ...base, text: `pushed ${n} commit${n === 1 ? "" : "s"}`, url: repoUrl };
    }
    case "CreateEvent": {
      const kind = event.payload?.ref_type ?? "repository";
      return { ...base, text: `created a ${kind}`, url: repoUrl };
    }
    case "PullRequestEvent": {
      const action = event.payload?.action ?? "updated";
      return {
        ...base,
        text: `${action} a pull request`,
        url: event.payload?.pull_request?.html_url ?? repoUrl,
      };
    }
    case "IssuesEvent": {
      const action = event.payload?.action ?? "updated";
      return { ...base, text: `${action} an issue`, url: event.payload?.issue?.html_url ?? repoUrl };
    }
    case "WatchEvent":
      return { ...base, text: "starred", url: repoUrl };
    case "ReleaseEvent":
      return { ...base, text: "published a release", url: repoUrl };
    default:
      // Plenty of event types aren't worth a line on a portfolio.
      return null;
  }
}
