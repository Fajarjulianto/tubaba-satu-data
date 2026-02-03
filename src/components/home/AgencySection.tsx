import { Building2 } from "lucide-react";

const agencies = [
  { name: "Dinas Kesehatan", datasets: 28 },
  { name: "Dinas Pendidikan", datasets: 22 },
  { name: "BPS Tubaba", datasets: 35 },
  { name: "Dinas Sosial", datasets: 19 },
  { name: "Dinas PUPR", datasets: 14 },
  { name: "Bappeda", datasets: 21 },
  { name: "Dinas Pertanian", datasets: 16 },
  { name: "DLH Tubaba", datasets: 12 },
];

export function AgencySection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Instansi Kontributor
          </h2>
          <p className="text-muted-foreground">
            Institusi pemerintah yang berkolaborasi berbagi data publik melalui
            platform Satu Data Tubaba.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {agencies.map((agency) => (
            <div
              key={agency.name}
              className="bg-card border border-border rounded-xl p-5 text-center hover:border-secondary hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-xl bg-burgundy-light mx-auto mb-3 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Building2 className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">
                {agency.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {agency.datasets} datasets
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
