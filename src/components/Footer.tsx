"use client";

import Link from "next/link";
import { Terminal, Github, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;

  const links = [
    { name: "About Us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Learning Hub", href: "/learn" },
    { name: "Jobs & Internships", href: "/opportunities" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
  ];

  const socials = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="border-t border-border bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="border-b border-border">
        <div className="container py-10 sm:py-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-5 md:col-span-1">
              <Link href="/" className="flex items-center gap-3 w-fit">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center glow-green">
                  <Terminal className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-black text-lg tracking-tight">GFG<span className="text-primary">×</span>RIT</div>
                  <div className="text-[9px] font-mono text-muted-foreground tracking-[0.2em] uppercase">Developer Club</div>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                The official GeeksForGeeks campus club at Rajalakshmi Institute of Technology, Chennai.
              </p>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <Link key={label} href={href} aria-label={label}
                    className="w-8 h-8 border border-border rounded-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Quick Links</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {links.map(link => (
                  <Link key={link.href} href={link.href}
                    className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Contact</span>
              <div className="space-y-2 text-sm text-muted-foreground font-mono">
                <p>Rajalakshmi Institute of Technology</p>
                <p>Kuthambakkam, Chennai – 600124</p>
                <p>Tamil Nadu, India</p>
                <p className="pt-2">+91 89259 77445</p>
                <a href="mailto:gfg@rit.edu" className="text-primary hover:underline block">gfg@rit.edu</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-mono text-muted-foreground">© {new Date().getFullYear()} GFG×RIT. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
