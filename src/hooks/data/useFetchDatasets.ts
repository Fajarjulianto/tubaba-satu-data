import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Dataset } from "@/types/index";

/**
 * Hook untuk fetching dataset menggunakan Axios & TanStack Query
 */
export const useFetchDatas = () => {
  return useQuery<Dataset[]>({
    queryKey: ["datasets"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Dataset[]>(`/datasets`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
