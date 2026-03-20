"use client";
import { useState } from "react";

interface TreeNode { val: number; left?: TreeNode; right?: TreeNode; x?: number; y?: number; id?: number; }

function insert(root: TreeNode | undefined, val: number, id: number): TreeNode {
  if (!root) return { val, id };
  if (val < root.val) return { ...root, left: insert(root.left, val, id) };
  if (val > root.val) return { ...root, right: insert(root.right, val, id) };
  return root;
}

function assignPositions(node: TreeNode | undefined, depth: number, counter: { val: number }, spacing: number): TreeNode | undefined {
  if (!node) return undefined;
  const left = assignPositions(node.left, depth + 1, counter, spacing);
  const x = counter.val * spacing + 30;
  counter.val++;
  const right = assignPositions(node.right, depth + 1, counter, spacing);
  return { ...node, x, y: depth * 70 + 40, left, right };
}

function collectNodes(node: TreeNode | undefined, nodes: TreeNode[], edges: { x1: number; y1: number; x2: number; y2: number }[]) {
  if (!node) return;
  nodes.push(node);
  if (node.left) { edges.push({ x1: node.x!, y1: node.y!, x2: node.left.x!, y2: node.left.y! }); collectNodes(node.left, nodes, edges); }
  if (node.right) { edges.push({ x1: node.x!, y1: node.y!, x2: node.right.x!, y2: node.right.y! }); collectNodes(node.right, nodes, edges); }
}

function traverse(node: TreeNode | undefined, type: string): number[] {
  if (!node) return [];
  if (type === "inorder") return [...traverse(node.left, type), node.val, ...traverse(node.right, type)];
  if (type === "preorder") return [node.val, ...traverse(node.left, type), ...traverse(node.right, type)];
  return [...traverse(node.left, type), ...traverse(node.right, type), node.val];
}

const DEFAULT_VALUES = [50, 30, 70, 20, 40, 60, 80];

export default function TreeVisualizer() {
  const [root, setRoot] = useState<TreeNode | undefined>(() => {
    let r: TreeNode | undefined;
    DEFAULT_VALUES.forEach((v, i) => { r = insert(r, v, i); });
    return r;
  });
  const [input, setInput] = useState("");
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [traversalType, setTraversalType] = useState("");
  const [idCounter, setIdCounter] = useState(DEFAULT_VALUES.length);

  const handleInsert = () => {
    const val = parseInt(input);
    if (isNaN(val)) return;
    setRoot(r => insert(r, val, idCounter));
    setIdCounter(c => c + 1);
    setInput("");
    setHighlighted([]);
    setTraversalResult([]);
  };

  const handleTraversal = async (type: string) => {
    setTraversalType(type);
    const result = traverse(root, type);
    setTraversalResult(result);
    for (let i = 0; i < result.length; i++) {
      setHighlighted(result.slice(0, i + 1));
      await new Promise(r => setTimeout(r, 500));
    }
  };

  const positioned = assignPositions(root, 0, { val: 0 }, 55);
  const nodes: TreeNode[] = [];
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  collectNodes(positioned, nodes, edges);

  const maxX = Math.max(...nodes.map(n => n.x || 0)) + 50;
  const maxY = Math.max(...nodes.map(n => n.y || 0)) + 40;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleInsert()}
          placeholder="Enter value..." type="number"
          className="bg-card border border-border rounded-sm px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary w-40" />
        <button onClick={handleInsert} className="bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-sm hover:bg-primary/90 glow-green">Insert</button>
        <button onClick={() => { setRoot(undefined); setHighlighted([]); setTraversalResult([]); setIdCounter(0); }}
          className="border border-border bg-card text-muted-foreground font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-sm hover:border-primary/50">Clear</button>
        <div className="flex gap-2 ml-auto flex-wrap">
          {[["inorder", "Inorder"], ["preorder", "Preorder"], ["postorder", "Postorder"]].map(([type, label]) => (
            <button key={type} onClick={() => handleTraversal(type)}
              className={`font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-sm border transition-all ${traversalType === type ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:border-primary/40"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {traversalResult.length > 0 && (
        <div className="border border-border bg-card rounded-sm p-4">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mr-3">{traversalType}:</span>
          <span className="text-sm font-mono text-primary">[{traversalResult.join(", ")}]</span>
        </div>
      )}

      <div className="border border-border rounded-sm bg-card overflow-auto" style={{ background: "rgba(10,10,10,0.5)" }}>
        <svg width="100%" viewBox={`0 0 ${Math.max(maxX + 20, 400)} ${Math.max(maxY + 20, 200)}`} style={{ minHeight: "260px" }}>
          {edges.map((e, i) => (
            <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="rgba(57,255,20,0.3)" strokeWidth="1.5" />
          ))}
          {nodes.map((n, i) => {
            const isHighlighted = highlighted.includes(n.val);
            return (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r="20"
                  fill={isHighlighted ? "#39FF14" : "rgba(57,255,20,0.1)"}
                  stroke={isHighlighted ? "#39FF14" : "rgba(57,255,20,0.4)"}
                  strokeWidth="1.5"
                  style={{ transition: "all 0.3s" }} />
                <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
                  fill={isHighlighted ? "#000" : "#fff"} fontSize="12" fontWeight="700" fontFamily="monospace">
                  {n.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[["Inorder", "Left → Root → Right", "Gives sorted output for BST"], ["Preorder", "Root → Left → Right", "Used to copy/serialize tree"], ["Postorder", "Left → Right → Root", "Used to delete tree"]].map(([name, order, use]) => (
          <div key={name} className="border border-border bg-card rounded-sm p-4">
            <div className="text-xs font-black mb-1">{name}</div>
            <div className="text-[10px] font-mono text-primary mb-1">{order}</div>
            <div className="text-[10px] text-muted-foreground">{use}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
