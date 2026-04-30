import axios from "axios";

const API_CKAN = import.meta.env.VITE_CKAN_API;
const token = import.meta.env.VITE_CKAN_TOKEN;

export const axiosCkan = axios.create({
  baseURL: API_CKAN,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});