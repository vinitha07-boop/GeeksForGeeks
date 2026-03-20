"use client";

import { useState, useEffect } from "react";

const glitchChars = "!@#$%^&*<>[]{}|/\\";

function useGlitch(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let iterations = 0;
    const max = 12;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < iterations) return text[i];
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }).join("")
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 0.5;
    }, 40);
    return () => clearInterval(interval);
  }, [active, text]);

  return display;
}

export function GlitchText({ text, className }: { text: string; className?: string }) {
  const [hovered, setHovered] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const displayed = useGlitch(text, hovered || autoPlay);

  useEffect(() => {
    // Auto-trigger glitch on mount
    const t1 = setTimeout(() => setAutoPlay(true), 800);
    const t2 = setTimeout(() => setAutoPlay(false), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <span
      className={`cursor-default select-none ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {displayed}
    </span>
  );
}
