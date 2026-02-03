import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Code,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Search,
  Copy,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Badge,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/index";
import { documentationSections, faqs } from "@/constant/mockdata";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const apiExample = `curl -X GET "https://api.satudata.tubaba.go.id/v1/datasets" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;

  return (
    <Layout>
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Dokumentasi
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mb-6 leading-relaxed">
            Pelajari cara mengakses, menggunakan, dan berintegrasi dengan Satu
            Data Tubaba. Temukan panduan, referensi API, dan praktik terbaik
            untuk bekerja dengan dataset kami.
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari dokumentasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card text-foreground w-full"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <Card className="lg:sticky lg:top-24 border-slate-200 shadow-sm">
              <CardHeader className="p-4 border-b border-slate-50">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400 font-tubaba">
                  Daftar Isi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-4">
                <nav className="space-y-6">
                  {documentationSections.map((section) => (
                    <div key={section.id}>
                      <div className="flex items-center gap-2 text-sm font-bold mb-3 text-slate-900 font-tubaba">
                        <section.icon className="w-4 h-4 text-primary" />
                        {section.title}
                      </div>
                      <ul className="space-y-2 ml-6">
                        {section.items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                            >
                              <ChevronRight className="w-3 h-3 shrink-0" />
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8 order-1 lg:order-2">
            {/* Quick Links  */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: BookOpen,
                  title: "Mulai Cepat",
                  desc: "Mulai dalam 5 menit",
                  bg: "bg-primary/10",
                  iconColor: "text-primary",
                },
                {
                  icon: Code,
                  title: "Dokumentasi API",
                  desc: "Integrasi dengan API",
                  bg: "bg-secondary/10",
                  iconColor: "text-secondary",
                },
                {
                  icon: Download,
                  title: "Unduh SDK",
                  desc: "SDK & alat bantu",
                  bg: "bg-accent/30",
                  iconColor: "text-foreground",
                },
              ].map((link, i) => (
                <Card
                  key={i}
                  className="hover:shadow-md transition-shadow cursor-pointer border-slate-200"
                >
                  <CardContent className="p-4 md:p-6 flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shrink-0",
                        link.bg,
                      )}
                    >
                      <link.icon
                        className={cn("w-5 h-5 md:w-6 md:h-6", link.iconColor)}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm md:text-base text-slate-900 leading-tight truncate">
                        {link.title}
                      </h3>
                      <p className="text-[10px] md:text-sm text-muted-foreground truncate">
                        {link.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Introduction Card */}
            <Card
              id="intro"
              className="rounded-3xl border-slate-200 shadow-sm overflow-hidden"
            >
              <CardHeader className="p-5 md:p-8 bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-lg md:text-xl font-tubaba-heavy uppercase">
                  Pengenalan Satu Data Tubaba
                </CardTitle>
                <CardDescription className="text-xs md:text-sm font-medium">
                  Memahami portal data terintegrasi Kabupaten Tulang Bawang
                  Barat
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 md:p-8 space-y-4 text-slate-600 leading-relaxed font-light text-sm md:text-base">
                <p>
                  Satu Data Tubaba adalah portal data terintegrasi resmi untuk
                  Kabupaten Tulang Bawang Barat. Misi kami adalah menyediakan
                  data terbuka, dapat diakses, dan andal untuk mendukung
                  penelitian, pembuatan kebijakan, dan transparansi publik.
                </p>
                <p>
                  Platform ini menawarkan akses ke ratusan dataset di berbagai
                  sektor termasuk kependudukan, pendidikan, kesehatan, ekonomi,
                  dan infrastruktur. Semua data mengikuti format standar dan
                  skema metadata untuk integrasi dan analisis yang mudah.
                </p>
              </CardContent>
            </Card>

            {/* API Example Card */}
            <Card
              id="api"
              className="rounded-3xl border-slate-200 shadow-sm overflow-hidden"
            >
              <CardHeader className="p-5 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg md:text-xl font-tubaba-heavy uppercase">
                      Mulai Cepat API
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      Buat permintaan API pertama Anda dalam hitungan detik
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="w-fit font-bold">
                    v1.0
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 md:p-8 pt-0">
                <div className="relative group">
                  <pre className="bg-slate-950 text-slate-100 p-4 md:p-6 rounded-2xl overflow-x-auto text-xs md:text-sm font-mono shadow-inner">
                    <code>{apiExample}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 text-slate-400 hover:text-white hover:bg-white/10"
                    onClick={() => handleCopy(apiExample)}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-4 italic">
                  Ganti{" "}
                  <code className="bg-slate-100 text-primary px-1.5 py-0.5 rounded font-bold uppercase">
                    YOUR_API_KEY
                  </code>{" "}
                  dengan API key Anda.
                </p>
              </CardContent>
            </Card>

            {/* FAQs Accordion */}
            <Card
              id="faq"
              className="rounded-3xl border-slate-200 shadow-sm overflow-hidden"
            >
              <CardHeader className="p-5 md:p-8 bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-lg md:text-xl font-tubaba-heavy uppercase">
                  FAQ
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Pertanyaan umum tentang penggunaan Satu Data Tubaba
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-slate-100"
                    >
                      <AccordionTrigger className="text-left text-sm md:text-base font-bold text-slate-800 hover:text-primary transition-colors py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-base text-slate-500 font-light leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Resources Grid */}
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader className="p-5 md:p-8">
                <CardTitle className="text-lg md:text-xl font-tubaba-heavy uppercase">
                  Sumber Daya Tambahan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 md:p-8 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Panduan Pengguna (PDF)",
                      sub: "Manual lengkap",
                      icon: FileText,
                      action: Download,
                    },
                    {
                      title: "Spesifikasi API",
                      sub: "OpenAPI 3.0",
                      icon: Code,
                      action: ExternalLink,
                    },
                  ].map((res, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex items-center gap-4 p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-primary/20 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <res.icon className="w-5 h-5 text-primary group-hover:text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-sm text-slate-900 leading-tight">
                          {res.title}
                        </p>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">
                          {res.sub}
                        </p>
                      </div>
                      <res.action className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Documentation;
