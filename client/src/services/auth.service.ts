import api from "@/lib/api";
import { AuthResponse, APIResponse, User } from "@/types";

export interface RegisterPayload {
  fullName: string;
  email: string;
  password?: string;
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
  },

  async verifyEmail(email: string, otp: string): Promise<APIResponse<null>> {
    const response = await api.post<APIResponse<null>>("/auth/verify", { email, otp });
    return response.data;
  },

  async resendOtp(email: string): Promise<APIResponse<null>> {
    const response = await api.post<APIResponse<null>>("/auth/resend-otp", { email });
    return response.data;
  }
};
