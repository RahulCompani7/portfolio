"use client";

import { useCallback, useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import {
  formatPostDate,
  profileUrlFor,
  snapshotHandle,
  type InstagramFeed,
  type InstagramPost,
} from "@/lib/instagram";

/** How many frames show before the viewer asks for the rest. */
const PREVIEW_COUNT = 6;

/** Instagram's primary brand pink, used sparingly as this section's accent. */
const INSTAGRAM_PINK = "#E1306C";

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "11.5px",
  fontWeight: 600,
  letterSpacing: "0.16em",
  color: "var(--acc)",
  textTransform: "uppercase",
  marginBottom: "16px",
};

/**
 * A camera aperture, drawn from scratch — deliberately not Instagram's mark,
 * which is a trademarked logo. Reads as "photography" and will not look dated
 * when Instagram next rebrands.
 */
function ApertureIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: "none" }}>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2.75 L17.5 12 M17.5 12 L12 21.25 M12 21.25 L6.5 12 M6.5 12 L12 2.75"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="12" cy="12" r="3.1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------ lightbox --- */

function Lightbox({
  posts,
  index,
  onClose,
  onNavigate,
}: {
  posts: InstagramPost[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const post = posts[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % posts.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + posts.length) % posts.length);
    };
    window.addEventListener("keydown", onKey);

    // Stop the page scrolling behind the overlay.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, posts.length, onClose, onNavigate]);

  if (!post) return null;

  return (
    <div
      className="lb-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={post.title ?? "Photograph"}
      onClick={onClose}
    >
      <button className="lb-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {posts.length > 1 && (
        <>
          <button
            className="lb-nav lb-prev"
            aria-label="Previous photograph"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + posts.length) % posts.length);
            }}
          >
            ‹
          </button>
          <button
            className="lb-nav lb-next"
            aria-label="Next photograph"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % posts.length);
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Stop clicks on the photo itself from dismissing the overlay. */}
      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.src} alt={post.title ?? "Photograph"} className="lb-img" />
        <figcaption className="lb-caption">
          <div style={{ minWidth: 0 }}>
            {post.title && <div className="lb-title">{post.title}</div>}
            <div className="lb-meta">
              {formatPostDate(post.timestamp)} · {index + 1} of {posts.length}
            </div>
          </div>
          <a href={post.permalink} target="_blank" rel="noreferrer" className="lb-link">
            View on Instagram →
          </a>
        </figcaption>
      </figure>
    </div>
  );
}

/* --------------------------------------------------------------- main ---- */

export default function Photography() {
  const [feed, setFeed] = useState<InstagramFeed | null>(null);
  const [failed, setFailed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/instagram", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: InstagramFeed) => setFeed(data))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });

    return () => controller.abort();
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navigate = useCallback((next: number) => setLightboxIndex(next), []);

  const posts = feed?.posts ?? [];
  const loading = !feed && !failed;
  const handle = feed?.handle ?? snapshotHandle;
  const visible = showAll ? posts : posts.slice(0, PREVIEW_COUNT);
  const hidden = posts.length - visible.length;

  // Nothing to show and nothing coming: stay out of the page entirely.
  if (!loading && posts.length === 0) {
    if (process.env.NODE_ENV !== "development") return null;

    return (
      <section id="photography" style={{ maxWidth: "1220px", margin: "0 auto", padding: "20px 24px 130px", position: "relative", zIndex: 1 }}>
        <div className="rv" style={{ marginBottom: "32px" }}>
          <div style={eyebrowStyle}>06 — Through the lens</div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", margin: 0, color: "var(--head)" }}>
            Photography
          </h2>
        </div>
        <div style={{ border: "1px dashed var(--line2)", borderRadius: "22px", padding: "46px", textAlign: "center", background: "var(--soft)" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12.5px", color: "var(--muted)", margin: "0 0 10px", letterSpacing: "0.04em" }}>
            dev-only placeholder
          </p>
          <p style={{ fontSize: "15px", color: "var(--muted)", margin: 0, lineHeight: 1.7 }}>
            No posts came back. Check <code style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--acc)" }}>IG_ACCESS_TOKEN</code> and{" "}
            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--acc)" }}>IG_USER_ID</code> in{" "}
            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--acc)" }}>.env.local</code>.
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

  return (
    <section
      id="photography"
      style={{ maxWidth: "1220px", margin: "0 auto", padding: "20px 24px 130px", position: "relative", zIndex: 1, ...({ "--brand": INSTAGRAM_PINK } as React.CSSProperties) }}
    >
      <div className="rv" style={{ marginBottom: "30px" }}>
        <div style={eyebrowStyle}>06 — Through the lens</div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", margin: "0 0 18px", color: "var(--head)" }}>
          Photography
        </h2>
        <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--muted)", margin: 0, maxWidth: "540px" }}>
          When I&apos;m not shipping software I&apos;m usually behind a camera. Straight from
          Instagram — the newest frames land here on their own.
        </p>
      </div>

      {/* Account strip */}
      <div className="rv photo-account">
        <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
          {feed?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={feed.avatarUrl} alt={handle ? `@${handle}` : "Profile"} className="photo-avatar" />
          ) : (
            <div className="photo-avatar photo-avatar-fallback" aria-hidden="true">
              <ApertureIcon size={20} />
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "17px", fontWeight: 800, color: "var(--head)", letterSpacing: "-0.02em" }}>
              {handle ? `@${handle}` : "Photography"}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "var(--dim)", marginTop: "3px", letterSpacing: "0.06em" }}>
              {feed?.mediaCount ? `${feed.mediaCount} posts` : `${posts.length} frames`}
              {feed?.source === "fallback" ? " · cached" : ""}
            </div>
          </div>
        </div>

        <a href={profileUrlFor(handle)} target="_blank" rel="noreferrer" className="photo-follow">
          <BrandLogo src="/instagram.svg" size={18} alt="Instagram" />
          Follow on Instagram
        </a>
      </div>

      {/* Masonry: every frame at its own aspect ratio, nothing cropped. */}
      <div className="photo-masonry">
        {loading
          ? Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
              <div key={`sk-${i}`} className="photo-item photo-skeleton" style={{ height: i % 3 === 0 ? 320 : i % 3 === 1 ? 240 : 400 }} aria-hidden="true" />
            ))
          : visible.map((post, i) => (
              <button
                key={post.id}
                className="photo-item photo-button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`${post.title ?? "Photograph"} — open larger`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.src} alt={post.title ?? `Photograph ${i + 1}`} loading={i < 3 ? "eager" : "lazy"} className="photo-img" />
                <span className="photo-hover">
                  <span className="photo-hover-date">{formatPostDate(post.timestamp)}</span>
                  {post.mediaType === "CAROUSEL_ALBUM" && <span className="photo-badge">Series</span>}
                </span>
              </button>
            ))}
      </div>

      {!loading && hidden > 0 && (
        <div className="rv" style={{ marginTop: "34px", display: "flex", justifyContent: "center" }}>
          <button onClick={() => setShowAll(true)} className="btn photo-more">
            Show all {posts.length} photographs
          </button>
        </div>
      )}

      {!loading && showAll && posts.length > PREVIEW_COUNT && (
        <div className="rv" style={{ marginTop: "34px", display: "flex", justifyContent: "center" }}>
          <button onClick={() => setShowAll(false)} className="btn photo-more">
            Show fewer
          </button>
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox posts={visible} index={lightboxIndex} onClose={closeLightbox} onNavigate={navigate} />
      )}
    </section>
  );
}
