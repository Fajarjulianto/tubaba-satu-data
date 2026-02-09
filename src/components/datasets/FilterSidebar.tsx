import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
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

interface FilterSection {
  title: string;
  options: { label: string; count: number }[];
}

const filterSections: FilterSection[] = [
  {
    title: "Kategori",
    options: [
      { label: "Populasi", count: 24 },
      { label: "Pendidikan", count: 18 },
      { label: "Kesehatan", count: 31 },
      { label: "Ekonomi", count: 42 },
      { label: "Infrastruktur", count: 15 },
      { label: "Sosial", count: 27 },
      { label: "Ekologi", count: 12 },
    ],
  },
  {
    title: "OPD",
    options: [
      { label: "Dinas Kesehatan", count: 28 },
      { label: "Dinas Pendidikan", count: 22 },
      { label: "BPS Tubaba", count: 35 },
      { label: "Dinas Sosial", count: 19 },
      { label: "Dinas PUPR", count: 14 },
      { label: "Bappeda", count: 21 },
    ],
  },
  {
    title: "Tahun Rilis",
    options: [
      { label: "2024", count: 45 },
      { label: "2023", count: 52 },
      { label: "2022", count: 38 },
      { label: "2021", count: 29 },
      { label: "2020", count: 25 },
    ],
  },
  {
    title: "File Type",
    options: [
      { label: "CSV", count: 67 },
      { label: "XLSX", count: 54 },
      { label: "JSON", count: 32 },
      { label: "PDF", count: 41 },
    ],
  },
];

interface FilterSidebarProps {
  categories: string[];
  selectedFilters: { Category: string[] };
  onFilterChange: (section: string, value: string) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  categories,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    filterSections.map((s) => s.title),
  );
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const hasActiveFilters = Object.values(selectedFilters).some(
    (arr) => arr.length > 0,
  );

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (acc, arr) => acc + arr.length,
    0,
  );

  const filterContent = (
    <div className="space-y-4">
      {filterSections.map((section) => (
        <div
          key={section.title}
          className="border-b border-border pb-4 last:border-0"
        >
          <button
            onClick={() => toggleSection(section.title)}
            className="flex items-center justify-between w-full text-left py-2 font-medium text-sm text-foreground hover:text-primary transition-colors"
          >
            {section.title}
            {expandedSections.includes(section.title) ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          {expandedSections.includes(section.title) && (
            <div className="space-y-2 mt-2">
              {section.options.map((option) => (
                <div key={option.label} className="flex items-center gap-2">
                  <Checkbox
                    id={`${section.title}-${option.label}`}
                    checked={selectedFilters[section.title]?.includes(
                      option.label,
                    )}
                    onCheckedChange={() =>
                      onFilterChange(section.title, option.label)
                    }
                    className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={`${section.title}-${option.label}`}
                    className="text-sm text-muted-foreground cursor-pointer flex-1 flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    <span className="text-xs text-muted-foreground/70">
                      ({option.count})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Mobile: Show as Sheet/Drawer
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2 mb-4 w-full">
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] overflow-y-auto">
          <SheetHeader className="mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle>Filters</SheetTitle>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  Hapus semua
                </Button>
              )}
            </div>
          </SheetHeader>
          {filterContent}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Show as sidebar
  return (
    <aside className="hidden lg:block w-72 shrink-0 bg-card rounded-xl border border-border p-5 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            Hapus semua
          </Button>
        )}
      </div>
      {filterContent}
    </aside>
  );
}
