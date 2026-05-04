import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useHeroSearch } from "@/hooks/use-hero-search";
import { HeroStats } from "./hero/HeroStats";
import tapisBackground from "@/assets/images/Tumpal Tubaba copy.png";

export function HeroSection() {
  const { query, setQuery, handleSearch } = useHeroSearch();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative bg-primary min-h-[80vh] flex items-center justify-center py-16 md:py-28 overflow-hidden">

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${tapisBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.18,
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: [
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(107,30,42,0.7) 100%)",
            "linear-gradient(to bottom, rgba(107,30,42,0.3) 0%, rgba(107,30,42,0.6) 60%, rgba(107,30,42,0.95) 100%)",
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      {/* ── Konten ── */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl w-full">
          {/* Title */}
          <h1 className="text-4xl md:text-7xl text-white mb-6 leading-[1.1] tracking-tight font-bold">
            Satu Data <span className="text-secondary">Tubaba</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl font-medium mx-auto">
            Portal Satu Data Indonesia Kabupaten Tulang Bawang Barat. Satu Data
            Tubaba mendukung pembangunan berbasis data akurat, transparan dan
            akuntabel
          </p>

          {/* ── Search Bar ── */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto w-full">
            <div
              className="relative flex items-center rounded-2xl transition-all duration-300"
              style={{
                background: isFocused
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.95)",
                boxShadow: isFocused
                  ? "0 0 0 3px rgba(201,168,76,0.45), 0 20px 60px rgba(0,0,0,0.35)"
                  : "0 8px 32px rgba(0,0,0,0.25)",
                transform: isFocused
                  ? "translateY(-2px) scale(1.01)"
                  : "translateY(0) scale(1)",
              }}
            >
              <div className="pl-5 pr-3 shrink-0 transition-colors duration-200">
                <Search
                  className="w-5 h-5 transition-colors duration-200"
                  style={{ color: isFocused ? "#6B1E2A" : "#94a3b8" }}
                />
              </div>

              <input
                type="text"
                placeholder="Cari dataset berdasarkan kata kunci..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 h-14 md:h-16 bg-transparent text-slate-800 placeholder:text-slate-400 text-sm md:text-base outline-none font-medium"
              />
              <div
                className="w-px h-8 shrink-0 transition-all duration-200 mx-1"
                style={{
                  background: isFocused
                    ? "rgba(201,168,76,0.4)"
                    : "rgba(0,0,0,0.08)",
                }}
              />

              <button
                type="submit"
                className="shrink-0 flex items-center gap-2 mx-2 px-5 md:px-7 h-10 md:h-11 rounded-xl font-bold text-sm md:text-base transition-all duration-200 active:scale-95"
                style={{
                  background: isFocused
                    ? "linear-gradient(135deg, #C9A84C 0%, #b8943d 100%)"
                    : "linear-gradient(135deg, #C9A84C 0%, #a07830 100%)",
                  color: "#4a1018",
                  boxShadow: isFocused
                    ? "0 4px 16px rgba(201,168,76,0.5)"
                    : "0 2px 8px rgba(201,168,76,0.2)",
                }}
              >
                <span className="hidden sm:inline tracking-wider">CARI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p
              className="text-xs text-white/40 mt-3 transition-all duration-300"
              style={{
                opacity: isFocused ? 0.7 : 0,
                transform: isFocused ? "translateY(0)" : "translateY(-4px)",
              }}
            >
              Tekan Enter atau klik CARI untuk mencari dataset
            </p>
          </form>

          {/* Statistics */}
          <div className="w-full flex justify-center">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
}