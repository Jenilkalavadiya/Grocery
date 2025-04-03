import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASEAPI || "http://192.168.2.181:3000/admin";

const jwt = localStorage.getItem("loginjwt");
const refresh = localStorage.getItem("refreshjwt");

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorizations: `${jwt}`,
    language: "en",
    refresh_token: refresh,
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const _post = (url: any, data = {}) => {
  console.log("apicall", url, data);
  return apiClient.post(url, data);
};

// const callApi=({method,url,data})=>{
    
// }