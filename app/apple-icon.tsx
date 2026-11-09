import { ImageResponse } from "next/og";

/** Home-screen icon for iOS. Same mark, larger, no rounding — iOS masks it. */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 112,
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        R
      </div>
    ),
    { ...size }
  );
}
