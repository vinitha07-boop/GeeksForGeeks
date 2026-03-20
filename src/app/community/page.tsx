"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Flame, Code, ChevronUp, ChevronDown, Minus } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Alex Johnson", points: 1250, problems: 342, streak: 45, badge: "Grandmaster", trend: "up" },
  { rank: 2, name: "Samantha Lee", points: 1180, problems: 298, streak: 30, badge: "Master", trend: "up" },
  { rank: 3, name: "David Chen", points: 1050, problems: 256, streak: 12, badge: "Expert", trend: "down" },
  { rank: 4, name: "Priya Sharma", points: 980, problems: 210, streak: 8, badge: "Expert", trend: "same" },
  { rank: 5, name: "Michael O'Connor", points: 840, problems: 185, streak: 21, badge: "Specialist", trend: "up" },
  { rank: 6, name: "Emily Watson", points: 790, problems: 160, streak: 5, badge: "Specialist", trend: "down" },
  { rank: 7, name: "Raj Patel", points: 650, problems: 120, streak: 2, badge: "Pupil", trend: "same" },
  { rank: 8, name: "Sarah Miller", points: 580, problems: 95, streak: 14, badge: "Pupil", trend: "up" },
];

const badgeStyles: Record<string, { color: string; bg: string }> = {
  Grandmaster: { color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  Master: { color: "#F97316", bg: "rgba(249,115,22,0.1)" },
  Expert: { color: "#A855F7", bg: "rgba(168,85,247,0.1)" },
  Specialist: { color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
  Pupil: { color: "#39FF14", bg: "rgba(57,255,20,0.1)" },
};

const top3 = leaderboardData.slice(0, 3);
const rest = leaderboardData.slice(3);

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">

      {/* Hero */}
      <section className="relative py-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-px bg-primary" />
              <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Rankings</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4">
              Community<br /><span className="text-primary">Leaderboard</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Solve problems, attend events, and climb the ranks to become the top coder at RIT.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main table */}
          <div className="lg:col-span-2">
            {/* Top 3 podium */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {[top3[1], top3[0], top3[2]].map((user, i) => {
                const actualRank = [2, 1, 3][i];
                const heights = ["h-20", "h-28", "h-16"];
                const medalColors = ["text-slate-400", "text-yellow-400", "text-amber-600"];
                return (
                  <motion.div
                    key={user.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative flex flex-col items-center border border-border rounded-sm bg-card p-4 ${actualRank === 1 ? "border-primary/40 glow-green" : ""}`}
                  >
                    <div className={`${medalColors[i]} font-black text-2xl mb-1`}>
                      {actualRank === 1 ? <Trophy className="h-7 w-7" /> : <Medal className="h-6 w-6" />}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground mb-1">#{actualRank}</div>
                    <div className="font-black text-sm text-center leading-tight mb-1">{user.name.split(" ")[0]}</div>
                    <div
                      className="text-[10px] font-bold px-2 py-0.5 rounded-sm"
                      style={{ color: badgeStyles[user.badge].color, background: badgeStyles[user.badge].bg }}
                    >
                      {user.badge}
                    </div>
                    <div className="mt-2 text-primary font-black text-lg">{user.points.toLocaleString()}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">pts</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Table */}
            <div className="border border-border rounded-sm overflow-hidden">
              <div className="grid grid-cols-12 text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-muted/30 border-b border-border px-3 py-3">
                <span className="col-span-1">#</span>
                <span className="col-span-5 sm:col-span-4">Student</span>
                <span className="col-span-3 hidden sm:block">Level</span>
                <span className="col-span-3 sm:col-span-2 text-right">Pts</span>
                <span className="col-span-3 sm:col-span-2 text-right hidden sm:block">Streak</span>
              </div>

              {rest.map((user, index) => (
                <motion.div
                  key={user.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="group grid grid-cols-12 items-center px-3 py-3 border-b border-border/50 last:border-0 hover:bg-card transition-colors relative"
                >
                  <div className="col-span-1 flex items-center gap-1">
                    <span className="text-sm font-bold text-muted-foreground">{user.rank}</span>
                    {user.trend === "up" && <ChevronUp className="h-3 w-3 text-primary" />}
                    {user.trend === "down" && <ChevronDown className="h-3 w-3 text-destructive" />}
                    {user.trend === "same" && <Minus className="h-3 w-3 text-muted-foreground/40" />}
                  </div>
                  <div className="col-span-5 sm:col-span-4">
                    <div className="font-bold text-sm">{user.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">{user.problems} solved</div>
                  </div>
                  <div className="col-span-3 hidden sm:block">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-sm"
                      style={{ color: badgeStyles[user.badge].color, background: badgeStyles[user.badge].bg }}
                    >
                      {user.badge}
                    </span>
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-right font-black text-primary text-sm">{user.points.toLocaleString()}</div>
                  <div className="col-span-3 sm:col-span-2 text-right items-center justify-end gap-1 text-xs font-mono hidden sm:flex">
                    <Flame className="h-3 w-3 text-orange-400" />
                    <span>{user.streak}d</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Rank */}
            <div className="border border-primary/30 rounded-sm bg-card p-5 glow-green">
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest block mb-4">Your Position</span>
              <div className="text-5xl font-black text-primary mb-1">#24</div>
              <div className="text-sm text-muted-foreground">of 500+ members</div>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Code className="h-3.5 w-3.5 text-primary" />
                <span>85 problems solved</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Flame className="h-3.5 w-3.5 text-orange-400" />
                <span>7 day streak</span>
              </div>
              <div className="mt-5 h-1 bg-muted rounded-full">
                <div className="h-full bg-primary rounded-full w-[17%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
                <span>You</span>
                <span>→ #20</span>
              </div>
            </div>

            {/* Badge legend */}
            <div className="border border-border rounded-sm bg-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Badge Tiers</span>
              </div>
              {Object.entries(badgeStyles).map(([badge, style]) => (
                <div key={badge} className="flex items-center justify-between px-5 py-2.5 border-b border-border/50 last:border-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm" style={{ color: style.color, background: style.bg }}>{badge}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {badge === "Grandmaster" ? "1000+" : badge === "Master" ? "800+" : badge === "Expert" ? "600+" : badge === "Specialist" ? "400+" : "0+"}
                    {" "}pts
                  </span>
                </div>
              ))}
            </div>

            {/* Weekly challenge */}
            <div className="border border-border rounded-sm bg-card p-5">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-3">This Week's Challenge</span>
              <h3 className="font-black text-base mb-2 leading-tight">Implement a Trie from Scratch</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">Insert, Search, and StartsWith operations. Top 10 submissions win bonus points.</p>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>142 submissions</span>
                <span className="text-primary">3 days left</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
