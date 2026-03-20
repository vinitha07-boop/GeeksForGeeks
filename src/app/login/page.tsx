"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Eye, EyeOff, Check, X, Github, Mail, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) return setError("Email is required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Password is required.");
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      if (email === "test@gfg.com" && password === "wrong") {
        setError("Invalid credentials. Please try again.");
      } else {
        login({ name: "Alex Dev", email });
        router.push("/community");
      }
    }, 2000);
  };

  const terminalLines = [
    { text: "$ ssh student@gfg-rit.dev", color: "text-muted-foreground" },
    { text: "Connecting to GFG × RIT servers...", color: "text-muted-foreground" },
    { text: "✓ Connection established", color: "text-primary" },
    { text: "$ whoami", color: "text-muted-foreground" },
    { text: "developer", color: "text-foreground" },
    { text: "$ cat mission.txt", color: "text-muted-foreground" },
    { text: "Code. Learn. Build. Repeat.", color: "text-primary" },
    { text: "$ join --club gfg-rit", color: "text-muted-foreground" },
    { text: "Welcome to the community. 🚀", color: "text-primary" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col relative overflow-hidden border-r border-border">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(57,255,20,0.07) 0%, transparent 60%)" }} />

        <div className="relative z-10 flex flex-col h-full p-12">
          <Link href="/" className="flex items-center gap-3 mb-auto">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center glow-green">
              <Terminal className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-black text-lg tracking-tight">GFG<span className="text-primary">×</span>RIT</span>
          </Link>

          <div className="py-16 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-primary uppercase tracking-[0.25em]">Secure Login Portal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none">
              Welcome<br /><span className="text-primary">Back,</span><br />Developer.
            </h1>
            <p className="text-muted-foreground max-w-xs leading-relaxed text-sm">
              Sign in to access your dashboard, track progress, and connect with 500+ developers at RIT.
            </p>
          </div>

          {/* Terminal block */}
          <div className="border border-border rounded-sm bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-2">terminal</span>
            </div>
            <div className="p-5 font-mono text-xs space-y-1.5">
              {terminalLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className={line.color}
                >
                  {line.text}
                </motion.p>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="inline-block w-2 h-3.5 bg-primary animate-blink"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center glow-green">
              <Terminal className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-black text-lg tracking-tight">GFG<span className="text-primary">×</span>RIT</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tight mb-2">Sign In</h2>
            <p className="text-muted-foreground text-sm">
              No account?{" "}
              <Link href="/register" className="text-primary hover:underline font-semibold">Create one free</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-destructive text-sm"
                >
                  <X className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@rit.edu"
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formLoading || isSuccess}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest py-3.5 rounded-sm hover:bg-primary/90 transition-all disabled:opacity-70 glow-green"
            >
              <AnimatePresence mode="wait">
                {formLoading ? (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </motion.span>
                ) : isSuccess ? (
                  <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </motion.span>
                ) : (
                  <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    Sign In <ArrowRight className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-mono text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Mail, label: "Google" },
              { icon: Github, label: "GitHub" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center gap-2 border border-border bg-card rounded-sm py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
