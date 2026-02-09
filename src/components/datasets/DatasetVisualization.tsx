import React, { useMemo } from "react";
import {
  BarChartComponent,
  PieChartComponent,
  LineChartComponent,
} from "@/components/charts/index";
import { formatChartData } from "@/lib/FormatChartData";
import { ChartDataItem, SupportedChartType } from "@/types/api";

interface DatasetVisualizationProps {
  rawData: Record<string, any>[];
  chartType: SupportedChartType;
  labelKey: string;
  valueKey: string;
}

export default function DatasetVisualization({
  rawData,
  chartType,
  labelKey,
  valueKey,
}: DatasetVisualizationProps) {
  const chartData: ChartDataItem[] = useMemo(() => {
    return formatChartData(rawData, labelKey, valueKey);
  }, [rawData, labelKey, valueKey]);

  if (chartData.length === 0) return <FallbackEmpty />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      {chartType === "bar" && <BarChartComponent data={chartData} />}
      {chartType === "pie" && <PieChartComponent data={chartData} />}
      {chartType === "line" && <LineChartComponent data={chartData} />}
    </div>
  );
}

const FallbackEmpty = () => (
  <div className="py-20 text-center text-slate-400 bg-slate-50 rounded-3xl border-2 border-dashed">
    <p className="italic font-tubaba">Data visualisasi tidak tersedia</p>
  </div>
);
