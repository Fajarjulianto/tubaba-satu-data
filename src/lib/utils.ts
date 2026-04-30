import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const deriveCategory = (produsen: string): string => {
  const lower = produsen.toLowerCase();
  if (
    lower.includes("pertanian") ||
    lower.includes("peternakan") ||
    lower.includes("perikanan") ||
    lower.includes("kehutanan")
  ) {
    return "Pertanian, Kehutanan, Peternakan, dan Perikanan";
  }
  if (lower.includes("kesehatan") || lower.includes("pendidikan") || lower.includes("sosial")) {
    return "Sosial dan Kesejahteraan Rakyat";
  }
  if (lower.includes("kependudukan") || lower.includes("catatan sipil") || lower.includes("tenaga kerja")) {
    return "Penduduk dan Ketenagakerjaan";
  }
  if (lower.includes("ekonomi") || lower.includes("pdrb") || lower.includes("neraca")) {
    return "Sistem Neraca Regional";
  }
  if (lower.includes("perdagangan")) return "Perdagangan";
  if (lower.includes("koperasi") || lower.includes("bank") || lower.includes("harga")) {
    return "Perbankan, Koperasi, dan Harga-harga";
  }
  if (lower.includes("pengeluaran") || lower.includes("konsumsi")) {
    return "Pengeluaran Penduduk";
  }
  if (lower.includes("industri") || lower.includes("energi") || lower.includes("pertambangan")) {
    return "Industri, Pertambangan, dan Energi";
  }
  if (lower.includes("pariwisata")) return "Pariwisata";
  if (lower.includes("transportasi") || lower.includes("perhubungan") || lower.includes("komunikasi")) {
    return "Transportasi dan Komunikasi";
  }
  if (lower.includes("lingkungan") || lower.includes("iklim") || lower.includes("geografi")) {
    return "Geografi dan Iklim";
  }
  if (lower.includes("perencanaan") || lower.includes("inspektorat"))
    return "Pemerintahan";
  if (lower.includes("kabupaten")) return "Perbandingan Antar Kabupaten";
  return "Pemerintahan";
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
