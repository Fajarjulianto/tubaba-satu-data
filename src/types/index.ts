import { FileJson, FileSpreadsheet, FileText } from "lucide-react";

export type FileFormat = "CSV" | "XLSX" | "PDF" | "JSON";
export type ChartType = "bar" | "line" | "pie";
export type AccessLevel = "Public" | "Restricted";

export const fileTypeIcons = {
  CSV: FileSpreadsheet,
  XLSX: FileSpreadsheet,
  JSON: FileJson,
  PDF: FileText,
};

export const fileTypeColors = {
  CSV: "bg-emerald-100 text-emerald-700 border-emerald-200",
  XLSX: "bg-blue-100 text-blue-700 border-blue-200",
  JSON: "bg-amber-100 text-amber-700 border-amber-200",
  PDF: "bg-rose-100 text-rose-700 border-rose-200",
};

export interface VisualizationConfig {
  type: ChartType;
  labelKey: string;
  valueKey: string;
}

export interface ChartDataItem {
  name: string;
  value: number;
}

//TYPE METADATA DATASET
export interface DatasetMetadata {
  publisher: string;
  identifier: string;
  license: string;
  accessLevel: AccessLevel | string;
  publishedDate: string;
  lastUpdated: string;
  period: string;
  source: string;
  measurement?: string;
  presentationLevel?: string;
  coverage?: string;
  frequency?: string;
  createdAt?: string;
}

export type TableValue = string | number | boolean | null;

export interface DatasetPreviewRow {
  id: number | string;
  [key: string]: TableValue;
}

// TYPE DATA UTAMA
export interface Dataset {
  id: number;
  title: string;
  description: string;
  category: string;
  agency: string;
  lastUpdated: string;
  fileType: FileFormat;
  downloads: number;
  views?: number;
  hasVisualization?: boolean;
  metadata?: DatasetMetadata;
  previewData?: DatasetPreviewRow[];
  visualization?: VisualizationConfig;
  status: "Dipublikasi" | "Draf";
}

export interface DatasetApiResponse extends Omit<Dataset, "previewData"> {
  data: Record<string, string | number | null>[]; // Data asli dari backend
  visualization: VisualizationConfig | null;
  total: number;
  message?: string;
}
