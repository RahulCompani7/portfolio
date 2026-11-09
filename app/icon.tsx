import { ImageResponse } from "next/og";

/**
 * Browser tab icon, generated at build time so there's no binary to maintain.
 *
 * Deliberately the same mark as the nav logo — a green rounded square with an
 * R — so the tab, the header and any bookmark all read as the same thing.
 * The colour is fixed rather than themed, since the browser chrome has no
 * idea which theme the page is using.
 */

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#35d07f",
          color: "#04120a",
          fontSize: 40,
          fontWeight: 800,
          borderRadius: 14,
          letterSpacing: "-0.04em",
        }}
      >
        R
      </div>
    ),
    { ...size }
  );
}
