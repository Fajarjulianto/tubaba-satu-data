import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { DatasetApiResponse } from "@/types/index";

/**
 * Hook untuk fetching detail dataset menggunakan Axios & TanStack Query
 */
export const useFetchDatasetDetail = (datasetId: string | undefined) => {
  return useQuery<DatasetApiResponse, Error>({
    queryKey: ["dataset", datasetId],
    queryFn: async () => {
      if (!datasetId) throw new Error("ID Dataset tidak diperlukan");
      const { data } = await axiosInstance.get<DatasetApiResponse>(
        `/datasets/${datasetId}`,
      );
      return data;
    },
    enabled: !!datasetId,
    staleTime: 5 * 60 * 1000,
  });
};
