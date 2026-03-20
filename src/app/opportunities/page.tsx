"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Clock, ArrowUpRight, Search, Briefcase, Building2, Zap } from "lucide-react";

const opportunities = [
  { id: 1, title: "Frontend Developer Intern", company: "Zoho Corporation", location: "Chennai", type: "Internship", mode: "Hybrid", duration: "6 months", skills: ["React", "TypeScript", "CSS"], posted: "2 days ago", hot: true },
  { id: 2, title: "SDE Intern – Summer 2026", company: "Amazon", location: "Bangalore", type: "Internship", mode: "Onsite", duration: "3 months", skills: ["DSA", "Java", "System Design"], posted: "1 week ago", hot: true },
  { id: 3, title: "Full Stack Developer", company: "Freshworks", location: "Chennai", type: "Full Time", mode: "Hybrid", duration: "Permanent", skills: ["Node.js", "React", "MongoDB"], posted: "3 days ago", hot: false },
  { id: 4, title: "Data Science Intern", company: "Mu Sigma", location: "Remote", type: "Internship", mode: "Remote", duration: "4 months", skills: ["Python", "ML", "Pandas"], posted: "5 days ago", hot: false },
  { id: 5, title: "Backend Engineer", company: "Chargebee", location: "Chennai", type: "Full Time", mode: "Onsite", duration: "Permanent", skills: ["Go", "Kubernetes", "PostgreSQL"], posted: "1 day ago", hot: true },
  { id: 6, title: "Open Source Contributor", company: "GFG×RIT", location: "Remote", type: "Volunteer", mode: "Remote", duration: "Ongoing", skills: ["Next.js", "TypeScript", "Git"], posted: "Today", hot: false },
];

const typeConfig: Record<string, { color: string; bg: string; border: string }> = {
  Internship: { color: "#3B82F6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
  "Full Time": { color: "#39FF14", bg: "rgba(57,255,20,0.07)", border: "rgba(57,255,20,0.2)" },
  Volunteer: { color: "#A855F7", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)" },
};

const filters = ["All", "Internship", "Full Time", "Volunteer"];

export default function OpportunitiesPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = opportunities.filter(o =>
    (filter === "All" || o.type === filter) &&
    (o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.company.toLowerCase().includes(search.toLowerCase()) ||
      o.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
  );

  const counts = { total: opportunities.length, internships: opportunities.filter(o => o.type === "Internship").length, fulltime: opportunities.filter(o => o.type === "Full Time").length };

  return (
    <div className="min-h-screen bg-background pb-24">

      {/* Hero */}
      <section className="relative py-14 sm:py-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2" style={{ background: "radial-gradient(ellipse at 100% 50%, rgba(57,255,20,0.05) 0%, transparent 65%)" }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-px bg-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Opportunities</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4">
            Jobs &<br /><span className="text-primary">Internships</span>
          </h1>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-10">
            Curated opportunities from top companies, shared by our alumni and club partners. Updated weekly.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Briefcase, label: "Open Roles", value: counts.total, filter: "All" },
              { icon: Building2, label: "Internships", value: counts.internships, filter: "Internship" },
              { icon: Zap, label: "Full Time", value: counts.fulltime, filter: "Full Time" },
            ].map(({ icon: Icon, label, value, filter: f }) => (
              <button key={label} onClick={() => setFilter(f)}
                className={`flex items-center gap-3 border rounded-sm px-5 py-3 transition-all hover:border-primary/50 hover:bg-card ${filter === f ? "border-primary bg-primary/5 glow-green" : "border-border bg-card"}`}>
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-xl font-black text-primary">{value}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky filters */}
      <section className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-16 z-30">
        <div className="container py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest border rounded-sm transition-all ${filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles, skills..."
              className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-sm focus:outline-none focus:border-primary transition-colors font-mono placeholder:text-muted-foreground/50" />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="container py-8 sm:py-12">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((job, i) => {
              const tc = typeConfig[job.type];
              return (
                <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="group border border-border bg-card rounded-sm p-6 hover:border-primary/40 transition-all duration-300 relative overflow-hidden flex flex-col">

                  {/* Hot badge */}
                  {job.hot && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-sm">Hot</div>
                    </div>
                  )}

                  {/* Type + posted */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-sm border" style={{ color: tc.color, background: tc.bg, borderColor: tc.border }}>{job.type}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{job.posted}</span>
                  </div>

                  {/* Title + company */}
                  <h3 className="font-black text-base tracking-tight mb-1 group-hover:text-primary transition-colors leading-tight pr-8">{job.title}</h3>
                  <div className="flex items-center gap-2 mb-5">
                    <Building2 className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm text-muted-foreground font-semibold">{job.company}</p>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-1.5 text-xs font-mono text-muted-foreground mb-5">
                    <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-primary flex-shrink-0" />{job.location} · {job.mode}</div>
                    <div className="flex items-center gap-2"><Clock className="h-3 w-3 text-primary flex-shrink-0" />{job.duration}</div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {job.skills.map(s => (
                      <span key={s} className="text-[10px] font-mono bg-muted text-muted-foreground px-2 py-1 rounded-sm">{s}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-border">
                    <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link">
                      Apply Now <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-border rounded-sm">
            <p className="text-muted-foreground font-mono text-sm">No opportunities found. Try different filters.</p>
          </div>
        )}

        {/* Submit CTA */}
        <div className="mt-14 border border-primary/20 rounded-sm bg-card p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative z-10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse mx-auto mb-4" />
            <h3 className="font-black text-2xl mb-2">Know of an opportunity?</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">Alumni and partners can submit roles to be featured here for our 500+ member community.</p>
            <a href="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-primary/90 transition-all glow-green">
              Submit a Role <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
