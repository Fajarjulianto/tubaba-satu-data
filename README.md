# Tubaba Satu Data

> Portal Satu Data Kabupaten Tulang Bawang Barat — Platform terpadu untuk mengelola dan menampilkan data pemerintahan daerah Kabupaten Tulang Bawang Barat, Lampung.

---

## Tentang Proyek

**Tubaba Satu Data** adalah portal data berbasis web yang dibangun untuk mendukung inisiatif _Satu Data Indonesia_ di Kabupaten Tulang Bawang Barat (Tubaba). Platform ini menyediakan antarmuka yang terpadu, mudah diakses, dan transparan untuk melihat, mengelola, serta menyajikan data resmi pemerintah daerah.

Tujuan utama platform ini adalah:

- 📌 Menyatukan data dari berbagai perangkat daerah dalam satu portal
- 📌 Meningkatkan transparansi dan keterbukaan informasi publik
- 📌 Mendukung pengambilan keputusan berbasis data di tingkat daerah
- 📌 Memudahkan masyarakat dalam mengakses data pembangunan daerah

---

## Teknologi yang Digunakan

| Teknologi                                     | Kegunaan                             |
| --------------------------------------------- | ------------------------------------ |
| [React](https://react.dev/)                   | Framework antarmuka pengguna (UI)    |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript dengan dukungan tipe data |
| [Vite](https://vitejs.dev/)                   | Build tool & server pengembangan     |
| [Tailwind CSS](https://tailwindcss.com/)      | Framework CSS berbasis utilitas      |
| [shadcn/ui](https://ui.shadcn.com/)           | Pustaka komponen UI modern           |
| [Vitest](https://vitest.dev/)                 | Framework pengujian unit             |
| [ESLint](https://eslint.org/)                 | Alat pemeriksaan kualitas kode       |

---

## Struktur Proyek

```
tubaba-satu-data/
├── public/             # Aset statis (favicon, gambar, dll.)
├── src/                # Kode sumber aplikasi
│   ├── components/     # Komponen UI yang dapat digunakan ulang
│   ├── pages/          # Komponen halaman / rute
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Fungsi utilitas dan helpers
│   └── main.tsx        # Titik masuk aplikasi
├── .env                # Variabel lingkungan
├── index.html          # Titik masuk HTML
├── components.json     # Konfigurasi komponen shadcn/ui
├── tailwind.config.ts  # Konfigurasi Tailwind CSS
├── vite.config.ts      # Konfigurasi build Vite
├── vitest.config.ts    # Konfigurasi pengujian Vitest
├── tsconfig.json       # Konfigurasi TypeScript
└── package.json        # Dependensi dan skrip proyek
```
