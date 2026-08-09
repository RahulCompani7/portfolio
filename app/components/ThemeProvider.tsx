"use client";

import { useEffect, ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Sync the data-theme attribute from localStorage (or default to light)
  // as a side effect — no local state needed here.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rc_theme") as "light" | "dark" | null;
      document.documentElement.setAttribute("data-theme", saved || "light");
    } catch {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  return <>{children}</>;
}