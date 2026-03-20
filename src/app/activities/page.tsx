"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Calendar, 
  Code2, 
  Award, 
  Flame, 
  Star, 
  TrendingUp, 
  BookOpen, 
  CheckCircle2, 
  UserCircle2 
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const userVars = {
    name: "Alex Dev",
    rank: 42,
    points: 1250,
    streak: 15,
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", stiffness: 100 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 mb-20 fade-in-up">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col md:flex-row items-center justify-between bg-card p-6 rounded-3xl border shadow-sm backdrop-blur-sm"
        >
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="relative">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border-4 border-background">
                <UserCircle2 className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-background flex items-center">
                <Star className="w-3 h-3 mr-1 fill-white" /> Pro
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, {userVars.name}!</h1>
              <p className="text-muted-foreground flex items-center mt-1">
                <Flame className="w-4 h-4 text-orange-500 mr-1" /> {userVars.streak} Day Streak
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link href="/events" className="px-6 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full font-medium transition-colors">
              Browse Events
            </Link>
            <Link href="/learn" className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-medium transition-colors shadow-sm shadow-primary/30">
              Continue Learning
            </Link>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Leaderboard Position */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6 rounded-3xl border border-yellow-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl group-hover:bg-yellow-500/30 transition-colors" />
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-background rounded-2xl shadow-sm">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-xs font-semibold bg-background/50 px-2 py-1 rounded-full border">Top 5%</span>
            </div>
            <h3 className="text-muted-foreground font-medium mb-1">Global Rank</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-foreground">#{userVars.rank}</span>
              <span className="text-sm text-green-500 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+5</span>
            </div>
          </motion.div>

          {/* Card 2: Coding Progress */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-3xl border border-blue-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-colors" />
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-background rounded-2xl shadow-sm">
                <Code2 className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-semibold bg-background/50 px-2 py-1 rounded-full border">{userVars.points} XP</span>
            </div>
            <h3 className="text-muted-foreground font-medium mb-1">Problems Solved</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-foreground">128</span>
              <span className="text-sm text-muted-foreground">/ 500</span>
            </div>
            <div className="w-full bg-muted mt-4 h-2 rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-blue-500 rounded-full" />
            </div>
          </motion.div>

          {/* Card 3: Events Registered */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-3xl border border-purple-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-colors" />
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-background rounded-2xl shadow-sm">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-muted-foreground font-medium mb-1">Upcoming Events</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-foreground">3</span>
            </div>
            <div className="mt-4 text-sm font-medium text-foreground flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse" />
              Hackathon this weekend
            </div>
          </motion.div>

          {/* Card 4: Achievements */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-3xl border border-green-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/30 transition-colors" />
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-background rounded-2xl shadow-sm">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-semibold bg-background/50 px-2 py-1 rounded-full border">New!</span>
            </div>
            <h3 className="text-muted-foreground font-medium mb-1">Badges Earned</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-foreground">12</span>
            </div>
            <div className="flex mt-4 -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center ${i === 1 ? 'bg-yellow-400 text-yellow-900' : i === 2 ? 'bg-slate-300 text-slate-800' : 'bg-orange-800 text-orange-200'}`}>
                  <Star className="w-4 h-4 fill-current" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                +9
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Recent Activity */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2 bg-card p-8 rounded-3xl border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Recent Activity
              </h2>
              <Link href="#" className="text-sm text-primary hover:underline font-medium">View All</Link>
            </div>
            <div className="space-y-6">
              {[
                { title: "Solved 'Two Sum' Problem", time: "2 hours ago", type: "code", points: "+15 XP" },
                { title: "Registered for Web Dev Bootcamp", time: "1 day ago", type: "event", points: "Upcoming" },
                { title: "Earned '7-Day Streak' Badge", time: "3 days ago", type: "badge", points: "+50 XP" },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between group hover:bg-muted/50 p-3 rounded-2xl transition-colors -mx-3">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                      act.type === 'code' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 
                      act.type === 'event' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' : 
                      'bg-green-100 text-green-600 dark:bg-green-900/30'
                    }`}>
                      {act.type === 'code' ? <Code2 className="w-5 h-5" /> : act.type === 'event' ? <Calendar className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">{act.title}</p>
                      <p className="text-xs text-muted-foreground">{act.time}</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold bg-background border px-3 py-1 rounded-full shadow-sm">
                    {act.points}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Registered Events */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="bg-card p-8 rounded-3xl border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10" />
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Registered Events
            </h2>
            <div className="space-y-4">
              <div className="border border-primary/20 bg-primary/5 rounded-2xl p-4 cursor-pointer hover:bg-primary/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-primary bg-background px-2 py-1 rounded-lg border">This Saturday</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">DSA Workshop for Beginners</h3>
                <p className="text-xs text-muted-foreground flex items-center mb-3">
                  <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" /> Registration Confirmed
                </p>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold">
                      U{i}
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary border-2 border-background flex items-center justify-center text-[10px] font-bold">
                    +42
                  </div>
                </div>
              </div>

              <div className="border rounded-2xl p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-lg border">Next Week, Tue</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">Web3 Introduction Talk</h3>
                <p className="text-xs text-muted-foreground flex items-center">
                  <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" /> Registration Confirmed
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
