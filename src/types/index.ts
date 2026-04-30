import { FileJson, FileSpreadsheet, FileText } from "lucide-react";
import { Interface } from "readline";

export type FileFormat = "CSV" | "XLSX" | "PDF" | "JSON" | string;
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

export interface CKANResource {
  id: string;
  name: string;
  format: string;
  url: string;
  description: string;
  last_modified: string;
  datastore_active: boolean;
  size?: number;
  mimetype?: string;
}

export interface CKANOrganization {
  id: string;
  name: string;
  title: string;
  description: string;
  image_url: string;
}

export interface CKANGroup {
  id: string;
  name: string;
  display_name: string;
  description?: string;
  image_display_url?: string;
}

export interface CKANdataItem {
  id: string;
  name: string;
  title: string;
  notes: string;
  author: string;
  metadata_modified: string;
  metadata_created: string;
  license_title: string;
  organization: CKANOrganization;
  resources: CKANResource[];
  groups: CKANGroup[];
  tags: { id: string; name: string; display_name?: string }[];
  extras: CKANExtras[];
  num_resources: number;
}


export interface CKANExtras {
  key: string;
  value: string;
}


export interface DatasetMetadata {
  publisher: string;
  identifier: string;
  license: string;
  accessLevel: string;
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

export interface Dataset {
  id: string;
  name: string;
  title: string;
  description: string;
  notes: string;
  source: string;
  category: string;
  agency: string;
  lastUpdated: string;
  datasetKode: string;
  fileType: FileFormat;
  fileUrl: string;
  resources: CKANResource[];
  groups: CKANGroup[];
  organization: CKANOrganization;
  downloads: number;
  views?: number;
  metadata_modified?: string;
  metadata_created?: string;
  hasVisualization: boolean;
  metadata?: DatasetMetadata;
  previewData?: DatasetPreviewRow[];
  tags: { id: string; name: string; display_name?: string }[];
  author?: string;
  visualization?: {
    type: ChartType;
    labelKey: string;
    valueKey: string;
  };
}

export interface DatasetApiResponse<T> {
  success: boolean;
  result: T;
  error?: {
    message: string;
    __type: string;
  };
  help?: string;
}

export interface ApiDatasetItem {
  id: string;
  kode: string;
  judul: string;
  metode: string;
  penanggungJawab: string;
  produsen: string;
  satuan: string;
  tahun: string;
  file: string;
}

export interface ApiKeyData {
  key: string;
  status: "Aktif" | "Nonaktif";
}

export interface RateLimit {
  perHour: number;
  perDay: number;
}

export interface ApiDetailData {
  id: number;
  datasetKode: string;
  datasetJudul: string;
  kode: string;
  metode: string;
  penanggungJawab: string;
  produsen: string;
  satuan: string;
  tahun: string;
  file: string;       
  filemeta: string;   
  watch: string;      
  publikasi: string;
  visualisasi: "ya" | "tidak" | string;
  status: string | null;
  created_at: string;
  updated_at: string;
}


export interface LaravelListResponse {
  data: ApiDetailData[];
}
 
export interface apiDetailResponse {
  data: ApiDetailData;
}
