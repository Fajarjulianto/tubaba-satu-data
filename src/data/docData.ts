import { BookOpen, Code, Layers, HelpCircle } from "lucide-react";
import { ApiEndpoint, DocSection } from "@/types/doc";

/**
 * 1. Struktur Navigasi Sidebar (Lengkap)
 */
export const docSections: DocSection[] = [
  {
    id: "intro",
    icon: BookOpen,
    title: "Pengenalan",
    items: [
      { href: "#intro", title: "Tentang Satu Data Tubaba" },
      { href: "#getting-started", title: "Cara Memulai" },
    ],
  },
  {
    id: "api",
    icon: Code,
    title: "Referensi API",
    items: [
      { href: "#api-overview", title: "Gambaran Umum API" },
      { href: "#api-datasets", title: "Endpoint Dataset" },
      { href: "#api-categories", title: "Endpoint Kategori" },
    ],
  },
  {
    id: "guides",
    icon: Layers,
    title: "Panduan Pengguna",
    items: [
      { href: "#guide-download", title: "Mengunduh Dataset" },
      { href: "#guide-filter", title: "Filter & Pencarian" },
    ],
  },
  {
    id: "faq",
    icon: HelpCircle,
    title: "Bantuan",
    items: [{ href: "#faq", title: "Pertanyaan Umum" }],
  },
];

/**
 * 2. Referensi API Lengkap
 */
export const apiEndpoints: ApiEndpoint[] = [
  {
    method: "POST",
    path: "/api/v1/auth/login",
    summary: "Mendapatkan Access Token",
    description:
      "Digunakan untuk menukar API Key dengan JWT Bearer Token yang diperlukan untuk request data privat.",
    tag: "Autentikasi",
    params: [
      {
        name: "api_key",
        in: "header",
        required: true,
        type: "string",
        description: "API Key dari Dashboard",
      },
    ],
    response: {
      status: "success",
      token: "eyJhbGciOiJIUzI1Ni...",
      expires_in: 3600,
    },
  },
  {
    method: "GET",
    path: "/api/v1/datasets",
    summary: "List Semua Dataset",
    description:
      "Mengambil daftar dataset publik Kabupaten Tulang Bawang Barat.",
    tag: "Dataset",
    params: [
      {
        name: "search",
        in: "query",
        required: false,
        type: "string",
        description: "Cari judul dataset",
      },
      {
        name: "category",
        in: "query",
        required: false,
        type: "string",
        description: "Filter slug kategori",
      },
    ],
    response: {
      total: 150,
      data: [{ id: 1, title: "Data Kependudukan", slug: "data-kependudukan" }],
    },
  },
  {
    method: "GET",
    path: "/api/v1/categories",
    summary: "List Kategori",
    description:
      "Menampilkan semua kategori data yang tersedia (Kesehatan, Pendidikan, dll).",
    tag: "Kategori",
    params: [],
    response: {
      categories: ["Kependudukan", "Kesehatan", "Ekonomi"],
    },
  },
];

/**
 * 3. Konten FAQ
 */
export const faqs = [
  {
    question: "Bagaimana cara mendapatkan API Key?",
    answer:
      "Anda Bisa langsung menuju ke menu Lainnya lalu ke Dokumentasi, kemudian cari API.",
  },
  {
    question: "Apakah ada batasan (Rate Limit)?",
    answer:
      "Untuk akun publik, batasannya adalah 100 request per jam. Untuk instansi pemerintah (G2G), silakan hubungi Kominfo Tubaba untuk akses unlimited.",
  },
  {
    question: "Apa format data yang didukung?",
    answer:
      "API kami secara default mengembalikan data dalam format JSON. Namun, file fisik dataset tersedia dalam format CSV dan XLSX.",
  },
];
