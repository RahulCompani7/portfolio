"use client";

import { useState } from "react";
import { portfolioData } from "@/lib/data";

export default function Navigation({ themeIcon, toggleTheme }: { themeIcon: string; toggleTheme: () => void; theme: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        backdropFilter: "blur(20px)",
        background: "color-mix(in oklab, var(--bg) 86%, transparent)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div style={{ maxWidth: "1220px", margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <a href="#home" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "18px", letterSpacing: "-0.03em", color: "var(--head)", display: "flex", alignItems: "center", gap: "9px" }}>
          <span
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "7px",
              background: "var(--acc)",
              color: "#04120a",
              display: "grid",
              placeItems: "center",
              fontSize: "12px",
              animation: "floaty 5s ease-in-out infinite",
            }}
          >
            R
          </span>
          Rahul Compani
        </a>

        <div className="navlinks" style={{ display: "none", gap: "26px", fontSize: "13.5px", fontWeight: 600, color: "var(--muted)" }}>
          <a href="#about" className="navlink" style={{ color: "inherit" }}>
            About
          </a>
          <a href="#experience" className="navlink" style={{ color: "inherit" }}>
            Experience
          </a>
          <a href="#projects" className="navlink" style={{ color: "inherit" }}>
            Work
          </a>
          <a href="#skills" className="navlink" style={{ color: "inherit" }}>
            Skills
          </a>
          <a href="#education" className="navlink" style={{ color: "inherit" }}>
            Education
          </a>
          <a href="#terminal" className="navlink" style={{ color: "inherit" }}>
            Ask me
          </a>
          <a href="#contact" className="navlink" style={{ color: "inherit" }}>
            Contact
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "11px",
              border: "1px solid var(--line2)",
              background: "var(--soft)",
              color: "var(--text)",
              fontSize: "15px",
              fontFamily: "inherit",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
            }}
          >
            {themeIcon}
          </button>
          <a
            href="/Rahul_Compani_Resume.pdf"
            download
            className="btn"
            style={{
              border: "1px solid var(--acc)",
              background: "var(--accBg)",
              color: "var(--acc)",
              padding: "12px 18px",
              borderRadius: "11px",
              fontSize: "13px",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            Résumé
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="menubtn"
            aria-label="Menu"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "11px",
              border: "1px solid var(--line2)",
              background: "var(--soft)",
              display: "grid",
              placeItems: "center",
              gap: "4px",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <span style={{ display: "block", width: "17px", height: "1.5px", background: "var(--text)", borderRadius: "2px", transform: menuOpen ? "rotate(45deg) translateY(5.5px)" : "none", transition: "transform .3s cubic-bezier(.2,.8,.2,1)" }}></span>
            <span style={{ display: "block", width: "17px", height: "1.5px", background: "var(--text)", borderRadius: "2px", opacity: menuOpen ? 0 : 1, transition: "opacity .2s" }}></span>
            <span style={{ display: "block", width: "17px", height: "1.5px", background: "var(--text)", borderRadius: "2px", transform: menuOpen ? "rotate(-45deg) translateY(-5.5px)" : "none", transition: "transform .3s cubic-bezier(.2,.8,.2,1)" }}></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ display: "flex", borderTop: "1px solid var(--line)", padding: "10px 18px 18px", flexDirection: "column", background: "color-mix(in oklab, var(--bg) 96%, transparent)" }}>
          {portfolioData.menuItems.map((mi) => (
            <a
              key={mi.label}
              href={mi.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--text)",
                fontSize: "16px",
                fontWeight: 600,
                padding: "14px 4px",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {mi.label}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--dim)" }}>
                {mi.num}
              </span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}