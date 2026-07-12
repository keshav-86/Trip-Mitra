import React from "react";
import { WHY_CHOOSE_DATA, IconMap } from "@/data/landingData";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export type WhyChooseUsProps = Record<string, never>;

export default function WhyChooseUs({}: WhyChooseUsProps) {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-muted/15 transition-colors duration-300">
      <Container>
        <SectionHeading
          tagline="Why TripMitra"
          title="Engineered for Stress-Free Travel"
          description="We solve the standard pain points of Indian travelers—unorganized plans, hidden fees, complex group splits, and lost tickets—in a single premium workspace."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {WHY_CHOOSE_DATA.map((item, index) => {
            const Icon = IconMap[item.iconName];
            return (
              <div
                key={index}
                className="group relative flex flex-col p-6 rounded-2xl border border-card-border bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Accent line top */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon Circle */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary mb-4">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>

                {/* Card Title */}
                <h3 className="text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
