import React, { useState } from "react";
import { Sparkles, MapPin, Calendar, Users, Wallet, Minus, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { TripPlanRequest } from "@/types/ai";

interface PlannerFormProps {
  onSubmit: (data: TripPlanRequest) => void;
  loading: boolean;
}

export default function PlannerForm({ onSubmit, loading }: PlannerFormProps) {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(15000);
  const [travelers, setTravelers] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interestOptions = [
    "Beach", "Adventure", "Nature", "Food", "Shopping",
    "Luxury", "Photography", "History", "Nightlife", "Family", "Mountains"
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    onSubmit({
      destination,
      days,
      budget,
      travelers,
      interests: selectedInterests,
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5 bg-card/65 backdrop-blur-md border border-border p-5 rounded-2xl shadow-sm">
      {/* Destination Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary animate-bounce-slow" />
          Where to?
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g. Goa, Manali, Jaipur..."
          required
          className="w-full bg-background border border-border/80 rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-semibold"
        />
      </div>

      {/* Number of Days and Travelers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-secondary" />
            Days
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={days <= 1}
              onClick={() => setDays(days - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs font-extrabold text-foreground min-w-[20px] text-center">{days}</span>
            <button
              type="button"
              disabled={days >= 30}
              onClick={() => setDays(days + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-accent" />
            Travelers
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={travelers <= 1}
              onClick={() => setTravelers(travelers - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs font-extrabold text-foreground min-w-[20px] text-center">{travelers}</span>
            <button
              type="button"
              disabled={travelers >= 20}
              onClick={() => setTravelers(travelers + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Budget Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Wallet className="h-3.5 w-3.5 text-emerald-500" />
          Budget (INR)
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">₹</span>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            min={1000}
            step={1000}
            required
            className="w-full bg-background border border-border/80 rounded-xl pl-8 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-semibold"
          />
        </div>
      </div>

      {/* Interest chips */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
          Interests & Vibes
        </label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((interest) => {
            const isSelected = selectedInterests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-primary border-primary text-white shadow-sm shadow-primary/20 scale-102"
                    : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        disabled={loading || !destination.trim()}
        className="w-full py-3 mt-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"
      >
        <Sparkles className="h-4 w-4 text-white animate-pulse" />
        <span>{loading ? "Planning..." : "Generate AI Plan"}</span>
      </Button>
    </form>
  );
}
