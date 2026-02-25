import { useState, useMemo } from "react";
import {
  Search,
  Globe,
  Copy,
  Check,
  Key,
  BookOpen,
  Layers,
  HelpCircle,
  Download,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import {
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
} from "@/components/index";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DocSidebar } from "@/components/documentation/docSidebar";
import { ApiEndpointCard } from "@/components/documentation/ApiEndpointCard";
import { QuickLinkCard } from "@/components/documentation/QuickLinkCard";
import { docSections, apiEndpoints, faqs } from "@/data/docData";
import { HeaderSection } from "@/components/index";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("Semua");
  const [baseCopied, setBaseCopied] = useState(false);

  const baseUrl = "https://api.satudata.tubaba.go.id";

  // Logic: Filtering & Search
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return {
      endpoints: apiEndpoints.filter((e) => {
        const matchTag = activeTag === "Semua" || e.tag === activeTag;
        const matchSearch =
          !q || e.path.includes(q) || e.summary.toLowerCase().includes(q);
        return matchTag && matchSearch;
      }),
      faqs: faqs.filter(
        (f) =>
          !q ||
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q),
      ),
      sections: docSections
        .map((s) => ({
          ...s,
          items: s.items.filter((i) => !q || i.title.toLowerCase().includes(q)),
        }))
        .filter((s) => s.items.length > 0),
    };
  }, [searchQuery, activeTag]);

  const tags = [
    "Semua",
    ...Array.from(new Set(apiEndpoints.map((e) => e.tag))),
  ];

  const copyBaseUrl = () => {
    navigator.clipboard.writeText(baseUrl);
    setBaseCopied(true);
    toast.success("Base URL disalin!");
    setTimeout(() => setBaseCopied(false), 2000);
  };

  return (
    <Layout>
      {/* 1. Header & Search Section */}
      <HeaderSection
        title="Dokumentasi"
        description="Pusat informasi teknis untuk pengembang dan masyarakat. Pelajari cara mengintegrasikan data Kabupaten Tulang Bawang Barat ke aplikasi Anda."
      />

      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <DocSidebar sections={filteredData.sections} />

          <div className="lg:col-span-3 space-y-16">
            {/* 3. Quick Links (Hanya muncul saat tidak mencari) */}
            {!searchQuery && <QuickLinkCard />}

            {/* 4. Bagian Pengenalan */}
            <section
              id="intro"
              className="space-y-8 animate-in fade-in duration-700"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 font-tubaba uppercase">
                  Tentang Satu Data Tubaba
                </h2>
                <div className="h-1.5 w-20 bg-primary rounded-full" />
              </div>
              <Card className="rounded-3xl border-slate-100 shadow-sm overflow-hidden">
                <CardContent className="p-8 md:p-10 space-y-6 text-slate-600 leading-relaxed text-lg">
                  <p>
                    Satu Data Tubaba merupakan portal data terbuka resmi
                    Kabupaten Tulang Bawang Barat yang mengacu pada standar
                    nasional metadata.
                  </p>

                  <div
                    id="getting-started"
                    className="grid md:grid-cols-2 gap-8 pt-6"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 font-bold text-slate-900 uppercase tracking-wider">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          <BookOpen size={20} />
                        </div>
                        Cara Memulai
                      </div>
                      <p className="text-sm">
                        Langsung Akses API Kami pada halaman Dokumentasi
                      </p>
                    </div>
                    <div className="space-y-3" id="authentication">
                      <div className="flex items-center gap-3 font-bold text-slate-900 uppercase tracking-wider">
                        <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                          <Key size={20} />
                        </div>
                        Autentikasi
                      </div>
                      <p className="text-sm">
                        Setiap request API wajib menyertakan{" "}
                        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-primary">
                          Bearer Token
                        </code>{" "}
                        yang dijana melalui API Key Anda.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 5. API Explorer Section */}
            <section id="api-overview" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900 font-tubaba uppercase">
                    API Reference
                  </h2>
                  <div className="h-1.5 w-20 bg-primary rounded-full" />
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                  <code className="text-sm font-mono text-primary font-bold">
                    {baseUrl}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyBaseUrl}
                    className="h-8 w-8 text-slate-400 hover:text-primary"
                  >
                    {baseCopied ? (
                      <Check size={16} className="text-emerald-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
              </div>

              <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="p-8 bg-slate-50/50 border-b border-slate-100">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={cn(
                          "text-xs px-5 py-2 rounded-full font-black transition-all uppercase tracking-widest",
                          activeTag === tag
                            ? "bg-primary text-white shadow-lg"
                            : "bg-white text-slate-500 border border-slate-200 hover:border-primary",
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {filteredData.endpoints.map((endpoint, i) => (
                    <ApiEndpointCard key={i} endpoint={endpoint} />
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* 6. Panduan Pengguna */}
            <section id="guides" className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 font-tubaba uppercase">
                  Panduan Pengguna
                </h2>
                <div className="h-1.5 w-20 bg-primary rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-6" id="guide-download">
                <Card className="p-6 rounded-3xl border-slate-100 hover:shadow-md transition-shadow">
                  <Download className="w-10 h-10 text-primary mb-4" />
                  <h4 className="font-bold text-lg mb-2">Mengunduh Dataset</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Format CSV tersedia untuk pengolahan raw data, sementara
                    XLSX cocok untuk laporan administratif.
                  </p>
                </Card>
                <Card
                  className="p-6 rounded-3xl border-slate-100 hover:shadow-md transition-shadow"
                  id="guide-filter"
                >
                  <Layers className="w-10 h-10 text-secondary mb-4" />
                  <h4 className="font-bold text-lg mb-2">Pencarian Dataset</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Gunakan fitur fuzzy search untuk menemukan data berdasarkan
                    tahun sektoral atau instansi terkait.
                  </p>
                </Card>
              </div>
            </section>

            {/* 7. FAQ */}
            <section id="faq" className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 font-tubaba uppercase">
                  Bantuan & FAQ
                </h2>
                <div className="h-1.5 w-20 bg-primary rounded-full" />
              </div>
              <Accordion
                type="single"
                collapsible
                className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm"
              >
                {filteredData.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border-none px-4"
                  >
                    <AccordionTrigger className="font-bold text-slate-700 hover:text-primary py-6 text-lg hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pb-8 pl-8 text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Documentation;
