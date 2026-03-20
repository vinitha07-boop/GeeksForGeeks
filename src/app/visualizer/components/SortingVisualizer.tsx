"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Shuffle } from "lucide-react";

const ALGOS = [
  { id: "bubble", name: "Bubble Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
  { id: "selection", name: "Selection Sort", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
  { id: "insertion", name: "Insertion Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
  { id: "merge", name: "Merge Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
  { id: "quick", name: "Quick Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
];

function genArr(n = 30) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
}

export default function SortingVisualizer() {
  const [algo, setAlgo] = useState("bubble");
  const [arr, setArr] = useState(genArr);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(60);
  const [steps, setSteps] = useState(0);
  const stopRef = useRef(false);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  const delay = () => sleep(Math.max(4, 120 - speed));

  const reset = () => {
    stopRef.current = true;
    setTimeout(() => { setRunning(false); setComparing([]); setSorted([]); setPivot(null); setSteps(0); setArr(genArr()); }, 100);
  };

  const run = async () => {
    stopRef.current = false;
    setRunning(true); setSorted([]); setPivot(null); setSteps(0);
    const a = [...arr];

    if (algo === "bubble") {
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
          if (stopRef.current) { setRunning(false); return; }
          setComparing([j, j + 1]); setSteps(s => s + 1); await delay();
          if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; setArr([...a]); }
        }
        setSorted(p => [...p, a.length - 1 - i]);
      }
    } else if (algo === "selection") {
      const s: number[] = [];
      for (let i = 0; i < a.length; i++) {
        let min = i;
        for (let j = i + 1; j < a.length; j++) {
          if (stopRef.current) { setRunning(false); return; }
          setComparing([min, j]); setSteps(x => x + 1); await delay();
          if (a[j] < a[min]) min = j;
        }
        [a[i], a[min]] = [a[min], a[i]]; setArr([...a]); s.push(i); setSorted([...s]);
      }
    } else if (algo === "insertion") {
      for (let i = 1; i < a.length; i++) {
        let j = i;
        while (j > 0 && a[j - 1] > a[j]) {
          if (stopRef.current) { setRunning(false); return; }
          setComparing([j - 1, j]); setSteps(x => x + 1); await delay();
          [a[j - 1], a[j]] = [a[j], a[j - 1]]; setArr([...a]); j--;
        }
        setSorted(Array.from({ length: i + 1 }, (_, k) => k));
      }
    } else if (algo === "merge") {
      const merge = async (arr: number[], l: number, r: number) => {
        if (l >= r) return;
        const m = Math.floor((l + r) / 2);
        await merge(arr, l, m); await merge(arr, m + 1, r);
        const left = arr.slice(l, m + 1), right = arr.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
          if (stopRef.current) return;
          setComparing([l + i, m + 1 + j]); setSteps(x => x + 1); await delay();
          arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
          setArr([...arr]);
        }
        while (i < left.length) { arr[k++] = left[i++]; setArr([...arr]); await delay(); }
        while (j < right.length) { arr[k++] = right[j++]; setArr([...arr]); await delay(); }
      };
      await merge(a, 0, a.length - 1);
    } else if (algo === "quick") {
      const partition = async (arr: number[], low: number, high: number) => {
        const p = arr[high]; setPivot(high); let i = low - 1;
        for (let j = low; j < high; j++) {
          if (stopRef.current) return i;
          setComparing([j, high]); setSteps(x => x + 1); await delay();
          if (arr[j] < p) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; setArr([...arr]); }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; setArr([...arr]); return i + 1;
      };
      const qs = async (arr: number[], low: number, high: number) => {
        if (low < high) {
          const pi = await partition(arr, low, high);
          await qs(arr, low, pi - 1); await qs(arr, pi + 1, high);
        }
      };
      await qs(a, 0, a.length - 1);
    }

    setComparing([]); setPivot(null); setSorted(a.map((_, i) => i)); setRunning(false);
  };

  const maxVal = Math.max(...arr);
  const currentAlgo = ALGOS.find(a => a.id === algo)!;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {ALGOS.map(a => (
          <button key={a.id} onClick={() => { if (!running) { setAlgo(a.id); reset(); } }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border rounded-sm transition-all ${algo === a.id ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:border-primary/40"}`}>
            {a.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={running ? () => { stopRef.current = true; } : run}
          className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all ${running ? "bg-destructive/80 text-white" : "bg-primary text-primary-foreground glow-green"}`}>
          <Play className="h-3.5 w-3.5" />{running ? "Stop" : "Visualize"}
        </button>
        <button onClick={reset} disabled={running} className="flex items-center gap-2 border border-border bg-card text-muted-foreground font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-sm hover:border-primary/50 disabled:opacity-30 transition-all">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
        <button onClick={() => { if (!running) setArr(genArr()); }} disabled={running} className="flex items-center gap-2 border border-border bg-card text-muted-foreground font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-sm hover:border-primary/50 disabled:opacity-30 transition-all">
          <Shuffle className="h-3.5 w-3.5" /> Shuffle
        </button>
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs font-mono text-muted-foreground">Speed</span>
          <input type="range" min={10} max={110} value={speed} onChange={e => setSpeed(+e.target.value)} className="w-24 accent-[#39FF14]" />
        </div>
        <div className="border border-border bg-card rounded-sm px-4 py-2 text-xs font-mono">
          <span className="text-muted-foreground">Steps: </span><span className="text-primary font-black">{steps}</span>
        </div>
      </div>

      <div className="border border-border rounded-sm bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground">{currentAlgo.name} · {arr.length} elements</span>
          <div className="flex items-center gap-4">
            {[{ color: "rgba(57,255,20,0.2)", label: "Unsorted" }, { color: "#ffffff", label: "Comparing" }, { color: "#f97316", label: "Pivot" }, { color: "#39FF14", label: "Sorted" }].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6" style={{ background: "rgba(10,10,10,0.5)" }}>
          <div className="flex items-end justify-center gap-0.5 h-56">
            {arr.map((val, i) => {
              const isComparing = comparing.includes(i);
              const isSorted = sorted.includes(i);
              const isPivot = pivot === i;
              return (
                <motion.div key={i} layout className="flex-1 rounded-t-sm"
                  style={{
                    height: `${(val / maxVal) * 100}%`, maxWidth: "28px",
                    background: isPivot ? "#f97316" : isSorted ? "linear-gradient(to top,#2CCF0F,#39FF14)" : isComparing ? "#ffffff" : "rgba(57,255,20,0.2)",
                    boxShadow: isComparing ? "0 0 12px rgba(255,255,255,0.7)" : isPivot ? "0 0 12px rgba(249,115,22,0.7)" : isSorted ? "0 0 6px rgba(57,255,20,0.4)" : "none",
                    transition: "background 0.05s",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[["Best", currentAlgo.best], ["Average", currentAlgo.avg], ["Worst", currentAlgo.worst], ["Space", currentAlgo.space]].map(([label, val]) => (
          <div key={label} className="border border-border bg-card rounded-sm p-4 text-center">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">{label}</div>
            <div className="text-sm font-black text-primary font-mono">{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
