import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosHeaders,
} from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASEAPI || "http://192.168.2.180:3000/admin";

const refresh =
  typeof window !== "undefined" &&
  window.localStorage &&
  localStorage.getItem("refresh_token");

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Language: "en",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Common api function
type Method = "get" | "post" | "put" | "delete";

interface ApiOptions {
  method: Method;
  url: string;
  data?: unknown;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiRequest = ({ method, url, data = {} }: ApiOptions) => {

  if (method === "get" || method === "delete") {
    return apiClient[method](url, method === "delete" ? { data } : undefined);
  }

  return apiClient[method](url, data);
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEAPI}/refresh_token`,
      null,
      {
        headers: {
          refresh_token: refresh,
        },
      }
    );
    const newAccessToken = response?.data?.data?.new_jwt_token;
    return newAccessToken;
  } catch (error) {
    localStorage.clear();
    window.location.href = "/";
    throw error;
  }
};

// Request Interceptor

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.url?.endsWith("/refresh_token")) {
      config.headers = new AxiosHeaders(config.headers);
      config.headers.set("language", "en");

      const authToken = localStorage.getItem("auth_token");

      if (
        authToken &&
        ![
          "/login",
          "/forgot_password",
          "/otp-verify",
          "/reset-password",
        ].includes(config.url || "")
      ) {
        config.headers.set("Authorizations", authToken);
      } else {
        config.headers.set(
          "Authorizations",
          "@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#FKDFJSDLFJSDLFJSDLFJSDQY"
        );
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);



apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest.url?.includes("/refresh_token")) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        localStorage.setItem("auth_token", newAccessToken);
        originalRequest.headers = new AxiosHeaders(originalRequest.headers);
        originalRequest.headers.set("Authorization", newAccessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
