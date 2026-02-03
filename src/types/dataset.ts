import { FileJson, FileSpreadsheet, FileText } from "lucide-react";

export type FileFormat = "CSV" | "XLSX" | "PDF" | "JSON";

export interface DatasetMetadata {
  publisher: string;
  identifier: string;
  license: string;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
  measurement: string;
  presentationLevel: string;
}

export interface Dataset {
  id: string;
  title: string;
  description: string;
  category: string;
  agency: string;
  lastUpdated: string;
  fileType: FileFormat;
  downloads: number;
  views?: number;
  metadata?: DatasetMetadata;
}

export type TableValue = string | number | boolean | null;

export interface DatasetPreviewRow {
  id: number | string;
  [key: string]: TableValue;
}

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
