import { useQuery } from "@tanstack/react-query";
import { axiosCkan } from "@/api/apiCKAN";
import { CKANOrganization, CKANGroup, CKANResource } from "@/types/index";
import { CKANdataItem } from "@/types/index";


interface CKANSearchResult {
  count: number;
  results: CKANdataItem[];
}

interface CKANApiResponse<T> {
  success: boolean;
  result: T;
  error?: { message: string; __type: string };
}

export const useFetchCkan = () => {
  return useQuery<CKANdataItem[]>({
    queryKey: ["metadata-ckan"],
    queryFn: async () => {
      const response = await axiosCkan.get<CKANApiResponse<CKANSearchResult>>(
        "/3/action/package_search?rows=1000&include_private=false"
      );

      if (!response.data.success) {
        throw new Error(
          response.data.error?.message || "Gagal mengambil metadata dari CKAN"
        );
      }

      return response.data.result.results;
    },
    staleTime: 5 * 60 * 1000,
  });
};