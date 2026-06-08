import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Dataset, ApiDatasetItem, CKANdataItem, FileFormat } from "@/types/index";
import { deriveCategory, deriveFileType } from "@/lib/utils";

interface ApiOpdResponse {
  data: Record<string, string>;
}

interface ApiListResponse {
  data: ApiDatasetItem[];
}


const deriveCategoryFromTitle = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes("penduduk") || t.includes("kemiskinan") || t.includes("gender")) return "Kependudukan & Sosial";
  if (t.includes("ekonomi") || t.includes("pdrb") || t.includes("inflasi")) return "Ekonomi & Perdagangan";
  if (t.includes("tani") || t.includes("buah") || t.includes("panen") || t.includes("kebun")) return "Pertanian";
  if (t.includes("sekolah") || t.includes("siswa") || t.includes("guru") || t.includes("pendidikan")) return "Pendidikan";
  if (t.includes("sehat") || t.includes("puskesmas") || t.includes("sakit") || t.includes("medis")) return "Kesehatan";
  if (t.includes("iklim") || t.includes("cuaca") || t.includes("hujan")) return "Lingkungan Hidup";
  if (t.includes("transportasi") || t.includes("jalan") || t.includes("lalu lintas") || t.includes("kendaraan")) return "Transportasi";

  return "Umum"; 
};




export const mapApiItemToDataset = (item: ApiDatasetItem): Dataset => ({
  id: item.id,
  name: item.judul,
  title: item.judul,
  description: `Data ${item.judul} dari ${item.produsen}. Satuan: ${item.satuan}. Metode: ${item.metode}.`,
  notes: "",
  source: "laravel",
  category: deriveCategory(item.produsen),
  agency: item.produsen,
  lastUpdated: item.tahun,
  datasetKode: item.kode,
  fileType: deriveFileType(item.file),
  fileUrl: item.file,
  resources: [],
  groups: [],
  organization: {
    id: item.kode,
    name: item.produsen,
    title: item.produsen,
    description: "",
    image_url: "",
  },
  downloads: 0,
  views: 0,
  metadata_modified: item.tahun,
  metadata_created: item.tahun,
  hasVisualization: false,
  tags: [],
  author: item.penanggungJawab,
  metadata: {
    publisher: item.produsen,
    identifier: item.kode,
    license: "Open Data",
    accessLevel: "Public",
    publishedDate: item.tahun,
    lastUpdated: item.tahun,
    period: item.tahun,
    source: item.file,
    measurement: item.satuan,
    presentationLevel: item.metode,
  },
  previewData: [],
});

export const mapCkanToDataset = (item: CKANdataItem): Dataset => {
 let derivedCategory = "Umum";
  
  if (item.tags && item.tags.length > 0) {
    const firstTag = item.tags[0].display_name || item.tags[0].name;
    derivedCategory = firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
  } else {
    derivedCategory = deriveCategoryFromTitle(item.title);
  }

  return {
    id: item.id,
    name: item.name,
    title: item.title,
    description: item.notes || `Dataset ${item.title}`,
    notes: item.notes || "",
    source: "ckan",
    category: derivedCategory,
    agency: item.organization?.title || item.author,
    lastUpdated: item.metadata_modified?.split("T")[0] || "",
    datasetKode: item.name,
    fileType: (item.resources?.[0]?.format?.toUpperCase() || "XLSX") as FileFormat,
    fileUrl: item.resources?.[0]?.url || "",
    resources: item.resources || [],
    groups: [{
      id: derivedCategory.toLowerCase().replace(/\s+/g, '-'),
      name: derivedCategory.toLowerCase().replace(/\s+/g, '-'),
      display_name: derivedCategory
    }],
    organization: item.organization,
    downloads: 0,
    views: 0,
    metadata_modified: item.metadata_modified,
    metadata_created: item.metadata_created,
    hasVisualization: false,
    tags: item.tags || [],
    author: item.author,
    metadata: {
      publisher: item.organization?.title || item.author,
      identifier: item.name,
      license: item.license_title || "Open Data",
      accessLevel: "Public",
      publishedDate: item.metadata_created?.split("T")[0] || "",
      lastUpdated: item.metadata_modified?.split("T")[0] || "",
      period: "",
      source: item.resources?.[0]?.url || "",
    },
    previewData: [],
  };
};

export const useFetchDatasets = () => {
  return useQuery<Dataset[]>({
    queryKey: ["datasets"],
    queryFn: async () => {
      const { data: opdResponse } =
        await axiosInstance.get<ApiOpdResponse>("/jumlah_opd");
      const opdList = Object.values(opdResponse.data);

      const results = await Promise.allSettled(
        opdList.map((opd) =>
          axiosInstance.get<ApiListResponse>("/jumlah_data_opd", {
            params: { opd },
          }),
        ),
      );

      const allDatasets: Dataset[] = results.flatMap((result) => {
        if (result.status === "fulfilled") {
          return (result.value.data.data ?? []).map(mapApiItemToDataset);
        }
        return [];
      });

      return allDatasets;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useFetchLaravelDatasets = useFetchDatasets;