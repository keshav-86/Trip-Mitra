import React from "react";
import { MapPin, Calendar, Wallet, Sun, Sparkles } from "lucide-react";
import { TripSummary } from "@/types/ai";

interface TripSummaryCardProps {
  summary: TripSummary;
}

export default function TripSummaryCard({ summary }: TripSummaryCardProps) {
  const { destination, duration, estimatedBudget, bestTimeToVisit } = summary;

  const stats = [
    {
      label: "Destination",
      value: destination,
      icon: <MapPin className="h-4.5 w-4.5 text-primary" />,
      bg: "bg-primary/10 border-primary/20",
    },
    {
      label: "Duration",
      value: duration,
      icon: <Calendar className="h-4.5 w-4.5 text-secondary" />,
      bg: "bg-secondary/10 border-secondary/20",
    },
    {
      label: "Estimated Budget",
      value: `₹${estimatedBudget.toLocaleString("en-IN")}`,
      icon: <Wallet className="h-4.5 w-4.5 text-accent" />,
      bg: "bg-accent/10 border-accent/20",
    },
    {
      label: "Best Time to Visit",
      value: bestTimeToVisit,
      icon: <Sun className="h-4.5 w-4.5 text-emerald-500" />,
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-tr from-primary/10 via-secondary/5 to-transparent p-5 md:p-6 shadow-sm">
      <div className="absolute top-[20%] right-[10%] -z-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl animate-pulse" />
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/40">
        <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
          Mitra AI Generated Summary
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-card/60 backdrop-blur-md border border-border p-4 rounded-xl">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg border shrink-0 ${stat.bg}`}>
              {stat.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{stat.label}</span>
              <span className="text-xs md:text-sm font-extrabold text-foreground break-words leading-tight">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
