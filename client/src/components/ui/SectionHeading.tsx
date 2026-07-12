import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  tagline,
  title,
  description,
  align = "center",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      {...props}
    >
      {tagline && (
        <span className="text-xs md:text-sm font-semibold tracking-wider text-primary uppercase bg-primary/5 dark:bg-primary/10 px-3 py-1 rounded-full">
          {tagline}
        </span>
      )}
      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
