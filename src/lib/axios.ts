import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = import.meta.env.VITE_BACKEND_TOKEN;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});
