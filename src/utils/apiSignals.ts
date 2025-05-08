import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";

type ApiMethod = "get" | "post" | "put" | "delete";

// Signal to track loading state
let isLoading = false;

// Signal to track last API call timestamp
let lastCallTimestamp = 0;

// Debounce delay in milliseconds
const DEBOUNCE_DELAY = 300;

// Function to check if enough time has passed since last API call
const canMakeApiCall = (): boolean => {
  const now = Date.now();
  if (now - lastCallTimestamp < DEBOUNCE_DELAY) {
    return false;
  }
  lastCallTimestamp = now;
  return true;
};

interface ApiOptions {
  showLoading?: boolean;
  debounce?: boolean;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Generic API call function with signal management
export const signalApiCall = async <T>(
  method: ApiMethod,
  url: string,
  data?: unknown,
  options?: ApiOptions
): Promise<T | null> => {
  try {
    // Check if we should debounce this call
    if (options?.debounce && !canMakeApiCall()) {
      return null;
    }

    // Set loading state
    if (options?.showLoading) {
      isLoading = true;
    }

    const response = await apiRequest({
      method,
      url,
      data,
    });

    return response?.data?.data as T;
  } catch (error: unknown) {
    console.error("API call error:", error);
    if (error && typeof error === "object" && "response" in error) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
    return null;
  } finally {
    if (options?.showLoading) {
      isLoading = false;
    }
  }
};

// Search API call with built-in debouncing
export const searchApiCall = async <T>(
  url: string,
  searchParams: Record<string, unknown>
): Promise<T | null> => {
  return signalApiCall<T>("get", url, searchParams, {
    debounce: true,
    showLoading: true,
  });
};

// Get loading state
export const getLoadingState = (): boolean => isLoading;
