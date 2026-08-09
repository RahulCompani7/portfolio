"use client";

import Image from "next/image";
import { portfolioData } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" style={{ maxWidth: "1220px", margin: "0 auto", padding: "20px 24px 130px", position: "relative", zIndex: 1 }}>
      <div className="rv" style={{ marginBottom: "56px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.16em", color: "var(--acc)", textTransform: "uppercase", marginBottom: "16px" }}>
          03 — Selected work
        </div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", margin: 0, color: "var(--head)" }}>
          Things I built end to end
        </h2>
      </div>
      <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {portfolioData.projects.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            className="rvc card"
            data-tilt="1"
            style={{
              display: "block",
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "22px",
              overflow: "hidden",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div style={{ height: "230px", background: "var(--panel2)", position: "relative", overflow: "hidden", borderBottom: "1px solid var(--line)" }}>
              {p.shot && (
                <Image
                  src={p.shot}
                  alt={`${p.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              )}
            </div>
            <div style={{ padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "23px", fontWeight: 800, margin: 0, color: "var(--head)", letterSpacing: "-0.025em" }}>
                  {p.title}
                </h3>
                <span style={{ fontSize: "17px", color: "var(--acc)" }}>↗</span>
              </div>
              <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "var(--muted)", margin: "0 0 20px" }}>
                {p.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {p.tech.map((t, j) => (
                  <span key={j} className="chip" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", padding: "5px 11px", borderRadius: "7px", background: "var(--accBg)", color: "var(--acc)", border: "1px solid transparent" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}