"use client";

import { portfolioData } from "@/lib/data";
import { skillIconSrc } from "@/lib/icons";
import LogoTile from "./LogoTile";
import GithubPanel from "./GithubPanel";

export default function Skills() {
  return (
    <section id="skills" style={{ maxWidth: "1220px", margin: "0 auto", padding: "20px 24px 130px", position: "relative", zIndex: 1 }}>
      <div className="rv" style={{ marginBottom: "50px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.16em", color: "var(--acc)", textTransform: "uppercase", marginBottom: "16px" }}>
          04 — Toolbox
        </div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", margin: 0, color: "var(--head)" }}>
          The stack I reach for
        </h2>
      </div>
      <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "18px" }}>
        {portfolioData.skillGroups.map((g, i) => (
          <div key={i} className="rvc card" data-tilt="1" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "20px", padding: "26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--dim)" }}>
                {g.num}
              </span>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "16px", color: "var(--head)", letterSpacing: "-0.02em" }}>
                {g.label}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {g.items.map((it, j) => {
                const iconSrc = skillIconSrc(it);
                return (
                  <span
                    key={j}
                    className="chip"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: iconSrc ? "7px" : 0,
                      fontSize: "13px",
                      padding: iconSrc ? "6px 13px 6px 8px" : "7px 13px",
                      borderRadius: "9px",
                      background: "var(--soft)",
                      color: "var(--text)",
                      border: "1px solid var(--line)",
                    }}
                  >
                    {iconSrc && <LogoTile src={iconSrc} alt={it} size={16} bare />}
                    {it}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Measured counterpart to the chips above: real language volumes,
          commit cadence and repositories, pulled live from GitHub. */}
      <div className="rv" style={{ marginTop: "34px" }}>
        <GithubPanel />
      </div>
    </section>
  );
}