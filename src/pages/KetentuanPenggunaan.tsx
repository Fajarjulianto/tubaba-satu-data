import { Layout } from "@/components/layout/Layout";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import {
  Shield,
  Eye,
  Database,
  Lock,
  Users,
  AlertTriangle,
  Bell,
  FileText,
} from "lucide-react";

interface KetentuanItemProps {
  icon: React.ElementType;
  title: string;
  content: string;
  index: number;
}

const ketentuanItems = [
  {
    icon: Shield,
    title: "Kerahasiaan Informasi Pengguna",
    content:
      "Segala bentuk data yang terekam sistem — baik berupa rekam jejak akses, identitas profil akun, maupun aktivitas penggunaan layanan — akan diproteksi secara aman dan dijamin tidak akan dipublikasikan kepada pihak-pihak yang tidak memiliki hak akses resmi.",
  },
  {
    icon: Eye,
    title: "Tujuan Penggunaan Data",
    content:
      "Informasi yang diperoleh hanya dimanfaatkan demi mengoptimalkan performa portal data Kabupaten Tulang Bawang Barat, menyusun analisis statistik, dan memenuhi regulasi hukum. Penggunaan di luar fungsi-fungsi tersebut wajib mendapatkan izin tertulis terlebih dahulu dari pengguna yang bersangkutan.",
  },
  {
    icon: Lock,
    title: "Sistem Keamanan Informasi",
    content:
      "Kami menerapkan standar proteksi teknis serta manajemen pengamanan yang ketat guna mengantisipasi risiko kebocoran, manipulasi data, intervensi tanpa izin, maupun perusakan dokumen digital secara ilegal.",
  },
  {
    icon: Users,
    title: "Kebijakan Pihak Ketiga",
    content:
      "Data personal Anda tidak akan pernah diserahkan atau dibagikan kepada pihak luar, terkecuali atas instruksi hukum yang sah, keputusan peradilan, atau instruksi resmi dari instansi pemerintah yang memiliki kewenangan yuridis.",
  },
  {
    icon: Database,
    title: "Hak Akses Pengguna",
    content:
      "Setiap pengguna memiliki hak penuh untuk memeriksa, memperbarui informasi yang keliru, ataupun meminta penghapusan data pribadi mereka dari pusat data kami melalui mekanisme pengajuan yang tersedia.",
  },
  {
    icon: Bell,
    title: "Mitigasi Insiden Keamanan",
    content:
      "Jika terdeteksi adanya gangguan atau kebocoran sistem yang mengancam keamanan data pribadi, kami akan segera mengirimkan notifikasi resmi kepada pengguna yang terdampak sekaligus berkoordinasi dengan otoritas pengawas terkait.",
  },
];

function KetentuanItem({ icon: Icon, title, content, index }: KetentuanItemProps) {
  return (
    <div className="group flex gap-5 md:gap-6 p-5 md:p-7 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300">
      {/* Nomor + ikon */}
      <div className="shrink-0 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-[10px] font-black text-black tracking-widest font-tubaba">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Konten */}
      <div className="flex-1 pt-1">
        <h3 className="font-tubaba font-bold text-slate-900 text-base md:text-lg mb-2 leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm md:text-base text-slate-800 leading-relaxed font-light">
          {content}
        </p>
      </div>
    </div>
  );
}

const KetentuanPenggunaan = () => {
  return (
    <Layout>
      <HeaderSection
        title="Ketentuan Penggunaan"
        description="Penjamin Kerahasiaan Data — komitmen kami dalam melindungi privasi dan data seluruh pengguna portal Satu Data Tubaba."
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-16 max-w-4xl">

        {/* Banner dasar hukum */}
        <div className="flex items-start gap-4 bg-primary/5 border border-primary/15 rounded-2xl px-5 py-4 mb-10 md:mb-14">
          <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-primary font-tubaba mb-0.5">
              Dasar Hukum
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Seluruh tata kelola informasi dalam platform ini dijalankan dengan
              kepatuhan ketat terhadap regulasi yang berlaku di Republik
              Indonesia, khususnya{" "}
              <span className="font-semibold text-slate-800">
                Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data
                Pribadi.
              </span>
            </p>
          </div>
        </div>

        {/* Komitmen utama */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-800 font-tubaba">
              Komitmen Kami
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>
          <p className="text-center text-slate-700 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Pemerintah Kabupaten Tulang Bawang Barat berkomitmen penuh dalam
            melindungi privasi dan data seluruh pengguna.
          </p>
        </div>

        {/* Daftar ketentuan */}
        <div className="space-y-4">
          {ketentuanItems.map((item, idx) => (
            <KetentuanItem
              key={item.title}
              icon={item.icon}
              title={item.title}
              content={item.content}
              index={idx + 1}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>
              Kebijakan ini dapat diperbarui sewaktu-waktu sesuai perubahan
              regulasi.
            </span>
          </div>
          <p className="text-xs text-slate-400 font-tubaba shrink-0">
            Berlaku sejak 1 Januari 2025
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default KetentuanPenggunaan;