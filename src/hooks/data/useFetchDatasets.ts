import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Dataset, ApiDatasetItem } from "@/types/index";
import { deriveCategory, deriveFileType } from "@/lib/utils";

interface ApiOpdResponse {
  data: Record<string, string>;
}

interface ApiListResponse {
  data: ApiDatasetItem[];
}

export const mapApiItemToDataset = (item: ApiDatasetItem): Dataset => ({
  id: item.id,
  title: item.judul,
  description: `Data ${item.judul} dari ${item.produsen}. Satuan: ${item.satuan}. Metode: ${item.metode}.`,
  category: deriveCategory(item.produsen),
  agency: item.produsen,
  lastUpdated: item.tahun,
  fileType: deriveFileType(item.file),
  downloads: 0,
  views: 0,
  hasVisualization: false,
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
