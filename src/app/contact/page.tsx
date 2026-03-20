"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Plus, Minus, Send, Github, Linkedin, Disc, ArrowUpRight, Loader2, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  { question: "Do I need prior coding experience to join?", answer: "No! We welcome students of all skill levels. We have beginner-friendly paths and workshops designed specifically to help you get started with your coding journey." },
  { question: "Is there a membership fee?", answer: "No, joining the GeeksforGeeks Campus Club at RIT is completely free. We believe in making technical education accessible to everyone." },
  { question: "How often do you host events?", answer: "We typically host 2-3 events per month, including technical workshops, guest lectures, and coding competitions." },
  { question: "Can Non-CS majors join?", answer: "Absolutely! Technology intersects with every field. Whether you're in business, design, biology, or engineering, coding skills are incredibly valuable and you are welcome here." },
  { question: "How can I become part of the core team?", answer: "We open applications for core team positions at the beginning of each academic year. Active members who consistently participate have a higher chance of selection." },
];

const contacts = [
  { icon: Mail, label: "Email", value: "gfg@rit.edu", href: "mailto:gfg@rit.edu" },
  { icon: MapPin, label: "Location", value: "Kuthambakkam, Chennai – 600124", href: "#" },
  { icon: MessageSquare, label: "Discord", value: "discord.gg/gfg-rit", href: "#" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Disc, label: "Discord", href: "#" },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">

      {/* Hero */}
      <section className="relative py-14 sm:py-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-0 top-0 bottom-0 w-1/3" style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(57,255,20,0.05) 0%, transparent 70%)" }} />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-px bg-primary" />
              <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Contact</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4">
              Let's <span className="text-primary">Connect.</span>
            </h1>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Have questions about joining, events, or partnerships? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">

          {/* Left info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-px bg-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Reach Us</span>
              </div>
              <div className="space-y-0 border border-border rounded-sm overflow-hidden">
                {contacts.map(({ icon: Icon, label, value, href }, i) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-start gap-4 p-5 border-b border-border last:border-0 hover:bg-card transition-colors relative"
                  >
                    <div className="w-9 h-9 border border-border rounded-sm flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{label}</p>
                      <p className="text-sm font-semibold mt-0.5 group-hover:text-primary transition-colors">{value}</p>
                    </div>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-4 h-px bg-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Socials</span>
              </div>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <Link key={label} href={href}
                    className="flex items-center gap-2 border border-border rounded-sm px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Office hours */}
            <div className="border border-border rounded-sm bg-card p-5">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-4">Office Hours</span>
              {[
                ["Mon – Fri", "4:00 PM – 7:00 PM"],
                ["Saturday", "10:00 AM – 1:00 PM"],
                ["Sunday", "Closed"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between text-sm py-2 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground font-mono text-xs">{day}</span>
                  <span className={`font-semibold text-xs ${time === "Closed" ? "text-muted-foreground" : "text-primary"}`}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form + FAQ */}
          <div className="lg:col-span-3 space-y-10">
            {/* Contact Form */}
            <div className="border border-border rounded-sm bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Send a Message</span>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Name", placeholder: "Your full name", type: "text" },
                    { label: "Email", placeholder: "you@rit.edu", type: "email" },
                  ].map(({ label, placeholder, type }) => (
                    <div key={label} className="space-y-1.5">
                      <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        className="w-full bg-background border border-border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors font-mono placeholder:text-muted-foreground/40"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="w-full bg-background border border-border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors font-mono placeholder:text-muted-foreground/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-background border border-border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none font-mono placeholder:text-muted-foreground/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus !== "idle"}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest py-3.5 rounded-sm hover:bg-primary/90 transition-all disabled:opacity-70 glow-green"
                >
                  {formStatus === "idle" && <><Send className="h-3.5 w-3.5" /> Send Message</>}
                  {formStatus === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {formStatus === "success" && <><Check className="h-4 w-4" /> Message Sent!</>}
                </button>
              </form>
            </div>

            {/* FAQ */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-px bg-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">FAQ</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="border border-border rounded-sm overflow-hidden divide-y divide-border">
                {faqs.map((faq, i) => (
                  <div key={i} className="group">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card transition-colors"
                    >
                      <span className="text-sm font-semibold pr-4 group-hover:text-primary transition-colors">{faq.question}</span>
                      {openFaq === i
                        ? <Minus className="h-4 w-4 flex-shrink-0 text-primary" />
                        : <Plus className="h-4 w-4 flex-shrink-0 text-muted-foreground" />}
                    </button>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-4"
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
