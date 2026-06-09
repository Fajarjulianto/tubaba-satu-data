// src/hooks/data/useFetchIkm.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface IkmData {
  kecamatan: string;
  nilaiIkm: number;
  tahun: string;
  umur: number;
  jenisKelamin: string;
}

export const useFetchIkm = () => {
  const csvUrl = import.meta.env.VITE_IKM_CSV_URL;

  return useQuery<IkmData[]>({
    queryKey: ["ikm-direct-sheets"],
    queryFn: async () => {
      if (!csvUrl) return [];
      
      const response = await axios.get<string>(csvUrl);
      const rawText = response.data;
      const rows = rawText.split(/\r?\n/);
      if (rows.length <= 1) return []; 

      const result: IkmData[] = [];

      for (let i = 1; i < rows.length; i++) {
        const currentRow = rows[i].split(",");
        if (currentRow.length >= 5 && currentRow[0].trim() !== "") {
          result.push({
            kecamatan: currentRow[0].replace(/"/g, "").trim(), 
            nilaiIkm: parseFloat(currentRow[1]) || 0,
            tahun: currentRow[2].replace(/"/g, "").trim(),
            umur: parseInt(currentRow[3].replace(/"/g, "").trim()) || 0,
            jenisKelamin: currentRow[4].replace(/"/g, "").trim(),
          });
        }
      }

      return result;
    },
    staleTime: 5 * 60 * 1000,
  });
};