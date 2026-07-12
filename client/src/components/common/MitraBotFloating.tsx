"use client";

import React, { useState } from "react";
import { Sparkles, Bot, X } from "lucide-react";

export type MitraBotFloatingProps = Record<string, never>;

export default function MitraBotFloating({}: MitraBotFloatingProps) {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {/* Interactive Tooltip Chat Prompt */}
      {showTooltip && (
        <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-card border border-border shadow-2xl p-3 max-w-xs animate-bounce shadow-primary/10 transition-colors duration-300">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary/15 text-secondary">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">MitraBot AI</span>
            <span className="text-[10px] text-muted-foreground">Plan a 5-day trip to Jaipur?</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-muted-foreground hover:text-foreground ml-2 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="pointer-events-auto flex items-center gap-2 bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/45 rounded-full p-3.5 md:px-5 md:py-3.5 hover:scale-105 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative"
        aria-label="Ask MitraBot AI"
      >
        {/* Pulsating Outer Border Glow */}
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping group-hover:animate-none opacity-75" />
        
        <Bot className="h-5 w-5 animate-pulse" />
        <span className="hidden md:inline text-sm font-semibold tracking-wide">
          Ask MitraBot
        </span>
      </button>
    </div>
  );
}
