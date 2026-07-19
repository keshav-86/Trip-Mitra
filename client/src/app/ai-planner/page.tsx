"use client";

import React, { useState } from "react";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import PlannerForm from "@/components/ai/PlannerForm";
import PlannerResult from "@/components/ai/PlannerResult";
import LoadingState from "@/components/ai/LoadingState";
import { aiService } from "@/services/ai";
import { TripPlanResponse, TripPlanRequest } from "@/types/ai";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function AIPlannerPage() {
  const [result, setResult] = useState<TripPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestDays, setRequestDays] = useState(3);
  const [requestTravelers, setRequestTravelers] = useState(1);

  const handleGeneratePlan = async (data: TripPlanRequest) => {
    setLoading(true);
    setRequestDays(data.days);
    setRequestTravelers(data.travelers);
    try {
      const res = await aiService.generateTripPlan(data);
      if (res.success && res.data) {
        setResult(res.data);
        toast.success("Mitra AI has compiled your itinerary!");
      } else {
        toast.error(res.message || "Failed to generate plan.");
      }
    } catch {
      toast.error("Failed to connect to Mitra AI desk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="border-b border-border/80 pb-4 flex items-center justify-between print:hidden">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span>Mitra AI Planner Desk</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Harness advanced AI algorithms to custom-tailor premium itineraries and budget analytics
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">
          {/* Left panel: 35% width (col-span-4) */}
          <div className="lg:col-span-4 sticky top-6 print:hidden">
            <PlannerForm onSubmit={handleGeneratePlan} loading={loading} />
          </div>

          {/* Right panel: 65% width (col-span-8) */}
          <div className="lg:col-span-8 relative rounded-2xl">
            {loading && !result && (
              <div className="flex items-center justify-center min-h-[450px] w-full">
                <LoadingState />
              </div>
            )}

            {!loading && !result && <EmptyStateIllustration />}

            {result && (
              <div className="relative">
                <PlannerResult result={result} days={requestDays} travelers={requestTravelers} />
                {loading && (
                  <div className="absolute inset-0 bg-background/85 backdrop-blur-md z-30 flex items-center justify-center rounded-2xl animate-fade-in print:hidden">
                    <LoadingState />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}

function EmptyStateIllustration() {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-card/65 backdrop-blur-md rounded-2xl border border-border/80 shadow-sm min-h-[450px] space-y-6">
      {/* Premium travel illustration SVG */}
      <svg className="w-40 h-40 text-primary/20 dark:text-primary/10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
        <path d="M60 100C60 77.9086 77.9086 60 100 60C122.091 60 140 77.9086 140 100C140 122.091 122.091 140 100 140C77.9086 140 60 122.091 60 100Z" stroke="currentColor" strokeWidth="2" />
        <path d="M100 40V160M40 100H160" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="100" cy="100" r="15" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
        <path d="M96 90C98 84 102 84 104 90C110 92 110 96 104 98C102 104 98 104 96 98C90 96 90 92 96 90Z" fill="var(--primary)" />
        <path d="M140 70C141 67 143 67 144 70C147 71 147 73 144 74C143 77 141 77 140 74C137 73 137 71 140 70Z" fill="var(--secondary)" />
        <path d="M55 125L65 135M145 125L135 135" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="space-y-2 max-w-md">
        <h3 className="text-lg font-extrabold text-foreground tracking-tight">Where would you like to travel today?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Generate a complete itinerary, budget breakdown, packing checklist and local recommendations in seconds.
        </p>
      </div>
    </div>
  );
}