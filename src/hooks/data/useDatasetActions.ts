import { Dataset } from "@/types/index";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

export const useDatasetActions = () => {
  // Fungsi Download
  const handleDownload = async (dataset: Dataset, format: "csv" | "xlsx") => {
    if (!dataset?.id) {
      toast.error("ID Dataset tidak valid");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/datasets/${dataset.id}/download?format=${format}`,
        { responseType: "blob" },
      );

      const blob = new Blob([response.data], {
        type:
          format === "csv"
            ? "text/csv"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const safeFileName = dataset.title.replace(/\s+/g, "_");
      link.setAttribute("download", `${safeFileName}.${format}`);

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success(`${format.toUpperCase()} berhasil diunduh`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Gagal mengunduh file. Silakan coba lagi.");
    }
  };

  // Fungsi Share
  const handleShare = async (dataset: Dataset) => {
    if (!dataset) return;

    const shareData = {
      title: `Satu Data Tubaba - ${dataset.title}`,
      text: dataset.description,
      url: `${window.location.origin}/datasets/${dataset.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Tautan berhasil disalin ke clipboard!");
      }
    } catch (err) {
      console.log("Share cancelled");
    }
  };

  return { handleDownload, handleShare };
};
