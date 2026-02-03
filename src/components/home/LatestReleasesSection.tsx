import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  FileSpreadsheet,
  FileJson,
  FileText,
} from "lucide-react";
import { Badge, Button } from "@/components/index";
const latestReleases = [
  {
    id: "1",
    title: "Data Penduduk Menurut Kecamatan 2024",
    category: "Populasi",
    agency: "BPS Tubaba",
    date: "Jan 15, 2024",
    fileType: "CSV",
  },
  {
    id: "2",
    title: "Prevalensi Stunting Balita 2023",
    category: "Kesehatan",
    agency: "Dinas Kesehatan",
    date: "Jan 12, 2024",
  },
  {
    id: "3",
    title: "PDRB Menurut Lapangan Usaha 2023",
    category: "Ekonomi",
    agency: "BPS Tubaba",
    date: "Jan 10, 2024",
    fileType: "XLSX",
  },
  {
    id: "4",
    title: "Rekapitulasi Data Siswa 2023/2024",
    category: "Pendidikan",
    agency: "Dinas Pendidikan",
    date: "Jan 8, 2024",
    fileType: "JSON",
  },
  {
    id: "5",
    title: "Data Penerima PKH 2024",
    category: "Sosial",
    agency: "Dinas Sosial",
    date: "Jan 5, 2024",
    fileType: "CSV",
  },
];

const fileTypeIcons: Record<string, typeof FileSpreadsheet> = {
  CSV: FileSpreadsheet,
  XLSX: FileSpreadsheet,
  JSON: FileJson,
  PDF: FileText,
};

export function LatestReleasesSection() {
  return (
    <section className="py-10 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-2">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
              Data Terbaru
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Dataset yang baru saja diterbitkan dan diperbarui
            </p>
          </div>
          <Link
            to="/dataset"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="divide-y divide-border">
            {latestReleases.map((release) => {
              const FileIcon =
                fileTypeIcons[release.fileType || "CSV"] || FileSpreadsheet;
              return (
                <Link
                  key={release.id}
                  to={`/datasets/${release.id}`}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-burgundy-light flex items-center justify-center shrink-0">
                    <FileIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm md:text-base text-foreground truncate">
                      {release.title}
                    </h4>
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                      <span className="truncate">{release.agency}</span>
                      <span className="hidden sm:inline">•</span>
                      <Badge
                        variant="secondary"
                        className="text-xs hidden sm:inline-flex"
                      >
                        {release.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs md:text-sm text-muted-foreground shrink-0">
                    <Calendar className="w-4 h-4" />
                    {release.date}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-primary text-xs md:text-sm"
                  >
                    Lihat
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <Link
          to="/datasets"
          className="md:hidden flex items-center justify-center gap-2 text-primary font-medium mt-6 hover:underline"
        >
          Lihat Semua <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
