"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const mockEvents = [
  { id: 1, title: "DSA Bootcamp: Arrays & Strings", date: "Oct 15, 2026", time: "4:00 PM – 6:00 PM", location: "GOL-1400", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop", category: "Workshop", number: "01" },
  { id: 2, title: "Web Development with Next.js", date: "Oct 22, 2026", time: "5:00 PM – 7:30 PM", location: "Online (Discord)", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop", category: "Technical", number: "02" },
  { id: 3, title: "Campus Hackathon 2026", date: "Nov 5–6, 2026", time: "24 Hours", location: "Student Alumni Union", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", category: "Competition", number: "03" },
];

export function FeaturedEvents() {
  return (
    <section className="py-12 sm:py-24 bg-background relative overflow-hidden">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-4 h-px bg-primary" />
              <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">What's Coming</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter">
              Upcoming<br />
              <span className="text-primary">Events</span>
            </h2>
          </div>
          <Link href="/events"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
            All Events
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mockEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col border border-border rounded-sm overflow-hidden bg-card hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 z-10 transition-colors duration-300" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-sm">{event.category}</span>
                </div>
                <div className="absolute bottom-3 right-3 z-20">
                  <span className="text-3xl sm:text-4xl font-black text-white/10 font-mono">{event.number}</span>
                </div>
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-1 gap-3">
                <h3 className="font-black text-base sm:text-lg tracking-tight group-hover:text-primary transition-colors leading-tight">{event.title}</h3>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-muted-foreground mt-auto pt-3 border-t border-border">
                  <div className="flex items-center gap-2"><Calendar className="h-3 w-3 text-primary flex-shrink-0" />{event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="h-3 w-3 text-primary flex-shrink-0" />{event.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-primary flex-shrink-0" />{event.location}</div>
                </div>
                <Link href={`/events/${event.id}`}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link">
                  Register Now
                  <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/events"
            className="inline-flex items-center gap-2 border border-border px-8 py-3 text-xs font-bold uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
