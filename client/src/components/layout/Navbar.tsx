"use client";
 
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Sun, Moon, Menu, X } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { useAuth } from "@/hooks/useAuth";
import { useActiveNavigation } from "@/hooks/useActiveNavigation";

export type NavbarProps = Record<string, never>;

export default function Navbar({}: NavbarProps) {
  const { user, logout } = useAuth();
  const { isLinkActive } = useActiveNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";

    const saved = localStorage.getItem("theme");

    if (saved === "light" || saved === "dark") return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Set mounted flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync theme with document class and local storage
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

  const guestLinks = [
    { href: "/", label: "Home" },
    { href: "/#features", label: "Features" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Sign Up" }
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/#features", label: "Features" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" }
  ];

  const currentLinks = user ? loggedInLinks : guestLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
              <Compass className="h-6 w-6 animate-pulse-slow" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              TripMitra
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {currentLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    active
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Selector */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-accent" />
              ) : (
                <div className="h-4 w-4" />
              )}
            </button>
            {user ? (
              <>
                <Button variant="outline" size="sm" href="/dashboard">
                  Dashboard
                </Button>
                <Button variant="primary" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" href="/login">
                  Login
                </Button>
                <Button variant="primary" size="sm" href="/register">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted mr-1"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-accent" />
              ) : (
                <div className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-muted"
              aria-label="Open mobile menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            {currentLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold py-2 border-b border-border/50 ${
                    active ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-3 mt-4">
              {user ? (
                <>
                  <Button variant="outline" size="md" href="/dashboard" className="w-full" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Button>
                  <Button variant="primary" size="md" className="w-full" onClick={() => { setIsOpen(false); logout(); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="md" href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                    Login
                  </Button>
                  <Button variant="primary" size="md" href="/register" className="w-full" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
