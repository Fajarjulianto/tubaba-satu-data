import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/datasets/SearchBar";
import { FilterSidebar } from "@/components/datasets/FilterSidebar";
import { DatasetCard } from "@/components/datasets/DatasetCard";
import { Pagination } from "@/components/datasets/Pagination";
import { mockDatasets } from "@/data/mockDatasets";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";

const ITEMS_PER_PAGE = 6;

const Datasets = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    Category: initialCategory ? [initialCategory] : [],
    Agency: [],
    Year: [],
    "File Type": [],
  });

  const handleFilterChange = (section: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[section] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [section]: updated };
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      Category: [],
      Agency: [],
      Year: [],
      "File Type": [],
    });
    setCurrentPage(1);
  };

  const filteredDatasets = useMemo(() => {
    return mockDatasets.filter((dataset) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          dataset.title.toLowerCase().includes(query) ||
          dataset.description.toLowerCase().includes(query) ||
          dataset.agency.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (selectedFilters.Category.length > 0) {
        if (!selectedFilters.Category.includes(dataset.category)) return false;
      }

      if (selectedFilters["File Type"].length > 0) {
        if (!selectedFilters["File Type"].includes(dataset.fileType))
          return false;
      }

      return true;
    });
  }, [searchQuery, selectedFilters]);

  const totalPages = Math.ceil(filteredDatasets.length / ITEMS_PER_PAGE);
  const paginatedDatasets = filteredDatasets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <Layout>
      {/* Header */}
      <HeaderSection
        title="Dataset"
        description="Jelajahi semua dataset publik yang tersedia dari instansi pemerintah Tubaba. Akses informasi yang andal dan terbaru untuk penelitian dan analisis."
      />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <FilterSidebar
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                setCurrentPage(1);
              }}
              resultCount={filteredDatasets.length}
            />

            <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-6">
              {paginatedDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>

            {filteredDatasets.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <p className="text-muted-foreground text-base md:text-lg">
                  Tidak ditemukan dataset yang sesuai dengan kriteria Anda.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Coba sesuaikan pencarian atau filter Anda.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Datasets;
