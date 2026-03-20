"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Clock } from "lucide-react";

const questions = [
  { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1, topic: "DSA" },
  { q: "Which data structure uses LIFO order?", options: ["Queue", "Array", "Stack", "Linked List"], answer: 2, topic: "DSA" },
  { q: "What hook is used for side effects in React?", options: ["useState", "useRef", "useEffect", "useMemo"], answer: 2, topic: "Web Dev" },
  { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"], answer: 0, topic: "Database" },
  { q: "Which sorting algorithm has the best average case?", options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"], answer: 1, topic: "DSA" },
  { q: "What is a closure in JavaScript?", options: ["A loop construct", "A function with access to its outer scope", "A type of array", "An async function"], answer: 1, topic: "Web Dev" },
  { q: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Transmission Process", "Hyper Transfer Tech Protocol"], answer: 0, topic: "Networking" },
  { q: "Which traversal visits root first?", options: ["Inorder", "Postorder", "Preorder", "Level order"], answer: 2, topic: "DSA" },
];

const topicColors: Record<string, string> = {
  DSA: "text-blue-400 bg-blue-400/10",
  "Web Dev": "text-primary bg-primary/10",
  Database: "text-purple-400 bg-purple-400/10",
  Networking: "text-orange-400 bg-orange-400/10",
};

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const q = questions[current];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const newAnswers = [...answers];
    newAnswers[current] = i;
    setAnswers(newAnswers);
    if (i === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setCurrent(0); setSelected(null); setScore(0);
    setDone(false); setAnswers(Array(questions.length).fill(null));
  };

  const percent = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-background pb-24">
      <section className="relative py-16 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-px bg-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Daily Challenge</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">
            Coding <span className="text-primary">Quiz</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-sm">Test your knowledge across DSA, Web Dev, and more.</p>
        </div>
      </section>

      <div className="container py-12 max-w-2xl">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-muted-foreground">{current + 1} / {questions.length}</span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-sm ${topicColors[q.topic]}`}>{q.topic}</span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Clock className="h-3 w-3" /> Score: {score}
                </div>
              </div>
              <div className="h-1 bg-muted rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${((current) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Question */}
              <div className="border border-border bg-card rounded-sm p-6 mb-6">
                <h2 className="text-lg font-black tracking-tight leading-snug">{q.q}</h2>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt, i) => {
                  let style = "border-border text-foreground hover:border-primary/50";
                  if (selected !== null) {
                    if (i === q.answer) style = "border-primary bg-primary/10 text-primary";
                    else if (i === selected && i !== q.answer) style = "border-destructive bg-destructive/10 text-destructive";
                    else style = "border-border text-muted-foreground opacity-50";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left px-5 py-3.5 border rounded-sm text-sm font-semibold transition-all flex items-center justify-between group ${style}`}
                    >
                      <span>{opt}</span>
                      {selected !== null && i === q.answer && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      {selected !== null && i === selected && i !== q.answer && <XCircle className="h-4 w-4 text-destructive" />}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-end">
                  <button
                    onClick={next}
                    className="flex items-center gap-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-primary/90 transition-all glow-green"
                  >
                    {current + 1 < questions.length ? "Next Question" : "See Results"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="border border-border bg-card rounded-sm p-10 mb-8">
                <Trophy className={`h-12 w-12 mx-auto mb-4 ${percent >= 70 ? "text-primary" : "text-muted-foreground"}`} />
                <div className="text-6xl font-black text-primary mb-2">{percent}%</div>
                <p className="text-lg font-bold mb-1">{score} / {questions.length} Correct</p>
                <p className="text-muted-foreground text-sm">
                  {percent === 100 ? "Perfect score! You're a genius 🔥" : percent >= 70 ? "Great job! Keep it up 💪" : "Keep practicing, you'll get there! 📚"}
                </p>
              </div>

              {/* Answer review */}
              <div className="border border-border rounded-sm overflow-hidden mb-8 text-left">
                <div className="px-5 py-3 border-b border-border bg-muted/30">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Review</span>
                </div>
                {questions.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 px-5 py-3 border-b border-border/50 last:border-0">
                    {answers[i] === q.answer
                      ? <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      : <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />}
                    <div>
                      <p className="text-sm font-semibold">{q.q}</p>
                      <p className="text-xs text-primary mt-0.5">✓ {q.options[q.answer]}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={reset}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-primary/90 transition-all glow-green"
              >
                <RotateCcw className="h-4 w-4" /> Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
