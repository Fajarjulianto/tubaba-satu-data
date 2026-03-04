import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useHeroSearch } from "@/hooks/use-hero-search";
import { HeroStats } from "./hero/HeroStats";
import {
  TapisPattern,
  TapisBorder,
  TapisStarDivider,
} from "@/constant/motiftapis";

export function HeroSection() {
  const { query, setQuery, handleSearch } = useHeroSearch();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="relative bg-primary min-h-[80vh] flex items-center justify-center py-16 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary to-primary" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Dekorasi tapis */}
      <TapisPattern />
      <TapisBorder />
      <TapisBorder flip />
      <div className="absolute top-[18px] left-0 w-full h-px bg-secondary/20 z-10" />
      <div className="absolute bottom-[18px] left-0 w-full h-px bg-secondary/20 z-10" />

      {/* Konten */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl w-full">
          {/* Ornamen atas judul */}
          <div className="flex items-center justify-center gap-3 mb-4 opacity-60">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polygon
                points="8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10 0,6 6,6"
                fill="#C9A84C"
              />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
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

              {/* Input */}
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

          {/* Divider bintang */}
          <div className="mt-10 mb-2">
            <TapisStarDivider />
          </div>

          {/* Statistics */}
          <div className="w-full flex justify-center">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
}
