import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/constant/mockdata";

export function CategorySection() {
  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
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
            Lihat semua kategori <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/dataset?category=${category.name}`}
              className="group bg-card border border-border rounded-xl p-4 md:p-6 hover:shadow-lg hover:border-secondary transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${category.color}`}
                >
                  <category.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 gap-1">
                    <h3 className="font-display font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {category.count} dataset
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 hidden md:block">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/dataset"
          className="md:hidden flex items-center justify-center gap-2 text-primary font-medium mt-6 hover:underline"
        >
          Lihat semua kategori <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
