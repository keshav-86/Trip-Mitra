import React, { useState } from "react";
import { ChevronDown, ChevronUp, Compass } from "lucide-react";
import { ItineraryDay } from "@/types/ai";
import { cn } from "@/lib/utils";

interface ItineraryCardProps {
  itinerary: ItineraryDay[];
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="rounded-2xl border border-border bg-card/65 backdrop-blur-md p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary animate-pulse">
          <Compass className="h-4.5 w-4.5" />
        </div>
        <h3 className="font-bold text-foreground">Day-Wise Plan & Timeline</h3>
      </div>

      <div className="relative pl-8 border-l border-border space-y-6 ml-4">
        {itinerary.map((dayItem) => {
          const isExpanded = expandedDay === dayItem.day;
          return (
            <div key={dayItem.day} className="relative">
              {/* Day Dot on timeline */}
              <button
                onClick={() => toggleDay(dayItem.day)}
                className={cn(
                  "absolute -left-[16px] top-1.5 flex h-7.5 w-7.5 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 cursor-pointer shadow-sm z-10",
                  isExpanded
                    ? "bg-primary border-primary text-white scale-110 shadow-primary/20"
                    : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                )}
              >
                {dayItem.day}
              </button>

              {/* Day Content Card */}
              <div className="group rounded-xl border border-border bg-background/50 hover:bg-background/80 transition-all duration-300">
                <button
                  onClick={() => toggleDay(dayItem.day)}
                  className="flex w-full items-center justify-between p-4 cursor-pointer text-left"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Day {dayItem.day} Schedule</span>
                    <h4 className="text-sm font-extrabold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                      {dayItem.title}
                    </h4>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
                  )}
                </button>

                {/* Activities list drawer */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-border/40">
                    <ul className="space-y-2.5">
                      {dayItem.activities.map((activity, idx) => (
                        <li key={idx} className="flex gap-2.5 text-xs text-foreground font-semibold leading-relaxed">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 text-[9px] shrink-0 font-bold mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="mt-0.5 break-words w-full">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
