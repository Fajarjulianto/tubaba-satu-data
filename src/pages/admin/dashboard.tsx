import { StatsCards } from "@/components/admin/StatsCards";
import UploadCard from "@/components/admin/UploadCard";

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
      <StatsCards />
    </div>
  );
};

export default AdminDashboard;
