import { Layout } from "@/components/layout/Layout";
import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  FileText,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";

const populationData = [
  { kecamatan: "TB Tengah", population: 45230, male: 23100, female: 22130 },
  { kecamatan: "Tumijajar", population: 38120, male: 19500, female: 18620 },
  { kecamatan: "Way Kenanga", population: 29450, male: 15200, female: 14250 },
  { kecamatan: "Lambu Kibang", population: 25680, male: 13100, female: 12580 },
  { kecamatan: "Gunung Agung", population: 31250, male: 16000, female: 15250 },
  { kecamatan: "TB Udik", population: 28900, male: 14800, female: 14100 },
];

const sectorData = [
  { name: "Agriculture", value: 45, color: "hsl(var(--primary))" },
  { name: "Trade", value: 25, color: "hsl(var(--secondary))" },
  { name: "Services", value: 15, color: "hsl(var(--accent))" },
  { name: "Industry", value: 10, color: "hsl(var(--muted))" },
  { name: "Others", value: 5, color: "hsl(var(--border))" },
];

const gdpTrend = [
  { year: "2019", gdp: 8.5 },
  { year: "2020", gdp: 7.2 },
  { year: "2021", gdp: 8.1 },
  { year: "2022", gdp: 9.3 },
  { year: "2023", gdp: 10.2 },
  { year: "2024", gdp: 11.5 },
];

const educationData = [
  { level: "SD", students: 25430 },
  { level: "SMP", students: 18250 },
  { level: "SMA", students: 12890 },
  { level: "SMK", students: 8560 },
  { level: "PT", students: 3200 },
];

const Statistics = () => {
  return (
    <Layout>
      {/* Header */}
      <HeaderSection
        title="Statistik"
        description="Data dan visualisasi statistik komprehensif untuk Kabupaten Tulang Bawang Barat. Jelajahi indikator utama di berbagai sektor."
      />
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg md:text-2xl font-bold truncate">
                    198,630
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Total Populasi
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg md:text-2xl font-bold">8</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Kecamatan
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent/30 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg md:text-2xl font-bold">11.5T</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    PDRB (Rp)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg md:text-2xl font-bold">68,330</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Jumlah Siswa
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Population by District */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-base md:text-lg">
                    Populasi berdasarkan Kecamatan
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Distribusi di 6 kecamatan utama
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={populationData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis
                      dataKey="kecamatan"
                      type="category"
                      width={70}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="populasi"
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sektor Ekonomi */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-base md:text-lg">
                    Sektor Ekonomi
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Kontribusi PDRB sektor
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                      labelLine={false}
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pertumbuhan PDRB */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-base md:text-lg">
                    Pertumbuhan PDRB
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Pertumbuhan PDRB tahunan dalam triliun rupiah
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gdpTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="gdp"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Statistik Pendidikan */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-base md:text-lg">
                    Statistik Pendidikan
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Siswa menurut tingkat pendidikan
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-2" /> Ekspor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={educationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar
                      dataKey="students"
                      fill="hsl(var(--secondary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabel Data Populasi */}
        <Card className="mt-6 md:mt-8">
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-base md:text-lg">
                  Data Populasi Terperinci
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Distribusi penduduk berdasarkan kecamatan dan jenis kelamin
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" /> Download Full Report
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="min-w-[500px] px-4 md:px-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-medium">Kecamatan</th>
                      <th className="text-right py-3 font-medium">Total</th>
                      <th className="text-right py-3 font-medium">Laki-laki</th>
                      <th className="text-right py-3 font-medium">Perempuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {populationData.map((row) => (
                      <tr
                        key={row.kecamatan}
                        className="border-b last:border-0"
                      >
                        <td className="py-3">{row.kecamatan}</td>
                        <td className="text-right py-3">
                          {row.population.toLocaleString()}
                        </td>
                        <td className="text-right py-3">
                          {row.male.toLocaleString()}
                        </td>
                        <td className="text-right py-3">
                          {row.female.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </Layout>
  );
};

export default Statistics;
