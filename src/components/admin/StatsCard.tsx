import { FileText, UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/index";

// Data statistik berdasarkan referensi gambar
const statsData = [
  {
    title: "Total Dataset",
    value: "156",
    label: "Dataset aktif",
    icon: FileText,
  },
  {
    title: "Upload Bulan Ini",
    value: "24",
    label: "+8 dari bulan lalu",
    icon: UploadCloud,
  },
  {
    title: "Berhasil",
    value: "142",
    label: "91% tingkat keberhasilan",
    icon: CheckCircle2,
  },
  {
    title: "Perlu Tindakan",
    value: "3",
    label: "Menunggu validasi",
    icon: AlertCircle,
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className="rounded-xl border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-slate-500">
                {stat.title}
              </span>
              <stat.icon className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-slate-900">
                {stat.value}
              </h3>
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
