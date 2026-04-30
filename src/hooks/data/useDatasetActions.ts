import { Dataset, FileFormat } from "@/types/index";
import { toast } from "sonner";

// Base URL storage file dari backend
const STORAGE_BASE_URL =
  "https://aplikasi.tubaba.go.id/storage/disk/satu_data/import";

type XlsxModule = {
  read: (data: ArrayBuffer, opts: { type: string }) => {
    SheetNames: string[];
    Sheets: Record<string, unknown>;
  };
  utils: {
    sheet_to_json: <T>(sheet: unknown, opts?: { defval?: unknown }) => T[];
  };
};

const loadXlsx = async (): Promise<XlsxModule> => {
  const dynamicImport = new Function("u", "return import(u)") as (
    url: string
  ) => Promise<unknown>;
  const mod = (await dynamicImport(
    "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm"
  )) as { default?: XlsxModule; read?: XlsxModule["read"]; utils?: XlsxModule["utils"] };
  return (mod.default ?? mod) as XlsxModule;
};

const resolveDownloadUrl = (dataset: Dataset) => {
  if (dataset.fileUrl) return dataset.fileUrl;
  const sourceFile = dataset.metadata?.source;
  if (!sourceFile) return "";
  if (sourceFile.startsWith("http://") || sourceFile.startsWith("https://")) {
    return sourceFile;
  }
  return `${STORAGE_BASE_URL}/${sourceFile}`;
};

export const useDatasetActions = () => {
  // Fungsi Download
  const handleDownload = async (dataset: Dataset, format: FileFormat) => {
    if (!dataset?.id) {
      toast.error("ID Dataset tidak valid");
      return;
    }

    try {
      // Untuk XLSX — langsung download dari URL storage backend
      if (format === "XLSX") {
        const fileUrl = resolveDownloadUrl(dataset);
        if (!fileUrl) {
          toast.error("File tidak tersedia untuk dataset ini");
          return;
        }
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
        let jsonData = dataset.previewData || [];

        if (jsonData.length === 0) {
          const fileUrl = resolveDownloadUrl(dataset);
          if (fileUrl) {
            try {
              const response = await fetch(fileUrl);
              if (response.ok) {
                const XLSX = await loadXlsx();
                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: "array" });
                const firstSheetName = workbook.SheetNames[0];
                if (firstSheetName) {
                  const worksheet = workbook.Sheets[firstSheetName];
                  jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });
                }
              }
            } catch {
              // fallback handled below
            }
          }
        }

        if (jsonData.length === 0) {
          toast.error("Data tidak tersedia untuk diunduh sebagai JSON");
          return;
        }

        const jsonContent = JSON.stringify(jsonData, null, 2);
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
