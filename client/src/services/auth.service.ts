import api from "@/lib/api";
import { AuthResponse, APIResponse, User } from "@/types";

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string; // made optional in types if needed, but required for registration
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },

  async getProfile(): Promise<APIResponse<User>> {
    const response = await api.get<APIResponse<User>>("/auth/profile");
    return response.data;
  },

  async updateProfile(payload: { fullName: string; email: string }): Promise<APIResponse<User>> {
    const response = await api.put<APIResponse<User>>("/auth/profile", payload);
    return response.data;
  }
};
