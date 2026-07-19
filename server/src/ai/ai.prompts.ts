// src/ai/ai.prompts.ts

import { TripPlanRequest } from "./ai.types";

export const buildTripPlannerPrompt = (
  data: TripPlanRequest
): string => {
  return `
You are an expert AI Travel Planner.

Create a travel plan in VALID JSON format only.

Trip Details:
- Destination: ${data.destination}
- Duration: ${data.days} days
- Budget: ₹${data.budget}
- Travelers: ${data.travelers}
- Interests: ${data.interests.join(", ")}

Return ONLY a valid JSON object with this exact structure:

{
  "tripSummary": {
    "destination": "",
    "duration": "",
    "estimatedBudget": 0,
    "bestTimeToVisit": ""
  },
  "itinerary": [
    {
      "day": 1,
      "title": "",
      "activities": []
    }
  ],
  "budgetBreakdown": {
    "accommodation": 0,
    "food": 0,
    "transport": 0,
    "activities": 0,
    "miscellaneous": 0
  },
  "packingList": [],
  "travelTips": [],
  "localFoods": []
}

Do not include markdown.
Do not use \`\`\`json.
Return only valid JSON.
`;
};