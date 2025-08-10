import { API_URL } from "../utils/config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { clearCookies, getCookie } from "./cookies";

// Create axios instance
export const api = axios.create({
  baseURL: `${API_URL}`,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearCookies();
      window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      console.error("Access forbidden");
    }

    if (
      typeof error.response?.status === "number" &&
      error.response.status >= 500
    ) {
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  }
);

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    const message = error.response.data?.message;

    return new ApiError(message, error.response?.status, error.response?.data);
  } else if (error.request) {
    return new ApiError("Network error - no response received", 0);
  } else {
    return new ApiError(error.message, 0);
  }
};
