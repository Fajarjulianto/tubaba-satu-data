import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Dataset } from "@/types/dataset";

/**
 * Hook untuk mengambil seluruh daftar dataset
 * Memberikan fitur caching otomatis selama 5 menit
 */
export function useDatasets() {
  return useQuery<Dataset[]>({
    queryKey: ["datasets"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Dataset[]>("/datasets");
      return data;
    },
    staleTime: 1000 * 60 * 5, // Data dianggap 'fresh' selama 5 menit
  });
}

/**
 * Hook untuk mengambil satu detail dataset berdasarkan ID
 * @param id - ID unik dari dataset
 */
export function useDataset(id: string | undefined) {
  return useQuery<Dataset | null>({
    queryKey: ["dataset", id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await axiosInstance.get<Dataset>(`/datasets/${id}`);
      return data;
    },
    enabled: !!id, // Query hanya berjalan jika ID tersedia
    retry: 2, // Mencoba ulang 2 kali jika gagal koneksi
  });
}
