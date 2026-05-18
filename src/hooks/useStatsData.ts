import { useMemo } from "react";
import { useCombinedDatasets } from "./data/useCombinedDataset";
import { Dataset } from "@/types/index";

export type DataSource = "all" | "laravel" | "ckan";

export interface SourceStats {
  totalDatasets: number;
  totalOrganizations: number;
  totalCategories: number;
  totalFormats: number;
}

export interface StatsData {
  all: SourceStats;
  laravel: SourceStats;
  ckan: SourceStats;
  categoryBreakdown: { name: string; laravel: number; ckan: number; total: number }[];
  formatBreakdown: { name: string; laravel: number; ckan: number; total: number }[];
  isLoading: boolean;
  isError: boolean;
  laravelCount: number;
  ckanCount: number;
}

const deriveStats = (datasets: Dataset[]): SourceStats => ({
  totalDatasets: datasets.length,
  totalOrganizations: new Set(datasets.map((d) => d.organization?.name ?? d.agency)).size,
  totalCategories: new Set(datasets.map((d) => d.category).filter(Boolean)).size,
  totalFormats: new Set(datasets.map((d) => d.fileType).filter(Boolean)).size,
});

const deriveBreakdown = (
  laravelData: Dataset[],
  ckanData: Dataset[],
  keyFn: (d: Dataset) => string
) => {
  const allKeys = new Set([
    ...laravelData.map(keyFn),
    ...ckanData.map(keyFn),
  ].filter(Boolean));

  return Array.from(allKeys)
    .map((key) => ({
      name: key,
      laravel: laravelData.filter((d) => keyFn(d) === key).length,
      ckan: ckanData.filter((d) => keyFn(d) === key).length,
      total:
        laravelData.filter((d) => keyFn(d) === key).length +
        ckanData.filter((d) => keyFn(d) === key).length,
    }))
    .sort((a, b) => b.total - a.total);
};

export const useStatsData = (): StatsData => {
  const { data, isLoading, isError, laravelCount, ckanCount } = useCombinedDatasets();
  const stats = useMemo<StatsData>(() => {
  const laravelData = data.filter((d) => d.source === "laravel");
  const ckanData = data.filter((d) => d.source === "ckan");

    return {
      all: deriveStats(data),
      laravel: deriveStats(laravelData),
      ckan: deriveStats(ckanData),
      categoryBreakdown: deriveBreakdown(laravelData, ckanData, (d) => d.category),
      formatBreakdown: deriveBreakdown(laravelData, ckanData, (d) => d.fileType),
      isLoading,
      isError,
      laravelCount,
      ckanCount,
    };
  }, [data, isLoading, isError, laravelCount, ckanCount]);

  return stats;
};
