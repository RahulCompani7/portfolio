"use client";

import { useEffect, useState } from "react";
import {
  monthLabel,
  relativeTime,
  type ContributionDay,
  type GithubFeed,
} from "@/lib/github";
import BrandLogo from "./BrandLogo";

/**
 * Live GitHub data, rendered inside the Skills section rather than as its own
 * stop on the page — it backs up the hand-written skill chips with measured
 * data instead of adding another thing to scroll past.
 */
export default function GithubPanel() {
  const [feed, setFeed] = useState<GithubFeed | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: GithubFeed) => setFeed(data))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });

    return () => controller.abort();
  }, []);

  const loading = !feed && !failed;
  const live = feed?.source === "live";

  if (!loading && !live) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div className="gh-panel" style={{ borderStyle: "dashed" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "var(--muted)", margin: 0, lineHeight: 1.7 }}>
          dev-only: GitHub panel hidden.{" "}
          <span style={{ color: "var(--dim)" }}>{feed?.reason ?? "request failed"}</span>
          <br />
          Add <code style={{ color: "var(--acc)" }}>GITHUB_TOKEN</code> to <code style={{ color: "var(--acc)" }}>.env.local</code>.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="gh-panel gh-skeleton" aria-hidden="true" />;
  }

  const cal = feed?.calendar;
  const profile = feed?.profile;

  // One label per month, placed on the week where that month first appears.
  const monthMarks: { index: number; label: string }[] = [];
  let lastMonth = "";
  (cal?.weeks ?? []).forEach((week, i) => {
    const first = week[0];
    if (!first) return;
    const label = monthLabel(first.date);
    if (label !== lastMonth) {
      monthMarks.push({ index: i, label });
      lastMonth = label;
    }
  });

  return (
    <div className="gh-panel">
      <div className="gh-head">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
          {profile?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatarUrl} alt="" className="gh-avatar" />
          ) : null}
          <div style={{ minWidth: 0 }}>
            <a href={profile?.url ?? "#"} target="_blank" rel="noreferrer" className="gh-login">
              <BrandLogo src="/github.svg" size={15} alt="GitHub" />
              @{profile?.login}
            </a>
            <div className="gh-stats">
              {profile?.publicRepos} repos · {profile?.followers} followers
              {feed?.stale ? " · cached" : ""}
            </div>
          </div>
        </div>
        <div className="gh-total">
          <strong>{cal?.total.toLocaleString() ?? 0}</strong> contributions this year
        </div>
      </div>

      {/* Contribution calendar */}
      {!!cal?.weeks.length && (
        <div className="gh-cal-wrap">
          <div className="gh-months" style={{ gridTemplateColumns: `repeat(${cal.weeks.length}, 13px)` }}>
            {cal.weeks.map((_, i) => {
              const mark = monthMarks.find((m) => m.index === i);
              // Skip a label that would collide with the previous one.
              const tooClose = mark && monthMarks.some((m) => m.label !== mark.label && i - m.index > 0 && i - m.index < 3);
              return (
                <span key={i} className="gh-month">
                  {mark && !tooClose ? mark.label : ""}
                </span>
              );
            })}
          </div>

          <div className="gh-cal" style={{ gridTemplateColumns: `repeat(${cal.weeks.length}, 13px)` }}>
            {cal.weeks.map((week, wi) => (
              <div key={wi} className="gh-week">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day: ContributionDay | undefined = week[di];
                  if (!day) return <span key={di} className="gh-day gh-day-empty" />;
                  return (
                    <span
                      key={day.date}
                      className="gh-day"
                      data-level={day.level}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className="gh-legend">
            <span>{cal.commits} commits · {cal.pullRequests} PRs · {cal.issues} issues</span>
            <span className="gh-scale">
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <i key={l} className="gh-day" data-level={l} />
              ))}
              More
            </span>
          </div>
        </div>
      )}

      {/* Language distribution */}
      {!!feed?.languages.length && (
        <div className="gh-block">
          <h4 className="gh-subhead">Languages by volume</h4>
          <div className="gh-langbar">
            {feed.languages.map((lang) => (
              <span
                key={lang.name}
                style={{ width: `${lang.percent}%`, background: lang.color ?? "var(--acc)" }}
                title={`${lang.name} ${lang.percent.toFixed(1)}%`}
              />
            ))}
          </div>
          <div className="gh-langkeys">
            {feed.languages.map((lang) => (
              <span key={lang.name} className="gh-langkey">
                <i style={{ background: lang.color ?? "var(--acc)" }} />
                {lang.name}
                <em>{lang.percent.toFixed(1)}%</em>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pinned repositories */}
      {!!feed?.pinned.length && (
        <div className="gh-block">
          <h4 className="gh-subhead">Pinned repositories</h4>
          <div className="gh-repos">
            {feed.pinned.map((repo) => (
              <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer" className="gh-repo">
                <div className="gh-repo-name">{repo.name}</div>
                {repo.description && <p className="gh-repo-desc">{repo.description}</p>}
                <div className="gh-repo-meta">
                  {repo.language && (
                    <span className="gh-repo-lang">
                      <i style={{ background: repo.languageColor ?? "var(--acc)" }} />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && <span>★ {repo.stars}</span>}
                  {repo.forks > 0 && <span>⑂ {repo.forks}</span>}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Recent public activity */}
      {!!feed?.activity.length && (
        <div className="gh-block">
          <h4 className="gh-subhead">Recent activity</h4>
          <div className="gh-activity">
            {feed.activity.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="gh-event">
                <span className="gh-event-text">
                  {item.text} <strong>{item.repo}</strong>
                </span>
                <span className="gh-event-at">{relativeTime(item.at)}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
