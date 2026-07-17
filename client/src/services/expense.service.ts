import api from "@/lib/api";
import { Expense, APIResponse, BudgetReport } from "@/types";

export interface ExpensePayload {
  tripId: string;
  description: string;
  amount: number;
  category:
    | "FOOD"
    | "TRANSPORT"
    | "ACCOMMODATION"
    | "SHOPPING"
    | "ENTERTAINMENT"
    | "OTHER";
  participants: string[];
}

export const expenseService = {
  async getExpensesByTrip(tripId: string) {
    const response = await api.get<APIResponse<Expense[]>>(
      `/expenses/${tripId}`
    );
    return response.data;
  },

  async createExpense(payload: ExpensePayload) {
    const response = await api.post<APIResponse<Expense>>(
      "/expenses",
      payload
    );
    return response.data;
  },

  async updateExpense(id: string, payload: Partial<ExpensePayload>) {
    const response = await api.put<APIResponse<Expense>>(
      `/expenses/${id}`,
      payload
    );
    return response.data;
  },

  async deleteExpense(id: string) {
    const response = await api.delete<APIResponse<null>>(
      `/expenses/${id}`
    );
    return response.data;
  },

  async getBudgetReport(tripId: string) {
    const response = await api.get<APIResponse<BudgetReport>>(
      `/expenses/trip/${tripId}/budget`
    );
    return response.data;
  },
};