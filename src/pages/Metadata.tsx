import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  FileCode,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Tag,
  Building2,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Button,
  Badge,
} from "@/components/index";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import { metadataItems } from "@/constant/mockdata";

const Metadata = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filteredItems = metadataItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <HeaderSection
        title="Metadata"
        description="Jelajahi definisi metadata yang distandarisasi untuk semua kumpulan data. Pahami struktur data, format, dan persyaratan akses."
      />

      <main className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari Berdasarkan Judul atau Kategori"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 h-12 bg-card">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="Population">Populasi</SelectItem>
              <SelectItem value="Health">Kesehatan</SelectItem>
              <SelectItem value="Economy">Ekonomi</SelectItem>
              <SelectItem value="Education">Pendidikan</SelectItem>
              <SelectItem value="Infrastructure">Infrastruktur</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Metadata List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div
                className="p-5 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-burgundy-light flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        {item.identifier}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    {expandedItems.includes(item.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {expandedItems.includes(item.id) && (
                <div className="px-5 pb-5 pt-0 border-t border-border">
                  <div className="grid md:grid-cols-2 gap-6 mt-5">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Description
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          <strong>Agency:</strong> {item.agency}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileCode className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          <strong>Format:</strong> {item.format}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          <strong>Update Frequency:</strong> {item.frequency}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      {item.keywords.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="outline"
                          className="text-xs"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button size="sm" className="gap-2">
                      <Eye className="w-4 h-4" /> View Schema
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="w-4 h-4" /> Export
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No metadata found.</p>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Metadata;
