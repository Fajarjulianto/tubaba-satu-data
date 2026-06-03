import { useState, useEffect, useRef, FormEvent } from "react";
import {
  X,
  Star,
  ChevronDown,
  Shield,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useIKMModal } from "@/hooks/useIkmModal";

// ─── Data ──────────

const KEPUASAN_OPTIONS = [
  { value: 1, label: "Sangat Tidak Puas", emoji: "😞" },
  { value: 2, label: "Tidak Puas",        emoji: "😕" },
  { value: 3, label: "Cukup Puas",        emoji: "😐" },
  { value: 4, label: "Puas",              emoji: "😊" },
  { value: 5, label: "Sangat Puas",       emoji: "🤩" },
] as const;

const USIA_OPTIONS = [
  "< 17 tahun",
  "17 – 25 tahun",
  "26 – 35 tahun",
  "36 – 45 tahun",
  "46 – 55 tahun",
  "> 55 tahun",
];

const KABUPATEN_OPTIONS = [
  "Tulang Bawang Barat",
  "Bandar Lampung",
  "Metro",
  "Lampung Selatan",
  "Lampung Tengah",
  "Lampung Utara",
  "Lampung Barat",
  "Lampung Timur",
  "Mesuji",
  "Pesawaran",
  "Pesisir Barat",
  "Pringsewu",
  "Tanggamus",
  "Tulang Bawang",
  "Way Kanan",
  "Luar Provinsi Lampung",
];

// ─── Sub-komponen: Star Rating ───────────
interface StarRatingProps {
  value: number;
  onChange: (val: 1 | 2 | 3 | 4 | 5) => void;
}

function StarRating({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  const opt = KEPUASAN_OPTIONS.find((o) => o.value === active);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-2 sm:gap-1.5">
        {KEPUASAN_OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value as 1 | 2 | 3 | 4 | 5)}
            onMouseEnter={() => setHovered(o.value)}
            onMouseLeave={() => setHovered(0)}
            aria-label={o.label}
            className="p-1 transition-transform duration-150 hover:scale-125
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D2323] rounded
              active:scale-110 touch-manipulation"
          >
            <Star
              className={`w-9 h-9 sm:w-8 sm:h-8 transition-colors duration-150 ${
                o.value <= active
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200 fill-slate-200"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="h-5 flex items-center justify-center">
        {active > 0 && opt ? (
          <p className="text-sm font-semibold text-[#6D2323] animate-in fade-in duration-150">
            {opt.emoji} {opt.label}
          </p>
        ) : (
          <p className="text-xs text-slate-400">Ketuk bintang untuk menilai</p>
        )}
      </div>
    </div>
  );
}

// ─── Sub-komponen: Select Field ─────────

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (val: string) => void;
  required?: boolean;
}

function SelectField({
  id, label, value, options, placeholder, onChange, required,
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500"
      >
        {label}
        {required && <span className="text-[#6D2323] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`
            w-full appearance-none rounded-xl border px-3 sm:px-4 py-3 pr-9
            text-sm bg-white transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-[#6D2323]/30 focus:border-[#6D2323]
            touch-manipulation
            ${value ? "text-slate-800 border-slate-200" : "text-slate-400 border-slate-200"}
          `}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Sub-komponen: Success State ───────────

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-8 px-4 text-center gap-4">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 flex items-center justify-center">
        <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500" />
      </div>
      <div>
        <h3 className="font-bold text-base sm:text-lg text-slate-800 mb-1">
          Terima Kasih! 🙏
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Penilaian Anda telah kami terima dan akan digunakan untuk meningkatkan
          layanan Satu Data Tubaba.
        </p>
      </div>
      <button
        onClick={onClose}
        className="mt-1 px-6 py-2.5 rounded-xl bg-[#6D2323] text-white text-sm font-bold
          hover:bg-[#5a1c1c] active:scale-[0.98] transition-colors duration-150
          touch-manipulation"
      >
        Tutup
      </button>
    </div>
  );
}

// ─── Komponen Utama ───────────

export function IKMModal() {
  const { isOpen, close, dismiss, submit } = useIKMModal();

  const [kepuasan, setKepuasan] = useState<1 | 2 | 3 | 4 | 5 | 0>(0);
  const [usia, setUsia] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap + ESC + scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { dismiss(); return; }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    setTimeout(() => closeButtonRef.current?.focus(), 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, dismiss]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!kepuasan) {
      setError("Mohon berikan penilaian kepuasan Anda.");
      return;
    }
    if (!usia || !jenisKelamin || !kabupaten) {
      setError("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    submit({
      kepuasan: kepuasan as 1 | 2 | 3 | 4 | 5,
      usia,
      jenisKelamin: jenisKelamin as "laki-laki" | "perempuan",
      kabupaten,
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/*
        Layout wrapper:
        - Mobile  : menempel di bawah layar (bottom-sheet)
        - Desktop : terpusat di tengah layar
      */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ikm-title"
        className="
          fixed z-50 pointer-events-none
          /* Mobile: full-width, bottom */
          inset-x-0 bottom-0
          /* Desktop: centered */
          sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4
        "
      >
        <div
          className="
            relative w-full pointer-events-auto bg-white overflow-hidden
            /* Mobile: top corners, max 92% viewport height */
            rounded-t-3xl max-h-[92dvh]
            /* Desktop: fully rounded card, max-width, shadow */
            sm:rounded-3xl sm:max-w-md sm:max-h-[90vh] sm:w-full sm:shadow-2xl
            /* Animasi */
            animate-in slide-in-from-bottom duration-300
            sm:slide-in-from-bottom-0 sm:zoom-in-95
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle — mobile only */}
          <div className="sm:hidden flex justify-center pt-3 pb-0.5 shrink-0">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>
          <div className="relative bg-[#6D2323] px-5 sm:px-6 pt-4 sm:pt-6 pb-7 sm:pb-8 shrink-0">
            {/* Dekorasi lingkaran */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/30 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Tombol tutup */}
            <button
              ref={closeButtonRef}
              onClick={dismiss}
              aria-label="Tutup formulir"
              className="
                absolute top-3 sm:top-4 right-4 w-9 h-9 rounded-full
                bg-white/20 hover:bg-white/30 flex items-center justify-center
                transition-colors focus:outline-none focus-visible:ring-2
                focus-visible:ring-white touch-manipulation
              "
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="relative pr-10">
              <p className="text-[#F4E4E4]/70 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
                Satu Data Tubaba
              </p>
              <h2
                id="ikm-title"
                className="text-white font-bold text-lg sm:text-xl leading-snug"
              >
                Indeks Kepuasan<br />Masyarakat
              </h2>
              <p className="text-[#F4E4E4]/80 text-xs mt-1.5 leading-relaxed">
                Bantu kami meningkatkan layanan dengan mengisi survei singkat ini.
              </p>
            </div>
          </div>

          {/* Notch transition */}
          <div className="h-4 bg-[#6D2323] relative shrink-0">
            <div className="absolute inset-x-0 bottom-0 h-4 bg-white rounded-t-3xl" />
          </div>S
          <div
            className="overflow-y-auto overscroll-contain px-5 sm:px-6 pb-6"
            style={{ maxHeight: "calc(92dvh - 140px)" }}
          >
            {isSuccess ? (
              <SuccessView onClose={close} />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 pt-1">

                {/* Kepuasan */}
                <div className="space-y-1.5">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
                    Tingkat Kepuasan <span className="text-[#6D2323]">*</span>
                  </p>
                  <StarRating
                    value={kepuasan}
                    onChange={(v) => { setKepuasan(v); setError(""); }}
                  />
                </div>

                {/* Usia */}
                <SelectField
                  id="ikm-usia"
                  label="Usia"
                  value={usia}
                  options={USIA_OPTIONS}
                  placeholder="Pilih rentang usia"
                  onChange={setUsia}
                  required
                />

                {/* Jenis Kelamin */}
                <div className="space-y-1.5">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
                    Jenis Kelamin <span className="text-[#6D2323]">*</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {(["laki-laki", "perempuan"] as const).map((jk) => (
                      <button
                        key={jk}
                        type="button"
                        onClick={() => setJenisKelamin(jk)}
                        className={`
                          py-3 rounded-xl border text-sm font-semibold
                          transition-all duration-150 focus:outline-none
                          focus-visible:ring-2 focus-visible:ring-[#6D2323]/40
                          touch-manipulation active:scale-[0.97]
                          ${jenisKelamin === jk
                            ? "bg-[#6D2323] text-white border-[#6D2323]"
                            : "bg-white text-slate-600 border-slate-200 hover:border-[#6D2323]/30"
                          }
                        `}
                      >
                        {jk === "laki-laki" ? "👨 Laki-laki" : "👩 Perempuan"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kabupaten */}
                <SelectField
                  id="ikm-kabupaten"
                  label="Alamat Kabupaten/Kota"
                  value={kabupaten}
                  options={KABUPATEN_OPTIONS}
                  placeholder="Pilih kabupaten/kota"
                  onChange={setKabupaten}
                  required
                />

                {/* Error */}
                {error && (
                  <p className="text-xs text-rose-600 font-medium animate-in fade-in duration-150">
                    {error}
                  </p>
                )}

                {/* Notis privasi */}
                <div className="flex items-start gap-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <Shield className="w-4 h-4 text-[#6D2323] shrink-0 mt-0.5" />
                  <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
                    Data Anda disimpan secara anonim di perangkat ini dan{" "}
                    <strong className="text-slate-600">tidak dikirim ke server manapun</strong>.
                    Digunakan hanya untuk keperluan evaluasi internal layanan.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full py-3.5 rounded-xl bg-[#6D2323] text-white font-bold text-sm
                    hover:bg-[#5a1c1c] active:scale-[0.98] transition-all duration-150
                    disabled:opacity-60 disabled:cursor-not-allowed
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D2323]
                    flex items-center justify-center gap-2 touch-manipulation
                  "
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                  ) : (
                    "Kirim Penilaian"
                  )}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="w-full text-xs text-slate-400 hover:text-slate-600
                    transition-colors py-2 touch-manipulation"
                  style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
                >
                  Lewati survei ini
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}