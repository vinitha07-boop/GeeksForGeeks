"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { BookOpen, Code, Database, Globe, Play, Lock, ArrowUpRight, ExternalLink, RotateCcw, Shuffle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const learningPaths = [
  { id: "dsa", title: "Data Structures & Algorithms", description: "Master the core of CS. Essential for technical interviews at top companies.", level: "Beginner → Advanced", icon: Database, accent: "#3B82F6", modules: 12, progress: 30 },
  { id: "web", title: "Full-Stack Web Development", description: "Build modern web apps from scratch using Next.js, React, and Node.js.", level: "Intermediate", icon: Globe, accent: "#39FF14", modules: 8, progress: 0 },
  { id: "cp", title: "Competitive Programming", description: "Advanced algorithms and problem-solving techniques for contests.", level: "Advanced", icon: Code, accent: "#A855F7", modules: 15, progress: 0, locked: true },
];

const resources = [
  { title: "Top 50 Array Problems", type: "Article", time: "15 min" },
  { title: "Understanding React Hooks", type: "Video", time: "45 min" },
  { title: "System Design: Load Balancers", type: "Article", time: "20 min" },
  { title: "Graph Traversal Algorithms", type: "Practice", time: "2 hr" },
];

type Algorithm = "bubble" | "selection" | "insertion";
const ALGOS: { id: Algorithm; name: string; complexity: string; desc: string }[] = [
  { id: "bubble", name: "Bubble Sort", complexity: "O(n²)", desc: "Compare adjacent elements and swap if out of order." },
  { id: "selection", name: "Selection Sort", complexity: "O(n²)", desc: "Find minimum and place at correct position." },
  { id: "insertion", name: "Insertion Sort", complexity: "O(n²)/O(n)", desc: "Build sorted array one element at a time." },
];

function generateArray(n = 24) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 88) + 8);
}

export default function LearningHubPage() {
  const [array, setArray] = useState(() => generateArray());
  const [algo, setAlgo] = useState<Algorithm>("bubble");
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(70);
  const [steps, setSteps] = useState(0);
  const stopRef = useRef(false);
  const maxVal = Math.max(...array);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  const delay = () => sleep(Math.max(5, 110 - speed));

  const reset = () => {
    stopRef.current = true;
    setTimeout(() => { setRunning(false); setComparing([]); setSorted([]); setSteps(0); setArray(generateArray()); }, 80);
  };

  const run = async () => {
    stopRef.current = false;
    setRunning(true); setSorted([]); setSteps(0);
    const a = [...array];
    if (algo === "bubble") {
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
          if (stopRef.current) { setRunning(false); return; }
          setComparing([j, j + 1]); setSteps(s => s + 1); await delay();
          if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; setArray([...a]); }
        }
        setSorted(prev => [...prev, a.length - 1 - i]);
      }
    } else if (algo === "selection") {
      const si: number[] = [];
      for (let i = 0; i < a.length; i++) {
        let min = i;
        for (let j = i + 1; j < a.length; j++) {
          if (stopRef.current) { setRunning(false); return; }
          setComparing([min, j]); setSteps(s => s + 1); await delay();
          if (a[j] < a[min]) min = j;
        }
        [a[i], a[min]] = [a[min], a[i]]; setArray([...a]); si.push(i); setSorted([...si]);
      }
    } else {
      for (let i = 1; i < a.length; i++) {
        let j = i;
        while (j > 0 && a[j - 1] > a[j]) {
          if (stopRef.current) { setRunning(false); return; }
          setComparing([j - 1, j]); setSteps(s => s + 1); await delay();
          [a[j - 1], a[j]] = [a[j], a[j - 1]]; setArray([...a]); j--;
        }
        setSorted(Array.from({ length: i + 1 }, (_, k) => k));
      }
    }
    setComparing([]); setSorted(a.map((_, i) => i)); setRunning(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">

      {/* Hero */}
      <section className="relative py-14 sm:py-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3" style={{ background: "radial-gradient(ellipse at 100% 50%, rgba(57,255,20,0.06) 0%, transparent 70%)" }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-px bg-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Learning Hub</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4">
            Level Up<br /><span className="text-primary">Your Stack.</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-md text-sm">
            Structured paths, curated resources, practice problems, and an interactive visualizer — all in one place.
          </p>
          <div className="mt-8">
            <a href="#visualizer"
              className="inline-flex items-center gap-2 border border-primary/50 text-primary font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-primary/10 transition-all group">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Try the Algorithm Visualizer
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </a>
          </div>
        </div>
      </section>

      <div className="container py-8 sm:py-16 space-y-12 sm:space-y-20">

        {/* Learning Paths + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-4 h-px bg-primary" />
              <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Learning Paths</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-4">
              {learningPaths.map((path, i) => (
                <motion.div key={path.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`group border border-border rounded-sm bg-card p-6 hover:border-primary/40 transition-all relative ${path.locked ? "opacity-60" : ""}`}>
                  {path.locked && <div className="absolute top-5 right-5"><Lock className="h-4 w-4 text-muted-foreground" /></div>}
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0 border" style={{ borderColor: `${path.accent}30`, background: `${path.accent}10`, color: path.accent }}>
                      <path.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: path.accent }}>{path.level}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">· {path.modules} modules</span>
                      </div>
                      <h3 className="font-black text-lg tracking-tight mb-2 group-hover:text-primary transition-colors">{path.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{path.description}</p>
                      {!path.locked && path.progress > 0 && (
                        <div className="mt-4">
                          <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1.5"><span>In Progress</span><span>{path.progress}%</span></div>
                          <div className="h-1 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${path.progress}%` }} /></div>
                        </div>
                      )}
                      {!path.locked && (
                        <Link href={`/learn/${path.id}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                          {path.progress > 0 ? "Continue" : "Start Path"}<ArrowUpRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border border-primary/30 rounded-sm bg-card p-5 glow-green">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-primary uppercase tracking-widest">Weekly Goal</span>
              </div>
              <div className="text-3xl font-black mb-1">2 <span className="text-muted-foreground text-lg font-normal">/ 5</span></div>
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} transition={{ delay: 0.5, duration: 0.8 }} className="h-full bg-primary rounded-full" />
              </div>
              <a href="https://practice.geeksforgeeks.org/problem-of-the-day" target="_blank" rel="noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest py-3 rounded-sm hover:bg-primary/90 transition-all">
                Solve Today's Problem <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="border border-border rounded-sm bg-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                <Play className="h-4 w-4 text-primary" />
                <span className="text-xs font-mono uppercase tracking-widest">Recommended</span>
              </div>
              <div className="divide-y divide-border">
                {resources.map((r, i) => (
                  <Link key={i} href="#" className="group flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors">
                    <div>
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors leading-tight">{r.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm">{r.type}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{r.time}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-border rounded-sm bg-card p-5">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-4">Quick Wins</span>
              {["Create GFG account", "Solve first problem", "Join Discord server", "Attend first workshop"].map((task, i) => (
                <div key={i} className={`flex items-center gap-3 py-2 border-b border-border/50 last:border-0 ${i < 2 ? "text-foreground" : "text-muted-foreground"}`}>
                  <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${i < 2 ? "text-primary" : "text-muted-foreground/40"}`} />
                  <span className={`text-sm ${i < 2 ? "line-through opacity-60" : ""}`}>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== ALGORITHM VISUALIZER SECTION ===== */}
        <div id="visualizer">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-4 h-px bg-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Interactive Visualizer</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mb-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter">Watch Algorithms <span className="text-primary">Run Live</span></h2>
            <p className="text-muted-foreground text-sm mt-2">Pick a sorting algorithm and watch it sort in real time — bar by bar.</p>
          </div>

          {/* Algo selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 mb-5">
            {ALGOS.map(a => (
              <button key={a.id} onClick={() => { if (!running) { setAlgo(a.id); reset(); } }}
                className={`text-left p-4 border rounded-sm transition-all ${algo === a.id ? "border-primary bg-primary/5 glow-green" : "border-border hover:border-primary/40 bg-card"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-sm">{a.name}</span>
                  <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-sm">{a.complexity}</span>
                </div>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
            <button onClick={running ? () => { stopRef.current = true; } : run}
              className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all ${running ? "bg-destructive/80 text-white border border-destructive" : "bg-primary text-primary-foreground glow-green"}`}>
              <Play className="h-3.5 w-3.5" />{running ? "Stop" : "Visualize"}
            </button>
            <button onClick={reset} disabled={running}
              className="flex items-center gap-2 border border-border bg-card text-muted-foreground font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-sm hover:border-primary/50 hover:text-foreground transition-all disabled:opacity-30">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button onClick={() => { if (!running) setArray(generateArray()); }} disabled={running}
              className="flex items-center gap-2 border border-border bg-card text-muted-foreground font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-sm hover:border-primary/50 hover:text-foreground transition-all disabled:opacity-30">
              <Shuffle className="h-3.5 w-3.5" /> New Array
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-xs font-mono text-muted-foreground">Speed</span>
              <input type="range" min={10} max={100} value={speed} onChange={e => setSpeed(+e.target.value)} className="w-24 accent-[#39FF14]" />
            </div>
            <div className="flex items-center gap-2 border border-border bg-card rounded-sm px-4 py-2.5">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Steps</span>
              <span className="text-base font-black text-primary tabular-nums">{steps}</span>
            </div>
          </div>

          {/* Bars */}
          <div className="border border-border rounded-sm bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
              <span className="text-xs font-mono text-muted-foreground">{ALGOS.find(a => a.id === algo)?.name} · {array.length} elements</span>
              <div className="flex items-center gap-4">
                {[{ color: "rgba(57,255,20,0.2)", label: "Unsorted" }, { color: "#ffffff", label: "Comparing" }, { color: "#39FF14", label: "Sorted" }].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                    <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6" style={{ background: "rgba(10,10,10,0.5)" }}>
              <div className="flex items-end justify-center gap-0.5 h-36 sm:h-48">
                {array.map((val, i) => {
                  const isComparing = comparing.includes(i);
                  const isSorted = sorted.includes(i);
                  return (
                    <div key={i} className="flex-1 rounded-t-sm"
                      style={{
                        height: `${(val / maxVal) * 100}%`, maxWidth: "32px",
                        background: isSorted ? "linear-gradient(to top, #2CCF0F, #39FF14)" : isComparing ? "#ffffff" : "rgba(57,255,20,0.2)",
                        boxShadow: isComparing ? "0 0 12px rgba(255,255,255,0.6)" : isSorted ? "0 0 6px rgba(57,255,20,0.4)" : "none",
                        transition: "background 0.05s",
                      }} />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Complexity cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3">
            {[{ label: "Best Case", value: algo === "insertion" ? "O(n)" : "O(n²)" }, { label: "Worst Case", value: "O(n²)" }, { label: "Space", value: "O(1)" }].map(({ label, value }) => (
              <div key={label} className="border border-border bg-card rounded-sm p-3 text-center">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">{label}</div>
                <div className="text-base font-black text-primary font-mono">{value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
