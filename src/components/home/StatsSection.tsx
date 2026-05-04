import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Database,
  Building2,
  LayoutGrid,
  FileType2,
  ServerCrash,
  Loader2,
} from "lucide-react";
import { useStatsData, DataSource } from "@/hooks/useStatsData";

// ─── Tipe lokal ────────────────────────────────────────────────────────────────

interface ChipOption {
  value: DataSource;
  label: string;
  color: string;
  activeClass: string;
  dotClass: string;
}


const SOURCE_CHIPS: ChipOption[] = [
  {
    value: "all",
    label: "Semua Sumber",
    color: "#6D2323",
    activeClass: "bg-[#6D2323] text-white border-[#6D2323]",
    dotClass: "bg-white",
  },
  {
    value: "laravel",
    label: "Data OPD",
    color: "#2563eb",
    activeClass: "bg-blue-600 text-white border-blue-600",
    dotClass: "bg-white",
  },
  {
    value: "ckan",
    label: "BPS",
    color: "#059669",
    activeClass: "bg-emerald-600 text-white border-emerald-600",
    dotClass: "bg-white",
  },
];

const PIE_COLORS = [
  "#6D2323", "#c0392b", "#e67e22", "#f39c12",
  "#27ae60", "#2980b9", "#8e44ad", "#16a085",
];

const INACTIVE_CHIP =
  "bg-card text-muted-foreground border border-border hover:border-primary/40 hover:text-primary transition-colors";



interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  sublabel?: string;
  loading?: boolean;
}

function StatCard({ icon: Icon, label, value, sublabel, loading }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 flex items-center gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
      </div>
      <div className="min-w-0">
        {loading ? (
          <div className="flex items-center gap-2 h-8">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Memuat...</span>
          </div>
        ) : (
          <div className="text-lg md:text-2xl font-bold text-foreground tabular-nums">
            {value.toLocaleString("id-ID")}
          </div>
        )}
        <div className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 md:gap-2 flex-wrap">
          <span className="truncate">{label}</span>
          {sublabel && (
            <span className="text-xs text-emerald-600 font-medium">{sublabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}



interface SourceChipFilterProps {
  active: DataSource[];
  onChange: (sources: DataSource[]) => void;
}

function SourceChipFilter({ active, onChange }: SourceChipFilterProps) {
  const toggle = (val: DataSource) => {
    if (val === "all") {
      onChange(["all"]);
      return;
    }
    const withoutAll = active.filter((s) => s !== "all");
    const already = withoutAll.includes(val);
    const next = already
      ? withoutAll.filter((s) => s !== val)
      : [...withoutAll, val];
    onChange(next.length === 0 ? ["all"] : next);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium">Sumber:</span>
      {SOURCE_CHIPS.map((chip) => {
        const isActive = active.includes(chip.value);
        return (
          <button
            key={chip.value}
            onClick={() => toggle(chip.value)}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
              border transition-all duration-150 cursor-pointer select-none
              ${isActive ? chip.activeClass : INACTIVE_CHIP}
            `}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                isActive ? chip.dotClass : ""
              }`}
              style={!isActive ? { backgroundColor: chip.color } : {}}
            />
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}


export function StatsSection() {
  const stats = useStatsData();
  const [activeSources, setActiveSources] = useState<DataSource[]>(["all"]);

  const resolvedStats = useMemo(() => {
    if (
      activeSources.includes("all") ||
      (activeSources.includes("laravel") && activeSources.includes("ckan"))
    ) {
      return stats.all;
    }
    if (activeSources.includes("laravel") && !activeSources.includes("ckan")) {
      return stats.laravel;
    }
    if (activeSources.includes("ckan") && !activeSources.includes("laravel")) {
      return stats.ckan;
    }
    return stats.all;
  }, [activeSources, stats]);

  const chartCategoryData = useMemo(() => {
    const isAll =
      activeSources.includes("all") ||
      (activeSources.includes("laravel") && activeSources.includes("ckan"));

    return stats.categoryBreakdown.slice(0, 8).map((item) => ({
      name: item.name.length > 14 ? item.name.slice(0, 14) + "…" : item.name,
      ...(isAll || activeSources.includes("laravel") ? { "Data OPD": item.laravel } : {}),
      ...(isAll || activeSources.includes("ckan") ? { "BPS": item.ckan } : {}),
    }));
  }, [activeSources, stats.categoryBreakdown]);

  // Data pie format file
  const chartFormatData = useMemo(() => {
    const isAll =
      activeSources.includes("all") ||
      (activeSources.includes("laravel") && activeSources.includes("ckan"));

    return stats.formatBreakdown.slice(0, 8).map((item) => ({
      name: item.name || "Lainnya",
      value: isAll
        ? item.total
        : activeSources.includes("laravel")
        ? item.laravel
        : item.ckan,
    })).filter((d) => d.value > 0);
  }, [activeSources, stats.formatBreakdown]);

  // Sublabel untuk stats card
  const sourceLabel = useMemo(() => {
    if (activeSources.includes("all") ||
      (activeSources.includes("laravel") && activeSources.includes("ckan"))
    ) return `OPD: ${stats.laravelCount} · BPS: ${stats.ckanCount}`;
    if (activeSources.includes("laravel")) return `dari Data OPD`;
    if (activeSources.includes("ckan")) return `dari BPS / CKAN`;
    return "";
  }, [activeSources, stats]);

  const statCards = [
    {
      icon: Database,
      label: "Total Dataset",
      value: resolvedStats.totalDatasets,
      sublabel: sourceLabel,
    },
    {
      icon: Building2,
      label: "Produsen / OPD",
      value: resolvedStats.totalOrganizations,
    },
    {
      icon: LayoutGrid,
      label: "Kategori Data",
      value: resolvedStats.totalCategories,
    },
    {
      icon: FileType2,
      label: "Format File",
      value: resolvedStats.totalFormats,
    },
  ];

  return (
    <section className="py-10 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
            Statistik Satu Data Tubaba
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Informasi statistik terkini mengenai dataset dan penggunaannya
          </p>
        </div>

        {/* Chip Filter */}
        <div className="flex justify-center mb-5 md:mb-7">
          <SourceChipFilter active={activeSources} onChange={setActiveSources} />
        </div>

        {/* Error State */}
        {stats.isError && (
          <div className="flex items-center justify-center gap-2 text-sm text-destructive mb-6 bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
            <ServerCrash className="w-4 h-4 shrink-0" />
            <span>Gagal memuat sebagian data. Menampilkan data yang tersedia.</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-10">
          {statCards.map((card) => (
            <StatCard
              key={card.label}
              icon={card.icon}
              label={card.label}
              value={card.value}
              sublabel={card.sublabel}
              loading={stats.isLoading}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">

          {/* Bar Chart — Kategori */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6">
            <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-4">
              Dataset per Kategori
            </h3>
            {stats.isLoading ? (
              <div className="h-48 md:h-64 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartCategoryData}
                    margin={{ top: 0, right: 0, bottom: 0, left: -16 }}
                  >
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    {(activeSources.includes("all") ||
                      (activeSources.includes("laravel") && activeSources.includes("ckan")) ||
                      activeSources.includes("laravel")) && (
                      <Bar
                        dataKey="Data OPD"
                        fill="#2563eb"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={32}
                      />
                    )}
                    {(activeSources.includes("all") ||
                      (activeSources.includes("laravel") && activeSources.includes("ckan")) ||
                      activeSources.includes("ckan")) && (
                      <Bar
                        dataKey="BPS"
                        fill="#059669"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={32}
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Pie Chart — Format File */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6">
            <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-4">
              Distribusi Format File
            </h3>
            {stats.isLoading ? (
              <div className="h-48 md:h-64 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <div className="h-40 w-40 md:h-48 md:w-48 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartFormatData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={65}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartFormatData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  {chartFormatData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                        }}
                      />
                      <span className="text-xs md:text-sm text-muted-foreground truncate">
                        {item.name} ({item.value})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}