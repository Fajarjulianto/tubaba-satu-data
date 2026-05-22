import { Layout } from "@/components/layout/Layout";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import {
  Shield,
  Eye,
  Database,
  Lock,
  Users,
  Bell,
  FileText,
  Mail,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

interface PrivasiSectionProps {
  icon: React.ElementType;
  title: string;
  index: number;
  children: React.ReactNode;
}

function PrivasiSection({ icon: Icon, title, index, children }: PrivasiSectionProps) {
  return (
    <div className="group flex gap-5 md:gap-6 p-5 md:p-7 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300">
      <div className="shrink-0 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-[10px] font-black text-slate-300 tracking-widest font-tubaba">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="flex-1 pt-1">
        <h3 className="font-tubaba font-bold text-slate-900 text-base md:text-lg mb-3 leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="text-sm md:text-base text-slate-700 leading-relaxed space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}

const KebijakanPrivasi = () => {
  return (
    <Layout>
      <HeaderSection
        title="Kebijakan Privasi"
        description="Komitmen Pemerintah Kabupaten Tulang Bawang Barat dalam melindungi data dan privasi pengguna portal Satu Data Tubaba."
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-16 max-w-4xl">
        <div className="flex items-start gap-4 bg-primary/5 border border-primary/15 rounded-2xl px-5 py-4 mb-10">
          <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-primary font-tubaba mb-0.5">Dasar Hukum</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kebijakan ini disusun berdasarkan{" "}
              <span className="font-semibold text-slate-800">
                Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi
              </span>{" "}
              dan peraturan perundangan lain yang berlaku di Republik Indonesia.
            </p>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 font-tubaba">
              Pernyataan Umum
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>
          <p className="text-slate-700 text-sm leading-relaxed text-center max-w-2xl mx-auto">
            Pemerintah Kabupaten Tulang Bawang Barat melalui Dinas Komunikasi dan Informatika
            berkomitmen penuh menjaga kerahasiaan dan keamanan data pribadi setiap pengguna
            yang mengakses portal Satu Data Tubaba.
          </p>
        </div>

        {/* Daftar kebijakan */}
        <div className="space-y-4 mb-12">
          <PrivasiSection icon={Database} title="Data yang Kami Kumpulkan" index={1}>
            <p>Kami dapat mengumpulkan informasi berikut saat Anda menggunakan portal:</p>
            <ul className="space-y-1.5 mt-2">
              {[
                "Rekam jejak akses dan aktivitas penelusuran dataset",
                "Informasi perangkat dan browser yang digunakan",
                "Alamat IP untuk keperluan keamanan sistem",
                "Data yang Anda berikan secara sukarela melalui formulir kontak",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PrivasiSection>

          <PrivasiSection icon={Eye} title="Tujuan Penggunaan Data" index={2}>
            <p>Informasi yang dikumpulkan digunakan semata-mata untuk:</p>
            <ul className="space-y-1.5 mt-2">
              {[
                "Mengoptimalkan performa dan pengalaman penggunaan portal",
                "Menyusun analisis statistik penggunaan layanan secara anonim",
                "Memenuhi kewajiban regulasi hukum yang berlaku",
                "Meningkatkan kualitas dan relevansi dataset yang tersedia",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-3 py-2">
              Penggunaan data di luar fungsi-fungsi tersebut wajib mendapatkan izin tertulis terlebih dahulu dari pengguna yang bersangkutan.
            </p>
          </PrivasiSection>

          <PrivasiSection icon={Lock} title="Keamanan Data" index={3}>
            <p>
              Kami menerapkan standar proteksi teknis dan manajemen keamanan yang ketat,
              mencakup enkripsi data, kontrol akses berbasis peran, dan pemantauan sistem
              secara berkala guna mengantisipasi risiko:
            </p>
            <ul className="space-y-1.5 mt-2">
              {[
                "Kebocoran atau pencurian data",
                "Manipulasi dan pemalsuan data",
                "Akses tidak sah dari pihak yang tidak berwenang",
                "Perusakan dokumen digital secara ilegal",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PrivasiSection>

          <PrivasiSection icon={Users} title="Berbagi Data kepada Pihak Ketiga" index={4}>
            <p>
              Data pribadi pengguna tidak akan pernah dijual, disewakan, atau dibagikan
              kepada pihak luar tanpa persetujuan eksplisit, kecuali dalam kondisi berikut:
            </p>
            <ul className="space-y-1.5 mt-2">
              {[
                "Atas instruksi hukum yang sah dari otoritas berwenang",
                "Berdasarkan putusan pengadilan yang berkekuatan hukum tetap",
                "Atas instruksi resmi instansi pemerintah yang memiliki kewenangan yuridis",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PrivasiSection>

          <PrivasiSection icon={Shield} title="Hak-hak Pengguna" index={5}>
            <p>Sesuai UU Pelindungan Data Pribadi, Anda memiliki hak penuh untuk:</p>
            <ul className="space-y-1.5 mt-2">
              {[
                "Mengakses dan memeriksa data pribadi yang kami simpan",
                "Memperbarui atau mengoreksi informasi yang tidak akurat",
                "Meminta penghapusan data pribadi dari sistem kami",
                "Menarik persetujuan pemrosesan data kapan saja",
                "Mengajukan keberatan atas pemrosesan data tertentu",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs">
              Untuk mengajukan permintaan, hubungi kami melalui email resmi di bawah.
            </p>
          </PrivasiSection>

          <PrivasiSection icon={Bell} title="Notifikasi Insiden Keamanan" index={6}>
            <p>
              Apabila terdeteksi gangguan atau kebocoran sistem yang berpotensi mengancam
              keamanan data pribadi pengguna, kami berkomitmen untuk:
            </p>
            <ul className="space-y-1.5 mt-2">
              {[
                "Mengirimkan notifikasi resmi kepada pengguna yang terdampak sesegera mungkin",
                "Berkoordinasi dengan otoritas pengawas terkait sesuai regulasi",
                "Mengambil langkah mitigasi dan pemulihan secepat mungkin",
                "Mendokumentasikan kejadian dan melaporkan kepada pihak berwenang",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PrivasiSection>

          <PrivasiSection icon={RefreshCw} title="Pembaruan Kebijakan" index={7}>
            <p>
              Kebijakan privasi ini dapat diperbarui sewaktu-waktu sesuai dengan perubahan
              regulasi, teknologi, atau operasional layanan. Setiap pembaruan akan diumumkan
              melalui portal dan berlaku sejak tanggal yang tercantum.
            </p>
            <p className="mt-2">
              Dengan terus menggunakan portal Satu Data Tubaba setelah pembaruan kebijakan,
              Anda dianggap menyetujui kebijakan yang berlaku.
            </p>
          </PrivasiSection>
        </div>

        {/* Kontak DPO */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 md:p-8">
          <h3 className="font-tubaba font-bold text-slate-900 text-lg mb-1">Hubungi Kami</h3>
          <p className="text-sm text-slate-700 mb-5">
            Untuk pertanyaan, permintaan hak akses data, atau pelaporan terkait kebijakan privasi:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:Kominfo@tubaba.go.id"
              className="flex items-center gap-3 px-5 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Kominfo@tubaba.go.id
            </a>
            <div className="flex items-center gap-2 text-sm text-slate-700 px-2">
              <AlertTriangle className="w-4 h-4 text-secondary shrink-0" />
              <span>Respons dalam 3–5 hari kerja</span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 flex justify-between items-center text-xs text-slate-700">
          <span>Kebijakan Privasi Satu Data Tubaba</span>
          <span className="font-tubaba">Berlaku sejak 1 Januari 2025</span>
        </div>

      </main>
    </Layout>
  );
};

export default KebijakanPrivasi;