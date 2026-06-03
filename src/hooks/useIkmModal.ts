import { useState, useEffect, useCallback } from "react";


const IKM_STORAGE_KEY = "ikm_tubaba_submitted";
const IKM_DELAY_MS = 10_000; 

// ─── Types ──────────────

export interface IKMFormData {
  kepuasan: 1 | 2 | 3 | 4 | 5;
  usia: string;
  jenisKelamin: "laki-laki" | "perempuan" | "";
  kabupaten: string;
  submittedAt: string;
  checksum: string;
}

export interface UseIKMModalReturn {
  isOpen: boolean;
  isDismissed: boolean;
  hasSubmitted: boolean;
  close: () => void;
  dismiss: () => void;
  submit: (data: Omit<IKMFormData, "submittedAt" | "checksum">) => void;
}



const generateChecksum = (data: Omit<IKMFormData, "checksum">): string => {
  const str = `${data.kepuasan}|${data.usia}|${data.jenisKelamin}|${data.kabupaten}|${data.submittedAt}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; 
  }
  return Math.abs(hash).toString(36);
};


const verifyStoredData = (): boolean => {
  try {
    const raw = localStorage.getItem(IKM_STORAGE_KEY);
    if (!raw) return false;
    const parsed: IKMFormData = JSON.parse(raw);
    const { checksum, ...rest } = parsed;
    const expected = generateChecksum(rest);
    return checksum === expected;
  } catch {
    return false;
  }
};

// ─── Hook ───────────

export const useIKMModal = (): UseIKMModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const hasSubmitted = verifyStoredData();

  useEffect(() => {
    // Jangan tampilkan jika sudah pernah submit (data valid di localStorage)
    if (hasSubmitted) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, IKM_DELAY_MS);

    return () => clearTimeout(timer);
  }, [hasSubmitted]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dismiss = useCallback(() => {
    setIsOpen(false);
    setIsDismissed(true);
  }, []);

  const submit = useCallback(
    (formData: Omit<IKMFormData, "submittedAt" | "checksum">) => {
      // Sanitasi input sebelum simpan
      const sanitized = {
        kepuasan: formData.kepuasan,
        usia: String(formData.usia).trim().slice(0, 3),
        jenisKelamin: formData.jenisKelamin,
        kabupaten: String(formData.kabupaten)
          .trim()
          .replace(/[<>'"]/g, "")
          .slice(0, 100),
        submittedAt: new Date().toISOString(),
      };

      const checksum = generateChecksum(sanitized);
      const fullData: IKMFormData = { ...sanitized, checksum };

      try {
        localStorage.setItem(IKM_STORAGE_KEY, JSON.stringify(fullData));
      } catch {
        // localStorage penuh atau disabled — tetap close modal
      }

      setIsOpen(false);
    },
    []
  );

  return { isOpen, isDismissed, hasSubmitted, close, dismiss, submit };
};