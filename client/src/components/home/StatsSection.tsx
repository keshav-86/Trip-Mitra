import React from "react";
import { STATS_DATA } from "@/data/landingData";
import Container from "@/components/ui/Container";

export type StatsSectionProps = Record<string, never>;

export default function StatsSection({}: StatsSectionProps) {
  return (
    <section className="relative w-full py-12 border-y border-border/80 bg-card/10 backdrop-blur-sm transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS_DATA.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-2xl border border-transparent hover:border-border/50 hover:bg-card/30 transition-all duration-300 group"
            >
              {/* Stat Value with Gradient */}
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </span>
              {/* Stat Label */}
              <span className="mt-2 text-sm md:text-base font-semibold text-foreground">
                {stat.label}
              </span>
              {/* Description */}
              {stat.description && (
                <span className="mt-1 text-xs text-muted-foreground max-w-[180px]">
                  {stat.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
