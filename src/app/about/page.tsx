"use client";

import { motion } from "framer-motion";
import { Flag, Target, Heart, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  { name: "Alex Johnson", role: "President", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop", bio: "Senior CS major passionate about competitive programming and distributed systems.", socials: { github: "#", linkedin: "#", twitter: "#" } },
  { name: "Samantha Lee", role: "Technical Lead", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop", bio: "Full-stack developer obsessed with React and performance optimization.", socials: { github: "#", linkedin: "#" } },
  { name: "Marcus Chen", role: "Events Coordinator", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", bio: "Organizes hackathons and workshops. Loves teaching Python to beginners.", socials: { linkedin: "#", twitter: "#" } },
  { name: "Priya Sharma", role: "Community Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop", bio: "Building bridges between students and industry professionals.", socials: { linkedin: "#", twitter: "#" } },
];

const milestones = [
  { year: "2023", title: "Club Founded", description: "Started with 20 passionate coders in a small dorm room." },
  { year: "2024", title: "First Hackathon", description: "Hosted our first campus-wide hackathon with over 200 participants." },
  { year: "2025", title: "Official GFG Partnership", description: "Became the officially recognized GeeksforGeeks Campus Chapter at RIT." },
  { year: "2026", title: "500+ Members", description: "Reached our milestone of 500 active members and 50+ successful events." },
];

const pillars = [
  { icon: Target, title: "Our Mission", desc: "Bridge the gap between academic learning and industry expectations through practical coding experience.", index: "01" },
  { icon: Flag, title: "Our Vision", desc: "Create the most active, inclusive, and skilled student developer community in the region.", index: "02" },
  { icon: Heart, title: "Our Values", desc: "Collaboration over competition, continuous learning, and giving back to the community.", index: "03" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">

      {/* Hero */}
      <section className="relative py-14 sm:py-24 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 right-0 w-1/2 h-full" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(57,255,20,0.05) 0%, transparent 60%)" }} />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-px bg-primary" />
              <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 max-w-3xl">
              Built by Students,<br /><span className="text-primary">For Developers.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              A community of student developers at RIT dedicated to learning, growing, and building together under the GeeksforGeeks umbrella.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {pillars.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 relative overflow-hidden hover:bg-card transition-colors"
              >
                <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <span className="text-xs font-mono text-muted-foreground/40 mb-6 block">{item.index}</span>
                <div className="w-10 h-10 border border-border rounded-sm flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-8 sm:mb-16">
            <div className="w-4 h-px bg-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Leadership</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-8 sm:mb-8 sm:mb-16">
            Meet the <span className="text-primary">Team</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-background hover:bg-card transition-colors relative overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] font-mono text-primary uppercase tracking-widest mb-1">{member.role}</p>
                  <h3 className="font-black text-lg tracking-tight">{member.name}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">{member.bio}</p>
                  <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.socials.github && (
                      <Link href={member.socials.github} className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {member.socials.linkedin && (
                      <Link href={member.socials.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {member.socials.twitter && (
                      <Link href={member.socials.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 border-t border-border">
        <div className="container">
          <div className="flex items-center gap-4 mb-8 sm:mb-16">
            <div className="w-4 h-px bg-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Timeline</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-5xl font-black tracking-tighter mb-10 sm:mb-20">
            Our <span className="text-primary">Journey</span>
          </h2>

          <div className="relative max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-border" />

            <div className="space-y-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex gap-8 relative pb-12 last:pb-0"
                >
                  {/* Year */}
                  <div className="w-[60px] flex-shrink-0 flex flex-col items-end pt-1">
                    <span className="text-xs font-mono text-primary font-bold">{m.year}</span>
                  </div>

                  {/* Dot */}
                  <div className="relative flex-shrink-0 mt-1.5">
                    <div className="w-3 h-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors" />
                    {/* vertical line connector above dot */}
                  </div>

                  {/* Content */}
                  <div className="pb-2 group-hover:translate-x-1 transition-transform">
                    <h3 className="font-black text-xl tracking-tight mb-2 group-hover:text-primary transition-colors">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl font-black tracking-tighter mb-4">Ready to <span className="text-primary">Join Us?</span></h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm">Become part of RIT's most active developer community. No experience required.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-primary/90 transition-all glow-green">
            Apply Now <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
