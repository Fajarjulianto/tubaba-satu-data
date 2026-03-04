import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Building2, ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useFetchDatasets } from "@/hooks/data/useFetchDatasets";
import {
  Input,
  Layout,
  HeaderSection,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/index";

const Agencies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  // Fetch daftar OPD
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["agencies-api"],
    queryFn: async () => {
      const response = await axiosInstance.get("/jumlah_opd");
      return response.data.data as Record<string, string>;
    },
  });

  const { data: allDatasets = [] } = useFetchDatasets();

  const agencies = useMemo(() => {
    if (!apiData) return [];
    return Object.entries(apiData).map(([id, name]) => {
      const datasetCount = allDatasets.filter((d) => d.agency === name).length;
      return {
        id: parseInt(id),
        name: name as string,
        shortName: (name as string)
          .split(" ")
          .map((w) => w[0])
          .join(""),
        datasets: datasetCount,
        description: "Instansi resmi Pemerintah Kabupaten Tulang Bawang Barat.",
      };
    });
  }, [apiData, allDatasets]);

  const filteredAgencies = useMemo(() => {
    const result = agencies.filter((agency) => {
      const query = searchQuery.toLowerCase();
      return (
        agency.name.toLowerCase().includes(query) ||
        agency.shortName.toLowerCase().includes(query)
      );
    });

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [searchQuery, sortBy, agencies]);

  if (isLoading) {
    return (
      <Layout>
        <HeaderSection
          title="Organisasi Perangkat Daerah"
          description="Memuat data..."
        />
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeaderSection
        title="Organisasi Perangkat Daerah"
        description="Daftar instansi pemerintah Kabupaten Tulang Bawang Barat yang berkontribusi menyediakan data pada platform Satu Data Tubaba."
      />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari Instansi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border rounded-xl"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 h-12 bg-card">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="name-asc">Nama A-Z</SelectItem>
              <SelectItem value="name-desc">Nama Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold">
            {filteredAgencies.length} Organisasi Ditampilkan
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredAgencies.map((agency) => (
            <Link
              key={agency.id}
              to={`/dataset?q=${encodeURIComponent(agency.name)}`}
              className="group bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-secondary transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-burgundy-light flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Building2 className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm md:text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {agency.name}
                  </h3>
                  <p className="text-sm text-secondary font-medium">
                    {agency.datasets} Dataset
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
                {agency.description}
              </p>
              <div className="flex items-center gap-1 text-xs text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Lihat Dataset</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Agencies;
