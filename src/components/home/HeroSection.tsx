import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHeroSearch } from "@/hooks/use-hero-search";
import { HeroStats } from "./hero/HeroStats";

export function HeroSection() {
  const { query, setQuery, handleSearch } = useHeroSearch();

  return (
    <section className="relative bg-primary min-h-[80vh] flex items-center justify-center py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary to-primary" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl w-full">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md text-secondary border border-secondary/20 px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            Portal Data Resmi Kabupaten
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-7xl text-white mb-6 leading-[1.1] tracking-tight">
            Satu Data <span className="text-secondary">Tubaba</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl font-light mx-auto">
            Portal data terpadu resmi Kabupaten Tulang Bawang Barat. Akses data
            publik yang terstruktur untuk mendukung transparansi, penelitian,
            dan pembangunan berbasis data.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full"
          >
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Cari dataset berdasarkan kata kunci..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14 md:h-16 bg-white border-0 rounded-2xl shadow-2xl text-black focus-visible:ring-secondary w-full"
              />
            </div>
            <Button
              type="submit"
              className="h-14 md:h-16 px-10 bg-secondary text-primary hover:bg-secondary/90 rounded-2xl font-tubaba-bold text-lg shadow-xl transition-all active:scale-95"
            >
              CARI
            </Button>
          </form>

          {/* Statistics Component */}
          <div className="w-full flex justify-center">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
}
