import api from "@/lib/api";
import { APIResponse } from "@/types";
import { TripPlanRequest, TripPlanResponse } from "@/types/ai";

export const aiService = {
  async generateTripPlan(payload: TripPlanRequest): Promise<APIResponse<TripPlanResponse>> {
    const response = await api.post<APIResponse<TripPlanResponse>>("/ai/trip-plan", payload);
    return response.data;
  }
};
