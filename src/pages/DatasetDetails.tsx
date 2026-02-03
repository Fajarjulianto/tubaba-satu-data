import { useParams, Link } from "react-router-dom";
import { mockDatasets } from "@/data/mockDatasets";
import {
  ArrowLeft,
  Download,
  Calendar,
  Building2,
  FileText,
  Eye,
  Share2,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Layout,
} from "@/components/index";
import React from "react";
import { DataPreviewTable } from "@/components/datasets/DataPreviewTable";

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

interface SidebarBtnProps {
  icon: React.ElementType;
  label: string;
}

// Info item
const InfoItem = ({ icon: Icon, label, value }: InfoItemProps) => (
  <div className="flex items-start gap-3">
    <div className="text-muted-foreground shrink-0 mt-1">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div className="min-w-0">
      {" "}
      {/* Mencegah teks meluap di mobile */}
      <p className="text-[10px] md:text-sm font-black text-slate-900 uppercase tracking-[0.15em] font-tubaba">
        {label}
      </p>
      <p className="font-bold mt-0.5 font-tubaba text-sm md:text-base text-primary leading-tight break-words">
        {value}
      </p>
    </div>
  </div>
);

// Sidebar action button
const SidebarActionButton = ({ icon: Icon, label }: SidebarBtnProps) => (
  <Button
    className="w-full justify-start h-11 font-tubaba text-sm md:text-large tracking-wider font-bold"
    variant="outline"
  >
    <Icon className="w-4 h-4 mr-2 text-primary shrink-0" />
    <span className="truncate">{label}</span>
  </Button>
);

const DatasetDetails = () => {
  const { id } = useParams();
  const dataset = mockDatasets.find((d) => d.id === id);

  if (!dataset) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 font-tubaba">
            Data Tidak Ditemukan
          </h1>
          <Link to="/datasets">
            <Button className="font-tubaba">
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const previewData = [
    { id: 1, kecamatan: "Tulang Bawang Tengah", populasi: 45230, luas: 234.5 },
    { id: 2, kecamatan: "Tumijajar", populasi: 38120, luas: 189.2 },
    { id: 3, kecamatan: "Way Kenanga", populasi: 29450, luas: 156.8 },
    { id: 4, kecamatan: "Lambu Kibang", populasi: 25680, luas: 201.4 },
    { id: 5, kecamatan: "Gunung Agung", populasi: 31250, luas: 178.9 },
    { id: 6, kecamatan: "Pagar Dewa", populasi: 22340, luas: 145.3 },
    { id: 7, kecamatan: "Gunung Terang", populasi: 28760, luas: 167.5 },
    { id: 8, kecamatan: "Way Serdang", populasi: 19870, luas: 134.2 },
    { id: 9, kecamatan: "Batu Putih", populasi: 17650, luas: 112.8 },
    { id: 10, kecamatan: "Tulang Bawang Udik", populasi: 21430, luas: 198.6 },
    { id: 11, kecamatan: "Dente Teladas", populasi: 15890, luas: 89.4 },
    { id: 12, kecamatan: "Banjar Agung", populasi: 24560, luas: 176.2 },
  ];

  return (
    <Layout>
      {/* Header Section */}
      <header className="bg-primary text-primary-foreground py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            to="/dataset"
            className="inline-flex items-center text-[10px] md:text-xs font-heavy text-primary-foreground/70 hover:text-primary-foreground mb-6 md:mb-8 transition-all font-tubaba uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Dataset
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 md:gap-8">
            <div className="flex-1 space-y-4 md:space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="px-2 md:px-3 py-1 font-black font-tubaba text-[9px] md:text-[10px] uppercase tracking-widest"
                >
                  {dataset.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground font-tubaba text-[9px] md:text-[10px]"
                >
                  {dataset.fileType}
                </Badge>
              </div>
              <h1 className="font-tubaba-heavy text-2xl md:text-5xl leading-tight">
                {dataset.title}
              </h1>
              <p className="text-primary-foreground/80 text-xs md:text-lg max-w-3xl leading-relaxed font-light">
                {dataset.description}
              </p>
            </div>

            {/* Action Buttons  */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <Button className="bg-secondary text-primary hover:bg-secondary/90 w-full lg:min-w-[180px] font-heavy font-tubaba shadow-xl py-6 md:py-4">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 w-full lg:min-w-[180px] font-heavy font-tubaba py-6 md:py-4"
              >
                <Share2 className="w-4 h-4 mr-2" /> Bagikan
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          <div className="lg:col-span-2 space-y-8 md:space-y-10">
            {/* Dataset Information */}
            <Card className="rounded-2xl md:rounded-3xl border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-xs md:text-sm font-heavy font-tubaba text-slate-900 uppercase tracking-widest">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" />{" "}
                  Informasi Dataset
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 md:pt-8 px-4 md:px-8 pb-6 md:pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <InfoItem
                    icon={Building2}
                    label="Instansi"
                    value={dataset.agency}
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Pembaruan Terakhir"
                    value={dataset.lastUpdated}
                  />
                  <InfoItem
                    icon={FileText}
                    label="Format File"
                    value={dataset.fileType}
                  />
                  <InfoItem
                    icon={Eye}
                    label="Jumlah Unduhan"
                    value={dataset.downloads.toLocaleString()}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data Preview */}
            <Card className="rounded-2xl md:rounded-3xl border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
                <CardTitle className="flex items-center gap-2 text-xs md:text-sm font-heavy font-tubaba text-slate-900 uppercase tracking-widest">
                  <Eye className="w-4 h-4 md:w-5 md:h-5 text-primary" />{" "}
                  Pratinjau Data
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 md:pt-8 md:px-8 md:pb-8">
                <div className="w-full overflow-x-auto scrollbar-hide">
                  <div className="min-w-[600px] md:min-w-full">
                    {" "}
                    <DataPreviewTable data={previewData} />
                  </div>
                </div>
                <div className="block md:hidden bg-slate-50 py-2 text-center border-t border-slate-100">
                  <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">
                    {" "}
                    Geser untuk melihat lebih banyak →
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 md:space-y-8">
            <Card className="rounded-2xl md:rounded-3xl border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
                <CardTitle className="text-xs md:text-sm font-heavy font-tubaba text-slate-900 uppercase tracking-widest">
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 md:pt-6 space-y-3 px-4 md:px-6 pb-6">
                <SidebarActionButton icon={Download} label="Unduh CSV" />
                <SidebarActionButton icon={Download} label="Unduh Excel" />
                <SidebarActionButton
                  icon={ExternalLink}
                  label="Lihat API Endpoint"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default DatasetDetails;
