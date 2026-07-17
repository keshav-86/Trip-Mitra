import React from "react";
import { ArrowRight } from "lucide-react";
import { Settlement } from "@/types";

interface SettlementCardProps {
  settlement: Settlement;
}

export default function SettlementCard({
  settlement,
}: SettlementCardProps) {
  const getInitials = (name?: string) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/65 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-1 items-center justify-center sm:justify-start gap-3 w-full">

        {/* Debtor */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-500">
            {getInitials(settlement.from.fullName)}
          </div>

          <span className="font-bold text-sm text-foreground line-clamp-1">
            {settlement.from.fullName}
          </span>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center px-2 flex-1 max-w-[120px]">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
            owes
          </span>

          <div className="flex items-center w-full">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-red-500/30 via-accent/30 to-emerald-500/30" />

            <ArrowRight className="h-4 w-4 text-accent mx-1" />

            <div className="h-0.5 flex-1 bg-gradient-to-r from-red-500/30 via-accent/30 to-emerald-500/30" />
          </div>

          <span className="text-xs font-extrabold text-foreground mt-1">
            ₹{settlement.amount.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Creditor */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-500">
            {getInitials(settlement.to.fullName)}
          </div>

          <span className="font-bold text-sm text-foreground line-clamp-1">
            {settlement.to.fullName}
          </span>
        </div>
      </div>
    </div>
  );
}