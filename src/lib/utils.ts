import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const deriveCategory = (produsen: string): string => {
  const lower = produsen.toLowerCase();
  if (lower.includes("peternakan") || lower.includes("pertanian"))
    return "Pertanian";
  if (lower.includes("kesehatan")) return "Kesehatan";
  if (lower.includes("pendidikan")) return "Pendidikan";
  if (lower.includes("kependudukan") || lower.includes("catatan sipil"))
    return "Kependudukan";
  if (lower.includes("ekonomi") || lower.includes("perdagangan"))
    return "Ekonomi";
  if (lower.includes("infrastruktur") || lower.includes("pekerjaan umum"))
    return "Infrastruktur";
  if (lower.includes("lingkungan")) return "Lingkungan";
  if (lower.includes("perempuan") || lower.includes("anak")) return "Sosial";
  if (lower.includes("tenaga kerja") || lower.includes("transmigrasi"))
    return "Ketenagakerjaan";
  if (lower.includes("perencanaan") || lower.includes("inspektorat"))
    return "Pemerintahan";
  if (lower.includes("kecamatan")) return "Kecamatan";
  return "Umum";
};

export const deriveFileType = (
  fileName: string,
): "CSV" | "XLSX" | "PDF" | "JSON" => {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".csv")) return "CSV";
  if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) return "XLSX";
  if (lower.endsWith(".pdf")) return "PDF";
  if (lower.endsWith(".json")) return "JSON";
  return "XLSX";
};
