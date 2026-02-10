import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Menu, Search, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar: Desktop Mini & Mobile Hidden */}
      <AdminSidebar isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20 ml-0", // Desktop sisa 20 (ikon), Mobile sisa 0
        )}
      >
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-slate-600" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Search
              size={18}
              className="text-slate-400 cursor-pointer md:hidden"
            />
            <Bell size={18} className="text-slate-400 cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-white" />
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay Mobile: Muncul hanya saat sidebar terbuka di layar kecil */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
