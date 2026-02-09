import React from "react";
import {
  Settings2,
  ChevronDown,
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartType, ChartFilterState } from "@/types/chart";

interface ChartFilterProps {
  onPreview: (state: ChartFilterState) => void;
}

export function ChartFilter({ onPreview }: ChartFilterProps) {
  const [filter, setFilter] = React.useState<ChartFilterState>({
    type: "line",
    xAxis: "",
    yAxis: "",
    columnGroup: "",
  });

  return (
    <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6 w-full max-w-md">
      {/* Gaya Grafik */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900 font-tubaba uppercase tracking-tight">
          Gaya Grafik
        </label>
        <div className="relative">
          <select
            value={filter.type}
            onChange={(e) =>
              setFilter({ ...filter, type: e.target.value as ChartType })
            }
            className="w-full h-12 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl appearance-none text-sm font-medium text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="area">Area Chart</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Axis X */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900 font-tubaba uppercase tracking-tight">
          Axis X
        </label>
        <div className="relative">
          <select className="w-full h-12 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl appearance-none text-sm font-medium text-slate-400 outline-none transition-all cursor-pointer">
            <option value="">Pilih Kolom Data</option>
            <option value="kecamatan">Kecamatan</option>
            <option value="tahun">Tahun</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Axis Y */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900 font-tubaba uppercase tracking-tight">
          Axis Y
        </label>
        <div className="relative">
          <select className="w-full h-12 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl appearance-none text-sm font-medium text-slate-400 outline-none transition-all cursor-pointer">
            <option value="">Pilih Nilai</option>
            <option value="populasi">Jumlah Populasi</option>
            <option value="luas">Luas Wilayah</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Tombol Pertinjau */}
      <Button
        onClick={() => onPreview(filter)}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-tubaba-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <Settings2 className="w-4 h-4" />
        PERTINJAU
      </Button>
    </div>
  );
}
