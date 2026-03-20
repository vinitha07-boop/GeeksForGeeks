"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Eye, EyeOff, Check, X, Github, Mail, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
  { label: "Contains special character", test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return setError("Name is required.");
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return setError("Valid email required.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");

    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setIsSuccess(true);
      login({ name: form.name, email: form.email });
      setTimeout(() => router.push("/"), 1500);
    }, 2000);
  };

  const steps = ["Create Account", "Verify Email", "Join Discord", "Start Coding"];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 flex-col relative overflow-hidden border-r border-border">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(57,255,20,0.07) 0%, transparent 60%)" }} />

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
              <span className="text-xs font-mono text-primary uppercase tracking-[0.25em]">New Member Setup</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none">
              Start Your<br /><span className="text-primary">Dev Journey.</span>
            </h1>
            <p className="text-muted-foreground max-w-xs leading-relaxed text-sm">
              Join 500+ students mastering DSA, building projects, and landing their dream internships.
            </p>
          </div>

          {/* Onboarding steps */}
          <div className="space-y-0 border border-border rounded-sm overflow-hidden">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 ${i === 0 ? "bg-primary/10" : ""}`}
              >
                <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-black flex-shrink-0 ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>
                  {i + 1}
                </div>
                <span className={`text-sm font-semibold ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>{step}</span>
                {i === 0 && <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center glow-green">
              <Terminal className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-black text-lg tracking-tight">GFG<span className="text-primary">×</span>RIT</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tight mb-2">Create Account</h2>
            <p className="text-muted-foreground text-sm">
              Already a member?{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">Sign in</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {[
              { name: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
              { name: "email", label: "Email Address", placeholder: "you@rit.edu", type: "email" },
            ].map(({ name, label, placeholder, type }) => (
              <div key={name} className="space-y-1.5">
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{label}</label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono"
                />
              </div>
            ))}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono pr-12"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {passwordRules.map((rule) => (
                    <div key={rule.label} className={`flex items-center gap-1 text-[10px] font-mono ${rule.test(form.password) ? "text-primary" : "text-muted-foreground/50"}`}>
                      <Check className="h-2.5 w-2.5" />
                      <span className="truncate">{rule.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={formLoading || isSuccess}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest py-3.5 rounded-sm hover:bg-primary/90 transition-all disabled:opacity-70 glow-green"
            >
              <AnimatePresence mode="wait">
                {formLoading ? (
                  <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </motion.span>
                ) : isSuccess ? (
                  <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </motion.span>
                ) : (
                  <motion.span key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    Create Account <ArrowRight className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-mono text-muted-foreground">or sign up with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[{ icon: Mail, label: "Google" }, { icon: Github, label: "GitHub" }].map(({ icon: Icon, label }) => (
              <button key={label} type="button" className="flex items-center justify-center gap-2 border border-border bg-card rounded-sm py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <p className="text-[10px] text-muted-foreground text-center mt-6 font-mono leading-relaxed">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
