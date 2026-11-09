import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Set NEXT_PUBLIC_SITE_URL in Vercel to the live domain. Without a
 * metadataBase, Next can't turn relative OG image paths into absolute URLs
 * and link previews break.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://rahulcompani.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rahul Compani — Full-Stack Developer & Photographer",
  description:
    "Full-stack developer shipping scalable SaaS platforms, serverless cloud systems, and modern web applications. Senior Consultant at EY.",
  openGraph: {
    title: "Rahul Compani",
    description: "Senior Consultant & Full-Stack Developer. Photographer at @aurah.lens.",
    url: siteUrl,
    siteName: "Rahul Compani",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Compani",
    description: "Senior Consultant & Full-Stack Developer. Photographer at @aurah.lens.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          Applies a previously saved theme before first paint so returning
          visitors don't get a flash of the wrong palette. Light is the default.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("rc_theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light")}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
