"use client";

import { useRef, useSyncExternalStore } from "react";
import { portfolioData } from "@/lib/data";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import LogoTile from "./components/LogoTile";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Photography from "./components/Photography";
import Music from "./components/Music";
import Terminal from "./components/Terminal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Particles from "./components/Particles";

type Theme = "light" | "dark";

const THEME_EVENT = "rc-theme-change";

/**
 * The <html data-theme> attribute is the single source of truth, written
 * before first paint by the inline script in layout.tsx. Reading it through
 * useSyncExternalStore rather than mirroring it into state means:
 *
 *   - the page renders fully on the server (it previously returned null until
 *     hydration, so crawlers and link previews saw an empty <body>);
 *   - React swaps the server snapshot for the real one during hydration, so a
 *     saved dark preference doesn't produce a mismatch warning;
 *   - no setState inside an effect.
 */
function subscribeTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

/** Light is the default, and matches what the server markup assumes. */
function getServerThemeSnapshot(): Theme {
  return "light";
}

export default function Home() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("rc_theme", next);
    } catch {
      // ignore write errors (e.g. storage disabled)
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const themeIcon = theme === "dark" ? "☀️" : "🌙";

  return (
    <div ref={rootRef} style={{ position: "relative", overflowX: "clip" }}>
      <Particles />
      <CustomCursor />

      <Navigation themeIcon={themeIcon} toggleTheme={toggleTheme} theme={theme} />
      <Hero />
      <div style={{ borderTop: `1px solid var(--line)`, borderBottom: `1px solid var(--line)`, padding: "26px 0", overflow: "hidden", background: "var(--panel2)", position: "relative", zIndex: 1 }}>
        <Marquee />
      </div>
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Photography />
      <Music />
      <Terminal onToggleTheme={toggleTheme} />
      <Contact />
      <Footer />
    </div>
  );
}

function Marquee() {
  return (
    <div className="marq" style={{ display: "flex", width: "max-content", animation: "marquee 30s linear infinite", gap: "60px", alignItems: "center" }}>
      {[...portfolioData.marquee, ...portfolioData.marquee].map((m, i) => (
        <div key={i} className="logotile" style={{ display: "flex", alignItems: "center", gap: "11px", flex: "none", opacity: 0.62 }}>
          <LogoTile src={m.img} alt={m.name} bg={m.bg} size={34} text={m.name} />
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "17px", fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" }}>
            {m.name}
          </span>
        </div>
      ))}
    </div>
  );
}
