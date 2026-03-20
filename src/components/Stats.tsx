"use client";

import { motion, useInView } from "framer-motion";
import { Users, Calendar, Trophy, Code2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const stats = [
  { name: "Active Members", value: 500, suffix: "+", icon: Users, description: "Students from various disciplines", index: "01" },
  { name: "Events Conducted", value: 50, suffix: "+", icon: Calendar, description: "Workshops, hackathons & seminars", index: "02" },
  { name: "Challenges Solved", value: 10000, suffix: "+", display: "10K+", icon: Code2, description: "On GeeksforGeeks platform", index: "03" },
  { name: "Awards Won", value: 15, suffix: "", icon: Trophy, description: "In national level hackathons", index: "04" },
];

function AnimatedCounter({ value, suffix, display }: { value: number; suffix: string; display?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    if (display) { setCount(value); return; }
    const duration = 1800;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value, display]);

  if (display) return <span ref={ref}>{display}</span>;
  return <span ref={ref}>{value >= 1000 ? `${Math.floor(count / 1000)}K` : count}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="py-12 sm:py-20 border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="container relative z-10">
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">By the Numbers</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background p-5 sm:p-8 relative overflow-hidden hover:bg-card transition-colors"
            >
              <span className="absolute top-3 right-3 text-xs font-mono text-muted-foreground/30">{stat.index}</span>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-border rounded-sm flex items-center justify-center group-hover:border-primary/50 group-hover:text-primary transition-colors">
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <div className="text-3xl sm:text-5xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors tabular-nums">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} display={stat.display} />
                  </div>
                  <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider">{stat.name}</div>
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{stat.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
