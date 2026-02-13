import {
  INSTANSI_OPTIONS,
  KATEGORI_OPTIONS,
  TAHUN_OPTIONS,
} from "@/constant/mockdata";
import { Upload, FileText, X } from "lucide-react";
import {
  Button,
  Input,
  Label,
  Textarea,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/index";
import { UploadCard } from "../admin/UploadCard";

const UploadDataAdmin = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Upload Data</h1>
        <p className="text-sm text-slate-500 mt-1">
          Unggah file Excel atau CSV baru ke portal data
        </p>
      </div>

      {/* Informasi Dataset */}
      <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Informasi Dataset
            </h2>
            <p className="text-sm text-slate-400">
              Lengkapi informasi dataset sebelum mengunggah file
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nama Dataset *</Label>
              <Input
                placeholder="Contoh: Data Kependudukan 2024"
                className="bg-slate-50/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Instansi *</Label>
              <Select>
                <SelectTrigger className="bg-slate-50/50">
                  <SelectValue placeholder="Pilih instansi" />
                </SelectTrigger>
                <SelectContent>
                  {INSTANSI_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Kategori *</Label>
              <Select>
                <SelectTrigger className="bg-slate-50/50">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {KATEGORI_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tahun Data *</Label>
              <Select>
                <SelectTrigger className="bg-slate-50/50">
                  <SelectValue placeholder="Pilih tahun" />
                </SelectTrigger>
                <SelectContent>
                  {TAHUN_OPTIONS.map((tahun) => (
                    <SelectItem key={tahun} value={tahun}>
                      {tahun}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Deskripsi</Label>
            <Textarea
              placeholder="Jelaskan isi dan tujuan dataset ini..."
              className="min-h-[120px] bg-slate-50/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Unggah File */}
      <UploadCard />
      {/* <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Unggah File</h2>
            <p className="text-sm text-slate-400">
              Pilih file Excel atau CSV untuk diunggah
            </p>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/50 transition-colors bg-slate-50/30">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-slate-400" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-slate-700">
                Seret & lepas file Excel
              </p>
              <p className="text-sm text-slate-400">
                atau klik tombol di bawah untuk memilih file
              </p>
            </div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">
              Format yang didukung: .xlsx, .xls, .csv (Maks. 10MB)
            </p>
            <Button
              variant="outline"
              className="bg-primary text-white hover:bg-primary/90 border-none gap-2"
            >
              <FileText className="w-4 h-4" /> Pilih File Excel
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Footer */}
      <div className="flex justify-end items-center gap-3 pt-4">
        <Button
          variant="outline"
          className="px-8 bg-white border-slate-200 text-slate-600"
        >
          Batal
        </Button>
        <Button className="px-8 bg-primary hover:bg-primary/90 text-white font-bold">
          Simpan & Publikasikan
        </Button>
      </div>
    </div>
  );
};

export default UploadDataAdmin;
