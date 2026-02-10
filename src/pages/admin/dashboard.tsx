import { StatCards } from "@/components/admin/StatsCard";

const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Dashboard */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Admin</h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola dan unggah dataset Satu Data Tubaba
        </p>
      </div>

      {/* Baris Kartu Statistik */}
      <StatCards />

      {/* Konten selanjutnya (Grafik/Tabel Terbaru) bisa di sini */}
    </div>
  );
};

export default AdminDashboard;
