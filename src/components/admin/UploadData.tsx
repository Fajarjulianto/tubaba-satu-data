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
import { useUploadStore } from "@/hooks/store/useUploadStore";
import { axiosInstance } from "@/lib/axios";
import { FileListProgress } from "./fileListProgres";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadDataSchema, UploadDatasetType } from "@/schemas/dataset";
import { toast } from "sonner";

const UploadDataAdmin = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UploadDatasetType>({
    resolver: zodResolver(uploadDataSchema),
  });
  const { addFile, updateProgress, updateStatus, files } = useUploadStore();
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileId = Math.random().toString(36).substring(7);
    addFile({
      id: fileId,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      progress: 0,
      status: "loading",
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosInstance.post("/upload", formData, {
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / (p.total || 100));
          updateProgress(fileId, percent);
        },
      });
      updateStatus(fileId, "success");
    } catch (err) {
      updateStatus(fileId, "error");
    }
  };

  const onSubmit = async (data: UploadDatasetType) => {
    if (files.length === 0) {
      toast.error("Silakan pilih dan unggah file terlebih dahulu");
      return;
    }

    console.log("Data Form Valid:", data);
    toast.success("Data berhasil disimpan!");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 animate-in fade-in duration-500"
    >
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
                  {...register("nama_dataset")}
                  placeholder="Contoh: Data Kependudukan 2024"
                  className={`bg-slate-50/50 ${errors.nama_dataset ? "border-red-500" : ""}`}
                />
                {errors.nama_dataset && (
                  <p className="text-xs text-red-500">
                    {errors.nama_dataset.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Instansi *</Label>
                <Controller
                  name="instansi"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={`bg-slate-50/50 ${errors.instansi ? "border-red-500" : ""}`}
                      >
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
                  )}
                />
                {errors.instansi && (
                  <p className="text-xs text-red-500">
                    {errors.instansi.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Kategori *</Label>
                <Controller
                  name="kategori"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={`bg-slate-50/50 ${errors.kategori ? "border-red-500" : ""}`}
                      >
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
                  )}
                />
                {errors.kategori && (
                  <p className="text-xs text-red-500">
                    {errors.kategori.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tahun Data *</Label>
                <Controller
                  name="tahun"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={`bg-slate-50/50 ${errors.tahun ? "border-red-500" : ""}`}
                      >
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
                  )}
                />
                {errors.tahun && (
                  <p className="text-xs text-red-500">{errors.tahun.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Deskripsi</Label>
              <Textarea
                {...register("deskripsi")}
                placeholder="Jelaskan isi dan tujuan dataset ini..."
                className={`min-h-[120px] bg-slate-50/50 ${errors.deskripsi ? "border-red-500" : ""}`}
              />
              {errors.deskripsi && (
                <p className="text-xs text-red-500">
                  {errors.deskripsi.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <UploadCard onFileSelect={handleFileUpload} />
        <FileListProgress />
        {/* Footer */}
        <div className="flex justify-end items-center gap-3 pt-4">
          <Button
            variant="outline"
            className="px-8 bg-white border-slate-200 text-slate-600"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 bg-primary hover:bg-primary/90 text-white font-bold"
          >
            {isSubmitting ? "Memproses..." : "Simpan & Publikasikan"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UploadDataAdmin;
