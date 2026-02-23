import { FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { useUploadStore } from "@/hooks/store/useUploadStore";
import { cn } from "@/lib/utils";

export const FileListProgress = () => {
  const { files } = useUploadStore();

  if (files.length === 0) return null;

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
        File yang diunggah
      </p>

      <div className="grid gap-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-4 shadow-sm"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                file.status === "error" ? "bg-red-50" : "bg-green-50",
              )}
            >
              <FileSpreadsheet
                className={
                  file.status === "error" ? "text-red-600" : "text-green-600"
                }
                size={24}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="font-bold text-slate-800 truncate text-sm">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {file.size} •{" "}
                    {file.status === "success"
                      ? "Berhasil"
                      : file.status === "error"
                        ? "Gagal"
                        : "Mengunggah..."}
                  </p>
                </div>

                {/* Indikator Status */}
                {file.status === "success" && (
                  <CheckCircle2 size={18} className="text-green-500" />
                )}
                {file.status === "error" && (
                  <AlertCircle size={18} className="text-red-500" />
                )}
              </div>
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
                <div
                  className={cn(
                    "h-full transition-all duration-300 ease-out",
                    file.status === "success"
                      ? "bg-green-500"
                      : file.status === "error"
                        ? "bg-red-500"
                        : "bg-primary",
                  )}
                  style={{ width: `${file.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
