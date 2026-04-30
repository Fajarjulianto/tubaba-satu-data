import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import { SearchBar } from "@/components/datasets/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/datasets/Pagination";
import {
  Building2,
  CalendarDays,
  FileText,
  Tag,
  Database,
  ExternalLink,
} from "lucide-react";
import { useFetchCkan, CKANdataItem } from "@/hooks/data/useFetchCkan";

const ITEMS_PER_PAGE = 6;


const MetadataCard = ({ item }: { item: CKANdataItem}) => {
  const fileType = item.resources?.[0]?.format || "DATA";
  const category = item.groups?.[0]?.display_name || "Lainnya";
  const agency = item.organization?.title || "Tanpa Instansi";
  const publishedDate = item.metadata_created?.split("T")[0] || "-";
  const lastUpdated = item.metadata_modified?.split("T")[0] || "-";
  const description = item.notes || "Tidak ada deskripsi.";
  const sourceUrl = item.resources?.[0]?.url || null;

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
      <CardContent className="p-6 flex flex-col gap-4 h-full">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="text-[9px] uppercase tracking-widest font-black font-tubaba px-2 py-1"
          >
            {category}
          </Badge>
          <Badge
            variant="outline"
            className="text-[9px] uppercase tracking-widest font-bold font-tubaba px-2 py-1 text-primary border-primary/20 bg-primary/5"
          >
            {fileType}
          </Badge>
        </div>

        {/* Judul */}
        <h3 className="font-tubaba font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {item.title || item.name}
        </h3>

        {/* Deskripsi */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Info baris */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-500 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-1.5 min-w-0">
            <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{agency}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <Database className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">
              {item.num_resources} resource
            </span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">Dibuat: {publishedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <CalendarDays className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Update: {lastUpdated}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">
              {item.license_title || "Open Data"}
            </span>
          </div>
          {item.tags?.length > 0 && (
            <div className="flex items-center gap-1.5 min-w-0">
              <Tag className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">
                {item.tags.slice(0, 2).map((t) => t.name).join(", ")}
              </span>
            </div>
          )}
        </div>

        {/* Link ke sumber */}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mt-auto pt-2 border-t border-slate-100"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Lihat Sumber Data
          </a>
        )}
      </CardContent>
    </Card>
  );
};

const MetadataCardSkeleton = () => (
  <div className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
);


const Metadata = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: metadataList = [], isLoading, isError } = useFetchCkan();

  const filteredMetadata = useMemo(() => {
    if (!searchQuery) return metadataList;
    const q = searchQuery.toLowerCase();
    return metadataList.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.organization?.title?.toLowerCase().includes(q) ||
        item.groups?.[0]?.display_name?.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.name.toLowerCase().includes(q))
    );
  }, [metadataList, searchQuery]);


  const handleSearch = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredMetadata.length / ITEMS_PER_PAGE);
  const paginatedMetadata = filteredMetadata.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <HeaderSection
        title="Metadata"
        description="Jelajahi informasi metadata dataset publik Kabupaten Tulang Bawang Barat."
      />

      <main className="container mx-auto px-4 py-8">
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          resultCount={filteredMetadata.length}
        />

        {isLoading ? (
          <div className="grid sm:grid-cols-2 gap-5 mt-6">
            {[...Array(4)].map((_, i) => (
              <MetadataCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          // Error state
          <div className="text-center py-20 text-slate-400 font-tubaba italic">
            Gagal memuat metadata. Periksa koneksi ke server CKAN.
          </div>
        ) : filteredMetadata.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-5 mt-6">
            {paginatedMetadata.map((item) => (
              <MetadataCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          // Empty state — teks identik polanya dengan Dataset.tsx
          <div className="text-center py-20 text-slate-400 font-tubaba italic">
            Tidak ditemukan metadata yang sesuai kriteria pencarian Anda.
          </div>
        )}

        {/* Pagination — identik dengan Dataset.tsx */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </main>
    </Layout>
  );
};

export default Metadata;