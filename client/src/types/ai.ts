// client/src/types/ai.ts

export interface TripPlanRequest {
  destination: string;
  days: number;
  budget: number;
  travelers: number;
  interests: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  miscellaneous: number;
}

export interface TripSummary {
  destination: string;
  duration: string;
  estimatedBudget: number;
  bestTimeToVisit: string;
}

export interface TripPlanResponse {
  tripSummary: TripSummary;
  itinerary: ItineraryDay[];
  budgetBreakdown: BudgetBreakdown;
  packingList: string[];
  travelTips: string[];
  localFoods: string[];
}
