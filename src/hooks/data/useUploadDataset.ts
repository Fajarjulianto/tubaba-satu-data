import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface UploadParams {
  nama_dataset: string;
  instansi: string;
  kategori: string;
  tahun: string;
  deskripsi: string;
  file: File;
}

interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    nama_dataset: string;
    file_url: string;
  };
}

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export const useUploadDataset = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UploadResponse,
    AxiosError<ApiErrorResponse>,
    UploadParams
  >({
    mutationFn: async (data: UploadParams) => {
      const formData = new FormData();
      formData.append("nama_dataset", data.nama_dataset);
      formData.append("instansi", data.instansi);
      formData.append("kategori", data.kategori);
      formData.append("tahun", data.tahun);
      formData.append("deskripsi", data.deskripsi);
      formData.append("file", data.file);

      const response = await axiosInstance.post<UploadResponse>(
        "/upload",
        formData,
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["datasets"] });
      toast.success(data.message || "Dataset berhasil dipublikasikan!");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Terjadi kesalahan server";
      toast.error(message);
    },
  });
};
