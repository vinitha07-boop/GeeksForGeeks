"use client";
import { useState, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";

export default function SearchVisualizer() {
  const [algo, setAlgo] = useState("linear");
  const [arr] = useState(() => Array.from({ length: 20 }, (_, i) => (i + 1) * 5));
  const [target, setTarget] = useState(55);
  const [current, setCurrent] = useState<number | null>(null);
  const [visited, setVisited] = useState<number[]>([]);
  const [found, setFound] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState("");
  const stopRef = useRef(false);

  const sleep = () => new Promise(r => setTimeout(r, 500));

  const reset = () => {
    stopRef.current = true;
    setTimeout(() => { setRunning(false); setCurrent(null); setVisited([]); setFound(null); setLeft(null); setRight(null); setMid(null); setSteps(0); setMessage(""); }, 100);
  };

  const run = async () => {
    stopRef.current = false; setRunning(true); setVisited([]); setFound(null); setLeft(null); setRight(null); setMid(null); setSteps(0); setMessage("");

    if (algo === "linear") {
      for (let i = 0; i < arr.length; i++) {
        if (stopRef.current) { setRunning(false); return; }
        setCurrent(i); setVisited(p => [...p, i]); setSteps(s => s + 1);
        await sleep();
        if (arr[i] === target) { setFound(i); setMessage(`Found ${target} at index ${i}!`); setRunning(false); return; }
      }
      setMessage(`${target} not found in array.`);
    } else {
      let l = 0, r = arr.length - 1;
      setLeft(l); setRight(r);
      while (l <= r) {
        if (stopRef.current) { setRunning(false); return; }
        const m = Math.floor((l + r) / 2);
        setMid(m); setCurrent(m); setVisited(p => [...p, m]); setSteps(s => s + 1);
        await sleep();
        if (arr[m] === target) { setFound(m); setMessage(`Found ${target} at index ${m} in ${steps + 1} steps!`); setRunning(false); return; }
        else if (arr[m] < target) { l = m + 1; setLeft(l); }
        else { r = m - 1; setRight(r); }
        await sleep();
      }
      setMessage(`${target} not found.`);
    }
    setCurrent(null); setRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[["linear", "Linear Search"], ["binary", "Binary Search"]].map(([id, name]) => (
          <button key={id} onClick={() => { if (!running) { setAlgo(id); reset(); } }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border rounded-sm transition-all ${algo === id ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:border-primary/40"}`}>
            {name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Target</label>
          <select value={target} onChange={e => setTarget(+e.target.value)} disabled={running}
            className="bg-card border border-border rounded-sm px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary">
            {arr.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <button onClick={running ? () => { stopRef.current = true; } : run}
          className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all ${running ? "bg-destructive/80 text-white" : "bg-primary text-primary-foreground glow-green"}`}>
          <Play className="h-3.5 w-3.5" />{running ? "Stop" : "Search"}
        </button>
        <button onClick={reset} disabled={running} className="flex items-center gap-2 border border-border bg-card text-muted-foreground font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-sm disabled:opacity-30">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
        <div className="border border-border bg-card rounded-sm px-4 py-2 text-xs font-mono ml-auto">
          <span className="text-muted-foreground">Steps: </span><span className="text-primary font-black">{steps}</span>
        </div>
      </div>

      {message && (
        <div className={`px-4 py-3 border rounded-sm text-sm font-mono ${found !== null ? "border-primary/40 bg-primary/5 text-primary" : "border-destructive/40 bg-destructive/5 text-destructive"}`}>
          {message}
        </div>
      )}

      <div className="border border-border rounded-sm bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/30">
          <span className="text-xs font-mono text-muted-foreground">{algo === "binary" ? "Binary Search" : "Linear Search"} · Sorted array of {arr.length}</span>
        </div>
        <div className="p-8" style={{ background: "rgba(10,10,10,0.5)" }}>
          <div className="flex justify-center gap-2 flex-wrap">
            {arr.map((val, i) => {
              const isFound = found === i;
              const isCurrent = current === i && !isFound;
              const isVisited = visited.includes(i) && !isFound && !isCurrent;
              const isLeft = left === i && algo === "binary";
              const isRight = right === i && algo === "binary";
              const isMid = mid === i && algo === "binary";
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center text-sm font-black transition-all duration-200"
                    style={{
                      background: isFound ? "#39FF14" : isMid ? "#f97316" : isCurrent ? "#ffffff" : isVisited ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.05)",
                      color: isFound ? "#000" : isMid ? "#000" : isCurrent ? "#000" : "#fff",
                      boxShadow: isFound ? "0 0 16px rgba(57,255,20,0.6)" : isCurrent ? "0 0 12px rgba(255,255,255,0.5)" : "none",
                      border: isLeft ? "2px solid #3b82f6" : isRight ? "2px solid #ef4444" : "1px solid rgba(255,255,255,0.1)",
                    }}>
                    {val}
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground">{i}</span>
                  {isLeft && <span className="text-[9px] font-mono text-blue-400">L</span>}
                  {isRight && <span className="text-[9px] font-mono text-red-400">R</span>}
                  {isMid && <span className="text-[9px] font-mono text-orange-400">M</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border border-border bg-card rounded-sm p-4">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Linear Search</div>
          <div className="text-xs text-muted-foreground">Time: <span className="text-primary font-mono">O(n)</span> · Space: <span className="text-primary font-mono">O(1)</span></div>
          <div className="text-xs text-muted-foreground mt-1">Works on unsorted arrays. Checks every element.</div>
        </div>
        <div className="border border-border bg-card rounded-sm p-4">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Binary Search</div>
          <div className="text-xs text-muted-foreground">Time: <span className="text-primary font-mono">O(log n)</span> · Space: <span className="text-primary font-mono">O(1)</span></div>
          <div className="text-xs text-muted-foreground mt-1">Requires sorted array. Halves search space each step.</div>
        </div>
      </div>
    </div>
  );
}
