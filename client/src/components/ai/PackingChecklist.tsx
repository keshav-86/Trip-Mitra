import React, { useState } from "react";
import { CheckSquare, Square, Luggage } from "lucide-react";

interface PackingChecklistProps {
  packingList: string[];
}

export default function PackingChecklist({ packingList }: PackingChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="rounded-2xl border border-border bg-card/65 backdrop-blur-md p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Luggage className="h-4.5 w-4.5" />
        </div>
        <h3 className="font-bold text-foreground">Packing Checklist</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
        {packingList.map((item, idx) => {
          const isChecked = checkedItems[idx] || false;
          return (
            <button
              key={idx}
              onClick={() => toggleCheck(idx)}
              className="flex items-start gap-3 p-3 rounded-xl border border-border/80 bg-background/50 hover:bg-muted/30 transition-all duration-200 cursor-pointer text-left w-full group"
            >
              {isChecked ? (
                <CheckSquare className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              ) : (
                <Square className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
              )}
              <span className={`text-xs text-foreground transition-all duration-300 break-words ${isChecked ? "line-through text-muted-foreground/60 font-medium" : "font-medium"}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Footer Link */}
      <div className="border-t border-border/60 pt-3 mt-4 flex items-center justify-between text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer group">
        <span>View Full Checklist</span>
        <span className="text-sm font-mono group-hover:translate-x-0.5 transition-transform duration-200">&rarr;</span>
      </div>
    </div>
  );
}
