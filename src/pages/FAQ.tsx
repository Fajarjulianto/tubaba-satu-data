import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Download,
  Search,
  Code,
  Shield,
  Database,
  Mail,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface FaqItem {
  q: string;
  a: string | React.ReactNode;
}

interface FaqCategory {
  id: string;
  icon: React.ElementType;
  label: string;
  items: FaqItem[];
}

// ── Data FAQ ──────────────────────────────────────────────────────────────────
const faqCategories: FaqCategory[] = [
  {
    id: "umum",
    icon: HelpCircle,
    label: "Umum",
    items: [
      {
        q: "Apa itu Satu Data Tubaba?",
        a: "Satu Data Tubaba adalah portal data terpadu resmi Pemerintah Kabupaten Tulang Bawang Barat. Portal ini menyediakan akses publik terhadap data dari berbagai Organisasi Perangkat Daerah (OPD) untuk mendukung transparansi, akuntabilitas, dan pembangunan berbasis data.",
      },
      {
        q: "Siapa yang bisa mengakses data di portal ini?",
        a: "Seluruh masyarakat, peneliti, pengembang, jurnalis, dan instansi pemerintah dapat mengakses data yang tersedia di portal ini secara gratis tanpa registrasi.",
      },
      {
        q: "Apakah data di portal ini gratis?",
        a: "Ya. Semua dataset yang dipublikasikan di Satu Data Tubaba tersedia secara gratis di bawah Lisensi Pemerintah Terbuka. Anda bebas mengunduh, menggunakan, dan mendistribusikan ulang data dengan tetap mencantumkan sumber.",
      },
      {
        q: "Seberapa sering data diperbarui?",
        a: "Frekuensi pembaruan bervariasi per dataset tergantung pada instansi produsen data. Informasi pembaruan terakhir tersedia di tab Metadata pada setiap halaman detail dataset.",
      },
    ],
  },
  {
    id: "dataset",
    icon: Database,
    label: "Dataset",
    items: [
      {
        q: "Bagaimana cara mencari dataset?",
        a: "Gunakan kolom pencarian di halaman Dataset untuk mencari berdasarkan kata kunci, judul, atau nama instansi. Anda juga dapat menggunakan filter Kategori dan Tahun di sidebar untuk mempersempit hasil.",
      },
      {
        q: "Bagaimana cara mengunduh dataset?",
        a: "Buka halaman detail dataset dengan klik 'Lihat Detail' pada card dataset. Klik tombol Download di bagian header atau gunakan sidebar 'Aksi Cepat' untuk memilih format unduhan yang diinginkan.",
      },
      {
        q: "Format apa saja yang tersedia?",
        a: "Dataset tersedia dalam berbagai format tergantung pada sumber data: XLSX (Microsoft Excel), CSV (Comma Separated Values), dan JSON. Setiap dataset menampilkan badge format di card-nya.",
      },
      {
        q: "Mengapa pratinjau data tidak tersedia untuk beberapa dataset?",
        a: "Pratinjau data hanya tersedia untuk dataset yang telah diindeks ke CKAN Datastore (ditandai badge 'Preview Tersedia'). Dataset lain tetap dapat diunduh langsung dalam format file aslinya.",
      },
      {
        q: "Bisakah saya meminta dataset yang belum tersedia?",
        a: "Ya. Anda dapat mengajukan permintaan dataset melalui halaman Kontak atau mengirim email ke Kominfo@tubaba.go.id dengan menyebutkan data yang dibutuhkan dan tujuan penggunaannya.",
      },
    ],
  },
  {
    id: "unduh",
    icon: Download,
    label: "Unduh & Penggunaan",
    items: [
      {
        q: "Apakah ada batasan jumlah unduhan?",
        a: "Tidak ada batasan jumlah unduhan untuk pengguna umum. Namun, untuk penggunaan otomatis via API, disarankan menggunakan cache agar tidak membebani server.",
      },
      {
        q: "Bagaimana cara mengutip data dari portal ini?",
        a: 'Format kutipan yang disarankan: "[Nama Dataset]. Satu Data Tubaba, Pemerintah Kabupaten Tulang Bawang Barat. Diakses pada [tanggal], dari https://data.tubaba.go.id"',
      },
      {
        q: "Apakah saya boleh menggunakan data ini untuk keperluan komersial?",
        a: "Ya, data di bawah Lisensi Pemerintah Terbuka dapat digunakan untuk keperluan komersial dengan tetap mencantumkan sumber data.",
      },
    ],
  },
  {
    id: "api",
    icon: Code,
    label: "API & Integrasi",
    items: [
      {
        q: "Apakah tersedia API untuk mengakses data secara programatik?",
        a: "Ya. Satu Data Tubaba menyediakan dua API: Laravel Backend API untuk data internal OPD, dan CKAN Open Data API untuk katalog terbuka. Lihat halaman Dokumentasi API untuk detail lengkap.",
      },
      {
        q: "Bagaimana cara mendapatkan API token?",
        a: "Token API dapat diminta melalui Dinas Kominfo Tubaba dengan mengajukan permohonan resmi yang menyebutkan tujuan penggunaan dan aplikasi yang akan diintegrasikan.",
      },
      {
        q: "Apakah ada rate limiting pada API?",
        a: "Belum ada rate limiting resmi yang didokumentasikan. Namun, disarankan menggunakan cache (minimal 5 menit) dan menghindari request berulang yang tidak perlu agar tidak membebani server.",
      },
      {
        q: "Mengapa saya mendapatkan error CORS saat mengakses API?",
        a: "Error CORS terjadi karena browser memblokir request langsung ke server API dari domain yang berbeda. Solusinya adalah menggunakan Vite proxy di environment development. Lihat dokumentasi API untuk konfigurasi lengkap.",
      },
    ],
  },
  {
    id: "privasi",
    icon: Shield,
    label: "Privasi & Keamanan",
    items: [
      {
        q: "Apakah portal ini mengumpulkan data pribadi saya?",
        a: "Portal ini hanya mengumpulkan data teknis minimal seperti rekam jejak akses dan alamat IP untuk keperluan keamanan sistem. Tidak ada data pribadi yang dikumpulkan tanpa persetujuan eksplisit Anda.",
      },
      {
        q: "Bagaimana cara meminta penghapusan data saya?",
        a: "Kirimkan permintaan penghapusan data melalui email ke Kominfo@tubaba.go.id. Kami akan memproses permintaan dalam 3–5 hari kerja sesuai ketentuan UU PDP No. 27 Tahun 2022.",
      },
      {
        q: "Apakah data saya dibagikan ke pihak ketiga?",
        a: "Tidak. Data pribadi pengguna tidak akan dibagikan kepada pihak luar kecuali atas dasar hukum yang sah seperti perintah pengadilan atau instruksi resmi otoritas berwenang.",
      },
    ],
  },
];

// ── Accordion Item ────────────────────────────────────────────────────────────
function AccordionItem({ q, a, isOpen, onToggle }: FaqItem & { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? "border-primary/20 shadow-sm" : "border-slate-100"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-4 md:p-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className={`text-sm md:text-base font-medium leading-snug transition-colors ${isOpen ? "text-primary font-bold" : "text-slate-800"}`}>
          {q}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Halaman Utama ─────────────────────────────────────────────────────────────
const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("umum");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentCategory = faqCategories.find((c) => c.id === activeCategory)!;

  return (
    <Layout>
      <HeaderSection
        title="FAQ"
        description="Pertanyaan yang Sering Diajukan — temukan jawaban cepat seputar penggunaan portal Satu Data Tubaba."
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-16 max-w-4xl">

        {/* Tab kategori */}
        <div className="flex flex-wrap gap-2 mb-8">
          {faqCategories.map(({ id, icon: Icon, label, items }) => (
            <button
              key={id}
              onClick={() => { setActiveCategory(id); setOpenIndex(0); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeCategory === id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                activeCategory === id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
              }`}>
                {items.length}
              </span>
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3 mb-14">
          {currentCategory.items.map((item, idx) => (
            <AccordionItem
              key={idx}
              q={item.q}
              a={item.a}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        {/* Tidak menemukan jawaban? */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-tubaba font-bold text-slate-900 text-lg mb-2">
            Tidak menemukan jawaban?
          </h3>
          <p className="text-sm text-slate-500 mb-5 max-w-md mx-auto">
            Tim Diskominfo Tubaba siap membantu. Kirimkan pertanyaan Anda melalui email
            dan kami akan merespons dalam 3–5 hari kerja.
          </p>
          <a
            href="mailto:Kominfo@tubaba.go.id"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Kirim Pertanyaan
          </a>
        </div>

        {/* Link halaman terkait */}
        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          {[
            { label: "Panduan Penggunaan", href: "/panduan", icon: Search },
            { label: "Dokumentasi API", href: "/dokumentasi", icon: Code },
            { label: "Kebijakan Privasi", href: "/privasi", icon: Shield },
          ].map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-sm transition-all text-sm text-slate-600 hover:text-primary font-medium"
            >
              <Icon className="w-4 h-4 text-primary shrink-0" />
              {label}
            </Link>
          ))}
        </div>

      </main>
    </Layout>
  );
};

export default FAQ;