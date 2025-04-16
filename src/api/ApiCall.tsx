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
    Authorizations: `${jwt}`,
    Language: "en",
    refresh_token: refresh,
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const _post = (url: any, data = {}) => {
  console.log("apicall", url, data);
  return apiClient.post(url, data);
};

export const getFunction = (url: any) => {
  return apiClient.get(url);
};

export const _put = (url: any, data = {}) => {
  console.log("apicall PUT", url, data);
  return apiClient.put(url, data);
};
export const _delete = (url: any, data = {}) => {
  console.log("apicall DELETE", url, data);
  return apiClient.delete(url, { data });
};
