"use client";

import { useAuth } from "./AuthProvider";
import { usePathname } from "next/navigation";

const PUBLIC_PAGES = ["/", "/about", "/events", "/learn", "/community", "/contact", "/opportunities", "/login", "/register", "/quiz"];

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const isPublic = PUBLIC_PAGES.some(p => pathname === p || pathname.startsWith("/events/"));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
