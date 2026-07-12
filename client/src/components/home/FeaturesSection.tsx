import React from "react";
import { FEATURES_DATA } from "@/data/landingData";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "./FeatureCard";

export type FeaturesSectionProps = Record<string, never>;

export default function FeaturesSection({}: FeaturesSectionProps) {
  return (
    <section id="features" className="relative w-full py-20 lg:py-28 overflow-hidden">
      {/* Background ambient grids */}
      <div className="absolute top-[20%] left-[5%] -z-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] -z-10 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[130px] pointer-events-none" />

      <Container>
        {/* Unified Section Header */}
        <SectionHeading
          tagline="SaaS Features"
          title="All-in-One AI Travel Assistant"
          description="Everything you need to plan, spend, split, and explore India seamlessly. Connect the pieces of your travel jigsaw puzzle in one secure dashboard."
        />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              iconName={feature.iconName}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
