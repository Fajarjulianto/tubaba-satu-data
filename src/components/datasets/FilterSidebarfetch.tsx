interface FilterSidebarProps {
  categories: string[];
  selectedFilters: { Category: string[] };
  onFilterChange: (section: string, value: string) => void;
  onClearFilters: () => void;
}

export const FilterSidebarFetch = ({
  categories,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) => {
  return (
    <aside className="w-full lg:w-64 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-tubaba-heavy text-lg uppercase tracking-tight text-slate-900">
          Filter Data
        </h2>
        <button
          onClick={onClearFilters}
          className="text-xs font-bold text-primary hover:underline font-tubaba"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
          Kategori
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedFilters.Category.includes(category)}
                onChange={() => onFilterChange("Category", category)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
