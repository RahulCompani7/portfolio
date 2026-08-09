"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const curRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const handleMouseMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }

      const target = (e.target as HTMLElement).closest("a, button, .card, input, textarea");
      setScale(target ? 1.9 : 1);

      if (curRef.current) {
        curRef.current.style.background = target ? "var(--accBg)" : "transparent";
      }
    };

    let rafId: number;
    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;

      if (curRef.current) {
        curRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${scale})`;
      }

      rafId = requestAnimationFrame(loop);
    };

    loop();
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [scale]);

  return (
    <>
      <div
        id="cursor"
        ref={curRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: "1.5px solid var(--acc)",
          borderRadius: "50%",
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        id="cursorDot"
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          background: "var(--acc)",
          borderRadius: "50%",
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}