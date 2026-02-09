import { ChartDataItem } from "@/types/chart";

export const formatChartData = <T extends Record<string, any>>(
  data: T[],
  labelKey: string,
  valueKey: string,
): ChartDataItem[] => {
  if (!data || !Array.isArray(data)) return [];

  return data.map((item) => ({
    name: String(item[labelKey] || "Tanpa Nama"),
    value: Number(item[valueKey]) || 0,
  }));
};
