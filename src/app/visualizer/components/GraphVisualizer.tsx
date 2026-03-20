"use client";
import { useState, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";

const NODES = [
  { id: 0, x: 300, y: 80, label: "A" },
  { id: 1, x: 160, y: 180, label: "B" },
  { id: 2, x: 440, y: 180, label: "C" },
  { id: 3, x: 100, y: 300, label: "D" },
  { id: 4, x: 240, y: 300, label: "E" },
  { id: 5, x: 380, y: 300, label: "F" },
  { id: 6, x: 500, y: 300, label: "G" },
];

const EDGES = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[4,5]];

const ADJ: number[][] = NODES.map(() => []);
EDGES.forEach(([a, b]: [number, number]) => { ADJ[a].push(b); ADJ[b].push(a); });

export default function GraphVisualizer() {
  const [algo, setAlgo] = useState("bfs");
  const [visited, setVisited] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [queue, setQueue] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState(0);
  const [traversalOrder, setTraversalOrder] = useState<string[]>([]);
  const stopRef = useRef(false);

  const sleep = () => new Promise(r => setTimeout(r, 700));

  const reset = () => {
    stopRef.current = true;
    setTimeout(() => { setRunning(false); setVisited([]); setCurrent(null); setQueue([]); setSteps(0); setTraversalOrder([]); }, 100);
  };

  const runBFS = async () => {
    stopRef.current = false; setRunning(true); setVisited([]); setCurrent(null); setQueue([]); setSteps(0); setTraversalOrder([]);
    const vis = new Set<number>();
    const q = [0]; vis.add(0);
    setQueue([...q]);
    while (q.length > 0) {
      if (stopRef.current) { setRunning(false); return; }
      const node = q.shift()! as number;
      setCurrent(node); setVisited([...vis]); setSteps(s => s + 1);
      setTraversalOrder(p => [...p, NODES[node].label]);
      await sleep();
      for (const nb of ADJ[node]) {
        if (!vis.has(nb)) { vis.add(nb); q.push(nb); }
      }
      setQueue([...q]);
      await sleep();
    }
    setCurrent(null); setRunning(false);
  };

  const runDFS = async () => {
    stopRef.current = false; setRunning(true); setVisited([]); setCurrent(null); setQueue([]); setSteps(0); setTraversalOrder([]);
    const vis = new Set<number>();
    const dfs = async (node: number) => {
      if (stopRef.current || vis.has(node)) return;
      vis.add(node); setCurrent(node); setVisited([...vis]); setSteps(s => s + 1);
      setTraversalOrder(p => [...p, NODES[node].label]);
      await sleep();
      for (const nb of ADJ[node]) { await dfs(nb); }
    };
    await dfs(0);
    setCurrent(null); setRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[["bfs", "BFS (Breadth First)"], ["dfs", "DFS (Depth First)"]].map(([id, name]) => (
          <button key={id} onClick={() => { if (!running) { setAlgo(id); reset(); } }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border rounded-sm transition-all ${algo === id ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:border-primary/40"}`}>
            {name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={running ? () => { stopRef.current = true; } : (algo === "bfs" ? runBFS : runDFS)}
          className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all ${running ? "bg-destructive/80 text-white" : "bg-primary text-primary-foreground glow-green"}`}>
          <Play className="h-3.5 w-3.5" />{running ? "Stop" : `Run ${algo.toUpperCase()}`}
        </button>
        <button onClick={reset} disabled={running} className="flex items-center gap-2 border border-border bg-card text-muted-foreground font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-sm disabled:opacity-30">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
        {traversalOrder.length > 0 && (
          <div className="border border-border bg-card rounded-sm px-4 py-2 text-xs font-mono ml-auto">
            <span className="text-muted-foreground">Order: </span>
            <span className="text-primary">{traversalOrder.join(" → ")}</span>
          </div>
        )}
        {queue.length > 0 && (
          <div className="border border-border bg-card rounded-sm px-4 py-2 text-xs font-mono">
            <span className="text-muted-foreground">{algo === "bfs" ? "Queue" : "Stack"}: </span>
            <span className="text-orange-400">[{queue.map(q => NODES[q].label).join(", ")}]</span>
          </div>
        )}
      </div>

      <div className="border border-border rounded-sm bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-muted/30">
          <span className="text-xs font-mono text-muted-foreground">Starting from node A · {EDGES.length} edges · {NODES.length} nodes</span>
        </div>
        <div style={{ background: "rgba(10,10,10,0.5)" }}>
          <svg width="100%" viewBox="0 0 600 380">
            {EDGES.map(([a, b], i) => {
              const na = NODES[a], nb = NODES[b];
              const isActive = (current === a && visited.includes(b)) || (current === b && visited.includes(a));
              return (
                <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={isActive ? "#39FF14" : "rgba(57,255,20,0.2)"}
                  strokeWidth={isActive ? "2" : "1"}
                  style={{ transition: "all 0.3s" }} />
              );
            })}
            {NODES.map((n) => {
              const isVisited = visited.includes(n.id);
              const isCurrent = current === n.id;
              return (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r="26"
                    fill={isCurrent ? "#39FF14" : isVisited ? "rgba(57,255,20,0.2)" : "rgba(255,255,255,0.05)"}
                    stroke={isCurrent ? "#39FF14" : isVisited ? "rgba(57,255,20,0.5)" : "rgba(255,255,255,0.2)"}
                    strokeWidth={isCurrent ? "2.5" : "1.5"}
                    style={{ transition: "all 0.3s", filter: isCurrent ? "drop-shadow(0 0 8px rgba(57,255,20,0.8))" : "none" }} />
                  <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
                    fill={isCurrent ? "#000" : "#fff"} fontSize="15" fontWeight="700" fontFamily="monospace">
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border border-border bg-card rounded-sm p-4">
          <div className="text-xs font-black mb-2">BFS — Breadth First Search</div>
          <div className="text-[10px] font-mono text-primary mb-1">Time: O(V+E) · Space: O(V)</div>
          <div className="text-[10px] text-muted-foreground">Explores level by level. Uses a Queue. Finds shortest path in unweighted graphs.</div>
        </div>
        <div className="border border-border bg-card rounded-sm p-4">
          <div className="text-xs font-black mb-2">DFS — Depth First Search</div>
          <div className="text-[10px] font-mono text-primary mb-1">Time: O(V+E) · Space: O(V)</div>
          <div className="text-[10px] text-muted-foreground">Explores as deep as possible. Uses a Stack/Recursion. Used in cycle detection, topological sort.</div>
        </div>
      </div>
    </div>
  );
}
