import { ChartDataItem, DatasetPreviewRow } from "@/types/index";

export const formatChartData = (
  data: DatasetPreviewRow[],
  labelKey: string,
  valueKey: string,
): ChartDataItem[] => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }

  return data.map((item) => {
    const rawLabel = item[labelKey];
    const rawValue = item[valueKey];

    const name =
      rawLabel !== null && rawLabel !== undefined
        ? String(rawLabel)
        : "Tanpa Nama";

    const value =
      typeof rawValue === "number" ? rawValue : Number(rawValue) || 0;

    return {
      name,
      value: isNaN(value) ? 0 : value,
    };
  });
};
