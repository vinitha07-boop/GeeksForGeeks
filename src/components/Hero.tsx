"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MatrixRain } from "./MatrixRain";
import { LiveActivity } from "./LiveActivity";

const tags = ["DSA", "Next.js", "React", "Python", "Open Source", "Hackathons", "Competitive Coding", "System Design", "Node.js", "TypeScript"];

const codeLines = [
  { t: <><span className="text-primary">interface</span> <span className="text-blue-400">Developer</span> {"{"}</>, i: 0 },
  { t: <><span className="text-muted-foreground">name</span>: <span className="text-orange-300">string</span>;</>, i: 1 },
  { t: <><span className="text-muted-foreground">skills</span>: <span className="text-orange-300">string</span>[];</>, i: 1 },
  { t: <><span className="text-muted-foreground">passion</span>: <span className="text-primary">true</span>;</>, i: 1 },
  { t: <>{"}"}</>, i: 0 },
  { t: <>&nbsp;</>, i: 0 },
  { t: <><span className="text-primary">const</span> <span className="text-blue-400">you</span>: Developer = {"{"}</>, i: 0 },
  { t: <><span className="text-muted-foreground">name</span>: <span className="text-green-300">"Student"</span>,</>, i: 1 },
  { t: <><span className="text-muted-foreground">skills</span>: [<span className="text-green-300">"DSA"</span>, <span className="text-green-300">"Web"</span>],</>, i: 1 },
  { t: <><span className="text-muted-foreground">passion</span>: <span className="text-primary">true</span></>, i: 1 },
  { t: <>{"};"}  <span className="text-muted-foreground">// ✓ Ready to join</span></>, i: 0 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-background overflow-hidden pb-16">
      <MatrixRain />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(57,255,20,0.05) 0%, transparent 65%)" }} />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-30" />

      <div className="container relative z-10 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div className="flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
              className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
              <span className="text-xs font-mono text-primary tracking-[0.2em] uppercase">Official Club — RIT Chennai</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter">
                <span className="block text-foreground">Code.</span>
                <span className="block text-primary text-glow">Collab.</span>
                <span className="block text-foreground">Conquer.</span>
              </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed font-light">
              The official developer community at Rajalakshmi Institute of Technology.
              Master Data Structures, build real-world projects, and grow with 500+ passionate developers.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3">
              <Link href="/register"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-sm hover:bg-primary/90 transition-all glow-green">
                Join the Club
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/events"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold text-xs uppercase tracking-widest px-6 py-4 rounded-sm hover:border-primary/50 hover:text-primary transition-all">
                Explore Events
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <LiveActivity />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-6 sm:gap-8 pt-4 border-t border-border">
              {[["500+", "Members"], ["50+", "Events"], ["10K+", "Problems"]].map(([val, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-primary">{val}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Terminal (hidden on small mobile, shown from md up) */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden md:block">
            <div className="relative rounded-sm border border-border bg-card/80 backdrop-blur overflow-hidden shadow-2xl glow-green">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-primary/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">~/gfg-rit/member.ts</span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono text-primary">LIVE</span>
                </div>
              </div>
              <div className="p-5 font-mono text-xs sm:text-sm space-y-1 min-h-[240px] relative overflow-hidden">
                <div className="absolute left-0 right-0 h-px bg-primary/10 animate-scan" />
                {codeLines.map((line, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }} className="flex">
                    <span className="text-muted-foreground/30 w-5 text-right mr-3 select-none text-xs">{i + 1}</span>
                    <span style={{ paddingLeft: `${line.i * 14}px` }}>{line.t}</span>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex">
                  <span className="text-muted-foreground/30 w-5 text-right mr-3 select-none text-xs">{codeLines.length + 1}</span>
                  <span className="inline-block w-2 h-4 bg-primary animate-blink" />
                </motion.div>
              </div>
              <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/20">
                <span className="text-xs font-mono text-muted-foreground">TypeScript</span>
                <span className="text-xs font-mono text-primary">✓ No errors</span>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
              className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest animate-float shadow-lg">
              500+ Devs
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border py-2.5 overflow-hidden bg-background/80 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...tags, ...tags].map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-4 sm:mx-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              <span className="text-primary">◆</span> {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
