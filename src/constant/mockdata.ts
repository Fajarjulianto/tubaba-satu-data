import {
  Database,
  Building2,
  Download,
  TrendingUp,
  Users,
  GraduationCap,
  Heart,
  Building,
  HandHeart,
  BookOpen,
  Code,
  FileText,
} from "lucide-react";

export const monthlyData = [
  { month: "Jul", datasets: 12 },
  { month: "Aug", datasets: 18 },
  { month: "Sep", datasets: 15 },
  { month: "Oct", datasets: 22 },
  { month: "Nov", datasets: 28 },
  { month: "Dec", datasets: 19 },
  { month: "Jan", datasets: 24 },
];

export const categoryData = [
  { name: "Ekonomi", value: 42, color: "#10b981" },
  { name: "Kesehatan", value: 31, color: "#f43f5e" },
  { name: "Sosial", value: 27, color: "#f97316" },
  { name: "Populasi", value: 24, color: "#3b82f6" },
  { name: "Pendidikan", value: 18, color: "#eab308" },
  { name: "Lainnya", value: 27, color: "#8b5cf6" },
];

export const stats = [
  { label: "Total Dataset", value: "169", icon: Database, change: "+12%" },
  { label: "Jumlah Lembaga", value: "12", icon: Building2, change: "+2" },
  { label: "Total Download", value: "52.4K", icon: Download, change: "+18%" },
  { label: "Pertumbuhan Data", value: "24%", icon: TrendingUp, change: "+5%" },
];

export const agencies = [
  {
    id: "1",
    name: "Dinas Kesehatan",
    shortName: "Dinkes",
    datasets: 28,
    description: "Bertanggung jawab atas layanan kesehatan masyarakat",
  },
  {
    id: "2",
    name: "Dinas Pendidikan",
    shortName: "Disdik",
    datasets: 22,
    description: "Mengelola pendidikan dasar dan menengah",
  },
  {
    id: "3",
    name: "Badan Pusat Statistik Tubaba",
    shortName: "BPS",
    datasets: 35,
    description: "Menyediakan data statistik resmi daerah",
  },
  {
    id: "4",
    name: "Dinas Sosial",
    shortName: "Dinsos",
    datasets: 19,
    description: "Menangani kesejahteraan sosial masyarakat",
  },
  {
    id: "5",
    name: "Dinas Pekerjaan Umum dan Penataan Ruang",
    shortName: "PUPR",
    datasets: 14,
    description: "Mengelola infrastruktur dan tata ruang",
  },
  {
    id: "6",
    name: "Badan Perencanaan Pembangunan Daerah",
    shortName: "Bappeda",
    datasets: 21,
    description: "Merencanakan pembangunan daerah",
  },
  {
    id: "7",
    name: "Dinas Pertanian",
    shortName: "Distan",
    datasets: 16,
    description: "Mengembangkan sektor pertanian dan pangan",
  },
  {
    id: "8",
    name: "Dinas Lingkungan Hidup",
    shortName: "DLH",
    datasets: 12,
    description: "Mengelola lingkungan dan kehutanan",
  },
  {
    id: "9",
    name: "Dinas Kependudukan dan Pencatatan Sipil",
    shortName: "Disdukcapil",
    datasets: 18,
    description: "Menangani administrasi kependudukan",
  },
  {
    id: "10",
    name: "Dinas Komunikasi dan Informatika",
    shortName: "Diskominfo",
    datasets: 9,
    description: "Mengelola teknologi informasi dan komunikasi",
  },
  {
    id: "11",
    name: "Dinas Perdagangan dan Perindustrian",
    shortName: "Disdagperin",
    datasets: 11,
    description: "Mengembangkan perdagangan dan industri",
  },
  {
    id: "12",
    name: "Dinas Perhubungan",
    shortName: "Dishub",
    datasets: 8,
    description: "Mengelola transportasi dan perhubungan",
  },
];

export const categories = [
  {
    name: "Populasi",
    icon: Users,
    count: 24,
    description: "Data demografi, sensus, dan distribusi penduduk",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    name: "Pendidikan",
    icon: GraduationCap,
    count: 18,
    description: "Data sekolah, pendaftaran, dan kinerja pendidikan",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
  },
  {
    name: "Kesehatan",
    icon: Heart,
    count: 31,
    description:
      "Fasilitas kesehatan, prevalensi penyakit, dan indikator kesehatan",
    color: "bg-rose-500/10 text-rose-600 border-rose-200",
  },
  {
    name: "Ekonomi",
    icon: TrendingUp,
    count: 42,
    description: "Data PDRB, lapangan usaha, dan indikator ekonomi lainnya",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
  {
    name: "Infrastruktur",
    icon: Building,
    count: 15,
    description: "Jalan, jembatan, utilitas, dan data fasilitas umum",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    name: "Sosial",
    icon: HandHeart,
    count: 27,
    description: "Data bantuan sosial, kemiskinan, dan program komunitas",
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
];

export const metadataItems = [
  {
    id: "1",
    title: "Data Jumlah Penduduk",
    identifier: "TUBABA-POP-2024-001",
    description:
      "Metadata standar untuk dataset jumlah penduduk berdasarkan kecamatan dan jenis kelamin.",
    agency: "BPS Tubaba",
    category: "Population",
    format: "CSV, JSON",
    frequency: "Yearly",
    lastUpdated: "2024-01-15",
    license: "CC BY 4.0",
    keywords: ["penduduk", "demografi", "kecamatan"],
  },
  {
    id: "2",
    title: "Data Fasilitas Kesehatan",
    identifier: "TUBABA-HLT-2024-002",
    description:
      "Metadata untuk dataset fasilitas kesehatan termasuk puskesmas dan rumah sakit.",
    agency: "Dinas Kesehatan",
    category: "Health",
    format: "XLSX, PDF",
    frequency: "Monthly",
    lastUpdated: "2024-01-12",
    license: "CC BY 4.0",
    keywords: ["kesehatan", "puskesmas", "rumah sakit"],
  },
  {
    id: "3",
    title: "Data PDRB",
    identifier: "TUBABA-ECO-2024-003",
    description:
      "Metadata untuk Produk Domestik Regional Bruto menurut lapangan usaha.",
    agency: "BPS Tubaba",
    category: "Economy",
    format: "XLSX, JSON",
    frequency: "Quarterly",
    lastUpdated: "2024-01-10",
    license: "Open Government License",
    keywords: ["ekonomi", "PDRB", "pertumbuhan"],
  },
  {
    id: "4",
    title: "Data Sekolah dan Siswa",
    identifier: "TUBABA-EDU-2024-004",
    description:
      "Metadata untuk data rekapitulasi sekolah dan jumlah siswa per jenjang pendidikan.",
    agency: "Dinas Pendidikan",
    category: "Education",
    format: "CSV, XLSX",
    frequency: "Yearly",
    lastUpdated: "2024-01-08",
    license: "CC BY 4.0",
    keywords: ["pendidikan", "sekolah", "siswa"],
  },
  {
    id: "5",
    title: "Data Infrastruktur Jalan",
    identifier: "TUBABA-INF-2024-005",
    description: "Metadata untuk kondisi dan panjang jalan kabupaten dan desa.",
    agency: "Dinas PUPR",
    category: "Infrastructure",
    format: "GeoJSON, PDF",
    frequency: "Yearly",
    lastUpdated: "2024-01-05",
    license: "Open Government License",
    keywords: ["infrastruktur", "jalan", "transportasi"],
  },
];

export const documentationSections = [
  {
    id: "getting-started",
    title: "Mulai Menggunakan",
    icon: BookOpen,
    items: [
      { title: "Pengenalan Satu Data Tubaba", href: "#intro" },
      { title: "Cara Mengakses Dataset", href: "#access" },
      { title: "Panduan Format Data", href: "#formats" },
      { title: "Ketentuan Penggunaan", href: "#terms" },
    ],
  },
  {
    id: "api-reference",
    title: "Referensi API",
    icon: Code,
    items: [
      { title: "Autentikasi", href: "#auth" },
      { title: "Ikhtisar Endpoint", href: "#endpoints" },
      { title: "Batas Permintaan", href: "#rate-limiting" },
      { title: "Penanganan Error", href: "#errors" },
    ],
  },
  {
    id: "data-standards",
    title: "Standar Data",
    icon: FileText,
    items: [
      { title: "Skema Metadata", href: "#schema" },
      { title: "Panduan Kualitas Data", href: "#quality" },
      { title: "Konvensi Penamaan", href: "#naming" },
      { title: "Frekuensi Pembaruan", href: "#frequency" },
    ],
  },
];

export const faqs = [
  {
    question: "Bagaimana cara mengunduh dataset?",
    answer:
      "Buka halaman Dataset, temukan dataset yang Anda butuhkan, dan klik tombol Unduh. Anda dapat memilih berbagai format termasuk CSV, Excel, dan JSON.",
  },
  {
    question: "Apakah data ini gratis digunakan?",
    answer:
      "Ya, semua dataset di Satu Data Tubaba tersedia gratis di bawah Lisensi Pemerintah Terbuka. Anda dapat menggunakan data untuk penelitian, analisis, dan tujuan komersial dengan atribusi yang tepat.",
  },
  {
    question: "Seberapa sering data diperbarui?",
    answer:
      "Frekuensi pembaruan bervariasi per dataset. Beberapa dataset diperbarui harian, sementara yang lain diperbarui bulanan, triwulanan, atau tahunan. Periksa metadata untuk jadwal pembaruan spesifik.",
  },
  {
    question: "Bisakah saya meminta data tertentu?",
    answer:
      "Ya, Anda dapat mengajukan permintaan data melalui halaman Kontak. Tim kami akan meninjau permintaan Anda dan bekerja sama dengan instansi terkait untuk menyediakan data jika tersedia.",
  },
  {
    question: "Bagaimana cara melaporkan kesalahan data?",
    answer:
      "Jika Anda menemukan kesalahan dalam dataset, silakan gunakan formulir umpan balik di halaman Kontak atau email kami langsung. Sertakan nama dataset, kesalahan spesifik, dan informasi pendukung.",
  },
];
