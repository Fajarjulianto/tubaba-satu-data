import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { categories, categoriesExtra } from "@/constant/mockdata";

type Category = {
  name: string;
  icon: React.ElementType;
  count: number;
  description: string;
  color: string;
};

export function CategorySection() {
  const [showAll, setShowAll] = useState(false);

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
            <CategoryCard key={category.name} category={category} />
          ))}

          {categoriesExtra.map((category, i) => (
            <div
              key={category.name}
              style={{
                overflow: "hidden",
                maxHeight: showAll ? "500px" : "0px",
                opacity: showAll ? 1 : 0,
                transform: showAll ? "translateY(0)" : "translateY(10px)",
                transition: `max-height 0.4s ease ${i * 50}ms, opacity 0.35s ease ${i * 50}ms, transform 0.35s ease ${i * 50}ms`,
                pointerEvents: showAll ? "auto" : "none",
              }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Tombol toggle */}
        <div className="flex flex-col items-center gap-3 mt-8">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
          >
            {showAll ? (
              <>
                Sembunyikan <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Lihat semua kategori ({categoriesExtra.length} lainnya){" "}
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>

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

function CategoryCard({ category }: { category: Category }) {
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
              {category.count} dataset
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
