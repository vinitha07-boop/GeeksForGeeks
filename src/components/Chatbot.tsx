"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Terminal, Loader2 } from "lucide-react";

type Message = { id: string; role: "bot" | "user"; content: string; };

const initial: Message[] = [{
  id: "1", role: "bot",
  content: "Hey! I'm the GFG×RIT AI assistant. Ask me anything about the club, events, DSA, web dev, or coding tips! 🚀"
}];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initial);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are the AI assistant for GFG×RIT — the official GeeksForGeeks developer club at Rajalakshmi Institute of Technology, Chennai. 
You help students with:
- Club info: 500+ members, 50+ events, learning hub with DSA/Web Dev/CP paths, community leaderboard
- Coding help: DSA, algorithms, data structures, web development, Next.js, React, Python, competitive programming
- Career advice: internships, placements, resume tips, interview prep
- Event info: workshops, hackathons, seminars at RIT

Be friendly, concise, and helpful. Use code examples when relevant. Keep responses short and to the point.`,
          messages: [
            ...messages.filter(m => m.id !== "1").map(m => ({ role: m.role === "bot" ? "assistant" : "user", content: m.content })),
            { role: "user", content: input }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Try again!";
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "bot", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "bot", content: "Connection error. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-primary text-primary-foreground rounded-sm flex items-center justify-center glow-green shadow-xl"
            >
              <Terminal className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse border-2 border-background" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[360px] h-[480px] sm:h-[520px] bg-card border border-border rounded-sm shadow-2xl flex flex-col overflow-hidden glow-green"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                  <Terminal className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-black">GFG×RIT Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-mono text-primary">AI Powered · Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5 ${msg.role === "bot" ? "bg-primary/20 text-primary" : "bg-muted"}`}>
                    {msg.role === "bot" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-sm text-sm leading-relaxed ${msg.role === "bot" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-sm bg-primary/20 flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="bg-muted px-3 py-2 rounded-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={send} className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-background border border-border rounded-sm px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 bg-primary text-primary-foreground rounded-sm flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors flex-shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
