import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const IKM_STORAGE_KEY = "ikm_tubaba_submitted";
const IKM_DELAY_MS = 10_000; 

export interface IKMFormData {
  kepuasan: 1 | 2 | 3 | 4 | 5;
  usia: string;
  jenisKelamin: "laki-laki" | "perempuan" | "";
  kecamatan: string;
  submittedAt: string;
  checksum: string;
}

export interface UseIKMModalReturn {
  isOpen: boolean;
  isDismissed: boolean;
  hasSubmitted: boolean;
  close: () => void;
  dismiss: () => void;
  submit: (formData: Omit<IKMFormData, "submittedAt" | "checksum">) => Promise<void>;
}

const generateChecksum = (data: Omit<IKMFormData, "checksum">): string => {
  const str = `${data.kepuasan}|${data.usia}|${data.jenisKelamin}|${data.kecamatan}|${data.submittedAt}`;
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

export const useIKMModal = (): UseIKMModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setHasSubmitted(verifyStoredData());
  }, []);

  useEffect(() => {
    if (hasSubmitted || isDismissed) return;
    const timer = setTimeout(() => { setIsOpen(true); }, IKM_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hasSubmitted, isDismissed]);

  const close = useCallback(() => { setIsOpen(false); }, []);
  const dismiss = useCallback(() => { setIsOpen(false); setIsDismissed(true); }, []);

  const submit = useCallback(
    async (formData: Omit<IKMFormData, "submittedAt" | "checksum">) => {
      const sanitized = {
        kepuasan: formData.kepuasan,
        usia: String(formData.usia).trim().slice(0, 30), 
        jenisKelamin: formData.jenisKelamin,
        kecamatan: String(formData.kecamatan).trim().replace(/[<>'"]/g, "").slice(0, 100),
        submittedAt: new Date().toISOString(),
      };


      const googleFormResponseUrl = import.meta.env.VITE_IKM_SUBMIT_URL;
      
      if (googleFormResponseUrl) {
        try {

          const formPayload = new URLSearchParams();
          
          formPayload.append("entry.1010013709", sanitized.kecamatan);
          formPayload.append("entry.1150122977", sanitized.kepuasan.toString());
          formPayload.append("entry.1707248885", sanitized.submittedAt);
          formPayload.append("entry.1737885289", sanitized.usia); 
          formPayload.append("entry.635412615", sanitized.jenisKelamin);

          await axios.post(googleFormResponseUrl, formPayload, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
        } catch (error) {
            if (axios.isAxiosError(error) && (error.response?.status === 200 || error.code === "ERR_NETWORK")) {
              console.log("Data berhasil disinkronisasi ke Google Form.");
            } else {
              console.error("Gagal sinkronisasi data ke Google Form", error);
              throw new Error("Network error");
            }
          }
      }

      const checksum = generateChecksum(sanitized);
      const fullData: IKMFormData = { ...sanitized, checksum };

      try {
        localStorage.setItem(IKM_STORAGE_KEY, JSON.stringify(fullData));
        setHasSubmitted(true);
      } catch {
        // Fallback
      }

      setIsOpen(false);
    },
    []
  );

  return { isOpen, isDismissed, hasSubmitted, close, dismiss, submit };
};