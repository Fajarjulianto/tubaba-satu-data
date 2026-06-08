import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  FileSpreadsheet,
  FileJson,
  FileText,
  Loader2,
} from "lucide-react";
import { Badge, Button } from "@/components/index";
import { useCombinedDatasets } from "@/hooks/data/useCombinedDataset";
import { Dataset } from "@/types";

// ─── Konstanta ─────────────────────────────────────────────────────────────────

const MAX_ITEMS = 5;

const FILE_TYPE_ICONS: Record<string, typeof FileSpreadsheet> = {
  CSV: FileSpreadsheet,
  XLSX: FileSpreadsheet,
  XLS: FileSpreadsheet,
  JSON: FileJson,
  PDF: FileText,
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const getDateValue = (d: Dataset): number => {
  const raw =
    d.metadata_modified ||
    d.metadata?.lastUpdated ||
    d.lastUpdated ||
    "";
  if (!raw) return 0;
  try {
    return new Date(raw).getTime();
  } catch {
    return 0;
  }
};

const buildDetailPath = (dataset: Dataset): string => {
  const opd = encodeURIComponent(dataset.agency || dataset.organization?.name || "");
  return `/datasets/${dataset.id}?opd=${opd}&source=${dataset.source}`;
};

// ─── Komponen Utama ────────────────────────────────────────────────────────────

export function LatestReleasesSection() {
  const { data: datasets = [], isLoading } = useCombinedDatasets();

  // Ambil 5 dataset terbaru berdasarkan tanggal update
  const latestReleases = useMemo(() => {
    return [...datasets]
      .sort((a, b) => getDateValue(b) - getDateValue(a))
      .slice(0, MAX_ITEMS);
  }, [datasets]);

  return (
    <section className="py-10 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
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

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
            {[...Array(MAX_ITEMS)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 animate-pulse">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-slate-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-2/3" />
                  <div className="h-2.5 bg-slate-100 rounded w-1/3" />
                </div>
                <div className="hidden sm:block h-2.5 bg-slate-100 rounded w-20 shrink-0" />
              </div>
            ))}
          </div>
        ) : latestReleases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <p className="text-sm">Memuat data terbaru...</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="divide-y divide-border">
              {latestReleases.map((release) => {
                const fileType = (release.fileType || "CSV").toUpperCase();
                const FileIcon = FILE_TYPE_ICONS[fileType] ?? FileSpreadsheet;
                const dateStr = formatDate(
                  release.metadata_modified ||
                  release.metadata?.lastUpdated ||
                  release.lastUpdated ||
                  ""
                );

                return (
                  <Link
                    key={release.id}
                    to={buildDetailPath(release)}
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-muted/50 transition-colors"
                  >
                    {/* Ikon file */}
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-burgundy-light flex items-center justify-center shrink-0">
                      <FileIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>

                    {/* Judul + metadata */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm md:text-base text-foreground truncate">
                        {release.title}
                      </h4>
                      <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground mt-0.5">
                        <span className="truncate max-w-[140px]">
                          {release.agency || release.organization?.title}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <Badge
                          variant="secondary"
                          className="text-xs hidden sm:inline-flex"
                        >
                          {release.category}
                        </Badge>
                        {/* Badge sumber data */}
                        <span
                          className={`hidden sm:inline-flex text-[10px] px-1.5 py-0.5 rounded-full font-medium border ${
                            release.source === "ckan"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {release.source === "OPD" ? "OPD" : "CKAN"}
                        </span>
                      </div>
                    </div>

                    {/* Tanggal */}
                    <div className="hidden sm:flex items-center gap-2 text-xs md:text-sm text-muted-foreground shrink-0">
                      <Calendar className="w-4 h-4" />
                      {dateStr}
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
        )}

        {/* Link mobile */}
        <Link
          to="/dataset"
          className="md:hidden flex items-center justify-center gap-2 text-primary font-medium mt-6 hover:underline"
        >
          Lihat Semua <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}