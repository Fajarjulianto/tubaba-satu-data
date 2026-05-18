import { useMemo } from "react";
import { Building2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCombinedDatasets } from "@/hooks/data/useCombinedDataset";

export function AgencySection() {
  const navigate = useNavigate();
  const { data: datasets = [], isLoading } = useCombinedDatasets();

  // Derive daftar OPD unik + hitung jumlah dataset per OPD
  const agencies = useMemo(() => {
    const countMap: Record<string, number> = {};
    datasets.forEach((d) => {
      const name = d.agency || d.organization?.title || "";
      if (!name) return;
      countMap[name] = (countMap[name] || 0) + 1;
    });
    return Object.entries(countMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // terbanyak dataset dulu
  }, [datasets]);

  const handleAgencyClick = (agencyName: string) => {
    // Navigasi ke halaman dataset dengan filter OPD aktif via URLSearchParams
    navigate(`/dataset?opd=${encodeURIComponent(agencyName)}&page=1`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Produsen Data
          </h2>
          <p className="text-muted-foreground">
            Institusi pemerintah yang berkolaborasi berbagi data publik melalui
            platform Satu Data Tubaba.
          </p>
        </div>

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-5 text-center animate-pulse"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-100 mx-auto mb-3" />
                <div className="h-3 bg-slate-100 rounded w-3/4 mx-auto mb-2" />
                <div className="h-2.5 bg-slate-100 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : agencies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p className="text-sm">Memuat data produsen...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {agencies.map((agency) => (
              <button
                key={agency.name}
                onClick={() => handleAgencyClick(agency.name)}
                className="bg-card border border-border rounded-xl p-5 text-center hover:border-secondary hover:shadow-md transition-all duration-300 cursor-pointer group w-full"
              >
                <div className="w-14 h-14 rounded-xl bg-burgundy-light mx-auto mb-3 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Building2 className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <h4 className="font-medium text-foreground text-sm mb-1 text-center truncate" title={agency.name}>
                  {agency.name}
                </h4>
                <p className="text-xs text-muted-foreground text-center">
                  {agency.count} dataset
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}