import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASEAPI || "http://192.168.2.181:3000/admin";

const jwt =
  typeof window !== "undefined" &&
  window.localStorage &&
  localStorage.getItem("auth_token");
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
  data?: any;
}

export const apiRequest = ({ method, url, data = {} }: ApiOptions) => {
  console.log(`API Call [${method.toUpperCase()}]`, url, data);

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
    console.log("response", response?.data?.data?.new_jwt_token);
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
  (config: any) => {
    if (!config.url.endsWith("/refresh_token")) {
      config.headers = config.headers || {};
      config.headers["language"] = "en";

      const authToken = localStorage.getItem("auth_token");
      console.log("Request URL:", config.url);

      if (
        authToken &&
        ![
          "/login",
          "/forgot_password",
          "/otp-verify",
          "/reset-password",
        ].includes(config.url)
      ) {
        config.headers["Authorizations"] = authToken;
        console.log("Authorization header set:", config.headers);
      } else {
        config.headers["Authorizations"] =
          "@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#FKDFJSDLFJSDLFJSDLFJSDQY";
        console.log("No Authorization token set:", config.headers);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// apiClient.interceptors.request.use(
//   (config: any) => {
//     if (!config.url.endsWith("/refresh_token")) {
//       config.headers = config.headers || {};
//       config.headers["language"] = "en";
//       const authToken = localStorage.getItem("auth_token");
//       console.log("result", config.url);

//       if (
//         authToken &&
//         ![
//           "/login",
//           "/forgot_password",
//           "/otp-verify",
//           "/reset-password",
//         ].includes(config.url)
//       ) {
//         config.headers["Authorization"] = authToken;
//         console.log("if0-------------------->>>>>>", config.headers);
//       } else {
//         config.headers["Authorizations"] =
//           "@#Slsjpoq$S1o08#MnbAiB%UVUV&Y*5EU@exS1o!08L9TSlsjpo#FKDFJSDLFJSDLFJSDLFJSDQY";
//         console.log("else0-------------------->>>>>>", config.headers);
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/refresh_token")) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        localStorage.setItem("auth_token", newAccessToken);
        originalRequest.headers["Authorization"] = newAccessToken;

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
