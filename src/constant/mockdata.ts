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
  Map,
  Landmark,
  Briefcase,
  Leaf,
  Factory,
  Plane,
  Truck,
  Banknote,
  ShoppingCart,
  BarChart3,
  Globe,
  Wallet,
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

// ── Kategori utama (tampil di homepage) ──
export const categories = [
  {
    name: "Geografi dan Iklim",
    icon: Map,
    count: 12,
    description: "Data wilayah, topografi, iklim, dan lingkungan alam daerah",
    color: "bg-teal-500/10 text-teal-600 border-teal-200",
  },
  {
    name: "Pemerintahan",
    icon: Landmark,
    count: 20,
    description:
      "Data aparatur, kebijakan, anggaran, dan tata kelola pemerintah",
    color: "bg-slate-500/10 text-slate-600 border-slate-200",
  },
  {
    name: "Penduduk dan Ketenagakerjaan",
    icon: Briefcase,
    count: 28,
    description:
      "Data demografi, angkatan kerja, pengangguran, dan ketenagakerjaan",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    name: "Sosial dan Kesejahteraan Rakyat",
    icon: HandHeart,
    count: 27,
    description:
      "Data bantuan sosial, kemiskinan, pendidikan, dan kesehatan masyarakat",
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
  {
    name: "Pertanian, Kehutanan, Peternakan, dan Perikanan",
    icon: Leaf,
    count: 22,
    description:
      "Data produksi pertanian, kehutanan, peternakan, dan hasil perikanan",
    color: "bg-green-500/10 text-green-600 border-green-200",
  },
  {
    name: "Industri, Pertambangan, dan Energi",
    icon: Factory,
    count: 14,
    description:
      "Data industri pengolahan, pertambangan, dan konsumsi energi daerah",
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  },
];

// ── Kategori tambahan (tampil saat klik "Lihat semua") ──
export const categoriesExtra = [
  {
    name: "Pariwisata",
    icon: Plane,
    count: 9,
    description:
      "Data objek wisata, kunjungan wisatawan, dan akomodasi pariwisata",
    color: "bg-sky-500/10 text-sky-600 border-sky-200",
  },
  {
    name: "Transportasi dan Komunikasi",
    icon: Truck,
    count: 11,
    description:
      "Data infrastruktur transportasi, kendaraan, dan telekomunikasi",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  },
  {
    name: "Perbankan, Koperasi, dan Harga-harga",
    icon: Banknote,
    count: 16,
    description: "Data perbankan, koperasi, inflasi, dan indeks harga konsumen",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
  {
    name: "Pengeluaran Penduduk",
    icon: Wallet,
    count: 8,
    description:
      "Data konsumsi rumah tangga, pengeluaran, dan pola belanja masyarakat",
    color: "bg-rose-500/10 text-rose-600 border-rose-200",
  },
  {
    name: "Perdagangan",
    icon: ShoppingCart,
    count: 13,
    description:
      "Data ekspor, impor, distribusi barang, dan aktivitas perdagangan",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
  },
  {
    name: "Sistem Neraca Regional",
    icon: BarChart3,
    count: 10,
    description: "Data PDRB, pertumbuhan ekonomi, dan neraca pendapatan daerah",
    color: "bg-violet-500/10 text-violet-600 border-violet-200",
  },
  {
    name: "Perbandingan Antar Kabupaten",
    icon: Globe,
    count: 7,
    description: "Data komparatif lintas kabupaten/kota dan indikator regional",
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
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
      "Ya, semua dataset di Satu Data Tubaba tersedia gratis di bawah Lisensi Pemerintah Terbuka.",
  },
  {
    question: "Seberapa sering data diperbarui?",
    answer:
      "Frekuensi pembaruan bervariasi per dataset. Periksa metadata untuk jadwal pembaruan spesifik.",
  },
  {
    question: "Bisakah saya meminta data tertentu?",
    answer: "Ya, Anda dapat mengajukan permintaan data melalui halaman Kontak.",
  },
  {
    question: "Bagaimana cara melaporkan kesalahan data?",
    answer:
      "Gunakan formulir umpan balik di halaman Kontak atau email kami langsung.",
  },
];

export const INSTANSI_OPTIONS = [
  { value: "diskominfo", label: "Diskominfo Tubaba" },
  { value: "bappeda", label: "Bappeda Tubaba" },
  { value: "dinkes", label: "Dinas Kesehatan" },
  { value: "disdik", label: "Dinas Pendidikan" },
  { value: "pariwisata", label: "Dinas Pariwisata" },
  { value: "setda", label: "Sekretariat Daerah" },
];

export const KATEGORI_OPTIONS = [
  { value: "sosial", label: "Sosial & Budaya" },
  { value: "ekonomi", label: "Ekonomi & Keuangan" },
  { value: "kependudukan", label: "Kependudukan" },
  { value: "infrastruktur", label: "Infrastruktur" },
  { value: "pemerintahan", label: "Pemerintahan" },
  { value: "kesehatan", label: "Kesehatan" },
];

export const TAHUN_OPTIONS = ["2026", "2025", "2024", "2023", "2022", "2021"];
