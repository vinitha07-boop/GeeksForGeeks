"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, UserCircle2, LogOut, Activity } from "lucide-react";
import { useAuth } from "./AuthProvider";

export function Navbar() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;

  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { user, logout, isLoading } = useAuth();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Learn", href: "/learn" },
    { name: "Jobs", href: "/opportunities" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border" : "bg-transparent border-b border-transparent"}`}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center glow-green">
            <Terminal className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-base tracking-tight">GFG<span className="text-primary">×</span>RIT</span>
            <span className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase font-mono hidden sm:block">Developer Club</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={`nav-link-animated text-xs tracking-[0.1em] uppercase font-semibold transition-colors ${pathname === item.href ? "text-primary active" : "text-muted-foreground hover:text-foreground"}`}>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {!isLoading && (user ? (
            <div className="flex items-center gap-3">
              <Link href="/activities" className="text-muted-foreground hover:text-primary transition-colors"><Activity className="h-4 w-4" /></Link>
              <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors"><UserCircle2 className="h-4 w-4" /></Link>
              <button onClick={logout} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors border border-border px-3 py-1.5 rounded-sm hover:border-destructive/50">
                <LogOut className="h-3 w-3" /><span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors px-4 py-2">Login</Link>
              <Link href="/login" className="text-xs tracking-widest uppercase font-bold bg-primary text-primary-foreground px-4 py-2 rounded-sm hover:bg-primary/90 transition-colors glow-green">Join Now</Link>
            </div>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-muted-foreground hover:text-foreground transition-colors">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <nav className="container py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                className={`text-xs font-semibold uppercase tracking-widest py-3 px-3 rounded-sm transition-colors ${pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              {!isLoading && !user && (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-center text-xs uppercase tracking-widest border border-border py-3 rounded-sm text-muted-foreground hover:text-foreground transition-colors">Login</Link>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-center text-xs uppercase tracking-widest font-bold bg-primary text-primary-foreground py-3 rounded-sm hover:bg-primary/90 transition-colors">Join Now</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
