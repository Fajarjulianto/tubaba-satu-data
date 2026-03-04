// Komponen dekoratif motif Tapis Lampung
// Bisa dipakai ulang di section manapun

/**
 * SVG pattern motif tapis Lampung — geometris emas subtle
 * Gunakan sebagai background overlay di atas warna solid
 */
export const TapisPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.07]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="tapis"
        x="0"
        y="0"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        {/* Motif belah ketupat utama */}
        <polygon
          points="30,4 56,30 30,56 4,30"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1"
        />
        {/* Ketupat dalam */}
        <polygon
          points="30,14 46,30 30,46 14,30"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
        {/* Titik tengah */}
        <circle cx="30" cy="30" r="2" fill="#C9A84C" />
        {/* Garis silang */}
        <line
          x1="4"
          y1="30"
          x2="14"
          y2="30"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
        <line
          x1="46"
          y1="30"
          x2="56"
          y2="30"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
        <line
          x1="30"
          y1="4"
          x2="30"
          y2="14"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
        <line
          x1="30"
          y1="46"
          x2="30"
          y2="56"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
        {/* Ornamen sudut */}
        <rect
          x="0"
          y="0"
          width="4"
          height="4"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
        <rect
          x="56"
          y="0"
          width="4"
          height="4"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
        <rect
          x="0"
          y="56"
          width="4"
          height="4"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
        <rect
          x="56"
          y="56"
          width="4"
          height="4"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tapis)" />
  </svg>
);

/**
 * Border dekoratif motif tumpal Lampung (segitiga bergantian)
 * @param flip - true untuk border bawah (otomatis di-rotate 180°)
 */
export const TapisBorder = ({ flip = false }: { flip?: boolean }) => (
  <svg
    className={`absolute ${flip ? "bottom-0 rotate-180" : "top-0"} left-0 w-full`}
    height="18"
    viewBox="0 0 1200 18"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id={`border-tapis-${flip ? "b" : "t"}`}
        x="0"
        y="0"
        width="30"
        height="18"
        patternUnits="userSpaceOnUse"
      >
        {/* Segitiga tumpal */}
        <polygon
          points="0,18 15,0 30,18"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1"
          opacity="0.5"
        />
        <polygon
          points="0,0 15,18 30,0"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <circle cx="15" cy="9" r="1.5" fill="#C9A84C" opacity="0.4" />
      </pattern>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill={`url(#border-tapis-${flip ? "b" : "t"})`}
    />
  </svg>
);

/**
 * Ornamen bintang emas khas Lampung
 * Gunakan sebagai divider antar section atau elemen dekoratif
 */
export const TapisStarDivider = () => (
  <div className="flex items-center justify-center gap-3 opacity-40">
    <div className="h-px w-24 bg-gradient-to-r from-transparent to-secondary" />
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <polygon
        points="5,0 6.5,3.5 10,3.5 7.5,6 8.5,10 5,7.5 1.5,10 2.5,6 0,3.5 3.5,3.5"
        fill="#C9A84C"
      />
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
      <polygon
        points="3,0 4,2 6,2 4.5,3.5 5,6 3,4.5 1,6 1.5,3.5 0,2 2,2"
        fill="#C9A84C"
      />
    </svg>
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <polygon
        points="5,0 6.5,3.5 10,3.5 7.5,6 8.5,10 5,7.5 1.5,10 2.5,6 0,3.5 3.5,3.5"
        fill="#C9A84C"
      />
    </svg>
    <div className="h-px w-24 bg-gradient-to-l from-transparent to-secondary" />
  </div>
);
