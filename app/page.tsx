"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { portfolioData } from "@/lib/data";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import LogoTile from "./components/LogoTile";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Terminal from "./components/Terminal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Particles from "./components/Particles";

const subscribeNoop = () => () => {};

// True only once the component has hydrated on the client — lets us defer
// theme-dependent rendering without calling setState synchronously in an effect.
function useMounted() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false);
}

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  try {
    return (localStorage.getItem("rc_theme") as "light" | "dark") || "dark";
  } catch {
    return "dark";
  }
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const mounted = useMounted();
  const rootRef = useRef<HTMLDivElement>(null);

  // Synchronize the DOM attribute (an external system) from React state.
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [mounted, theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    try {
      localStorage.setItem("rc_theme", newTheme);
    } catch {
      // ignore write errors (e.g. storage disabled)
    }
  };

  const themeIcon = theme === "dark" ? "☀️" : "🌙";

  if (!mounted) return null;

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
