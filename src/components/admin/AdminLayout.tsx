import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Bell, User, Search } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Statis di Kiri */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar / Header Admin */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          {/* Search Bar Sederhana untuk Admin */}
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari fitur atau data..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Admin Profile & Notifications */}
          <div className="flex items-center gap-5">
            <button className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:text-primary transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-tubaba-bold text-slate-900 leading-none">
                  Admin Diskominfo
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-bold">
                  Super Admin
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-white shadow-sm">
                <User className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8">
          <div className="animate-in fade-in duration-500">{children}</div>
        </main>
      </div>
    </div>
  );
}
