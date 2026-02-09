import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartDataItem } from "@/types/chart"; // Pastikan path benar

interface PieChartProps {
  data: ChartDataItem[];
  title?: string;
}

const PIE_COLORS = [
  "#800000",
  "#D4AF37",
  "#1E293B",
  "#475569",
  "#94A3B8",
  "#A3B18A",
]; // Maroon, Gold, dan warna netral lainnya

export function PieChartComponent({ data, title }: PieChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-slate-400 font-medium italic bg-slate-50 rounded-xl">
        Data tidak tersedia untuk Pie Chart
      </div>
    );
  }

  // Hitung total nilai untuk persentase
  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="h-[300px] w-full">
      {title && (
        <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // Membuat Donut Chart
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={3} // Jarak antar slice
            dataKey="value"
            labelLine={false} // Menghilangkan garis label
            // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Opsional: tampilkan label di chart
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
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
            formatter={(value: number, name: string) => {
              const percentage = ((value / totalValue) * 100).toFixed(1);
              return [`${value.toLocaleString()} (${percentage}%)`, name];
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
