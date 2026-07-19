import React from "react";
import { UtensilsCrossed, Sparkles } from "lucide-react";

interface LocalFoodsProps {
  localFoods: string[];
}

export default function LocalFoods({ localFoods }: LocalFoodsProps) {
  return (
    <div className="rounded-2xl border border-border bg-card/65 backdrop-blur-md p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <UtensilsCrossed className="h-4.5 w-4.5" />
        </div>
        <h3 className="font-bold text-foreground">Local Cuisines & Must-Try Foods</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {localFoods.map((food, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col h-full p-4 rounded-xl border border-border/80 bg-background/50 hover:border-accent/40 shadow-sm transition-all duration-300 overflow-hidden"
          >
            <div className="absolute -inset-px bg-gradient-to-tr from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10" />
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                Must Try
              </span>
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-accent transition-colors duration-200 break-words">
              {food}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mt-auto flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-accent shrink-0" />
              <span>Authentic regional delicacy</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
