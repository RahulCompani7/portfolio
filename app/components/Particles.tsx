"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let w: number, h: number;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let pts: Particle[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.min(80, Math.round((w * h) / 18000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      const rgb = light ? "15,143,82" : "53,208,127";

      ctx.clearRect(0, 0, w, h);

      for (const a of pts) {
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        const pointer = pointerRef.current;
        if (pointer) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 150 && d > 0.1) {
            a.x += (dx / d) * (150 - d) * 0.012;
            a.y += (dy / d) * (150 - d) * 0.012;
          }
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, 7);
        ctx.fillStyle = `rgba(${rgb},${light ? 0.35 : 0.5})`;
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;

          if (d2 < 15000) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${rgb},${(light ? 0.09 : 0.12) * (1 - d2 / 15000)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      const hoverPointer = pointerRef.current;
      if (hoverPointer) {
        for (const a of pts) {
          const dx = a.x - hoverPointer.x;
          const dy = a.y - hoverPointer.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < 26000) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(hoverPointer.x, hoverPointer.y);
            ctx.strokeStyle = `rgba(${rgb},${0.22 * (1 - d2 / 26000)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.75,
      }}
    />
  );
}