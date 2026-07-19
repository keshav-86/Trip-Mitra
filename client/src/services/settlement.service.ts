import api from "@/lib/api";
import { Settlement, APIResponse } from "@/types";

export interface SettlementResponse {
  tripName: string;
  totalExpense: number;
  expenseCount: number;
  memberCount: number;
  perPersonShare: number;
  balances: any[];
  settlements: Settlement[];
}

export const settlementService = {
  async getSettlements(tripId: string): Promise<APIResponse<SettlementResponse>> {
    const response = await api.get<APIResponse<SettlementResponse>>(`/settlements/${tripId}`);
    return response.data;
  }
};
