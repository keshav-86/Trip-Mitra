"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function MitraBotFloating() {
  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <Link
        href="/ai-planner"
        className="flex items-center gap-2 bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/45 rounded-full px-5 py-3.5 hover:scale-105 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative"
      >
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping group-hover:animate-none opacity-75" />
        
        <Sparkles className="h-5 w-5 animate-pulse" />
        <span className="text-sm font-semibold tracking-wide">
          ✨ Try AI Trip Planner
        </span>
      </Link>
    </div>
  );
}
