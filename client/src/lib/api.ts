import axios from "axios";
import { getToken, removeToken } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 20000, // 20s request timeout for cloud network latency
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach bearer token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle token expiration or unauthorised errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear invalid credentials
      removeToken();
      if (typeof window !== "undefined") {
        // Redirect to login page on session expiry
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
