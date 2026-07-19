"use client";

import React from "react";
import Link from "next/link";
import { IconMap } from "@/data/landingData";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  className?: string;
  href?: string;
  comingSoon?: boolean;
}

export default function FeatureCard({
  title,
  description,
  iconName,
  className,
  href,
  comingSoon = false
}: FeatureCardProps) {
  const Icon = IconMap[iconName];

  const cardContent = (
    <div
      className={cn(
        "group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 overflow-hidden h-full",
        comingSoon
          ? "border-card-border bg-card/45 dark:bg-card/25 backdrop-blur-md opacity-85 hover:opacity-100 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-default"
          : "border-card-border bg-card/65 dark:bg-card/45 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {/* Decorative Gradient Background Glow on Hover */}
      {!comingSoon && (
        <div className="absolute -inset-px bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10" />
      )}
      {comingSoon && (
        <div className="absolute -inset-px bg-gradient-to-tr from-muted/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10" />
      )}

      {/* Styled Icon Container */}
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 mb-5 shadow-sm",
        comingSoon
          ? "bg-muted/15 text-muted-foreground"
          : "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white"
      )}>
        {Icon && <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />}
      </div>

      {/* Header with Title and Coming Soon Badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className={cn(
          "text-lg font-bold transition-colors duration-200",
          comingSoon
            ? "text-foreground/80"
            : "text-foreground group-hover:text-primary"
        )}>
          {title}
        </h3>
        {comingSoon && (
          <span className="inline-flex items-center rounded-md bg-muted/15 px-2.5 py-0.5 text-[9px] font-bold text-muted-foreground border border-border/40 uppercase tracking-wider shrink-0">
            Coming Soon
          </span>
        )}
      </div>

      {/* Feature Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
        {description}
      </p>
    </div>
  );

  if (href && !comingSoon) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
