import { useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  Database, Building2, LayoutGrid, TrendingUp,
  ArrowUpRight, ArrowDownRight, Minus, Search,
  ChevronUp, ChevronDown, ChevronsUpDown,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import { useCombinedDatasets } from "@/hooks/data/useCombinedDataset";
import { Dataset } from "@/types";

// ─── Konstanta ────────────────

const PRIMARY   = "#6D2323";
const SECONDARY = "#F4E4E4";
const BLUE      = "#2563eb";
const GREEN     = "#059669";
const AMBER     = "#d97706";

const SOURCE_COLORS: Record<string, string> = {
  "Data OPD": BLUE,
  "BPS/CKAN": GREEN,
};

const CHART_COLORS = [
  PRIMARY, BLUE, GREEN, AMBER,
  "#7c3aed", "#0891b2", "#be185d", "#65a30d",
  "#9f1239", "#1d4ed8", "#064e3b", "#78350f",
];

// ─── Types ──────────────────────
type SortDir = "asc" | "desc" | null;
type SortKey = "name" | "total" | "laravel" | "ckan" | "categories" | "formats";

interface OpdRow {
  name: string;
  total: number;
  laravel: number;
  ckan: number;
  categories: number;
  formats: number;
  lastUpdated: string;
}

// ─── Helpers ──────────────────

const formatDate = (d: string) => {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return d; }
};

// ─── Custom Tooltip ────────────────

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="font-bold text-slate-900 mb-2 truncate max-w-[180px]">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
          <span className="text-slate-900">{p.name}:</span>
          <span className="font-bold text-slate-900">{p.value.toLocaleString("id-ID")}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Sub: Summary Card ──────────

interface SummaryCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  sub?: string;
  trend?: "up" | "down" | "flat";
  color?: string;
  loading?: boolean;
}

function SummaryCard({ icon: Icon, label, value, sub, trend, color = PRIMARY, loading }: SummaryCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const trendCls  = trend === "up" ? "text-emerald-600" : trend === "down" ? "text-rose-500" : "text-slate-400";
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend && <TrendIcon className={`w-4 h-4 ${trendCls}`} />}
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="h-7 w-24 bg-slate-100 rounded animate-pulse" />
          <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
        </div>
      ) : (
        <>
          <div className="text-2xl font-black text-slate-800 tabular-nums">
            {typeof value === "number" ? value.toLocaleString("id-ID") : value}
          </div>
          <div className="text-xs text-slate-900 font-medium leading-tight">
            {label}
            {sub && <span className="block text-slate-900 mt-0.5">{sub}</span>}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Sub: Section Header ───────────────
function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h3 className="font-black text-base text-slate-900">{title}</h3>
      {sub && <p className="text-xs text-slate-900 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Halaman Utama ───────────────────────

const Analysis = () => {
  const { data: datasets = [], isLoading, laravelCount, ckanCount } = useCombinedDatasets();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey]   = useState<SortKey>("total");
  const [sortDir, setSortDir]   = useState<SortDir>("desc");

  // ── Derive OPD rows ─────────────────────
  const opdRows = useMemo<OpdRow[]>(() => {
    const map: Record<string, { laravel: number; ckan: number; cats: Set<string>; fmts: Set<string>; dates: string[] }> = {};
    datasets.forEach((d: Dataset) => {
      const key = d.agency || d.organization?.title || "Tidak Diketahui";
      if (!map[key]) map[key] = { laravel: 0, ckan: 0, cats: new Set(), fmts: new Set(), dates: [] };
      if (d.source === "laravel") map[key].laravel++;
      else map[key].ckan++;
      if (d.category) map[key].cats.add(d.category);
      if (d.fileType) map[key].fmts.add(d.fileType);
      const date = d.metadata_modified || d.lastUpdated || "";
      if (date) map[key].dates.push(date);
    });
    return Object.entries(map).map(([name, v]) => ({
      name,
      total: v.laravel + v.ckan,
      laravel: v.laravel,
      ckan: v.ckan,
      categories: v.cats.size,
      formats: v.fmts.size,
      lastUpdated: v.dates.sort().reverse()[0] ?? "",
    }));
  }, [datasets]);

  // ── Filtered + sorted rows ────────────────
  const filteredRows = useMemo(() => {
    let rows = opdRows.filter(r =>
      !search || r.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sortKey && sortDir) {
      rows = [...rows].sort((a, b) => {
        const va = sortKey === "name" ? a.name : a[sortKey];
        const vb = sortKey === "name" ? b.name : b[sortKey];
        if (typeof va === "string" && typeof vb === "string")
          return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
        return sortDir === "asc"
          ? (va as number) - (vb as number)
          : (vb as number) - (va as number);
      });
    }
    return rows;
  }, [opdRows, search, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : d === "desc" ? null : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ChevronsUpDown className="w-3 h-3 text-slate-300" />;
    if (sortDir === "asc")  return <ChevronUp   className="w-3 h-3 text-primary" />;
    if (sortDir === "desc") return <ChevronDown  className="w-3 h-3 text-primary" />;
    return <ChevronsUpDown className="w-3 h-3 text-slate-300" />;
  };

  // ── Chart data ───────────────

  // Bar: top 10 OPD
  const barData = useMemo(() =>
    [...opdRows].sort((a, b) => b.total - a.total).slice(0, 10).map(r => ({
      name: r.name.length > 22 ? r.name.slice(0, 22) + "…" : r.name,
      "Data OPD": r.laravel,
      "BPS/CKAN": r.ckan,
    })),
  [opdRows]);

  // Pie: distribusi sumber
  const pieData = [
    { name: "Data OPD (Laravel)", value: laravelCount, color: BLUE },
    { name: "BPS / CKAN",         value: ckanCount,    color: GREEN },
  ];

  // Pie: distribusi kategori
  const catPieData = useMemo(() => {
    const map: Record<string, number> = {};
    datasets.forEach(d => { const c = d.category || "Lainnya"; map[c] = (map[c] || 0) + 1; });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1]).slice(0, 8)
      .map(([name, value]) => ({ name, value }));
  }, [datasets]);

  // Radar: top 5 OPD multi-dimensi
  const radarData = useMemo(() => {
    const top5 = [...opdRows].sort((a, b) => b.total - a.total).slice(0, 5);
    const maxTotal = Math.max(...top5.map(r => r.total), 1);
    const maxCats  = Math.max(...top5.map(r => r.categories), 1);
    const maxFmts  = Math.max(...top5.map(r => r.formats), 1);
    return [
      { metric: "Total Dataset",  ...Object.fromEntries(top5.map(r => [r.name.slice(0, 12), Math.round((r.total / maxTotal) * 100)])) },
      { metric: "Kategori",       ...Object.fromEntries(top5.map(r => [r.name.slice(0, 12), Math.round((r.categories / maxCats) * 100)])) },
      { metric: "Format File",    ...Object.fromEntries(top5.map(r => [r.name.slice(0, 12), Math.round((r.formats / maxFmts) * 100)])) },
      { metric: "Data OPD",       ...Object.fromEntries(top5.map(r => [r.name.slice(0, 12), Math.round((r.laravel / Math.max(...top5.map(x => x.laravel), 1)) * 100)])) },
      { metric: "Data CKAN",      ...Object.fromEntries(top5.map(r => [r.name.slice(0, 12), Math.round((r.ckan / Math.max(...top5.map(x => x.ckan), 1)) * 100)])) },
    ];
  }, [opdRows]);

  const top5Names = useMemo(() =>
    [...opdRows].sort((a, b) => b.total - a.total).slice(0, 5).map(r => r.name.slice(0, 12)),
  [opdRows]);

  // Summary stats
  const totalDatasets    = datasets.length;
  const totalOpd         = opdRows.length;
  const totalCategories  = new Set(datasets.map(d => d.category).filter(Boolean)).size;
  const topOpd           = opdRows.sort((a, b) => b.total - a.total)[0];

  return (
    <Layout>
      <HeaderSection
        title="Analisis Data"
        description="Dashboard analitik dataset dan produsen data Satu Data Tubaba."
      />

      <main className="container mx-auto px-4 md:px-6 py-8 space-y-10">

        {/* ── Summary Cards ──────────────────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <SummaryCard icon={Database}   label="Total Dataset"      value={totalDatasets}  sub={`OPD: ${laravelCount} · CKAN: ${ckanCount}`} color={PRIMARY}  loading={isLoading} trend="up" />
            <SummaryCard icon={Building2}  label="Produsen Data / OPD" value={totalOpd}       color={BLUE}   loading={isLoading} />
            <SummaryCard icon={LayoutGrid} label="Kategori Data"       value={totalCategories} color={GREEN}  loading={isLoading} />
            <SummaryCard icon={TrendingUp} label="OPD Terbanyak"       value={topOpd?.total ?? 0} sub={topOpd?.name} color={AMBER} loading={isLoading} trend="up" />
          </div>
        </section>

        {/* ── Row 1: Bar Chart + Pie Sumber ──────────────────────────────── */}
        <section className="grid lg:grid-cols-3 gap-4 md:gap-6">

          {/* Bar Chart Top 10 OPD */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <SectionHeader
              title="Top 10 Produsen Data"
              sub="Jumlah dataset per OPD, breakdown berdasarkan sumber"
            />
            {isLoading ? (
              <div className="h-72 bg-slate-50 rounded-xl animate-pulse" />
            ) : (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ left: 8, right: 16, top: 0, bottom: 0 }}>
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis
                      type="category" dataKey="name" width={130}
                      axisLine={false} tickLine={false}
                      tick={{ fontSize: 10, fill: "#000205" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                    <Bar dataKey="Data OPD" stackId="a" fill={BLUE}  radius={[0, 0, 0, 0]} maxBarSize={18} />
                    <Bar dataKey="BPS/CKAN" stackId="a" fill={GREEN} radius={[0, 4, 4, 0]} maxBarSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Pie: distribusi sumber */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <SectionHeader
              title="Distribusi Sumber Data"
              sub="Proporsi dataset dari setiap sumber"
            />
            {isLoading ? (
              <div className="h-52 bg-slate-50 rounded-xl animate-pulse" />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={80}
                        paddingAngle={3} dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full space-y-2">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-900">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {item.value.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Row 2: Pie Kategori + Radar ────────────────────────────────── */}
        <section className="grid lg:grid-cols-2 gap-4 md:gap-6">

          {/* Pie Kategori */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <SectionHeader
              title="Distribusi Kategori Dataset"
              sub="8 kategori terbanyak dari seluruh sumber"
            />
            {isLoading ? (
              <div className="h-56 bg-slate-50 rounded-xl animate-pulse" />
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="h-44 w-44 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={catPieData} cx="50%" cy="50%" innerRadius={38} outerRadius={64}
                        paddingAngle={2} dataKey="value"
                      >
                        {catPieData.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 grid grid-cols-1 gap-1.5 w-full">
                  {catPieData.map((item, i) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                        <span className="text-slate-900 truncate">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums ml-2 shrink-0">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Radar: komparasi top 5 OPD */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <SectionHeader
              title="Komparasi Top 5 OPD"
              sub="Perbandingan multi-dimensi (skala 0–100)"
            />
            {isLoading ? (
              <div className="h-56 bg-slate-50 rounded-xl animate-pulse" />
            ) : (
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "#64748b" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    {top5Names.map((name, i) => (
                      <Radar key={name} name={name} dataKey={name}
                        stroke={CHART_COLORS[i % CHART_COLORS.length]}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                        fillOpacity={0.08}
                        strokeWidth={1.5}
                      />
                    ))}
                    <Legend
                      wrapperStyle={{ fontSize: "9px", paddingTop: "8px" }}
                      formatter={(v) => <span className="text-slate-900">{v}</span>}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </section>

        {/* ── Tabel OPD ──────────────────────────────────────────────────── */}
        <section className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-black text-base text-slate-800">Rekap Data per Produsen</h3>
              <p className="text-xs text-slate-900 mt-0.5">
                {filteredRows.length} dari {opdRows.length} OPD ditampilkan
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama OPD..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-slate-50"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {([
                    { key: "name",       label: "Nama Produsen / OPD" },
                    { key: "total",      label: "Total Dataset" },
                    { key: "laravel",    label: "Data OPD" },
                    { key: "ckan",       label: "BPS/CKAN" },
                    { key: "categories", label: "Kategori" },
                    { key: "formats",    label: "Format" },
                  ] as { key: SortKey; label: string }[]).map(col => (
                    <th key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest
                        text-slate-900 cursor-pointer select-none hover:text-primary transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        {col.label}
                        <SortIcon k={col.key} />
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-900">
                    Terakhir Update
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(7)].map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-3 bg-slate-100 rounded animate-pulse" style={{ width: j === 0 ? "70%" : "40%" }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm italic">
                      Tidak ada OPD yang sesuai pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, idx) => (
                    <tr key={row.name}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Rank + Nama */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-black text-slate-300 w-5 text-right shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-700 truncate max-w-[200px]" title={row.name}>
                            {row.name}
                          </span>
                        </div>
                      </td>
                      {/* Total */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-16">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(100, (row.total / (opdRows[0]?.total || 1)) * 100)}%`,
                                backgroundColor: PRIMARY,
                              }}
                            />
                          </div>
                          <span className="font-bold text-slate-800 tabular-nums text-xs">
                            {row.total.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </td>
                      {/* OPD */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold
                          ${row.laravel > 0 ? "bg-blue-50 text-blue-700" : "text-slate-300"}`}>
                          {row.laravel > 0 ? row.laravel : "—"}
                        </span>
                      </td>
                      {/* CKAN */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold
                          ${row.ckan > 0 ? "bg-emerald-50 text-emerald-700" : "text-slate-300"}`}>
                          {row.ckan > 0 ? row.ckan : "—"}
                        </span>
                      </td>
                      {/* Kategori */}
                      <td className="px-4 py-3 text-slate-600 text-xs tabular-nums">{row.categories}</td>
                      {/* Format */}
                      <td className="px-4 py-3 text-slate-600 text-xs tabular-nums">{row.formats}</td>
                      {/* Tanggal */}
                      <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                        {formatDate(row.lastUpdated)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer summary */}
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Total dataset: <strong className="text-slate-700">{totalDatasets.toLocaleString("id-ID")}</strong></span>
            <span>Data OPD: <strong className="text-blue-700">{laravelCount.toLocaleString("id-ID")}</strong></span>
            <span>BPS/CKAN: <strong className="text-emerald-700">{ckanCount.toLocaleString("id-ID")}</strong></span>
            <span>Produsen: <strong className="text-slate-700">{totalOpd}</strong></span>
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default Analysis;