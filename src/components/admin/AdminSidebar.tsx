import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UploadCloud,
  Database,
  Settings,
  ClipboardList,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Menu Admin
const adminMenus = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Upload Data", icon: UploadCloud, href: "/admin/upload" },
  { name: "Kelola Dataset", icon: Database, href: "/admin/datasets" },
  { name: "Pengaturan API", icon: Settings, href: "/admin/settings" },
  { name: "Log Aktivitas", icon: ClipboardList, href: "/admin/logs" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0">
      {/* Header Panel */}
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span className="font-tubaba-heavy text-slate-900 text-lg uppercase tracking-tight">
            Admin Panel
          </span>
        </div>
        <button className="text-slate-400 hover:text-primary transition-colors">
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Navigation Menus */}
      <nav className="flex-1 p-4 space-y-2">
        {adminMenus.map((menu) => {
          const isActive = location.pathname === menu.href;
          return (
            <Link
              key={menu.name}
              to={menu.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-tubaba-bold transition-all duration-200 group",
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-primary",
              )}
            >
              <menu.icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-primary",
                )}
              />
              <span className="tracking-wide">{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar: Kembali ke Beranda */}
      <div className="p-4 border-t border-slate-50">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-tubaba-bold text-slate-500 hover:bg-red-50 hover:text-primary transition-all group"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-primary" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </aside>
  );
}
