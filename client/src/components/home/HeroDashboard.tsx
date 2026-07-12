import React from "react";
import { Bot, Calendar, Sparkles, CreditCard, Check } from "lucide-react";
import Badge from "@/components/ui/Badge";

export type HeroDashboardProps = Record<string, never>;

export default function HeroDashboard({}: HeroDashboardProps) {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] max-w-2xl mx-auto flex items-center justify-center">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/10 to-transparent blur-3xl rounded-full opacity-60 animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-grid-pattern opacity-40 rounded-3xl" />

      {/* Main Glassmorphic Dashboard Container */}
      <div className="relative w-full h-full flex flex-col gap-4 p-4 md:p-6 rounded-3xl border border-card-border bg-card/45 backdrop-blur-xl shadow-2xl overflow-hidden transition-colors duration-300">
        
        {/* Floating AI Chat Panel */}
        <div className="absolute top-6 left-6 z-10 w-[72%] md:w-[60%] rounded-2xl border border-card-border bg-card/90 shadow-xl p-4 animate-float">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/80">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">Mitra AI Guide</span>
              <span className="text-[9px] text-muted-foreground">Active Assistant</span>
            </div>
            <Badge variant="secondary" className="ml-auto text-[8px] px-1.5 py-0.5">
              Online
            </Badge>
          </div>
          <div className="space-y-3 text-[11px]">
            <div className="bg-muted text-muted-foreground p-2 rounded-xl rounded-tl-none max-w-[90%]">
              Suggest a 3-day cultural itinerary for Jaipur.
            </div>
            <div className="bg-primary/5 border border-primary/10 text-foreground p-2.5 rounded-xl rounded-tr-none max-w-[95%] ml-auto">
              <div className="flex items-center gap-1 font-medium text-primary mb-1">
                <Sparkles className="h-3 w-3" />
                <span>Jaipur Culture Plan</span>
              </div>
              Day 1: Amber Fort & Hawa Mahal. Dinner at Chokhi Dhani with traditional dance.
            </div>
          </div>
        </div>

        {/* Itinerary Preview Card */}
        <div className="absolute bottom-6 left-6 z-10 w-[60%] md:w-[50%] rounded-2xl border border-card-border bg-card/90 shadow-xl p-4 transition-transform duration-500 hover:scale-102">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold text-foreground">Rajasthan Trip</span>
            <span className="text-[10px] text-muted-foreground ml-auto">Oct 12-15</span>
          </div>
          <div className="space-y-2">
            {[
              { day: "Day 1", spot: "Amber Palace", status: "Completed" },
              { day: "Day 2", spot: "City Palace & Bazaars", status: "Today" },
              { day: "Day 3", spot: "Albert Hall Museum", status: "Upcoming" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] p-1.5 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{item.spot}</span>
                  <span className="text-[9px] text-muted-foreground">{item.day}</span>
                </div>
                <Badge variant={item.status === "Completed" ? "secondary" : item.status === "Today" ? "primary" : "outline"} className="text-[8px] px-1.5 py-0">
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Split Card */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-[45%] md:w-[38%] rounded-2xl border border-card-border bg-card/95 shadow-2xl p-4 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-1.5 mb-3">
            <CreditCard className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold text-foreground">Dinner Split</span>
            <Badge variant="accent" className="ml-auto text-[8px] px-1 py-0">
              ₹2,400
            </Badge>
          </div>
          <div className="space-y-2.5 text-[11px]">
            {[
              { name: "Rahul", share: "₹800", paid: true },
              { name: "Priya", share: "₹800", paid: false },
              { name: "Arjun", share: "₹800", paid: false }
            ].map((person, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-border/40 last:border-0">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted font-bold text-[9px] text-foreground">
                    {person.name[0]}
                  </div>
                  <span className="font-medium text-foreground">{person.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">{person.share}</span>
                  {person.paid ? (
                    <Check className="h-3 w-3 text-secondary font-extrabold" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
