"use client";

import React from "react";
import { FEATURES_DATA, COMING_SOON_DATA } from "@/data/landingData";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "./FeatureCard";

export type FeaturesSectionProps = Record<string, never>;

export default function FeaturesSection({}: FeaturesSectionProps) {
  const getFeatureHref = (id: string) => {
    switch (id) {
      case "ai-planner":
        return "/ai-planner";
      case "budget-manager":
        return "/dashboard";
      case "expense-split":
        return "/trips";
      case "packing-assistant":
        return "/ai-planner";
      default:
        return "/";
    }
  };

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
              href={getFeatureHref(feature.id)}
            />
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-24 border-t border-border/80 pt-16">
          <SectionHeading
            tagline="Future Ventures"
            title="Coming Soon"
            description="Our travel tech engineers are crafting next-generation tools. Get a sneak peek of what is arriving next in Mitra Workspace."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {COMING_SOON_DATA.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                iconName={feature.iconName}
                comingSoon={true}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
