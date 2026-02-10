import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Database,
  Settings,
  ArrowLeft,
  UploadCloud,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menus = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Upload Data", icon: UploadCloud, href: "/admin/upload" },
  { name: "Kelola Dataset", icon: Database, href: "/admin/datasets" },
  { name: "Pengaturan", icon: Settings, href: "/admin/settings" },
];

export function AdminSidebar({ isOpen }: { isOpen: boolean }) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col overflow-hidden",
        isOpen
          ? "w-64 translate-x-0"
          : "lg:w-20 lg:translate-x-0 -translate-x-full w-0",
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-slate-50 shrink-0">
        <span
          className={cn(
            "ml-3 font-bold text-slate-900 transition-opacity duration-300",
            !isOpen && "lg:opacity-0",
          )}
        ></span>
      </div>

      {/* Navigasi */}
      <nav className="flex-1 p-3 space-y-2">
        {menus.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center rounded-xl transition-all duration-200",
                isOpen
                  ? "px-4 py-3 justify-start"
                  : "lg:py-3 lg:justify-center p-0",
                active
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-slate-500 hover:bg-slate-50",
              )}
            >
              <item.icon size={20} className="shrink-0" />
              <span
                className={cn(
                  "ml-3 text-sm font-bold transition-all duration-300 whitespace-nowrap",
                  !isOpen && "lg:hidden",
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-50">
        <Link
          to="/"
          className={cn(
            "flex items-center text-slate-400 hover:text-primary transition-all",
            isOpen ? "px-2" : "lg:justify-center",
          )}
        >
          <ArrowLeft size={18} className="shrink-0" />
          {isOpen && <span className="ml-3 text-sm font-bold">Keluar</span>}
        </Link>
      </div>
    </aside>
  );
}
