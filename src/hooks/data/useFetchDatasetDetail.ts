import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios"; 
import { axiosCkan } from "@/api/apiCKAN"; 
import { 
  Dataset, 
  DatasetPreviewRow, 
  CKANdataItem,
  DatasetApiResponse,
  FileFormat 
} from "@/types/index";
import { deriveCategory, deriveFileType } from "@/lib/utils";
import { mapCkanToDataset } from "./useFetchDatasets"; 

interface ApiDetailData {
  id: string;
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

type RawScalar = string | number | boolean | null;
type RawRow = RawScalar[] | Record<string, RawScalar>;

interface ApiDetailResponse {
  data: ApiDetailData;
  json_data: {
    original: RawRow[];
    exception: string | null;
  };
}

const STORAGE_BASE_URL =
  "https://aplikasi.tubaba.go.id/storage/disk/satu_data/import";

type XlsxModule = {
  read: (data: ArrayBuffer, opts: { type: string }) => {
    SheetNames: string[];
    Sheets: Record<string, unknown>;
  };
  utils: {
    sheet_to_json: <T>(
      sheet: unknown,
      opts?: { defval?: unknown; header?: number | string[] | "A"; raw?: boolean }
    ) => T[];
  };
};

// Helper untuk parsing data tabel dari API Laravel
const parsePreviewData = (original: RawRow[]): DatasetPreviewRow[] => {
  if (!Array.isArray(original) || original.length === 0) return [];

  const firstRow = original[0];

  if (firstRow && !Array.isArray(firstRow) && typeof firstRow === "object") {
    return original
      .filter((row): row is Record<string, RawScalar> => !Array.isArray(row) && typeof row === "object")
      .map((row, idx) => ({ id: idx + 1, ...row }));
  }

  if (!Array.isArray(firstRow)) return [];
  if (original.length < 2) return [];

  const headers = firstRow.map((header) => String(header ?? ""));
  const rows: DatasetPreviewRow[] = [];

  for (let i = 1; i < original.length; i++) {
    const row = original[i];
    if (!Array.isArray(row)) continue;
    const mapped: DatasetPreviewRow = { id: i };
    headers.forEach((header, colIndex) => {
      const key = header || `kolom_${colIndex + 1}`;
      mapped[key] = row[colIndex] ?? null;
    });
    rows.push(mapped);
  }
  return rows;
};

const buildFileUrl = (fileNameOrUrl?: string) => {
  if (!fileNameOrUrl) return "";
  if (fileNameOrUrl.startsWith("http://") || fileNameOrUrl.startsWith("https://")) {
    return fileNameOrUrl;
  }
  return `${STORAGE_BASE_URL}/${fileNameOrUrl}`;
};

const countFilledCells = (row: RawScalar[]): number =>
  row.filter((cell) => cell !== null && cell !== undefined && String(cell).trim() !== "").length;


const looksLikeHeader = (row: RawScalar[]): boolean => {
  const filled = row.filter(
    (cell) => cell !== null && cell !== undefined && String(cell).trim() !== ""
  );
  if (filled.length === 0) return false;
  const stringCount = filled.filter((cell) => typeof cell === "string").length;
  return stringCount / filled.length >= 0.5;
};

const findHeaderRowIndex = (rawRows: RawScalar[][]): number => {
  for (let i = 0; i < Math.min(rawRows.length, 10); i++) {
    const row = rawRows[i];
    const filled = countFilledCells(row);
    if (filled >= 2 && looksLikeHeader(row)) {
      return i;
    }
  }
  return 0;
};


const sanitizeColumnName = (raw: string, index: number): string => {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed || trimmed.startsWith("_EMPTY") || trimmed === "__EMPTY") {
    return `kolom_${index + 1}`;
  }
  return trimmed.replace(/\s+/g, " ");
};

// ─── Parser utama Excel ───────
const parseExcelPreviewFromUrl = async (
  fileUrl?: string
): Promise<DatasetPreviewRow[]> => {
  if (!fileUrl) return [];
  try {
    const dynamicImport = new Function("u", "return import(u)") as (
      url: string
    ) => Promise<unknown>;
    const mod = (await dynamicImport(
      "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm"
    )) as { default?: XlsxModule; read?: XlsxModule["read"]; utils?: XlsxModule["utils"] };
    const XLSX = (mod.default ?? mod) as XlsxModule;

    const response = await fetch(fileUrl);
    if (!response.ok) return [];
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) return [];
    const worksheet = workbook.Sheets[firstSheetName];

   
    const rawGrid = XLSX.utils.sheet_to_json<RawScalar[]>(worksheet, {
      header: 1,   
      defval: null,
      raw: false,  
    });

    if (rawGrid.length === 0) return [];

  
    const headerRowIdx = findHeaderRowIndex(rawGrid as RawScalar[][]);
    const headerRow = rawGrid[headerRowIdx] as RawScalar[];
    const headers = headerRow.map((cell, i) => sanitizeColumnName(String(cell ?? ""), i));
    const dataRows: DatasetPreviewRow[] = [];
    for (let i = headerRowIdx + 1; i < rawGrid.length; i++) {
      const row = rawGrid[i] as RawScalar[];

      // Skip baris yang semua kosong
      if (countFilledCells(row) === 0) continue;

      const mapped: DatasetPreviewRow = { id: dataRows.length + 1 };
      headers.forEach((header, colIdx) => {
        const cell = row[colIdx] ?? null;
        if (typeof cell === "string" && cell.trim() !== "" && !isNaN(Number(cell))) {
          mapped[header] = Number(cell);
        } else {
          mapped[header] = cell;
        }
      });
      dataRows.push(mapped);
    }

    return dataRows;
  } catch {
    return [];
  }
};

export const useFetchDatasetDetail = (
  opd: string | undefined,
  id: string | undefined,
  source?: string
) => {
  return useQuery<Dataset>({
    queryKey: ["dataset-detail", opd, id, source],
    queryFn: async () => {
      const isCkan = source === "ckan" || id?.includes("-");

      if (isCkan) {
        const { data } = await axiosCkan.get<DatasetApiResponse<CKANdataItem>>(
          `/3/action/package_show?id=${id}`
        );

        if (!data.success) throw new Error(data.error?.message || "Gagal memuat data CKAN");

        const mapped = mapCkanToDataset(data.result);
        const previewData = await parseExcelPreviewFromUrl(mapped.fileUrl);
        return {
          ...mapped,
          previewData,
        };
      } else {
        // FETCH DARI API LARAVEL
        const { data } = await axiosInstance.get<ApiDetailResponse>(
          "/data_detail",
          { params: { opd, id } }
        );

        const detail = data.data;
        let previewData = parsePreviewData(data.json_data?.original ?? []);
        const hasVisualization = detail.visualisasi === "ya";
        const fileUrl = buildFileUrl(detail.file);

        if (previewData.length === 0) {
          previewData = await parseExcelPreviewFromUrl(fileUrl);
        }
        
        const firstRow = data.json_data?.original?.[0];
        const headers = Array.isArray(firstRow)
          ? firstRow.map((header) => String(header ?? ""))
          : firstRow && typeof firstRow === "object"
            ? Object.keys(firstRow)
          : [];
        const labelKey = headers[0] ?? "label";
        const valueKey = headers[headers.length - 1] ?? "value";

        return {
          id: detail.id.toString(),
          name: detail.datasetKode,
          title: detail.datasetJudul,
          description: `Data ${detail.datasetJudul} dari ${detail.produsen}.`,
          notes: `Satuan: ${detail.satuan}. Metode: ${detail.metode}.`,
          category: deriveCategory(detail.produsen),
          agency: detail.produsen,
          lastUpdated: detail.updated_at.split("T")[0],
          fileType: deriveFileType(detail.file) as FileFormat,
          resources: [],
          groups: [],
          organization: { 
            id: detail.kode, 
            name: detail.produsen, 
            title: detail.produsen, 
            description: "", 
            image_url: "" 
          },
          downloads: 0,
          views: parseInt(detail.watch) || 0,
          hasVisualization,
          visualization: hasVisualization
            ? { type: "bar", labelKey, valueKey }
            : undefined,
          metadata: {
            publisher: detail.produsen,
            identifier: detail.kode,
            license: "Open Data",
            accessLevel: detail.publikasi === "1" ? "Public" : "Restricted",
            publishedDate: detail.tahun,
            lastUpdated: detail.updated_at.split("T")[0],
            period: detail.tahun,
            source: detail.file,
            measurement: detail.satuan,
            presentationLevel: detail.metode,
          },
          previewData,
          source: "laravel",
          datasetKode: detail.datasetKode,
          fileUrl,
          tags: [],
        };
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};