import { create } from "zustand";

interface UploadFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "loading" | "success" | "error";
}

interface UploadStore {
  files: UploadFile[];
  addFile: (file: UploadFile) => void;
  updateProgress: (id: string, progress: number) => void;
  updateStatus: (id: string, status: "success" | "error") => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  files: [],
  addFile: (file) => set((state) => ({ files: [file, ...state.files] })),
  updateProgress: (id, progress) =>
    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, progress } : f)),
    })),
  updateStatus: (id, status) =>
    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, status } : f)),
    })),
}));
