import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Membuat instance kustom dengan konfigurasi terpusat
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Menunggu maksimal 10 detik
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Interceptor Permintaan (Request Interceptor)
 * Berguna untuk menyisipkan Token Keamanan (Auth) secara otomatis
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Contoh: Mengambil token dari localStorage jika ada
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Interceptor Respon (Response Interceptor)
 * Menangani error global seperti 401 atau 404
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Sesi telah berakhir. Silakan login kembali.");
      // Logika logout atau redirect bisa diletakkan di sini
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
