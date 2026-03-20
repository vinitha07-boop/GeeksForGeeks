"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const activities = [
  "Arjun S. solved Two Sum ⚡",
  "Priya R. joined the club 🎉",
  "Karthik M. submitted Hackathon project 🚀",
  "Divya K. completed DSA Path 🏆",
  "Rahul P. solved LRU Cache 🔥",
  "Sneha T. registered for Next.js Workshop 📅",
  "Arun V. hit a 30-day streak 💪",
  "Meena L. posted in community 💬",
  "Vishnu R. earned Expert badge ⭐",
  "Ananya S. solved Binary Tree problem 🌳",
];

export function LiveActivity() {
  const [current, setCurrent] = useState(0);
  const [online] = useState(Math.floor(Math.random() * 40) + 60);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % activities.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-sm px-4 py-2.5 w-fit max-w-xs">
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-mono text-primary font-bold">{online} online</span>
      </div>
      <div className="w-px h-4 bg-border" />
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-[11px] font-mono text-muted-foreground truncate"
        >
          {activities[current]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
