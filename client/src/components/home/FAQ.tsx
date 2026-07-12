import React from "react";
import { FAQ_DATA } from "@/data/landingData";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/common/Accordion";

export type FAQProps = Record<string, never>;

export default function FAQ({}: FAQProps) {
  return (
    <section id="about" className="relative w-full py-20 lg:py-28 overflow-hidden">
      {/* Ambient background decorative glow */}
      <div className="absolute top-[30%] left-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Heading */}
          <SectionHeading
            tagline="Frequently Asked Questions"
            title="Got Questions? We Have Answers."
            description="Clear up any doubts about how the AI assistant operates, document compliance, group expenses splitting in INR, and privacy limits."
          />

          {/* Accordion List */}
          <div className="mt-8 rounded-3xl border border-card-border bg-card/65 dark:bg-card/45 backdrop-blur-xl shadow-xl p-6 md:p-10 relative z-10 transition-colors duration-300">
            <Accordion items={FAQ_DATA} />
          </div>
        </div>
      </Container>
    </section>
  );
}
