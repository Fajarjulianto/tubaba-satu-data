import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { mockDatasets } from "@/data/mockDatasets";
import { ArrowLeft, Download, Eye, Share2, ExternalLink } from "lucide-react";
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
import { MetadataSection } from "@/components/datasets/MetadataSection";
import DatasetVisualization from "@/components/datasets/DatasetVisualization";
import { ChartType, DatasetPreviewRow } from "@/types/index";

type TabType = "tabel" | "grafik" | "geospasial" | "metadata";

interface SidebarBtnProps {
  icon: React.ElementType;
  label: string;
}

const SidebarActionButton = ({ icon: Icon, label }: SidebarBtnProps) => (
  <Button
    className="w-full justify-start h-11 font-tubaba text-sm tracking-wider font-bold"
    variant="outline"
  >
    <Icon className="w-4 h-4 mr-2 text-primary shrink-0" />
    <span className="truncate">{label}</span>
  </Button>
);

const DatasetDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<
    "tabel" | "grafik" | "geospasial" | "metadata"
  >("tabel");
  const [activeChartType, setActiveChartType] = useState<ChartType>("bar");

  const dataset = useMemo(() => mockDatasets.find((d) => d.id === id), [id]);
  const displayData = dataset?.previewData || [];

  if (!dataset) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 font-tubaba">
            Dataset Tidak Ditemukan
          </h1>
          <Link to="/dataset">
            <Button className="font-tubaba">
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const hasVisualization = dataset.hasVisualization ?? false;

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

            <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <Button className="bg-secondary text-primary hover:bg-secondary/90 flex-1 lg:min-w-[180px] font-heavy font-tubaba shadow-xl py-6 md:py-4">
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 flex-1 lg:min-w-[180px] font-heavy font-tubaba py-6 md:py-4"
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
            {/* Navigasi Tab */}
            <div className="flex items-center gap-6 border-b border-slate-100 mb-2 overflow-x-auto scrollbar-hide">
              {["tabel", "grafik", "geospasial", "metadata"].map((tab) => {
                if (tab === "grafik" && !hasVisualization) return null;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as TabType)}
                    className={`pb-4 text-sm font-bold transition-all whitespace-nowrap capitalize ${
                      activeTab === tab
                        ? "border-b-2 border-primary text-primary"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <div className="space-y-8">
              {activeTab === "tabel" && (
                <Card className="rounded-2xl md:rounded-3xl border-slate-200 shadow-sm overflow-hidden">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-xs md:text-sm font-heavy font-tubaba text-slate-900 uppercase tracking-widest">
                      <Eye className="w-4 h-4 md:w-5 md:h-5 text-primary" />{" "}
                      Pratinjau Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 md:p-8">
                    {activeTab === "tabel" && (
                      <div className="animate-in fade-in duration-500">
                        <DataPreviewTable
                          data={
                            (dataset?.previewData as DatasetPreviewRow[]) || []
                          }
                          itemsPerPage={7}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "grafik" && hasVisualization && (
                <div className="animate-in fade-in duration-500">
                  <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 font-tubaba uppercase tracking-tight">
                      Visualisasi: {dataset.title}
                    </h3>

                    {activeTab === "grafik" && (
                      <DatasetVisualization
                        rawData={dataset.previewData}
                        chartType={dataset.visualization?.type || "bar"}
                        labelKey={dataset.visualization?.labelKey}
                        valueKey={dataset.visualization?.valueKey}
                      />
                    )}
                  </div>
                </div>
              )}

              {activeTab === "geospasial" && (
                <div className="animate-in fade-in duration-500 py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-tubaba italic">
                  Peta Geospasial Kabupaten Tulang Bawang Barat akan segera
                  hadir.
                </div>
              )}

              {activeTab === "metadata" && dataset.metadata && (
                <div className="animate-in fade-in duration-500">
                  <MetadataSection metadata={dataset.metadata} />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Aksi Cepat */}
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
