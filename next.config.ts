import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Live photography frames are served straight from Instagram's CDN. They're
    // rendered with `unoptimized` because the signed URLs rotate, which would
    // otherwise churn the image optimizer cache on every revalidation. These
    // patterns are here so the images still work if that flag is ever removed.
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
