import React from "react";
import { TIMELINE_DATA } from "@/data/landingData";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export type TimelineProps = Record<string, never>;

export default function Timeline({}: TimelineProps) {
  return (
    <section id="timeline" className="relative w-full py-20 lg:py-28 overflow-hidden">
      {/* Background visual light leaks */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-full max-w-7xl bg-grid-pattern opacity-20" />

      <Container>
        <SectionHeading
          tagline="How it works"
          title="Your Journey in Four Steps"
          description="TripMitra accompanies you across the entire travel lifecycle. Planning is swift, coordination is seamless, and memories are protected."
        />

        {/* Process Timeline Grid */}
        <div className="relative mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connector Line (visible on desktop) */}
          <div className="hidden lg:block absolute top-[30px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent -z-10 opacity-30" />

          {TIMELINE_DATA.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group relative">
              {/* Step Number Circle */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white font-extrabold text-xl shadow-lg shadow-primary/10 border-4 border-background group-hover:scale-110 transition-transform duration-300 mb-6">
                {step.stepNumber}
              </div>

              {/* Step Content Card */}
              <div className="flex flex-col p-6 rounded-2xl border border-card-border bg-card/65 dark:bg-card/45 backdrop-blur-md shadow-sm group-hover:shadow-md transition-shadow duration-300 w-full">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
