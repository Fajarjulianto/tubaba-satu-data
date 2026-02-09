// src/components/datasets/FilterSidebar.tsx
import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Checkbox,
  Label,
  Button,
} from "@/components/index";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dataset } from "@/types";

interface FilterSidebarProps {
  allDatasets: Dataset[];
  selectedFilters: { Category: string[] };
  onFilterChange: (section: string, value: string) => void;
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

  const dynamicCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    allDatasets.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([label, count]) => ({
        label,
        count,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allDatasets]);

  const activeFilterCount = selectedFilters.Category.length;

  const filterContent = (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-sm uppercase tracking-widest text-slate-400">
            Kategori
          </span>
        </div>

        <div className="space-y-3">
          {dynamicCategories.map((option) => (
            <div key={option.label} className="flex items-center gap-3 group">
              <Checkbox
                id={`cat-${option.label}`}
                checked={selectedFilters.Category.includes(option.label)}
                onCheckedChange={() => onFilterChange("Category", option.label)}
                className="border-slate-300 data-[state=checked]:bg-primary"
              />
              <Label
                htmlFor={`cat-${option.label}`}
                className="text-sm font-medium text-slate-600 cursor-pointer flex-1 flex items-center justify-between group-hover:text-primary transition-colors"
              >
                <span>{option.label}</span>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">
                  {option.count}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Implementasi Mobile Filter
  const hasActiveFilters = activeFilterCount > 0;

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
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] overflow-y-auto pt-10">
          <SheetHeader className="mb-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-tubaba-heavy uppercase">
                Filters
              </SheetTitle>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-xs font-bold text-primary"
                >
                  Reset
                </Button>
              )}
            </div>
          </SheetHeader>
          {filterContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-[32px] border border-slate-100 p-6 h-fit sticky top-28 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-tubaba-heavy text-lg uppercase tracking-tight">
          Filters
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs font-bold text-primary hover:bg-primary/5"
          >
            Reset
          </Button>
        )}
      </div>
      {filterContent}
    </aside>
  );
}
