"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar as CalendarIcon, Clock, MapPin, Search, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export const allEvents = [
  { id: "1", title: "DSA Bootcamp: Arrays & Strings", date: "Oct 15, 2026", time: "4:00 PM – 6:00 PM", location: "GOL-1400", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop", category: "Workshop", status: "Upcoming", description: "Master the fundamentals of Arrays and Strings. We will cover two-pointers, sliding window, and prefix sums with hands-on practice problems from GeeksforGeeks." },
  { id: "2", title: "Web Development with Next.js", date: "Oct 22, 2026", time: "5:00 PM – 7:30 PM", location: "Online (Discord)", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1974&auto=format&fit=crop", category: "Technical", status: "Upcoming", description: "Learn how to build modern, fast web applications using Next.js 15, Tailwind CSS, and Typescript." },
  { id: "3", title: "Campus Hackathon 2026", date: "Nov 5–6, 2026", time: "24 Hours", location: "Student Alumni Union", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1770&auto=format&fit=crop", category: "Competition", status: "Upcoming", description: "Our flagship 24-hour hackathon. Form teams of 4, build innovative solutions, and win exciting prizes." },
  { id: "4", title: "Git & GitHub Crash Course", date: "Sep 28, 2026", time: "3:00 PM – 5:00 PM", location: "GOL-1440", image: "https://images.unsplash.com/photo-1618401471353-b98a580dcbfa?q=80&w=2002&auto=format&fit=crop", category: "Workshop", status: "Past", description: "Learn version control basics, branching, merging, and how to collaborate on open-source projects." },
  { id: "5", title: "Industry Expert Talk: Cloud Architecture", date: "Sep 15, 2026", time: "6:00 PM – 7:30 PM", location: "Auditorium", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", category: "Seminar", status: "Past", description: "Guest lecture from a Senior AWS Architect on designing scalable systems and preparing for cloud certifications." },
];

const categories = ["All", "Workshop", "Technical", "Competition", "Seminar"];

export default function EventsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredEvents = allEvents.filter(event =>
    (statusFilter === "All" || event.status === statusFilter) &&
    (catFilter === "All" || event.category === catFilter) &&
    (event.title.toLowerCase().includes(search.toLowerCase()) || event.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">

      {/* Hero */}
      <section className="relative py-14 sm:py-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-px bg-primary" />
              <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Calendar</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4">
              Events &<br /><span className="text-primary">Workshops</span>
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Expert-led sessions, competitive hackathons, and networking events to accelerate your tech career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card/50 sticky top-16 z-30 backdrop-blur-sm">
        <div className="container py-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {/* Status */}
            {["All", "Upcoming", "Past"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest border rounded-sm transition-all ${
                  statusFilter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
            <div className="w-px h-6 bg-border self-center mx-1" />
            {categories.map((f) => (
              <button
                key={f}
                onClick={() => setCatFilter(f)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest border rounded-sm transition-all ${
                  catFilter === f
                    ? "border-primary/50 text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-sm focus:outline-none focus:border-primary transition-colors font-mono placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="container py-8 sm:py-16">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group flex flex-col border border-border rounded-sm overflow-hidden bg-card hover:border-primary/40 transition-all duration-300 relative"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div className={`absolute inset-0 z-10 transition-colors duration-300 ${event.status === "Past" ? "bg-background/50" : "bg-background/20 group-hover:bg-background/10"}`} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-sm">{event.category}</span>
                    {event.status === "Past" && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest rounded-sm">Past</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <h3 className="font-black text-lg tracking-tight leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{event.description}</p>

                  <div className="flex flex-col gap-1.5 text-xs font-mono text-muted-foreground mt-auto pt-3 border-t border-border">
                    <div className="flex items-center gap-2"><CalendarIcon className="h-3 w-3 text-primary" />{event.date}</div>
                    <div className="flex items-center gap-2"><Clock className="h-3 w-3 text-primary" />{event.time}</div>
                    <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-primary" />{event.location}</div>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link"
                  >
                    {event.status === "Upcoming" ? "Register Now" : "View Recap"}
                    <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-border rounded-sm">
            <p className="text-muted-foreground font-mono text-sm">No events found. Try adjusting your filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
