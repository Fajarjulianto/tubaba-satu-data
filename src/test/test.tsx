import { Search, ChevronDown, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { mockDatasets } from "@/data/mockDatasets";

export default function OrganisasiPage() {
  const agencyStats = mockDatasets.reduce(
    (acc, curr) => {
      const agencyName = curr.agency;
      if (!acc[agencyName]) acc[agencyName] = 0;
      acc[agencyName]++;
      return acc;
    },
    {} as Record<string, number>,
  );

  const agencies = Object.entries(agencyStats).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Search Bar */}
        <div className="relative mb-12 group">
          <input
            type="text"
            placeholder="Cari Instansi atau Organisasi..."
            className="w-full h-16 pl-8 pr-20 bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-950 placeholder:text-slate-400 font-medium"
          />
          <button className="absolute right-2 top-2 bottom-2 w-12 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary/90 transition-all shadow-lg active:scale-95">
            <Search size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Header Stats */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b-2 border-slate-200 pb-8 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-tubaba-heavy text-slate-950 uppercase tracking-tight">
              {agencies.length} <span className="text-primary">Organisasi</span>{" "}
              Ditampilkan
            </h2>
            <p className="text-slate-600 font-medium mt-1">
              Institusi pemerintah yang berkolaborasi menyediakan data publik
              secara transparan.
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 absolute -top-5 left-1 font-tubaba">
              Urutkan Berdasarkan
            </label>
            <select className="w-full h-12 pl-4 pr-10 bg-white border-2 border-slate-200 rounded-xl appearance-none text-sm font-bold text-slate-800 outline-none focus:border-primary cursor-pointer font-tubaba shadow-sm">
              <option>Nama A - Z</option>
              <option>Nama Z - A</option>
              <option>Dataset Terbanyak</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
            />
          </div>
        </div>

        {/* Organization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencies.map((agency) => (
            <Link
              key={agency.name}
              to={`/organisasi/${agency.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group bg-white border-2 border-transparent rounded-[32px] p-8 flex items-center gap-6 transition-all duration-300 shadow-[0_4px_20px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_rgba(128,0,0,0.1)] hover:border-primary/30 hover:-translate-y-2 ring-1 ring-slate-200/50"
            >
              {/* Logo Container  */}
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border-2 border-slate-50 group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-inner">
                <Building2 className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
              </div>

              {/* Text Info - Deep Contrast */}
              <div className="flex-1 min-w-0">
                <h4 className="font-tubaba-heavy text-slate-950 text-lg leading-tight uppercase tracking-tight group-hover:text-primary transition-colors truncate">
                  {agency.name}
                </h4>
                <div className="flex items-center gap-2 mt-3">
                  <span className="h-1.5 w-8 bg-secondary rounded-full" />
                  <p className="text-xs font-black text-slate-500 font-tubaba uppercase tracking-[0.15em]">
                    {agency.count} Datasets
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
