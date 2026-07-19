import React from "react";
import { Wallet } from "lucide-react";
import { BudgetBreakdown as BudgetBreakdownType } from "@/types/ai";

interface BudgetBreakdownProps {
  budgetBreakdown: BudgetBreakdownType;
}

export default function BudgetBreakdown({ budgetBreakdown }: BudgetBreakdownProps) {
  const { accommodation, food, transport, activities, miscellaneous } = budgetBreakdown;
  const total = accommodation + food + transport + activities + miscellaneous;

  const items = [
    { label: "Accommodation", value: accommodation, color: "bg-primary" },
    { label: "Food & Dining", value: food, color: "bg-secondary" },
    { label: "Transport & Transit", value: transport, color: "bg-accent" },
    { label: "Activities & Sightseeing", value: activities, color: "bg-emerald-500" },
    { label: "Miscellaneous", value: miscellaneous, color: "bg-muted-foreground/60" },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card/65 backdrop-blur-md p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Wallet className="h-4.5 w-4.5" />
          </div>
          <h3 className="font-bold text-foreground">AI Budget Analyzer</h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Estimated Total</span>
          <span className="text-base font-extrabold text-foreground">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Segmented Progress Bar */}
      <div className="h-3 w-full rounded-full bg-muted/40 overflow-hidden flex mb-5 border border-border/40">
        {items.map((item, idx) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          if (percentage === 0) return null;
          return (
            <div
              key={idx}
              className={`${item.color} h-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
              title={`${item.label}: ${percentage.toFixed(1)}%`}
            />
          );
        })}
      </div>

      {/* Itemized breakdown cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {items.map((item, idx) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-background/50 hover:bg-muted/10 transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${item.color} shrink-0`} />
                <span className="text-xs font-semibold text-muted-foreground">{item.label}</span>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-xs font-extrabold text-foreground">₹{item.value.toLocaleString("en-IN")}</span>
                <span className="text-[9px] text-muted-foreground font-medium">{percentage.toFixed(0)}% share</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
