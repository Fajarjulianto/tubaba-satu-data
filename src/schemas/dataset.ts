import { z } from "zod";

export const uploadDataSchema = z.object({
  nama_dataset: z.string().min(5, "Nama Dataset minimal 5 Karakter"),
  instansi: z.string().min(1, "Instansi wajib dipilih"),
  kategori: z.string().min(1, "Kategori Wajib dipilih"),
  tahun: z.string().regex(/^\d{4}$/, "Tahun Harus 4 Digit"),
  deskripsi: z.string().min(3, "Deskripsi Terlalu pendek"),
  file: z.any().refine((files) => (files?.length > 0, "File Wajib diunggah")),
});

export type UploadDatasetType = z.infer<typeof uploadDataSchema>;
