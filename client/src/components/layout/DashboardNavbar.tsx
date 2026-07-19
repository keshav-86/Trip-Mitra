"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Bell, Menu, User as UserIcon, LogOut, Compass } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface DashboardNavbarProps {
  onMenuClick: () => void;
  title?: string;
}

export default function DashboardNavbar({ onMenuClick, title = "Mitra Workspace" }: DashboardNavbarProps) {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-45 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Side: Mobile Menu & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-muted md:hidden"
            aria-label="Open sidebar menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 md:hidden mr-1">
            <Compass className="h-5 w-5 text-primary" />
          </div>

          <h2 className="text-base md:text-lg font-bold text-foreground tracking-tight truncate max-w-[180px] md:max-w-none">
            {title}
          </h2>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Selector */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-all duration-300 cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-accent" />
            ) : (
              <div className="h-4 w-4" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted cursor-pointer">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent animate-pulse" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 border border-primary/30 text-xs font-bold text-foreground cursor-pointer shadow-sm hover:border-primary/50 transition-all duration-300"
            >
              {user ? getInitials(user.fullName) : <UserIcon className="h-4 w-4" />}
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-border bg-card shadow-lg p-1.5 focus:outline-none z-20">
                  <div className="px-3 py-2 border-b border-border/80 mb-1">
                    <p className="text-xs font-bold text-foreground line-clamp-1">{user?.fullName}</p>
                    <p className="text-[10px] text-muted-foreground line-clamp-1">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-all duration-200 cursor-pointer text-left"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
