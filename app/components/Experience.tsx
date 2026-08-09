"use client";

import { portfolioData } from "@/lib/data";
import LogoTile from "./LogoTile";

export default function Experience() {
  return (
    <section id="experience" style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 130px", position: "relative", zIndex: 1 }}>
      <div className="rv" style={{ marginBottom: "60px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.16em", color: "var(--acc)", textTransform: "uppercase", marginBottom: "16px" }}>
          02 — Experience
        </div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", margin: 0, color: "var(--head)" }}>
          Where I&apos;ve shipped
        </h2>
      </div>

      <div style={{ position: "relative", paddingLeft: "38px" }}>
        <div className="growline" style={{ position: "absolute", left: "6px", top: "6px", bottom: "60px", width: "1.5px", background: "linear-gradient(#ffe600, var(--acc), var(--line))" }} />
        {portfolioData.experience.map((job, i) => (
          <div key={i} className="rvc" style={{ position: "relative", paddingBottom: "32px" }}>
            <div
              style={{
                position: "absolute",
                left: "-38px",
                top: "28px",
                width: "13px",
                height: "13px",
                borderRadius: "50%",
                background: job.dot,
                boxShadow: `0 0 0 5px var(--bg), 0 0 18px ${job.dot}`,
              }}
            />
            <div className="card" data-tilt="1" style={{ background: "var(--panel)", border: `1px solid ${job.border}`, borderRadius: "22px", padding: "30px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", background: job.dot, opacity: job.barOpacity }} />
              <div style={{ display: "flex", gap: "18px", alignItems: "flex-start", position: "relative", flexWrap: "wrap" }}>
                <div style={{ flex: "none" }}>
                  {/* Logo with fallback */}
                  <LogoTile src={job.logoImg} alt={job.company} bg={job.logoBg} size={56} />
                </div>
                <div style={{ flex: 1, minWidth: "230px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "5px" }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "21px", fontWeight: 800, margin: 0, color: "var(--head)", letterSpacing: "-0.02em" }}>
                      {job.title}
                    </h3>
                    {job.featured && (
                      <span style={{ fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "#ffe600", color: "#0a0b0e", padding: "4px 10px", borderRadius: "6px" }}>
                        Current
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>
                    {job.company}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "var(--dim)" }}>
                    {job.period} · {job.location}
                  </div>
                </div>
              </div>
              <ul style={{ margin: "20px 0 18px", paddingLeft: "19px", color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.8, position: "relative" }}>
                {job.bullets.map((b, j) => (
                  <li key={j} style={{ marginBottom: "5px" }}>
                    {b}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", position: "relative" }}>
                {job.stack.map((s, j) => (
                  <span key={j} className="chip" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", padding: "5px 11px", borderRadius: "7px", border: "1px solid var(--line)", color: "var(--muted)", background: "var(--soft)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}