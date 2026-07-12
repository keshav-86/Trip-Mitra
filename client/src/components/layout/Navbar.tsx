"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Sun, Moon, Menu, X } from "lucide-react";
import { NAV_LINKS, ROUTES } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export type NavbarProps = Record<string, never>;

export default function Navbar({}: NavbarProps) {
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
              <Compass className="h-6 w-6 animate-pulse-slow" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              TripMitra
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
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
            <Button variant="outline" size="sm" href={ROUTES.LOGIN}>
              Login
            </Button>
            <Button variant="primary" size="sm" href="#hero">
              Get Started
            </Button>
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/50"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Button variant="outline" size="md" href={ROUTES.LOGIN} className="w-full" onClick={() => setIsOpen(false)}>
                Login
              </Button>
              <Button variant="primary" size="md" href="#hero" className="w-full" onClick={() => setIsOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
