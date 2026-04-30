import { useMemo } from "react";
import { Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/index";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dataset } from "@/types";
import { categories, TAHUN_OPTIONS } from "@/constant/mockdata";
import { useState } from "react";

interface FilterSidebarProps {
  allDatasets: Dataset[];
  selectedFilters: {
    Category: string;   // nilai tunggal (string) bukan array
    Year: string;
  };
  onFilterChange: (type: "Category" | "Year", value: string) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  allDatasets,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Hitung jumlah dataset per kategori secara real-time dari data CKAN
  const categoryCountMap = useMemo(() => {
    const counts: Record<string, number> = {};
    allDatasets.forEach((d) => {
      const cat = d.category || "Pemerintahan";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [allDatasets]);

  // Hitung tahun unik dari metadata_created dataset
  const availableYears = useMemo(() => {
    const yearSet = new Set<string>();
    allDatasets.forEach((d) => {
      const year = d.metadata?.publishedDate?.split("-")[0];
      if (year && year.match(/^\d{4}$/)) yearSet.add(year);
    });
    // Gabungkan dengan TAHUN_OPTIONS, urutkan descending
    TAHUN_OPTIONS.forEach((y) => yearSet.add(y));
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
  }, [allDatasets]);

  const hasActiveFilters = !!selectedFilters.Category || !!selectedFilters.Year;

  const filterContent = (
    <div className="space-y-6">
      {/* ── Dropdown Kategori ── */}
      <div className="border-b border-border pb-5">
        <p className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-3">
          Kategori
        </p>
        <Select
          value={selectedFilters.Category || "__all__"}
          onValueChange={(val) =>
            onFilterChange("Category", val === "__all__" ? "" : val)
          }
        >
          <SelectTrigger className="w-full bg-slate-50/50 text-sm">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            <SelectItem value="__all__">Semua Kategori</SelectItem>
            {categories.map((cat) => {
              const count = categoryCountMap[cat.name] ?? 0;
              return (
                <SelectItem key={cat.name} value={cat.name}>
                  <span className="flex items-center justify-between w-full gap-3">
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      ({count})
                    </span>
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* ── Dropdown Tahun ── */}
      <div className="border-b border-border pb-5">
        <p className="font-bold text-xs uppercase tracking-widest text-slate-900 mb-3">
          Tahun Data
        </p>
        <Select
          value={selectedFilters.Year || "__all__"}
          onValueChange={(val) =>
            onFilterChange("Year", val === "__all__" ? "" : val)
          }
        >
          <SelectTrigger className="w-full bg-slate-50/50 text-sm">
            <SelectValue placeholder="Semua Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Semua Tahun</SelectItem>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Tombol Reset ── */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="w-full text-xs font-bold text-primary hover:bg-primary/5 gap-1"
        >
          <X className="w-3.5 h-3.5" />
          Reset Semua Filter
        </Button>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 mb-6 w-full font-tubaba font-bold uppercase tracking-wider"
          >
            <Filter className="w-4 h-4" />
            Filter Data
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full ml-2">
                {[selectedFilters.Category, selectedFilters.Year].filter(Boolean).length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] overflow-y-auto pt-10">
          <SheetHeader className="mb-6" />
          {filterContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-[32px] border border-slate-100 p-6 h-fit sticky top-28 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <span className="font-bold text-sm uppercase tracking-widest text-slate-900">
          Filter
        </span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs font-bold text-primary hover:bg-primary/5 gap-1 h-7 px-2"
          >
            <X className="w-3 h-3" />
            Reset
          </Button>
        )}
      </div>
      {filterContent}
    </aside>
  );
}