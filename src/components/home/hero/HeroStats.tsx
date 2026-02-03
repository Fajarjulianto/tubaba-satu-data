const STATS = [
  { value: "169+", label: "Datasets" },
  { value: "12", label: "Organisasi" },
  { value: "50K+", label: "Downloads" },
];

export const HeroStats = () => (
  <div className="flex flex-wrap gap-6 md:gap-12 mt-12 pt-8 border-t border-white/10">
    {STATS.map((stat) => (
      <div key={stat.label} className="text-left group">
        <div className="text-2xl md:text-4xl font-tubaba-heavy text-secondary group-hover:scale-105 transition-transform">
          {stat.value}
        </div>
        <div className="text-xs md:text-sm uppercase tracking-widest text-white/60 font-medium">
          {stat.label}
        </div>
      </div>
    ))}
  </div>
);
