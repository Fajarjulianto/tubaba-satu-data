import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  type?: "inline" | "full";
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Terjadi Kesalahan",
  message = "Gagal memuat data dari server. Silakan coba beberapa saat lagi.",
  type = "full",
  onRetry,
  className,
}: ErrorStateProps) {
  // Gaya untuk error di dalam komponen kecil (seperti di dalam Card)
  if (type === "inline") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100",
          className,
        )}
      >
        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
        <p className="text-sm font-medium text-red-800 flex-1">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // Gaya untuk error halaman penuh (Full Page)
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-6 text-center",
        className,
      )}
    >
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 shadow-inner">
        <AlertCircle className="w-10 h-10 text-red-600" />
      </div>

      <h2 className="text-2xl md:text-3xl font-tubaba-heavy text-slate-950 uppercase tracking-tight mb-3">
        {title}
      </h2>
      <p className="text-slate-500 max-w-md mb-10 font-light leading-relaxed">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-primary text-white hover:bg-primary/90 px-8 h-12 rounded-xl font-tubaba-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <RefreshCcw className="w-4 h-4 mr-2" /> Coba Lagi
          </Button>
        )}
        <Link to="/">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-600 hover:bg-slate-50 px-8 h-12 rounded-xl font-tubaba-bold"
          >
            <Home className="w-4 h-4 mr-2" /> Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}
