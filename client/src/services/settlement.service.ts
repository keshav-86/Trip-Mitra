import api from "@/lib/api";
import { Settlement, APIResponse } from "@/types";

export const settlementService = {
  async getSettlements(tripId: string): Promise<APIResponse<Settlement[]>> {
    const response = await api.get<APIResponse<Settlement[]>>(`/settlements/${tripId}`);
    return response.data;
  }
};
