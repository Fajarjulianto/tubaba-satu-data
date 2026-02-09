import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/datasets/SearchBar";
import { DatasetCard } from "@/components/datasets/DatasetCard";
import { Pagination } from "@/components/datasets/Pagination";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import { mockDatasets } from "@/data/mockDatasets";
import { FilterSidebar } from "@/components/datasets/FilterSidebar";
import { DatasetCardSkeleton } from "@/components/datasets/DataSetCardSkeleton";

// import Hook
// import { useFetchDatasets } from "@/hooks/data/useFetchDatasets";

const ITEMS_PER_PAGE = 6;

const Datasets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Data MOCK sementara
  const datasets = mockDatasets;
  const isLoading = false;

  // 2. Fetching Data dengan custom hook
  // const { data: datasets = [], isLoading } = useFetchDatasets();

  //Logika Filtering Data
  const filteredDatasets = useMemo(() => {
    return datasets.filter((dataset) => {
      const matchesSearch =
        !searchQuery ||
        dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dataset.agency.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !categoryFilter || dataset.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [datasets, searchQuery, categoryFilter]);

  // Fungsi untuk memperbarui parameter pencarian di URL
  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.set("page", "1"); // Reset ke halaman 1 saat filter/search berubah
    setSearchParams(params);
  };

  const totalPages = Math.ceil(filteredDatasets.length / ITEMS_PER_PAGE);
  const paginatedDatasets = filteredDatasets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <Layout>
      <HeaderSection
        title="Dataset"
        description="Jelajahi semua dataset publik Tubaba."
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            allDatasets={mockDatasets}
            selectedFilters={{
              Category: categoryFilter ? [categoryFilter] : [],
            }}
            onFilterChange={(_, value) => {
              const newValue = categoryFilter === value ? null : value;
              updateParams({ category: newValue });
            }}
            onClearFilters={() => setSearchParams({})}
          />

          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={(val) => updateParams({ q: val })}
              resultCount={filteredDatasets.length}
            />

            {/* Handling Loading & Empty State */}
            {isLoading ? (
              <div className="grid sm:grid-cols-2 gap-5 mt-6 animate-pulse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-48 bg-slate-100 rounded-3xl" />
                ))}
              </div>
            ) : filteredDatasets.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5 mt-6">
                {paginatedDatasets.map((dataset) => (
                  <DatasetCard key={dataset.id} dataset={dataset} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400 font-tubaba italic">
                Tidak ditemukan dataset yang sesuai kriteria pencarian Anda.
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  const params = new URLSearchParams(searchParams);
                  params.set("page", page.toString());
                  setSearchParams(params);
                }}
              />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Datasets;
