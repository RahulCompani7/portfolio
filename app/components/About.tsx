"use client";

import { portfolioData } from "@/lib/data";

export default function About() {
  return (
    <section id="about" style={{ maxWidth: "1220px", margin: "0 auto", padding: "120px 24px", position: "relative", zIndex: 1 }}>
      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "60px", alignItems: "start" }}>
        <div className="rv">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.16em", color: "var(--acc)", textTransform: "uppercase", marginBottom: "16px" }}>
            01 — About
          </div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05, margin: "0 0 24px", color: "var(--head)" }}>
            Ideas into production-ready software.
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.85, color: "var(--muted)", margin: "0 0 16px" }}>
            I&apos;ve spent 3+ years building end-to-end SaaS platforms, REST APIs and cloud-native backend systems for B2B startups — across Node.js, Express, React, Next.js and MongoDB, with serverless architectures on AWS Lambda, Docker deployments and multi-cloud AWS/GCP environments.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.85, color: "var(--muted)", margin: 0 }}>
            I like owning a feature from database schema and API design all the way to a UI that actually feels good to use. Today I apply that across enterprise cloud engineering engagements at EY.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {portfolioData.stats.map((st, i) => (
            <div key={i} className="rvc card" data-tilt="1" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "18px", padding: "26px" }}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "42px", fontWeight: 800, color: "var(--head)", letterSpacing: "-0.03em" }}>
                {st.shown}
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "6px", lineHeight: 1.4 }}>
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}