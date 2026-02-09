import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartDataItem } from "@/types/chart"; // Pastikan path benar

interface BarChartProps {
  data: ChartDataItem[];
  title?: string;
}

const COLORS = ["#800000", "#D4AF37"]; // Maroon dan Gold

export function BarChartComponent({ data, title }: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-slate-400 font-medium italic bg-slate-50 rounded-xl">
        Data tidak tersedia untuk Bar Chart
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      {title && (
        <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20, // Sesuaikan jika label YAxis terpotong
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />{" "}
          {/* Garis grid halus */}
          <XAxis
            dataKey="name"
            angle={-30} // Memiringkan label untuk menghindari tumpang tindih
            textAnchor="end"
            height={60} // Tinggi axis untuk label yang dimiringkan
            tick={{ fill: "#475569", fontSize: 11 }} // Warna teks label Axis X
            tickLine={false} // Menghilangkan garis kecil di tick
            axisLine={{ stroke: "#cbd5e1" }} // Warna garis Axis X
          />
          <YAxis
            tick={{ fill: "#475569", fontSize: 11 }} // Warna teks label Axis Y
            tickLine={false}
            axisLine={{ stroke: "#cbd5e1" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(212, 175, 55, 0.1)" }} // Highlight area saat hover
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              fontFamily: "var(--font-tubaba)",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#1e293b", fontWeight: "bold" }}
            itemStyle={{ color: "#1e293b" }}
            formatter={(value: number) => [value.toLocaleString(), "Nilai"]}
          />
          <Bar
            dataKey="value"
            fill={COLORS[0]}
            maxBarSize={40}
            radius={[8, 8, 0, 0]}
          />{" "}
          {/* Bar dengan sudut membulat */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
