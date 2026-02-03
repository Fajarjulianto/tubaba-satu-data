import axiosInstance from "axios";
import { Dataset } from "@/types/dataset";
import axios from "axios";

/**
 * Fungsi lengkap untuk mengambil satu dataset berdasarkan ID
 * @param id - Identitas unik dataset
 * @returns Objek Dataset atau null jika gagal
 */
export async function fetchDatasetById(id: string): Promise<Dataset | null> {
  try {
    const response = await axiosInstance.get<Dataset>(`/datasets/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`API Error (${error.response?.status}): ${error.message}`);
    } else {
      console.error("Unexpected Error:", error);
    }
    return null;
  }
}

/**
 * Fungsi untuk mengambil semua dataset (Daftar Dataset)
 */
export async function fetchAllDatasets(): Promise<Dataset[]> {
  try {
    const response = await axiosInstance.get<Dataset[]>("/datasets");
    return response.data;
  } catch (error) {
    console.error("Gagal memuat daftar dataset:", error);
    return [];
  }
}
