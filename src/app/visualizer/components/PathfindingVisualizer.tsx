"use client";
import { useState, useRef, useCallback } from "react";
import { Play, RotateCcw } from "lucide-react";

const ROWS = 15, COLS = 30;
type CellType = "empty" | "wall" | "start" | "end" | "visited" | "path";

function makeGrid(): CellType[][] {
  const g = Array.from({ length: ROWS }, () => Array(COLS).fill("empty") as CellType[]);
  g[7][3] = "start"; g[7][26] = "end"; return g;
}

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState<CellType[][]>(makeGrid);
  const [algo, setAlgo] = useState("bfs");
  const [running, setRunning] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [steps, setSteps] = useState(0);
  const [pathLen, setPathLen] = useState(0);
  const stopRef = useRef(false);

  const sleep = () => new Promise(r => setTimeout(r, 18));

  const toggleCell = useCallback((r: number, c: number) => {
    setGrid(g => {
      const ng = g.map(row => [...row]);
      if (ng[r][c] === "start" || ng[r][c] === "end") return ng;
      ng[r][c] = ng[r][c] === "wall" ? "empty" : "wall";
      return ng;
    });
  }, []);

  const reset = () => {
    stopRef.current = true;
    setTimeout(() => { setGrid(makeGrid()); setRunning(false); setSteps(0); setPathLen(0); }, 100);
  };

  const clearPath = (g: CellType[][]) => g.map(row => row.map(c => (c === "visited" || c === "path") ? "empty" : c));

  const run = async () => {
    stopRef.current = false; setRunning(true); setSteps(0); setPathLen(0);
    const g = grid.map(row => [...row] as CellType[]);
    let startR = 0, startC = 0, endR = 0, endC = 0;
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      if (g[r][c] === "start") { startR = r; startC = c; }
      if (g[r][c] === "end") { endR = r; endC = c; }
    }

    const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
    const prev: ([number, number] | null)[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    const inBounds = (r: number, c: number) => r >= 0 && r < ROWS && c >= 0 && c < COLS;

    if (algo === "bfs") {
      const q: [number, number][] = [[startR, startC]];
      const vis = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
      vis[startR][startC] = true;
      while (q.length > 0) {
        if (stopRef.current) { setRunning(false); return; }
        const [r, c] = q.shift()! as [number, number];
        if (r === endR && c === endC) break;
        for (const [dr, dc] of dirs as [number, number][]) {
          const nr = r + dr, nc = c + dc;
          if (inBounds(nr, nc) && !vis[nr][nc] && g[nr][nc] !== "wall") {
            vis[nr][nc] = true; prev[nr][nc] = [r, c]; q.push([nr, nc]);
            if (g[nr][nc] !== "end") { g[nr][nc] = "visited"; setGrid(g.map(row => [...row])); setSteps(s => s + 1); await sleep(); }
          }
        }
      }
    } else {
      // Dijkstra (same as BFS on unweighted but uses priority concept)
      const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
      dist[startR][startC] = 0;
      const pq: [number, number, number][] = [[0, startR, startC]];
      while (pq.length > 0) {
        if (stopRef.current) { setRunning(false); return; }
        pq.sort((a, b) => a[0] - b[0]);
        const [d, r, c] = pq.shift()! as [number, number, number];
        if (d > dist[r][c]) continue;
        if (r === endR && c === endC) break;
        for (const [dr, dc] of dirs as [number, number][]) {
          const nr = r + dr, nc = c + dc;
          if (inBounds(nr, nc) && g[nr][nc] !== "wall") {
            const nd = d + 1;
            if (nd < dist[nr][nc]) {
              dist[nr][nc] = nd; prev[nr][nc] = [r, c]; pq.push([nd, nr, nc]);
              if (g[nr][nc] !== "end" && g[nr][nc] !== "start") { g[nr][nc] = "visited"; setGrid(g.map(row => [...row])); setSteps(s => s + 1); await sleep(); }
            }
          }
        }
      }
    }

    // Reconstruct path
    let cur: [number, number] | null = [endR, endC] as [number, number];
    let len = 0;
    while (cur && !(cur[0] === startR && cur[1] === startC)) {
      const [r, c]: [number, number] = cur;
      if (g[r][c] !== "end" && g[r][c] !== "start") { g[r][c] = "path"; setGrid(g.map(row => [...row])); len++; await new Promise(res => setTimeout(res, 30)); }
      cur = prev[r][c] as [number, number] | null;
    }
    setPathLen(len); setRunning(false);
  };

  const cellColor: Record<CellType, string> = {
    empty: "rgba(255,255,255,0.03)", wall: "#1a1a1a", start: "#3b82f6",
    end: "#ef4444", visited: "rgba(57,255,20,0.18)", path: "#39FF14",
  };
  const cellBorder: Record<CellType, string> = {
    empty: "rgba(255,255,255,0.04)", wall: "#111", start: "#3b82f6",
    end: "#ef4444", visited: "rgba(57,255,20,0.3)", path: "#2CCF0F",
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[["bfs", "BFS"], ["dijkstra", "Dijkstra"]].map(([id, name]) => (
          <button key={id} onClick={() => { if (!running) setAlgo(id); }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border rounded-sm transition-all ${algo === id ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:border-primary/40"}`}>
            {name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={running ? () => { stopRef.current = true; } : run}
          className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm transition-all ${running ? "bg-destructive/80 text-white" : "bg-primary text-primary-foreground glow-green"}`}>
          <Play className="h-3.5 w-3.5" />{running ? "Stop" : "Find Path"}
        </button>
        <button onClick={reset} disabled={running} className="flex items-center gap-2 border border-border bg-card text-muted-foreground font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-sm disabled:opacity-30">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
        <div className="flex items-center gap-4 ml-auto text-xs font-mono">
          <span className="text-muted-foreground">Cells visited: <span className="text-primary">{steps}</span></span>
          {pathLen > 0 && <span className="text-muted-foreground">Path length: <span className="text-primary">{pathLen}</span></span>}
        </div>
      </div>

      <p className="text-xs font-mono text-muted-foreground">Click or drag on the grid to draw walls.</p>

      <div className="border border-border rounded-sm overflow-hidden" style={{ background: "rgba(10,10,10,0.8)" }}>
        <div className="p-3" onMouseLeave={() => setDrawing(false)}>
          {grid.map((row, r) => (
            <div key={r} className="flex">
              {row.map((cell, c) => (
                <div key={c}
                  onMouseDown={() => { setDrawing(true); toggleCell(r, c); }}
                  onMouseEnter={() => { if (drawing) toggleCell(r, c); }}
                  onMouseUp={() => setDrawing(false)}
                  style={{
                    width: `${100 / COLS}%`, paddingBottom: `${100 / COLS}%`, position: "relative",
                    background: cellColor[cell], border: `0.5px solid ${cellBorder[cell]}`,
                    cursor: cell === "start" || cell === "end" ? "default" : "crosshair",
                    transition: "background 0.1s",
                    boxShadow: cell === "path" ? "0 0 4px rgba(57,255,20,0.6)" : cell === "start" ? "0 0 6px rgba(59,130,246,0.6)" : cell === "end" ? "0 0 6px rgba(239,68,68,0.6)" : "none",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {[["#3b82f6", "Start"], ["#ef4444", "End"], ["rgba(57,255,20,0.18)", "Visited"], ["#39FF14", "Path"], ["#1a1a1a", "Wall"]].map(([color, label]) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm border border-border" style={{ background: color }} />
            <span className="text-xs font-mono text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
