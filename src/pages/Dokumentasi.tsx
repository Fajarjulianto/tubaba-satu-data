import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { HeaderSection } from "@/components/ui/molecule/HeaderSection";
import { Badge } from "@/components/ui/badge";
import {
  Key,
  Terminal,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Zap,
  Database,
  Globe,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface CodeBlockProps {
  code: string;
  language?: string;
}

interface EndpointProps {
  method: HttpMethod;
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean; desc: string }[];
  response: string;
}

// ── Komponen Kecil ────────────────────────────────────────────────────────────
function CodeBlock({ code, language = "http" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden mt-3 mb-1">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          {language}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Tersalin" : "Salin"}
        </button>
      </div>
      <pre className="p-4 text-sm text-slate-300 overflow-x-auto leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const methodColors: Record<HttpMethod, string> = {
  GET: "bg-emerald-100 text-emerald-700 border-emerald-200",
  POST: "bg-blue-100 text-blue-700 border-blue-200",
  PUT: "bg-amber-100 text-amber-700 border-amber-200",
  DELETE: "bg-red-100 text-red-700 border-red-200",
};

function EndpointCard({ method, path, description, params, response }: EndpointProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 md:p-5 hover:bg-slate-50 transition-colors text-left"
      >
        <Badge variant="outline" className={`text-[10px] font-black uppercase tracking-widest shrink-0 ${methodColors[method]}`}>
          {method}
        </Badge>
        <code className="text-sm text-slate-700 flex-1 font-mono">{path}</code>
        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-slate-100 p-4 md:p-6 space-y-5 bg-slate-50/50">
          <p className="text-sm text-slate-600">{description}</p>
          {params && params.length > 0 && (
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Parameter</p>
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-100 text-slate-500">
                    <tr>
                      <th className="text-left py-2 px-4 font-bold">Nama</th>
                      <th className="text-left py-2 px-4 font-bold">Tipe</th>
                      <th className="text-left py-2 px-4 font-bold">Wajib</th>
                      <th className="text-left py-2 px-4 font-bold">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-50">
                    {params.map((p) => (
                      <tr key={p.name}>
                        <td className="py-2 px-4 font-mono text-primary">{p.name}</td>
                        <td className="py-2 px-4 text-slate-500">{p.type}</td>
                        <td className="py-2 px-4">
                          {p.required
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            : <span className="text-slate-300">—</span>}
                        </td>
                        <td className="py-2 px-4 text-slate-500">{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Contoh Response</p>
            <CodeBlock code={response} language="json" />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Data konten ───────────────────────────────────────────────────────────────
const navItems = [
  { id: "pengantar", label: "Pengantar" },
  { id: "autentikasi", label: "Autentikasi" },
  { id: "laravel", label: "Laravel API" },
  { id: "ckan", label: "CKAN API" },
  { id: "error", label: "Kode Error" },
  { id: "cors", label: "Catatan CORS" },
];

// ── Halaman Utama ─────────────────────────────────────────────────────────────
const DokumentasiAPI = () => {
  const [activeNav, setActiveNav] = useState("pengantar");

  const scrollTo = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout>
      <HeaderSection
        title="Dokumentasi API"
        description="Referensi lengkap untuk mengintegrasikan data Satu Data Tubaba ke dalam aplikasi Anda."
      />

      <main className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar navigasi */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-28 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 font-tubaba">
                Isi Halaman
              </p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    activeNav === item.id
                      ? "bg-primary/8 text-primary font-bold"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Konten utama */}
          <div className="flex-1 space-y-14 max-w-3xl">

            {/* Pengantar */}
            <section id="pengantar" className="scroll-mt-28">
              <h2 className="font-tubaba font-bold text-2xl text-slate-900 mb-4">Pengantar</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Portal Satu Data Tubaba menyediakan dua sumber data melalui API yang dapat diakses oleh pengembang, peneliti, dan instansi mitra.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Database, label: "Laravel Backend", desc: "Data internal OPD", url: "aplikasi.tubaba.go.id/api/satu_data", color: "bg-emerald-50 border-emerald-200" },
                  { icon: Globe, label: "CKAN Open Data", desc: "Katalog terbuka CKAN", url: "data-api.tubaba.go.id/api/3/action", color: "bg-blue-50 border-blue-200" },
                ].map(({ icon: Icon, label, desc, url, color }) => (
                  <div key={label} className={`rounded-2xl border p-4 ${color}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-slate-600" />
                      <span className="font-bold text-sm text-slate-800 font-tubaba">{label}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{desc}</p>
                    <code className="text-xs text-slate-600 bg-white/70 px-2 py-1 rounded-lg border border-white/50">{url}</code>
                  </div>
                ))}
              </div>
            </section>

            {/* Autentikasi */}
            <section id="autentikasi" className="scroll-mt-28">
              <h2 className="font-tubaba font-bold text-2xl text-slate-900 mb-2">Autentikasi</h2>
              <p className="text-slate-500 text-sm mb-5">Kedua API menggunakan Bearer Token pada header Authorization.</p>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-700">
                <Key className="w-4 h-4 shrink-0" />
                <span>Token bersifat rahasia — jangan expose di sisi klien atau repository publik.</span>
              </div>
              <CodeBlock language="http" code={`Authorization: Bearer {TOKEN}
Content-Type: application/json
Accept: application/json`} />
            </section>

            {/* Laravel API */}
            <section id="laravel" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="font-tubaba font-bold text-2xl text-slate-900">Laravel API</h2>
                <Badge variant="outline" className="text-[10px] text-emerald-700 border-emerald-200 bg-emerald-50 font-bold uppercase tracking-widest">Internal</Badge>
              </div>
              <div className="space-y-3">
                <EndpointCard
                  method="GET"
                  path="/data_detail"
                  description="Mengambil seluruh dataset yang telah dipublikasikan dari semua OPD."
                  response={`{
  "data": [
    {
      "id": 1,
      "datasetKode": "PERTANIAN",
      "datasetJudul": "Data Produksi Tanaman Pangan",
      "kode": "PANGAN-2024-001",
      "produsen": "Dinas Pertanian Tubaba",
      "tahun": "2024",
      "file": "https://aplikasi.tubaba.go.id/storage/...",
      "visualisasi": "ya",
      "created_at": "2024-03-01T08:00:00.000Z"
    }
  ]
}`}
                />
                <EndpointCard
                  method="GET"
                  path="/data_detail/{kode}"
                  description="Mengambil detail satu dataset berdasarkan kode uniknya."
                  params={[
                    { name: "kode", type: "string", required: true, desc: "Kode unik dataset dari response list" },
                  ]}
                  response={`{
  "data": {
    "id": 1,
    "kode": "PANGAN-2024-001",
    "datasetJudul": "Data Produksi Tanaman Pangan",
    "metode": "Survei lapangan",
    "satuan": "Ton",
    "file": "https://aplikasi.tubaba.go.id/storage/..."
  }
}`}
                />
                <EndpointCard
                  method="GET"
                  path="/jumlah_opd"
                  description="Mengambil daftar semua OPD yang terdaftar sebagai produsen data."
                  response={`{
  "data": {
    "1": "Dinas Pertanian",
    "2": "Dinas Kesehatan",
    "3": "BPS Tubaba"
  }
}`}
                />
                <EndpointCard
                  method="GET"
                  path="/jumlah_data_opd"
                  description="Mengambil daftar dataset milik satu OPD tertentu."
                  params={[
                    { name: "opd", type: "string", required: true, desc: "Nama OPD sesuai response /jumlah_opd" },
                  ]}
                  response={`{
  "data": [
    { "id": 1, "datasetJudul": "Data Produksi ...", "kode": "PANGAN-001" }
  ]
}`}
                />
              </div>
            </section>

            {/* CKAN API */}
            <section id="ckan" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="font-tubaba font-bold text-2xl text-slate-900">CKAN API</h2>
                <Badge variant="outline" className="text-[10px] text-blue-700 border-blue-200 bg-blue-50 font-bold uppercase tracking-widest">Open Data</Badge>
              </div>
              <div className="space-y-3">
                <EndpointCard
                  method="GET"
                  path="/action/package_search"
                  description="Mencari dan memfilter dataset dari katalog CKAN. Mendukung pagination dan filter tag."
                  params={[
                    { name: "rows", type: "number", required: false, desc: "Jumlah hasil per halaman (max 1000)" },
                    { name: "start", type: "number", required: false, desc: "Offset untuk paginasi" },
                    { name: "q", type: "string", required: false, desc: "Kata kunci pencarian" },
                    { name: "fq", type: "string", required: false, desc: "Filter query, contoh: tags:kesehatan" },
                  ]}
                  response={`{
  "success": true,
  "result": {
    "count": 15,
    "results": [
      {
        "id": "7c457d32-...",
        "title": "Data Kependudukan 2024",
        "organization": { "title": "BPS Tubaba" },
        "tags": [{ "display_name": "Penduduk" }],
        "resources": [{ "format": "XLSX", "url": "https://..." }]
      }
    ]
  }
}`}
                />
                <EndpointCard
                  method="GET"
                  path="/action/package_show"
                  description="Mengambil detail lengkap satu paket dataset berdasarkan ID atau slug."
                  params={[
                    { name: "id", type: "string", required: true, desc: "UUID atau name slug dataset" },
                  ]}
                  response={`{
  "success": true,
  "result": {
    "id": "7c457d32-...",
    "title": "Data Kependudukan 2024",
    "notes": "Deskripsi dataset...",
    "resources": [...],
    "tags": [...],
    "groups": []
  }
}`}
                />
                <EndpointCard
                  method="GET"
                  path="/action/datastore_search"
                  description="Mengambil data tabular dari resource yang sudah diindeks Datastore CKAN. Hanya tersedia jika datastore_active = true."
                  params={[
                    { name: "resource_id", type: "string", required: true, desc: "ID resource dari package_show" },
                    { name: "limit", type: "number", required: false, desc: "Jumlah baris (default 100)" },
                    { name: "offset", type: "number", required: false, desc: "Offset untuk paginasi" },
                  ]}
                  response={`{
  "success": true,
  "result": {
    "fields": [
      { "id": "kecamatan", "type": "text" },
      { "id": "jumlah_penduduk", "type": "int4" }
    ],
    "records": [
      { "_id": 1, "kecamatan": "TB Tengah", "jumlah_penduduk": 45230 }
    ],
    "total": 9
  }
}`}
                />
              </div>
            </section>

            {/* Kode Error */}
            <section id="error" className="scroll-mt-28">
              <h2 className="font-tubaba font-bold text-2xl text-slate-900 mb-5">Kode Error</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { code: "200", label: "OK", desc: "Request berhasil", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                  { code: "401", label: "Unauthorized", desc: "Token tidak valid atau tidak ada", color: "text-amber-600 bg-amber-50 border-amber-200" },
                  { code: "403", label: "Forbidden", desc: "Tidak memiliki izin akses", color: "text-orange-600 bg-orange-50 border-orange-200" },
                  { code: "404", label: "Not Found", desc: "Resource tidak ditemukan", color: "text-slate-600 bg-slate-50 border-slate-200" },
                  { code: "422", label: "Unprocessable", desc: "Parameter tidak valid", color: "text-purple-600 bg-purple-50 border-purple-200" },
                  { code: "500", label: "Server Error", desc: "Kesalahan server internal", color: "text-red-600 bg-red-50 border-red-200" },
                ].map(({ code, label, desc, color }) => (
                  <div key={code} className={`flex items-center gap-3 p-4 rounded-xl border ${color}`}>
                    <span className="text-2xl font-black font-mono">{code}</span>
                    <div>
                      <p className="font-bold text-sm">{label}</p>
                      <p className="text-xs opacity-80">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Catatan CORS */}
            <section id="cors" className="scroll-mt-28">
              <h2 className="font-tubaba font-bold text-2xl text-slate-900 mb-3">Catatan CORS</h2>
              <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Saat development lokal, kedua API memerlukan konfigurasi proxy Vite untuk menghindari blokir CORS dari browser.</span>
              </div>
              <CodeBlock language="typescript" code={`// vite.config.ts
server: {
  proxy: {
    "/ckan-api": {
      target: "https://data-api.tubaba.go.id/api",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\\/ckan-api/, ""),
    },
    "/laravel-api": {
      target: "https://aplikasi.tubaba.go.id/api/satu_data",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\\/laravel-api/, ""),
    },
  },
}`} />
            </section>

          </div>
        </div>
      </main>
    </Layout>
  );
};

export default DokumentasiAPI;