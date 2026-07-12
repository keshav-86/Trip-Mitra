import React from "react";
import { IconMap } from "@/data/landingData";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  iconName,
  className
}: FeatureCardProps) {
  const Icon = IconMap[iconName];

  return (
    <div
      className={cn(
        "group relative flex flex-col p-6 rounded-2xl border border-card-border bg-card/65 dark:bg-card/45 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer",
        className
      )}
    >
      {/* Decorative Gradient Background Glow on Hover */}
      <div className="absolute -inset-px bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10" />

      {/* Styled Icon Container */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-5 shadow-sm">
        {Icon && <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />}
      </div>

      {/* Feature Title */}
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>

      {/* Feature Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
        {description}
      </p>
    </div>
  );
}
