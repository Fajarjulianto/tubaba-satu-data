import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/constant/mockdata";
import { useCombinedDatasets } from "@/hooks/data/useCombinedDataset";

type CategoryDef = (typeof categories)[number];

export function CategorySection() {
  const { data: datasets = [], isLoading } = useCombinedDatasets();

  // Hitung jumlah dataset per kategori dari data CKAN
  const countMap = useMemo(() => {
    const map: Record<string, number> = {};
    datasets.forEach((d) => {
      const cat = d.category || "Pemerintahan";
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  }, [datasets]);

  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-2">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
              Cari Dataset Berdasarkan Kategori
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Jelajahi dataset berdasarkan kategori yang Anda minati
            </p>
          </div>
          <Link
            to="/dataset"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Lihat semua dataset <ArrowRight className="w-4 h-4" />
          </Link>
        </div>


        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              count={isLoading ? null : (countMap[category.name] ?? 0)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            to="/dataset"
            className="md:hidden flex items-center gap-2 text-primary font-medium hover:underline text-sm"
          >
            Lihat semua dataset <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Card per kategori ────────────────────────────────────────────────────────
function CategoryCard({
  category,
  count,
}: {
  category: CategoryDef;
  // null = sedang loading
  count: number | null;
}) {
  return (
    <Link
      to={`/dataset?category=${encodeURIComponent(category.name)}`}
      className="group bg-card border border-border rounded-xl p-4 md:p-6 hover:shadow-lg hover:border-secondary transition-all duration-300 block"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${category.color}`}
        >
          <category.icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 gap-1">
            <h3 className="font-display font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {category.name}
            </h3>
            <span className="text-xs md:text-sm text-muted-foreground shrink-0">
              {count === null ? (
                <span className="inline-block w-12 h-3.5 bg-slate-200 rounded animate-pulse" />
              ) : (
                `${count} dataset`
              )}
            </span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 hidden md:block">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}