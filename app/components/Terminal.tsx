"use client";

import { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/lib/data";

export default function Terminal() {
  const [cmd, setCmd] = useState("");
  const [lines, setLines] = useState([
    { text: "rahul-cv v2.0 — an interactive résumé shell.", color: "var(--dim)" },
    { text: 'Type `help` to see what I can answer.', color: "var(--muted)" },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    termRef.current?.scrollTo(0, termRef.current.scrollHeight);
  }, [lines]);

  const runCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmd.trim()) return;

    const command = cmd.trim().toLowerCase();
    setHistory([...history, command]);
    setHistIdx(-1);

    setLines((prev) => [...prev, { text: `rahul@portfolio ~ % ${cmd}`, color: "var(--acc)" }]);

    const output = portfolioData.terminalCommands[command as keyof typeof portfolioData.terminalCommands] || "command not found";

    if (command === "clear") {
      setLines([]);
    } else if (output) {
      setLines((prev) => [...prev, { text: output, color: "var(--text)" }]);
    } else {
      setLines((prev) => [...prev, { text: `command not found: ${command}`, color: "#ff5f56" }]);
    }

    setCmd("");
  };

  const suggestions = ["experience", "projects", "skills", "education", "contact", "about", "help"];

  return (
    <section id="terminal" style={{ maxWidth: "940px", margin: "0 auto", padding: "20px 24px 130px", position: "relative", zIndex: 1 }}>
      <div className="rv" style={{ marginBottom: "34px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.16em", color: "var(--acc)", textTransform: "uppercase", marginBottom: "16px" }}>
          06 — Interview me
        </div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(30px, 4.2vw, 50px)", fontWeight: 800, letterSpacing: "-0.035em", margin: "0 0 12px", color: "var(--head)" }}>
          Skip the scroll. Just ask.
        </h2>
        <p style={{ fontSize: "15px", color: "var(--muted)", margin: 0, maxWidth: "600px" }}>
          A live shell into my CV — type a command or tap one below.{" "}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--acc)" }}>help</span> lists everything.
        </p>
      </div>

      <div className="rv" style={{ background: "var(--panel2)", border: "1px solid var(--line2)", borderRadius: "18px", overflow: "hidden", boxShadow: "var(--shadow)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "13px 16px", borderBottom: "1px solid var(--line)", background: "var(--panel)" }}>
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#febc2e" }} />
          <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#28c840" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "var(--dim)", marginLeft: "10px" }}>
            rahul@portfolio — zsh
          </span>
        </div>
        <div
          ref={termRef}
          onClick={() => inputRef.current?.focus()}
          className="term"
          style={{ height: "340px", overflowY: "auto", padding: "20px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", lineHeight: 1.75 }}
        >
          {lines.map((l, i) => (
            <div key={i} style={{ color: l.color, whiteSpace: "pre-wrap", marginBottom: "2px" }}>
              {l.text}
            </div>
          ))}
          <form onSubmit={runCommand} style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
            <span style={{ color: "var(--acc)", flex: "none" }}>rahul@portfolio ~ %</span>
            <input
              ref={inputRef}
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  if (histIdx < history.length - 1) {
                    const newIdx = histIdx + 1;
                    setHistIdx(newIdx);
                    setCmd(history[history.length - 1 - newIdx]);
                  }
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  if (histIdx > 0) {
                    const newIdx = histIdx - 1;
                    setHistIdx(newIdx);
                    setCmd(history[history.length - 1 - newIdx]);
                  } else if (histIdx === 0) {
                    setHistIdx(-1);
                    setCmd("");
                  }
                }
              }}
              placeholder="try: experience"
              spellCheck="false"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "var(--text)",
                fontFamily: "inherit",
                fontSize: "13px",
                padding: 0,
                outline: "none",
              }}
            />
          </form>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "16px", borderTop: "1px solid var(--line)", background: "var(--panel)" }}>
          {suggestions.map((sg, i) => (
            <button
              key={i}
              onClick={() => {
                setCmd(sg);
                inputRef.current?.focus();
              }}
              className="chip"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11.5px",
                padding: "6px 12px",
                borderRadius: "7px",
                border: "1px solid var(--line)",
                color: "var(--muted)",
                background: "var(--soft)",
                cursor: "pointer",
              }}
            >
              {sg}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}