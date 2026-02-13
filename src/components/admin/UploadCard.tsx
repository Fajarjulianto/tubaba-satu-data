import { Card, Button, CardContent } from "@/components/index";
import { Upload, FileText } from "lucide-react";

export const UploadCard = () => {
  return (
    <Card className="rounded-xl border-slate-200 shadow-sm">
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
    </Card>
  );
};

export default UploadCard;
