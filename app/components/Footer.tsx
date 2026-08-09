"use client";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "34px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", maxWidth: "1220px", margin: "0 auto", position: "relative", zIndex: 1 }}>
      <div style={{ fontSize: "13px", color: "var(--dim)" }}>
        © 2026 Rahul Compani — designed and built from scratch.
      </div>
      <a href="#home" className="navlink" style={{ fontSize: "13px", color: "var(--text)" }}>
        Back to top ↑
      </a>
    </footer>
  );
}