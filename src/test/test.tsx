import { DatasetCardSkeleton } from "@/components/datasets/DataSetCardSkeleton";
import { DatasetCard } from "@/components/datasets/DatasetCard";
import { useFetchDatasets } from "@/hooks/data/useFetchDatasets";

const TestPage = () => {
  // const toast = useToast();

  // 1. Penggunaan properti isFetching, isError, dan refetch
  const {
    data: datasets = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useFetchDatasets();

  // 2. Logika Render Data
  const renderData = () => {
    // Jika sedang loading awal, tampilkan skeleton
    if (isLoading) {
      return [...Array(6)].map((_, i) => <DatasetCardSkeleton key={i} />);
    }

    // Jika terjadi error dari API
    if (isError) {
      return (
        <div className="col-span-full text-center p-10 bg-red-50 rounded-3xl border border-red-100">
          <p className="text-red-600 font-bold">Gagal memuat data!</p>
          <p className="text-sm text-red-500">{error?.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
          >
            Coba Lagi
          </button>
        </div>
      );
    }

    // Jika data kosong
    if (datasets.length === 0) {
      return (
        <div className="col-span-full text-center py-20 text-slate-400 italic">
          Tidak ada dataset yang ditemukan.
        </div>
      );
    }

    // Render data asli jika sudah berhasil di-fetch
    return datasets.map((dataset) => (
      <DatasetCard key={dataset.id} dataset={dataset} />
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-tubaba-heavy text-primary uppercase tracking-tighter">
          Test Page
        </h1>
        <p className="mt-2 text-slate-500">
          Status: {isFetching ? "🔄 Sinkronisasi..." : "✅ Terkoneksi"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {renderData()}
      </div>
    </div>
  );
};

export default TestPage;
