"use client";

import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import {
  formatDuration,
  formatPlayedAt,
  type SpotifyFeed,
  type SpotifyTrack,
} from "@/lib/spotify";

/** Spotify brand green. Used as this section's accent, per their guidelines. */
const SPOTIFY_GREEN = "#1ED760";

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "11.5px",
  fontWeight: 600,
  letterSpacing: "0.16em",
  color: "var(--acc)",
  textTransform: "uppercase",
  marginBottom: "16px",
};

/** Three bars that animate only while something is actually playing. */
function Equaliser({ playing }: { playing: boolean }) {
  return (
    <span className={`eq${playing ? " eq-on" : ""}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function TrackRow({ track, index }: { track: SpotifyTrack; index?: number }) {
  return (
    <a href={track.url} target="_blank" rel="noreferrer" className="mu-row">
      {typeof index === "number" && <span className="mu-rank">{String(index + 1).padStart(2, "0")}</span>}
      {track.albumArt ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={track.albumArt} alt="" className="mu-row-art" loading="lazy" />
      ) : (
        <span className="mu-row-art mu-row-art-empty" aria-hidden="true" />
      )}
      <span className="mu-row-text">
        <span className="mu-row-title">{track.title}</span>
        <span className="mu-row-sub">{track.artists}</span>
      </span>
      <span className="mu-row-meta">
        {track.playedAt ? formatPlayedAt(track.playedAt) : formatDuration(track.durationMs)}
      </span>
    </a>
  );
}

export default function Music() {
  const [feed, setFeed] = useState<SpotifyFeed | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = () =>
      fetch("/api/spotify", { signal: controller.signal })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .then((data: SpotifyFeed) => setFeed(data))
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError") return;
          setFailed(true);
        });

    load();

    // Now playing goes stale fast; poll while the tab is visible.
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") load();
    }, 45_000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  const loading = !feed && !failed;
  const live = feed?.source === "live";
  const hasContent =
    live && Boolean(feed?.nowPlaying || feed?.recent.length || feed?.topArtists.length || feed?.topTracks.length);

  // Credentials missing or token expired: stay out of the page in production.
  if (!loading && !hasContent) {
    if (process.env.NODE_ENV !== "development") return null;

    return (
      <section id="music" style={{ maxWidth: "1220px", margin: "0 auto", padding: "20px 24px 130px", position: "relative", zIndex: 1 }}>
        <div className="rv" style={{ marginBottom: "32px" }}>
          <div style={eyebrowStyle}>07 — On repeat</div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", margin: 0, color: "var(--head)" }}>
            Music
          </h2>
        </div>
        <div style={{ border: "1px dashed var(--line2)", borderRadius: "22px", padding: "46px", textAlign: "center", background: "var(--soft)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12.5px", color: "var(--muted)", margin: "0 0 10px", letterSpacing: "0.04em" }}>
            dev-only placeholder
          </p>
          <p style={{ fontSize: "15px", color: "var(--muted)", margin: 0, lineHeight: 1.7 }}>
            Spotify isn&apos;t connected. Run{" "}
            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--acc)" }}>npm run spotify:auth</code>.
            {feed?.reason ? (
              <>
                <br />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "var(--dim)" }}>{feed.reason}</span>
              </>
            ) : null}
            <br />
            This block never renders in production.
          </p>
        </div>
      </section>
    );
  }

  const now = feed?.nowPlaying ?? null;
  const headline = now ?? feed?.recent[0] ?? null;
  const isPlaying = Boolean(now?.isPlaying);

  // The album-art colour rides in as a CSS variable so styling stays in CSS.
  // Falls back to the site accent whenever nothing is playing.
  // Spotify green is the resting accent for this section; the album-art colour
  // overrides it whenever something is actually playing.
  const brandVars = { "--brand": SPOTIFY_GREEN } as React.CSSProperties;
  const artVars = feed?.artColour
    ? ({ ...brandVars, "--art": feed.artColour.safe, "--artRaw": feed.artColour.raw } as React.CSSProperties)
    : brandVars;

  const peakGenre = feed?.genres?.[0]?.count ?? 1;
  const peakDecade = feed?.decades?.length
    ? Math.max(...feed.decades.map((d) => d.count))
    : 1;

  return (
    <section
      id="music"
      style={{ maxWidth: "1220px", margin: "0 auto", padding: "20px 24px 130px", position: "relative", zIndex: 1, ...artVars }}
    >
      <div className="rv" style={{ marginBottom: "30px" }}>
        <div style={eyebrowStyle}>07 — On repeat</div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", margin: "0 0 18px", color: "var(--head)" }}>
          What I&apos;m listening to
        </h2>
        <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--muted)", margin: 0, maxWidth: "540px" }}>
          Pulled live from Spotify. Mostly whatever got me through the last deploy.
        </p>
      </div>

      {/* Now playing — falls back to the last track when nothing is on. */}
      <div className={`rv mu-now${feed?.artColour ? " mu-now-tinted" : ""}`}>
        {loading ? (
          <div className="mu-now-skeleton" aria-hidden="true" />
        ) : headline ? (
          <>
            {headline.albumArt ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={headline.albumArt} alt={headline.album ?? ""} className="mu-now-art" />
            ) : (
              <div className="mu-now-art mu-row-art-empty" aria-hidden="true" />
            )}

            <div className="mu-now-body">
              <div className="mu-now-label">
                <Equaliser playing={isPlaying} />
                {isPlaying ? "Playing now" : "Last played"}
                <span className="mu-source">
                  <BrandLogo src="/spotify.svg" size={13} alt="" />
                  on Spotify
                </span>
              </div>

              <a href={headline.url} target="_blank" rel="noreferrer" className="mu-now-title">
                {headline.title}
              </a>

              <div className="mu-now-artist">{headline.artists}</div>

              {headline.album && <div className="mu-now-album">{headline.album}</div>}

              {isPlaying && headline.progressMs != null && headline.durationMs ? (
                <div className="mu-progress" aria-hidden="true">
                  <div
                    className="mu-progress-bar"
                    style={{ width: `${Math.min(100, (headline.progressMs / headline.durationMs) * 100)}%` }}
                  />
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      {/* Genre fingerprint — aggregated across the top-artist sample. */}
      {!!feed?.genres.length && (
        <div className="rv" style={{ marginTop: "44px" }}>
          <h3 className="mu-subhead">This month sounds like</h3>
          <div className="mu-genres">
            {feed.genres.map((genre) => (
              <span
                key={genre.name}
                className="mu-genre"
                style={{ opacity: 0.45 + 0.55 * (genre.count / peakGenre) }}
                title={`${genre.count} of your top artists`}
              >
                {genre.name}
                <i className="mu-genre-bar" style={{ width: `${(genre.count / peakGenre) * 100}%` }} />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Decade spread */}
      {feed?.decades && feed.decades.length > 1 && feed.yearRange && (
        <div className="rv" style={{ marginTop: "44px" }}>
          <h3 className="mu-subhead">
            Released {feed.yearRange.min}–{feed.yearRange.max}
          </h3>
          <div className="mu-decades">
            {feed.decades.map((bucket) => (
              <div key={bucket.decade} className="mu-decade">
                <div className="mu-decade-track">
                  <div
                    className="mu-decade-fill"
                    style={{ height: `${Math.max(6, (bucket.count / peakDecade) * 100)}%` }}
                  />
                </div>
                <span className="mu-decade-label">{`'${String(bucket.decade).slice(2)}`}</span>
                <span className="mu-decade-count">{bucket.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top artists */}
      {!!feed?.topArtists.length && (
        <div className="rv" style={{ marginTop: "44px" }}>
          <h3 className="mu-subhead">Top artists · last month</h3>
          <div className="mu-artists">
            {feed.topArtists.map((artist) => (
              <a key={artist.id} href={artist.url} target="_blank" rel="noreferrer" className="mu-artist">
                {artist.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={artist.imageUrl} alt="" className="mu-artist-img" loading="lazy" />
                ) : (
                  <span className="mu-artist-img mu-row-art-empty" aria-hidden="true" />
                )}
                <span className="mu-artist-name">{artist.name}</span>
                {artist.genres[0] && <span className="mu-artist-genre">{artist.genres[0]}</span>}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Two columns: top tracks and recent */}
      <div className="rv mu-columns">
        {!!feed?.topTracks.length && (
          <div>
            <h3 className="mu-subhead">Top tracks · last month</h3>
            <div className="mu-list">
              {feed.topTracks.map((track, i) => (
                <TrackRow key={track.id} track={track} index={i} />
              ))}
            </div>
          </div>
        )}

        {!!feed?.recent.length && (
          <div>
            <h3 className="mu-subhead">Recently played</h3>
            <div className="mu-list">
              {feed.recent.slice(0, 5).map((track) => (
                <TrackRow key={`${track.id}-${track.playedAt ?? ""}`} track={track} />
              ))}
            </div>
          </div>
        )}
      </div>

      {feed?.profile?.url && (
        <div className="rv" style={{ marginTop: "34px", display: "flex", justifyContent: "center" }}>
          <a href={feed.profile.url} target="_blank" rel="noreferrer" className="btn mu-spotify-link">
            <BrandLogo src="/spotify.svg" size={18} alt="Spotify" />
            {feed.profile.name ? `${feed.profile.name} on Spotify` : "Open in Spotify"} →
          </a>
        </div>
      )}
    </section>
  );
}
