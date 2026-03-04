import { Dataset, FileFormat } from "@/types/index";
import { toast } from "sonner";

// Base URL storage file dari backend
const STORAGE_BASE_URL =
  "https://aplikasi.tubaba.go.id/storage/disk/satu_data/import";

export const useDatasetActions = () => {
  // Fungsi Download
  const handleDownload = async (dataset: Dataset, format: FileFormat) => {
    if (!dataset?.id) {
      toast.error("ID Dataset tidak valid");
      return;
    }

    const fileName = dataset.metadata?.source;

    if (!fileName) {
      toast.error("File tidak tersedia untuk dataset ini");
      return;
    }

    try {
      // Untuk XLSX — langsung download dari URL storage backend
      if (format === "XLSX") {
        const fileUrl = `${STORAGE_BASE_URL}/${fileName}`;
        const safeFileName = dataset.title.replace(/\s+/g, "_");

        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", `${safeFileName}.xlsx`);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        link.remove();

        toast.success("File Excel berhasil diunduh");
        return;
      }

      if (format === "JSON") {
        if (!dataset.previewData || dataset.previewData.length === 0) {
          toast.error("Data preview tidak tersedia untuk diunduh sebagai JSON");
          return;
        }

        const jsonContent = JSON.stringify(dataset.previewData, null, 2);
        const blob = new Blob([jsonContent], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const safeFileName = dataset.title.replace(/\s+/g, "_");

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${safeFileName}.json`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        toast.success("File JSON berhasil diunduh");
        return;
      }

      toast.error(`Format ${format} belum didukung`);
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
