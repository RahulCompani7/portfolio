"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { contactInfo, portfolioData } from "@/lib/data";
import BrandLogo from "./BrandLogo";

export default function Hero() {
  const [roleWord, setRoleWord] = useState(portfolioData.roles[0]);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioData.roles.length);
      setRoleWord(portfolioData.roles[(roleIndex + 1) % portfolioData.roles.length]);
    }, 3000);
    return () => clearInterval(interval);
  }, [roleIndex]);

  return (
    <section id="home" style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: "130px 24px 70px", position: "relative", zIndex: 1 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black, transparent)",
        }}
      />

      <div className="hero-grid" style={{ maxWidth: "1220px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.35fr .65fr", gap: "56px", alignItems: "center", position: "relative", zIndex: 2 }}>
        <div>
          <div
            data-parallax="8"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "7px 15px",
              border: "1px solid var(--line2)",
              borderRadius: "999px",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--acc)",
              marginBottom: "26px",
              background: "var(--soft)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--acc)",
                animation: "pulseDot 1.8s ease-in-out infinite",
              }}
            />
            Senior Consultant at EY · Open to select work
          </div>

          <h1
            data-parallax="14"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(46px, 8.2vw, 112px)",
              lineHeight: 0.92,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              margin: "0 0 22px",
              color: "var(--head)",
            }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
              <span style={{ display: "inline-block", animation: "wordUp .9s cubic-bezier(.2,.8,.2,1) both" }}>
                Rahul
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
              <span style={{ display: "inline-block", animation: "wordUp .9s .12s cubic-bezier(.2,.8,.2,1) both", color: "var(--muted)" }}>
                Compani
              </span>
            </span>
          </h1>

          <div
            data-parallax="10"
            style={{
              fontSize: "clamp(17px, 2.1vw, 24px)",
              color: "var(--text)",
              fontWeight: 600,
              marginBottom: "22px",
              minHeight: "34px",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            I build <span style={{ color: "var(--acc)" }}>{roleWord}</span>
            <span style={{ color: "var(--acc)", animation: "pulseDot 1s steps(1) infinite" }}>_</span>
          </div>

          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--muted)", maxWidth: "540px", margin: "0 0 34px" }}>
            Full-stack developer with 3+ years shipping end-to-end SaaS platforms, REST APIs and cloud-native backends. Node.js, React/Next.js and serverless AWS — now advising enterprise clients on cloud modernization at EY.
          </p>

          <div style={{ display: "flex", gap: "13px", flexWrap: "wrap", marginBottom: "38px" }}>
            <a href="#projects" className="btn" style={{ background: "var(--acc)", color: "#04120a", padding: "15px 30px", borderRadius: "12px", fontWeight: 700, fontSize: "15px" }}>
              View selected work
            </a>
            <a href="#terminal" className="btn" style={{ border: "1px solid var(--line2)", padding: "15px 30px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", color: "var(--text)", background: "var(--soft)" }}>
              Interview me →
            </a>
          </div>

          <div style={{ display: "flex", gap: "11px" }}>
            <a href="https://github.com/RahulCompani7" target="_blank" title="GitHub" className="soc" style={{ width: "44px", height: "44px", borderRadius: "12px", border: "1px solid var(--line2)", display: "grid", placeItems: "center", color: "var(--text)", background: "var(--soft)" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/rahul-compani" target="_blank" title="LinkedIn" className="soc" style={{ width: "44px", height: "44px", borderRadius: "12px", border: "1px solid var(--line2)", display: "grid", placeItems: "center", color: "var(--text)", background: "var(--soft)" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href={contactInfo.instagram} target="_blank" rel="noreferrer" title="Instagram — @aurah.lens" className="soc" style={{ width: "44px", height: "44px", borderRadius: "12px", border: "1px solid var(--line2)", display: "grid", placeItems: "center", color: "var(--text)", background: "var(--soft)" }}>
              <BrandLogo src="/instagram.svg" size={19} alt="Instagram" fallback={<span className="soc-text">IG</span>} />
            </a>
            {contactInfo.spotify && (
              <a href={contactInfo.spotify} target="_blank" rel="noreferrer" title="Spotify" className="soc" style={{ width: "44px", height: "44px", borderRadius: "12px", border: "1px solid var(--line2)", display: "grid", placeItems: "center", color: "var(--text)", background: "var(--soft)" }}>
                <BrandLogo src="/spotify.svg" size={19} alt="Spotify" fallback={<span className="soc-text">SP</span>} />
              </a>
            )}
            <a href="mailto:rahulcompani7@gmail.com" title="Email" className="soc" style={{ width: "44px", height: "44px", borderRadius: "12px", border: "1px solid var(--line2)", display: "grid", placeItems: "center", color: "var(--text)", background: "var(--soft)" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.9.732-1.636 1.636-1.636h.82L12 10.9l9.544-7.08h.82c.904 0 1.636.732 1.636 1.636Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-photo" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "22px" }}>
          <div data-tilt="1" style={{ position: "relative", width: "268px", height: "268px", flex: "none" }}>
            <div style={{ position: "absolute", inset: "-2px", borderRadius: "30px", background: "conic-gradient(from var(--ang, 0deg), var(--acc), transparent 30%, var(--acc2) 55%, transparent 80%, var(--acc))", animation: "hue 9s linear infinite" }} />
            <div style={{ position: "absolute", inset: "4px", borderRadius: "27px", overflow: "hidden", border: "2px solid var(--bg)" }}>
              <Image
                src="/profile.jpeg"
                alt="Rahul Compani"
                fill
                sizes="268px"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ position: "absolute", bottom: "-13px", left: "50%", transform: "translateX(-50%)", background: "var(--bg)", border: "1px solid var(--line2)", padding: "7px 15px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: "var(--acc)", whiteSpace: "nowrap" }}>
              Hyderabad, India
            </div>
          </div>

          <div data-tilt="1" style={{ width: "100%", maxWidth: "296px", background: "var(--panel)", border: "1px solid var(--line2)", borderRadius: "20px", padding: "20px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: "#ffe600" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "13px", position: "relative" }}>
              <div style={{ position: "relative", width: "40px", height: "40px", borderRadius: "10px", background: "#fff", display: "grid", placeItems: "center", flex: "none", overflow: "hidden", border: "1px solid var(--line)" }}>
                <Image src="/ey.png" alt="EY" fill sizes="40px" style={{ objectFit: "contain" }} />
              </div>
              <div>
                <div style={{ fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.14em", color: "var(--dim)", textTransform: "uppercase" }}>
                  Current role
                </div>
                <div style={{ fontSize: "14.5px", fontWeight: 800, color: "var(--head)", lineHeight: 1.25 }}>
                  Senior Consultant
                </div>
              </div>
            </div>
            <div style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.6, position: "relative" }}>
              Ernst & Young LLP — Technology Consulting. Serverless AWS modernization, Python data pipelines and Node.js delivery tooling for enterprise clients.
            </div>
            <div style={{ fontSize: "10.5px", fontFamily: "'JetBrains Mono', monospace", color: "var(--dim)", marginTop: "12px", position: "relative" }}>
              Jun 2026 — Present
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}