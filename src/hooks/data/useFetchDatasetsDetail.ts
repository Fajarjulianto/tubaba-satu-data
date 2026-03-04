import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Dataset, DatasetPreviewRow } from "@/types/index";
import { deriveCategory, deriveFileType } from "@/lib/utils";

interface ApiDetailData {
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

type RawRow = (string | number)[] | { meta: { [key: string]: string }[] };

interface ApiDetailResponse {
  data: ApiDetailData;
  json_data: {
    original: RawRow[];
    exception: string | null;
  };
}

const parsePreviewData = (original: RawRow[]): DatasetPreviewRow[] => {
  const headerRow = original[0];
  if (!Array.isArray(headerRow)) return [];
  const headers = headerRow as string[];

  const rows: DatasetPreviewRow[] = [];

  for (let i = 1; i < original.length; i++) {
    const row = original[i];

    if (!Array.isArray(row)) continue;

    const mapped: DatasetPreviewRow = { id: i };
    headers.forEach((header, colIndex) => {
      mapped[header] = (row as (string | number)[])[colIndex] ?? null;
    });

    rows.push(mapped);
  }

  return rows;
};

export const useFetchDatasetDetail = (
  opd: string | undefined,
  id: string | undefined,
) => {
  return useQuery<Dataset>({
    queryKey: ["dataset-detail", opd, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiDetailResponse>(
        "/data_detail",
        { params: { opd, id } },
      );

      const detail = data.data;
      const previewData = parsePreviewData(data.json_data?.original ?? []);
      const hasVisualization = detail.visualisasi === "ya";

      const firstDataRow = data.json_data?.original?.[1];
      const headers = Array.isArray(data.json_data?.original?.[0])
        ? (data.json_data.original[0] as string[])
        : [];
      const labelKey = headers[0] ?? "label";
      const valueKey = headers[headers.length - 1] ?? "value";

      return {
        id: detail.id,
        title: detail.datasetJudul,
        description: `Data ${detail.datasetJudul} dari ${detail.produsen}. Satuan: ${detail.satuan}. Metode: ${detail.metode}.`,
        category: deriveCategory(detail.produsen),
        agency: detail.produsen,
        lastUpdated: detail.updated_at.split("T")[0],
        fileType: deriveFileType(detail.file),
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
      } satisfies Dataset;
    },
    enabled: !!opd && !!id,
    staleTime: 5 * 60 * 1000,
  });
};
