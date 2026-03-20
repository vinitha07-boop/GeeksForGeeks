"use client";

import { useState } from "react";
import SortingVisualizer from "./components/SortingVisualizer";
import SearchVisualizer from "./components/SearchVisualizer";
import GraphVisualizer from "./components/GraphVisualizer";
import TreeVisualizer from "./components/TreeVisualizer";
import PathfindingVisualizer from "./components/PathfindingVisualizer";

const TOOLS = [
  { id: "sorting", label: "Sorting", desc: "Bubble, Merge, Quick, Selection, Insertion" },
  { id: "searching", label: "Searching", desc: "Linear Search, Binary Search" },
  { id: "tree", label: "Tree", desc: "BST Insert, Inorder, Preorder, Postorder" },
  { id: "graph", label: "Graph", desc: "BFS, DFS traversal" },
  { id: "pathfinding", label: "Pathfinding", desc: "Dijkstra, BFS on grid" },
];

export default function VisualizerPage() {
  const [active, setActive] = useState("sorting");

  return (
    <div className="min-h-screen bg-background pb-24">
      <section className="relative py-14 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-px bg-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Interactive Tool</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
            Algorithm <span className="text-primary">Visualizer</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-sm max-w-lg">
            Watch algorithms come alive — sorting, searching, trees, graphs, and pathfinding.
          </p>
        </div>
      </section>

      <div className="container py-8">
        {/* Tool tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-6">
          {TOOLS.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all border ${
                active === t.id
                  ? "bg-primary text-primary-foreground border-primary glow-green"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-card"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Active tool desc */}
        <p className="text-xs font-mono text-muted-foreground mb-6">
          {TOOLS.find(t => t.id === active)?.desc}
        </p>

        {/* Render active tool */}
        {active === "sorting" && <SortingVisualizer />}
        {active === "searching" && <SearchVisualizer />}
        {active === "tree" && <TreeVisualizer />}
        {active === "graph" && <GraphVisualizer />}
        {active === "pathfinding" && <PathfindingVisualizer />}
      </div>
    </div>
  );
}
