import React from "react";
import { Info, AlertCircle, ShieldAlert } from "lucide-react";

interface TravelTipsProps {
  travelTips: string[];
}

export default function TravelTips({ travelTips }: TravelTipsProps) {
  const getIcon = (idx: number) => {
    const cycle = idx % 3;
    if (cycle === 0) return <ShieldAlert className="h-4.5 w-4.5 text-primary" />;
    if (cycle === 1) return <Info className="h-4.5 w-4.5 text-secondary" />;
    return <AlertCircle className="h-4.5 w-4.5 text-accent" />;
  };

  const getThemeColor = (idx: number) => {
    const cycle = idx % 3;
    if (cycle === 0) return "primary";
    if (cycle === 1) return "secondary";
    return "accent";
  };

  const getIconContainerStyle = (idx: number) => {
    const cycle = idx % 3;
    if (cycle === 0) return "bg-primary/10 border-primary/20";
    if (cycle === 1) return "bg-secondary/10 border-secondary/20";
    return "bg-accent/10 border-accent/20";
  };

  const getNumberBadgeStyle = (idx: number) => {
    const cycle = idx % 3;
    if (cycle === 0) return "text-primary bg-primary/10 border-primary/20";
    if (cycle === 1) return "text-secondary bg-secondary/10 border-secondary/20";
    return "text-accent bg-accent/10 border-accent/20";
  };

  const parseTip = (rawTip: string) => {
    let title = "";
    let description = "";
    
    // Check for colon first
    if (rawTip.includes(":")) {
      const parts = rawTip.split(":");
      title = parts[0].trim();
      description = parts.slice(1).join(":").trim();
    } else if (rawTip.includes(".")) {
      const firstPeriodIndex = rawTip.indexOf(".");
      title = rawTip.substring(0, firstPeriodIndex).trim();
      description = rawTip.substring(firstPeriodIndex + 1).trim();
    } else {
      title = rawTip.trim();
      description = "";
    }

    return { title, description };
  };

  return (
    <div className="rounded-2xl border border-border bg-card/65 backdrop-blur-md p-5 shadow-sm">
      {/* Header section */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
          <Info className="h-4.5 w-4.5" />
        </div>
        <h3 className="font-bold text-foreground">Travel Tips & Advisories</h3>
      </div>
      
      {/* Grid container: 1 col on mobile, 2 cols on md, 4 cols on lg/xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {travelTips.map((rawTip, idx) => {
          const { title, description } = parseTip(rawTip);
          const themeColor = getThemeColor(idx);
          const iconStyle = getIconContainerStyle(idx);
          const badgeStyle = getNumberBadgeStyle(idx);
          const formattedNum = String(idx + 1).padStart(2, "0");
          return (
            <div
              key={idx}
              className={`group relative flex flex-col h-full p-4 rounded-xl border border-border/80 bg-background/50 hover:border-${themeColor}/40 shadow-sm transition-all duration-300 overflow-hidden`}
            >
              {/* Hover gradient background - matches food cards */}
              <div className={`absolute -inset-px bg-gradient-to-tr from-${themeColor}/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10`} />

              {/* Top Row: Icon on left, Large number on right */}
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${iconStyle}`}>
                  {getIcon(idx)}
                </div>
                <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full font-mono ${badgeStyle}`}>
                  {formattedNum}
                </span>
              </div>

              {/* Title & Description stacked below */}
              <div className="flex-1 flex flex-col justify-start mt-1">
                <h4 className={`text-sm font-bold text-foreground mb-1.5 group-hover:text-${themeColor} transition-colors duration-200 break-words whitespace-normal`}>
                  {title}
                </h4>
                {description && (
                  <p className="text-xs text-muted-foreground leading-relaxed break-words whitespace-normal">
                    {description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
