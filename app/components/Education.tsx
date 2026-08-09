"use client";

import { portfolioData } from "@/lib/data";
import LogoTile from "./LogoTile";

export default function Education() {
  return (
    <section id="education" style={{ maxWidth: "1220px", margin: "0 auto", padding: "20px 24px 130px", position: "relative", zIndex: 1 }}>
      <div className="rv" style={{ marginBottom: "50px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.16em", color: "var(--acc)", textTransform: "uppercase", marginBottom: "16px" }}>
          05 — Background
        </div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", margin: 0, color: "var(--head)" }}>
          Education & recognition
        </h2>
      </div>
      <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px", marginBottom: "60px" }}>
        {portfolioData.education.map((ed, i) => (
          <div key={i} className="rvc card" data-tilt="1" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "20px", padding: "26px" }}>
            <div style={{ marginBottom: "18px" }}>
              <LogoTile src={ed.logoImg} alt={ed.school} bg={"var(--soft)"} size={54} />
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--acc)", marginBottom: "9px" }}>
              {ed.period}
            </div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "17px", fontWeight: 800, margin: "0 0 7px", color: "var(--head)", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              {ed.degree}
            </h3>
            <div style={{ fontSize: "13.5px", color: "var(--muted)", marginBottom: "12px", lineHeight: 1.5 }}>
              {ed.school}
            </div>
            <div style={{ fontSize: "12.5px", color: "var(--dim)" }}>
              {ed.detail}
            </div>
          </div>
        ))}
      </div>

      <div className="rv two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
        <div className="card" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "20px", padding: "28px" }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "17px", fontWeight: 800, color: "var(--head)", marginBottom: "18px" }}>
            Awards
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {portfolioData.awards.map((a, i) => (
              <div key={i} style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.55, paddingLeft: "15px", borderLeft: "1.5px solid var(--acc)" }}>
                {a}
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "20px", padding: "28px" }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "17px", fontWeight: 800, color: "var(--head)", marginBottom: "18px" }}>
            Certifications
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
            {portfolioData.certs.map((c, i) => (
              <span key={i} className="chip" style={{ fontSize: "13px", padding: "8px 14px", borderRadius: "9px", border: "1px solid var(--line)", color: "var(--text)", background: "var(--soft)" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}