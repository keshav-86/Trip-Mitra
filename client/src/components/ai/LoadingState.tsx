import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Sparkles } from "lucide-react";

const STEPS = [
  "Understanding destination",
  "Optimizing budget",
  "Finding attractions",
  "Building itinerary",
  "Preparing travel tips",
];

export default function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const intervals = [1200, 1800, 2200, 2500, 3000];
    let timer: NodeJS.Timeout;

    const runStep = (index: number) => {
      if (index >= STEPS.length) return;
      timer = setTimeout(() => {
        setCurrentStep(index + 1);
        runStep(index + 1);
      }, intervals[index]);
    };

    runStep(0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-card/65 backdrop-blur-md rounded-2xl border border-border/85 shadow-lg max-w-lg mx-auto space-y-6">
      {/* Visual pulse glow */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white shadow-lg shadow-primary/20">
        <Sparkles className="h-8 w-8 animate-pulse" />
        <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-75" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-extrabold text-foreground">
          ✨ Mitra AI is planning your perfect journey...
        </h3>
        <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
          Please wait while our algorithms compile a custom itinerary, budget breakdown, and local recommendations.
        </p>
      </div>

      {/* Progress timeline */}
      <div className="w-full text-left space-y-3.5 max-w-[280px] sm:max-w-xs mx-auto border-t border-border/40 pt-5">
        {STEPS.map((step, idx) => {
          const isDone = currentStep > idx;
          const isActive = currentStep === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 text-xs"
            >
              {isDone ? (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
              ) : isActive ? (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </div>
              ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-muted-foreground/60 shrink-0 font-bold text-[10px]">
                  {idx + 1}
                </div>
              )}
              <span
                className={`font-semibold transition-colors duration-300 ${
                  isDone
                    ? "text-secondary font-bold"
                    : isActive
                    ? "text-primary"
                    : "text-muted-foreground/50"
                }`}
              >
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Skeleton Shimmer loaders mockup */}
      <div className="w-full space-y-3 opacity-40 select-none pointer-events-none mt-4">
        <div className="h-4 bg-muted rounded-md w-3/4 animate-pulse mx-auto" />
        <div className="h-3 bg-muted rounded-md w-5/6 animate-pulse mx-auto" />
        <div className="h-3 bg-muted rounded-md w-2/3 animate-pulse mx-auto" />
      </div>
    </div>
  );
}
