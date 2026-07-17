"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, LayoutDashboard, Briefcase, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Trips", href: "/trips", icon: Briefcase },
    { label: "Profile", href: "/profile", icon: User }
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-border bg-card/45 backdrop-blur-xl px-4 py-6 transition-colors duration-300 z-30 shrink-0",
        className
      )}
    >
      {/* Brand Header */}
      <Link href="/dashboard" className="flex items-center gap-2 group mb-8 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
          <Compass className="h-5 w-5 animate-pulse-slow" />
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          TripMitra
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group",
                Active
                  ? "bg-primary/10 text-primary border border-primary/10 shadow-sm shadow-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                  Active ? "text-primary" : "text-muted-foreground/80 group-hover:text-foreground"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Control */}
      <div className="border-t border-border/80 pt-4 mt-auto">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all duration-300 cursor-pointer group"
        >
          <LogOut className="h-4 w-4 text-muted-foreground/80 group-hover:text-red-500 transition-transform group-hover:translate-x-0.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
