import { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  FileText,
  ExternalLink,
  Trash2,
  Download,
} from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardContent,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/index";
import { cn } from "@/lib/utils";

const DATASET_LIST = [
  {
    id: 1,
    title: "Data Kependudukan Tubaba 2024",
    updatedAt: "2024-01-15",
    agency: "Dinas Kependudukan",
    category: "Kependudukan",
    status: "Dipublikasi",
    downloads: 234,
  },
  {
    id: 2,
    title: "Statistik Kesehatan Masyarakat",
    updatedAt: "2024-01-14",
    agency: "Dinas Kesehatan",
    category: "Kesehatan",
    status: "Dipublikasi",
    downloads: 189,
  },
  {
    id: 3,
    title: "Anggaran Pendidikan 2024",
    updatedAt: "2024-01-13",
    agency: "Dinas Pendidikan",
    category: "Pendidikan",
    status: "Draf",
    downloads: 0,
  },
];

const ManageDatasets = () => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Halaman: Stacked di mobile, Row di desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Kelola Dataset
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Lihat dan kelola semua dataset yang tersedia
          </p>
        </div>
        <Button className="w-full sm:w-auto bg-[#6D2323] hover:bg-[#5A1D1D] text-white font-bold gap-2 h-12">
          <Plus className="w-5 h-5" /> Tambah Dataset
        </Button>
      </div>

      {/* Bar Pencarian */}
      <Card className="rounded-2xl border-slate-200 shadow-sm bg-slate-50/30">
        <CardContent className="p-3 md:p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Cari dataset atau instansi..."
              className="w-full pl-12 h-11 md:h-12 bg-white border-slate-200 rounded-xl outline-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Kontainer Tabel/Card */}
      <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-slate-100">
          <h2 className="text-lg md:text-xl font-bold text-slate-800">
            Semua Dataset
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Total {DATASET_LIST.length} dataset ditemukan
          </p>
        </div>

        {/* TAMPILAN DESKTOP: Tabel Tradisional */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Nama Dataset
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Instansi
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                  Unduhan
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DATASET_LIST.map((data) => (
                <tr
                  key={data.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm">
                      {data.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">
                      Update: {data.updatedAt}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {data.agency}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={data.status} />
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                    {data.downloads}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ActionMenu />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TAMPILAN MOBILE: Card View (Stack) */}
        <div className="md:hidden divide-y divide-slate-100">
          {DATASET_LIST.map((data) => (
            <div key={data.id} className="p-5 space-y-4 bg-white">
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {data.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    Diperbarui: {data.updatedAt}
                  </p>
                </div>
                <ActionMenu />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                    Instansi
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    {data.agency}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                    Unduhan
                  </p>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <Download className="w-3 h-3 text-slate-400" />{" "}
                    {data.downloads}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Badge
                  variant="outline"
                  className="text-[9px] uppercase font-bold tracking-widest border-slate-200"
                >
                  {data.category}
                </Badge>
                <StatusBadge status={data.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

/* Sub-komponen untuk merapikan kode */
const StatusBadge = ({ status }: { status: string }) => (
  <Badge
    className={cn(
      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm",
      status === "Dipublikasi"
        ? "bg-green-100 text-green-700 border-green-200"
        : "bg-amber-100 text-amber-700 border-amber-200",
    )}
  >
    {status}
  </Badge>
);

const ActionMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-slate-400 hover:text-primary rounded-xl"
      >
        <MoreHorizontal className="w-5 h-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="w-52 p-2 rounded-xl border-slate-200 shadow-xl"
    >
      <DropdownMenuItem className="gap-3 p-3 rounded-lg cursor-pointer font-medium text-slate-600">
        <FileText className="w-4 h-4 text-primary" /> Edit Dataset
      </DropdownMenuItem>
      <DropdownMenuItem className="gap-3 p-3 rounded-lg cursor-pointer font-medium text-slate-600">
        <ExternalLink className="w-4 h-4 text-primary" /> Lihat Publik
      </DropdownMenuItem>
      <div className="h-px bg-slate-100 my-1" />
      <DropdownMenuItem className="gap-3 p-3 rounded-lg cursor-pointer font-medium text-red-600 hover:bg-red-50">
        <Trash2 className="w-4 h-4" /> Hapus Dataset
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ManageDatasets;
