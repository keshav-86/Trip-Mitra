import api from "@/lib/api";
import { Trip, APIResponse } from "@/types";

export interface CreateTripPayload {
  title: string;
  description?: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export interface JoinTripPayload {
  inviteCode: string;
}

export const tripService = {
  async getTrips(): Promise<APIResponse<Trip[]>> {
    const response = await api.get<APIResponse<Trip[]>>("/trips");
    return response.data;
  },

  async createTrip(payload: CreateTripPayload): Promise<APIResponse<Trip>> {
    const response = await api.post<APIResponse<Trip>>("/trips", payload);
    return response.data;
  },

  async getTripById(id: string): Promise<APIResponse<Trip>> {
    const response = await api.get<APIResponse<Trip>>(`/trips/${id}`);
    return response.data;
  },

  async updateTrip(id: string, payload: Partial<CreateTripPayload>): Promise<APIResponse<Trip>> {
    const response = await api.put<APIResponse<Trip>>(`/trips/${id}`, payload);
    return response.data;
  },

  async deleteTrip(id: string): Promise<APIResponse<null>> {
    const response = await api.delete<APIResponse<null>>(`/trips/${id}`);
    return response.data;
  },

  async joinTrip(payload: JoinTripPayload): Promise<APIResponse<Trip>> {
  const response = await api.post<APIResponse<Trip>>(
    "/trips/join",
    payload
    );
    return response.data;
  },

  async leaveTrip(id: string): Promise<APIResponse<null>> {
    const response = await api.post<APIResponse<null>>(`/trips/${id}/leave`);
    return response.data;
  }
};
