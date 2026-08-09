"use client";

import { useState } from "react";

export default function LogoTile({
  src,
  alt,
  size = 56,
  bg = "var(--soft)",
  text,
  bare = false,
}: {
  src?: string | null;
  alt?: string;
  size?: number;
  bg?: string;
  text?: string;
  bare?: boolean;
}) {
  const [err, setErr] = useState(false);

  const initials = (text || alt || "").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  const hasSrc = !!src && !err;
  let imgSrc = src || "";
  if (imgSrc.startsWith("url(")) {
    imgSrc = imgSrc.replace(/^url\(['"]?/, "").replace(/['"]?\)$/, "");
  }

  return (
    <div
      role={alt ? "img" : undefined}
      aria-label={alt}
      style={{
        width: size,
        height: size,
        borderRadius: bare ? Math.round(size * 0.2) : Math.round(size * 0.25),
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        background: bare ? "transparent" : bg || "var(--panel)",
        border: bare ? "none" : "1px solid var(--line)",
        flex: "none",
      }}
    >
      {hasSrc ? (
        // image
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={() => setErr(true)}
        />
      ) : (
        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: "var(--head)", fontSize: Math.max(12, Math.round(size * 0.36)) }}>
          {initials}
        </div>
      )}
    </div>
  );
}
