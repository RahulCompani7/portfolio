"use client";

import { useState } from "react";

/**
 * Renders an official brand logo dropped into /public.
 *
 * Brand marks aren't drawn by hand here — Spotify's design guidelines require
 * their real logo for attribution and explicitly prohibit lookalikes, and
 * Meta's terms are similar. So this points at a file you supply:
 *
 *   public/spotify.svg    from developer.spotify.com/documentation/design
 *   public/instagram.svg  from about.meta.com/brand/resources/instagram
 *
 * Until the file exists the component renders nothing and the surrounding
 * label carries the meaning on its own. Drop the file in and it appears —
 * no code change needed.
 */
export default function BrandLogo({
  src,
  size = 17,
  alt = "",
}: {
  src: string;
  size?: number;
  alt?: string;
}) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setMissing(true)}
      style={{ display: "block", flex: "none", objectFit: "contain" }}
    />
  );
}
