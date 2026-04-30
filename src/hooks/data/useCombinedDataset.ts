import { useMemo } from "react";
import { useFetchLaravelDatasets } from "./useFetchDatasets";
import { useFetchCkan } from "./useFetchCkan";
import { mapCkanToDataset } from "./useFetchDatasets";
import { Dataset } from "@/types/index";

interface UseCombinedDatasetsReturn {
  data: Dataset[];
  isLoading: boolean;
  isError: boolean;
  ckanCount: number;
  laravelCount: number;
}

// Single Hook yang menggabungkan dataset dari API CKAN dan API Laravel.

export const useCombinedDatasets = (): UseCombinedDatasetsReturn => {
  const ckan = useFetchCkan();
  const laravel = useFetchLaravelDatasets();

  const data = useMemo<Dataset[]>(() => {
    const ckanData = (ckan.data ?? []).map(mapCkanToDataset);
    const laravelData = laravel.data ?? [];
    return [...laravelData, ...ckanData];
  }, [ckan.data, laravel.data]);

  return {
    data,
    isLoading: ckan.isLoading && laravel.isLoading,
    isError: ckan.isError || laravel.isError,
    ckanCount: ckan.data?.length ?? 0,
    laravelCount: laravel.data?.length ?? 0,
  };
};