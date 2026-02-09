import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartDataItem } from "@/types/chart"; // Pastikan path benar

interface LineChartProps {
  data: ChartDataItem[];
  title?: string;
}

export function LineChartComponent({ data, title }: LineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-slate-400 font-medium italic bg-slate-50 rounded-xl">
        Data tidak tersedia untuk Line Chart
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      {title && (
        <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#475569", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#cbd5e1" }}
          />
          <YAxis
            tick={{ fill: "#475569", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#cbd5e1" }}
          />
          <Tooltip
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
          <Line
            type="monotone" // Garis halus
            dataKey="value"
            stroke="#800000" // Warna Maroon untuk garis
            strokeWidth={2}
            dot={{ r: 4, fill: "#D4AF37", stroke: "#800000", strokeWidth: 1 }} // Dot Gold dengan border Maroon
            activeDot={{
              r: 6,
              fill: "#800000",
              stroke: "#D4AF37",
              strokeWidth: 2,
            }} // Active dot yang menonjol
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
