import { Layout } from "@/components/layout/Layout";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import {
  BarChart3,
  TrendingUp,
  Users,
  GraduationCap,
  Heart,
  Building,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const populationData = [
  { year: "2019", total: 265000 },
  { year: "2020", total: 271000 },
  { year: "2021", total: 278000 },
  { year: "2022", total: 285000 },
  { year: "2023", total: 292000 },
  { year: "2024", total: 298000 },
];

const economicData = [
  { quarter: "Q1 2023", pdrb: 4.2 },
  { quarter: "Q2 2023", pdrb: 4.5 },
  { quarter: "Q3 2023", pdrb: 4.8 },
  { quarter: "Q4 2023", pdrb: 5.1 },
  { quarter: "Q1 2024", pdrb: 5.3 },
];

const educationData = [
  { level: "SD", count: 42500 },
  { level: "SMP", count: 18200 },
  { level: "SMA", count: 12800 },
  { level: "SMK", count: 8400 },
];

const healthData = [
  { name: "Puskesmas", value: 18, color: "#68272e" },
  { name: "Rumah Sakit", value: 3, color: "#cfb57e" },
  { name: "Klinik", value: 25, color: "#10b981" },
  { name: "Posyandu", value: 156, color: "#3b82f6" },
];

const kpiCards = [
  {
    title: "Total Populasi",
    value: "298,450",
    change: "+2.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Pertumbuhan Ekonomi",
    value: "5.3%",
    change: "+0.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Siswa Terdaftar",
    value: "81,900",
    change: "+3.1%",
    trend: "up",
    icon: GraduationCap,
  },
  {
    title: "Fasilitas Kesehatan",
    value: "202",
    change: "+8",
    trend: "up",
    icon: Heart,
  },
];

const Analysis = () => {
  return (
    <Layout>
      <HeaderSection
        title="Data Analisis"
        description="Visualisasi interaktif dan wawasan dari indikator kunci Tulang Bawang Barat. Jelajahi tren, pola, dan wawasan berbasis data."
      />

      <main className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {kpiCards.map((kpi) => (
            <div
              key={kpi.title}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-burgundy-light flex items-center justify-center">
                  <kpi.icon className="w-5 h-5 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    kpi.trend === "up" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {kpi.change}
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {kpi.value}
              </div>
              <div className="text-sm text-muted-foreground">{kpi.title}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Population Trend */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">
              Tren Pertumbuhan Penduduk
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Data penduduk tahunan dari 2019-2024
            </p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={populationData}>
                  <defs>
                    <linearGradient
                      id="colorPopulation"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#68272e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#68272e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis dataKey="year" className="text-xs" />
                  <YAxis
                    className="text-xs"
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [
                      value.toLocaleString(),
                      "Populasi",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#68272e"
                    fill="url(#colorPopulation)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Economic Growth */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">
              Tingkat Pertumbuhan PDRB
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Pertumbuhan PDRB kuartalan dalam persen
            </p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis dataKey="quarter" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Growth Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="pdrb"
                    stroke="#cfb57e"
                    strokeWidth={3}
                    dot={{ fill: "#cfb57e", strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Education Stats */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">
              Jumlah Peserta Didik per Jenjang
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Jumlah peserta didik berdasarkan jenjang pendidikan
            </p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={educationData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-border"
                  />
                  <XAxis
                    type="number"
                    className="text-xs"
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    dataKey="level"
                    type="category"
                    className="text-xs"
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [
                      value.toLocaleString(),
                      "Students",
                    ]}
                  />
                  <Bar dataKey="count" fill="#68272e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Facilities */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">
              Distribusi Fasilitas Kesehatan
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Jenis-jenis fasilitas kesehatan di wilayah Tubaba
            </p>
            <div className="flex items-center gap-6 h-72">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {healthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-3">
                {healthData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Analysis;
