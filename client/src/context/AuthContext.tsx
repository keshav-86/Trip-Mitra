"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "@/types";
import { authService } from "@/services/auth.service";
import {
  setToken,
  removeToken,
  getToken,
  isAuthenticated,
} from "@/lib/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const res = await authService.getProfile();

      if (res.success && res.data) {
        setUser(res.data);
      } else {
        removeToken();
        setUser(null);
      }
    } catch {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const res = await authService.login({
        email,
        password,
      });

      if (!res.token) {
        throw new Error("Invalid token response");
      }

      setToken(res.token);

      // Backend returns data
      if (res.data) {
        setUser(res.data);
      }

      toast.success("Welcome back to TripMitra!");

      router.replace("/dashboard");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);

    try {
      const res = await authService.register({
        fullName,
        email,
        password,
      });

      if (res.token) {
        setToken(res.token);

        if (res.data) {
          setUser(res.data);
        }

        toast.success("Account created successfully!");

        router.replace("/dashboard");
      } else {
        toast.success("Account created! Please login.");

        router.replace("/login");
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);

    toast.success("Logged out successfully.");

    router.replace("/login");
  };

  const refreshUser = async () => {
    if (getToken()) {
      await fetchProfile();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}