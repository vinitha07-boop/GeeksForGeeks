"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full transition-all duration-200 ease-out"
      style={{
        background: "radial-gradient(circle, rgba(57,255,20,0.06) 0%, transparent 70%)",
        top: "-100px",
        left: "-100px",
      }}
    />
  );
}
