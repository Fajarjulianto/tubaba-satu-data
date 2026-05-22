import { Layout } from "@/components/layout/Layout";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import { Link } from "react-router-dom";
import {
  Search,
  Download,
  Filter,
  Eye,
  FileSpreadsheet,
  FileJson,
  FileText,
  ArrowRight,
  BookOpen,
  Code,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

// ── Step Card ────────
function StepCard({
  step,
  icon: Icon,
  title,
  desc,
  tips,
}: {
  step: number;
  icon: React.ElementType;
  title: string;
  desc: string;
  tips?: string[];
}) {
  return (
    <div className="flex gap-5 md:gap-7">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm font-tubaba shadow-sm">
          {step}
        </div>
        <div className="w-px flex-1 bg-slate-100 mt-3" />
      </div>
      {/* Konten */}
      <div className="pb-10 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-primary" />
          <h3 className="font-tubaba font-bold text-slate-900 text-base md:text-lg">{title}</h3>
        </div>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-4">{desc}</p>
        {tips && tips.length > 0 && (
          <ul className="space-y-2">
            {tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Format Card ─────────
function FormatCard({
  icon: Icon,
  format,
  desc,
  use,
  color,
}: {
  icon: React.ElementType;
  format: string;
  desc: string;
  use: string;
  color: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${color}`}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5" />
        <span className="font-black font-tubaba text-sm uppercase tracking-widest">{format}</span>
      </div>
      <p className="text-sm leading-relaxed mb-2 opacity-80">{desc}</p>
      <p className="text-xs font-medium opacity-70">
        <span className="font-bold">Cocok untuk:</span> {use}
      </p>
    </div>
  );
}

// ── Halaman Utama ─────────
const PanduanPenggunaan = () => {
  return (
    <Layout>
      <HeaderSection
        title="Panduan Penggunaan"
        description="Pelajari cara menemukan, mengunduh, dan memanfaatkan dataset dari portal Satu Data Tubaba."
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-16 max-w-4xl">

        {/* Intro banner */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {[
            { icon: BookOpen, label: "Akses Gratis", desc: "Semua dataset tersedia tanpa biaya" },
            { icon: BarChart3, label: "Berbagai Format", desc: "XLSX, CSV, JSON, PDF" },
            { icon: Code, label: "API Tersedia", desc: "Integrasi langsung ke aplikasi Anda" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 bg-primary/5 border border-primary/10 rounded-2xl p-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 font-tubaba">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Langkah-langkah */}
        <div className="mb-14">
          <h2 className="font-tubaba font-bold text-2xl text-slate-900 mb-8">
            Langkah-langkah Menggunakan Portal
          </h2>
          <div>
            <StepCard
              step={1}
              icon={Search}
              title="Cari Dataset"
              desc="Gunakan kolom pencarian di halaman Dataset untuk menemukan data berdasarkan kata kunci. Anda juga bisa mencari berdasarkan nama instansi atau judul dataset."
              tips={[
                "Gunakan kata kunci spesifik seperti 'penduduk kecamatan' atau 'produksi padi 2024'",
                "Cari berdasarkan nama OPD seperti 'BPS Tubaba' atau 'Dinas Kesehatan'",
              ]}
            />
            <StepCard
              step={2}
              icon={Filter}
              title="Filter Berdasarkan Kategori dan Tahun"
              desc="Persempit hasil pencarian menggunakan filter Kategori dan Tahun Data di sidebar kiri. Filter aktif ditampilkan dengan tombol Reset."
              tips={[
                "Pilih kategori dari 13 kategori utama seperti Pertanian, Penduduk, atau Pemerintahan",
                "Filter tahun membantu menemukan data terbaru atau data historis tertentu",
              ]}
            />
            <StepCard
              step={3}
              icon={Eye}
              title="Lihat Detail Dataset"
              desc="Klik tombol 'Lihat Detail' pada card dataset untuk membuka halaman detail. Di sini Anda dapat melihat pratinjau data, metadata lengkap, dan informasi sumber."
              tips={[
                "Tab 'Tabel' menampilkan pratinjau baris data jika tersedia",
                "Tab 'Metadata' berisi informasi lengkap tentang dataset",
                "Badge 'Preview Tersedia' menandakan data bisa dipratinjau langsung",
              ]}
            />
            <StepCard
              step={4}
              icon={Download}
              title="Unduh Dataset"
              desc="Klik tombol Unduh di halaman detail untuk mendapatkan file dataset. Format yang tersedia tergantung pada sumber data (XLSX, CSV, JSON)."
              tips={[
                "Dataset dari Laravel tersedia dalam format XLSX atau CSV sesuai yang diunggah produsen",
                "Dataset CKAN dapat diunduh langsung dari URL resource",
                "Gunakan sidebar 'Aksi Cepat' untuk memilih format unduhan yang diinginkan",
              ]}
            />
          </div>
        </div>

        {/* Format Data */}
        <div className="mb-14">
          <h2 className="font-tubaba font-bold text-2xl text-slate-900 mb-2">Format Data yang Tersedia</h2>
          <p className="text-slate-500 text-sm mb-6">Setiap dataset tersedia dalam satu atau lebih format berikut.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <FormatCard
              icon={FileSpreadsheet}
              format="XLSX"
              desc="File Microsoft Excel dengan tabel terstruktur, rumus, dan format visual."
              use="Analisis data, pelaporan, visualisasi Excel"
              color="bg-blue-50 border-blue-200 text-blue-800"
            />
            <FormatCard
              icon={FileSpreadsheet}
              format="CSV"
              desc="Teks terpisah koma, format universal yang ringan dan mudah dibaca mesin."
              use="Import ke database, Python/R, sistem BI"
              color="bg-emerald-50 border-emerald-200 text-emerald-800"
            />
            <FormatCard
              icon={FileJson}
              format="JSON"
              desc="Format data terstruktur untuk integrasi API dan pengembangan aplikasi web."
              use="Aplikasi web, API integration, JavaScript"
              color="bg-amber-50 border-amber-200 text-amber-800"
            />
          </div>
        </div>

        {/* Lisensi */}
        <div className="mb-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-tubaba font-bold text-xl text-slate-900 mb-3">Lisensi dan Hak Penggunaan</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Seluruh dataset yang tersedia di portal Satu Data Tubaba dipublikasikan di bawah{" "}
            <strong className="text-slate-800">Lisensi Pemerintah Terbuka</strong> dan dapat digunakan secara bebas
            untuk keperluan riset, analisis, pengembangan aplikasi, maupun publikasi — dengan tetap mencantumkan
            sumber data.
          </p>
          <div className="flex flex-wrap gap-3 text-xs">
            {[
              "Boleh digunakan secara komersial",
              "Boleh dimodifikasi dan didistribusikan ulang",
              "Boleh diintegrasikan ke aplikasi pihak ketiga",
              "Wajib mencantumkan sumber: Satu Data Tubaba",
            ].map((item) => (
              <span key={item} className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CTA ke dokumentasi API */}
        <div className="rounded-2xl bg-primary text-white p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="font-tubaba font-bold text-lg mb-1">Ingin integrasi lewat API?</h3>
            <p className="text-white/70 text-sm">Lihat dokumentasi API lengkap untuk mulai menggunakan data secara programatik.</p>
          </div>
          <Link
            to="/dokumentasi"
            className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-primary rounded-xl font-bold text-sm shrink-0 hover:bg-secondary/90 transition-colors"
          >
            Dokumentasi API <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default PanduanPenggunaan;