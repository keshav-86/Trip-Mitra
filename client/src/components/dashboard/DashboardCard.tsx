import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: "primary" | "secondary" | "accent" | "muted";
  className?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  description,
  trend,
  variant = "muted",
  className
}: DashboardCardProps) {
  const borderVariants = {
    primary: "border-primary/20 bg-gradient-to-tr from-primary/5 via-transparent to-transparent",
    secondary: "border-secondary/20 bg-gradient-to-tr from-secondary/5 via-transparent to-transparent",
    accent: "border-accent/20 bg-gradient-to-tr from-accent/5 via-transparent to-transparent",
    muted: "border-border bg-card"
  };

  const iconVariants = {
    primary: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    accent: "bg-accent/10 text-accent border border-accent/20",
    muted: "bg-muted text-muted-foreground border border-border"
  };

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full bg-card/65 backdrop-blur-md",
        borderVariants[variant],
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconVariants[variant])}>
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-1">{value}</h4>
        <div className="flex items-center gap-1.5 min-h-[1.25rem]">
          {trend && (
            <span className={cn("text-xs font-bold", trend.positive ? "text-secondary" : "text-red-500")}>
              {trend.value}
            </span>
          )}
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      </div>
    </div>
  );
}
