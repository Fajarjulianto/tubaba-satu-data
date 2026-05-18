# Dokumentasi API Satu Data Tubaba

Versi: `v1.0` · Diperbarui: Mei 2026

---

## Gambaran Umum

Portal Satu Data Tubaba mengekspos dua sumber data melalui API yang dapat diakses oleh pengembang dan produsen data:

| Sumber              | Base URL                                      | Keterangan                            |
| ------------------- | --------------------------------------------- | ------------------------------------- |
| **Laravel Backend** | `https://aplikasi.tubaba.go.id/api/satu_data` | Data internal dari produsen OPD       |
| **CKAN Open Data**  | `https://data-api.tubaba.go.id/api/3/action`  | Katalog terbuka berbasis standar CKAN |

---

## Autentikasi

### Laravel Backend

Menggunakan **Bearer Token** pada setiap request.

```http
Authorization: Bearer {LARAVEL_TOKEN}
Content-Type: application/json
Accept: application/json
```

Token diperoleh dari administrator sistem. Token bersifat personal dan tidak boleh dibagikan.

### CKAN API

Menggunakan **API Key** pada header Authorization.

```http
Authorization: Bearer {CKAN_TOKEN}
Content-Type: application/json
Accept: application/json
```

Beberapa endpoint CKAN bersifat publik dan tidak memerlukan token (read-only).

---

## Laravel Backend API

### 1. Daftar Semua Dataset

Mengambil seluruh dataset yang telah dipublikasikan dari semua OPD.

```
GET /data_detail
```

**Response**

```json
{
  "data": [
    {
      "id": 1,
      "datasetKode": "PERTANIAN",
      "datasetJudul": "Data Produksi Tanaman Pangan",
      "kode": "PANGAN-2024-001",
      "metode": "Survei lapangan",
      "penanggungJawab": "Kepala Dinas Pertanian",
      "produsen": "Dinas Pertanian Tubaba",
      "satuan": "Ton",
      "tahun": "2024",
      "file": "https://aplikasi.tubaba.go.id/storage/datasets/pangan2024.xlsx",
      "filemeta": "https://aplikasi.tubaba.go.id/storage/metadata/pangan2024.pdf",
      "watch": "142",
      "publikasi": "Kabupaten Tubaba Dalam Angka 2024",
      "visualisasi": "ya",
      "status": null,
      "created_at": "2024-03-01T08:00:00.000Z",
      "updated_at": "2024-03-15T10:30:00.000Z"
    }
  ]
}
```

**Field Response**

| Field             | Tipe              | Keterangan                              |
| ----------------- | ----------------- | --------------------------------------- |
| `id`              | `number`          | ID unik internal                        |
| `datasetKode`     | `string`          | Kode kategori dataset                   |
| `datasetJudul`    | `string`          | Judul lengkap dataset                   |
| `kode`            | `string`          | Kode unik dataset, dipakai sebagai slug |
| `metode`          | `string`          | Metode pengumpulan data                 |
| `penanggungJawab` | `string`          | Nama penanggung jawab data              |
| `produsen`        | `string`          | Nama instansi/OPD produsen data         |
| `satuan`          | `string`          | Satuan pengukuran data                  |
| `tahun`           | `string`          | Tahun data                              |
| `file`            | `string`          | URL langsung ke file Excel/CSV          |
| `filemeta`        | `string`          | URL ke dokumen metadata                 |
| `watch`           | `string`          | Jumlah views/akses                      |
| `publikasi`       | `string`          | Sumber publikasi resmi                  |
| `visualisasi`     | `"ya" \| "tidak"` | Apakah dataset memiliki visualisasi     |
| `status`          | `string \| null`  | Status publikasi                        |
| `created_at`      | `string`          | Waktu pembuatan (ISO 8601)              |
| `updated_at`      | `string`          | Waktu pembaruan terakhir (ISO 8601)     |

---

### 2. Detail Dataset

Mengambil detail satu dataset berdasarkan kode uniknya.

```
GET /data_detail/{kode}
```

**Parameter Path**

| Parameter | Tipe     | Keterangan                                          |
| --------- | -------- | --------------------------------------------------- |
| `kode`    | `string` | Kode unik dataset (field `kode` dari response list) |

**Contoh Request**

```http
GET /data_detail/PANGAN-2024-001
Authorization: Bearer {TOKEN}
```

**Response**

```json
{
  "data": {
    "id": 1,
    "datasetKode": "PERTANIAN",
    "datasetJudul": "Data Produksi Tanaman Pangan",
    "kode": "PANGAN-2024-001",
    ...
  }
}
```

---

### 3. Daftar OPD

Mengambil daftar semua Organisasi Perangkat Daerah (OPD) yang terdaftar sebagai produsen data.

```
GET /jumlah_opd
```

**Response**

```json
{
  "data": {
    "1": "Dinas Pertanian",
    "2": "Dinas Kesehatan",
    "3": "BPS Tubaba"
  }
}
```

---

### 4. Dataset per OPD

Mengambil daftar dataset milik satu OPD tertentu.

```
GET /jumlah_data_opd?opd={nama_opd}
```

**Query Parameter**

| Parameter | Tipe     | Keterangan                             |
| --------- | -------- | -------------------------------------- |
| `opd`     | `string` | Nama OPD sesuai response `/jumlah_opd` |

---

## CKAN Open Data API

### 1. Pencarian Dataset

Mencari dan memfilter dataset dari katalog CKAN.

```
GET /action/package_search
```

**Query Parameter**

| Parameter | Tipe     | Default | Keterangan                             |
| --------- | -------- | ------- | -------------------------------------- |
| `rows`    | `number` | `10`    | Jumlah hasil per halaman (max 1000)    |
| `start`   | `number` | `0`     | Offset untuk paginasi                  |
| `q`       | `string` | `""`    | Kata kunci pencarian                   |
| `fq`      | `string` | —       | Filter query (misal: `tags:kesehatan`) |

**Contoh Request**

```http
GET /action/package_search?rows=100&q=penduduk
Authorization: Bearer {CKAN_TOKEN}
```

**Response**

```json
{
  "success": true,
  "result": {
    "count": 15,
    "sort": "score desc",
    "results": [
      {
        "id": "7c457d32-c1f5-461b-8144-df5009630c9c",
        "name": "data-penduduk-2024",
        "title": "Data Kependudukan 2024",
        "notes": "Data jumlah penduduk per kecamatan",
        "metadata_created": "2026-04-28T06:26:16.364262",
        "metadata_modified": "2026-04-28T06:27:05.573027",
        "organization": {
          "id": "6fc54bf0-...",
          "name": "bps-tubaba",
          "title": "Badan Pusat Statistik Tubaba"
        },
        "resources": [
          {
            "id": "ec80b1ae-...",
            "name": "data-penduduk.xlsx",
            "format": "XLSX",
            "url": "https://data-api.tubaba.go.id/dataset/.../download/...",
            "datastore_active": false,
            "size": 10845
          }
        ],
        "tags": [
          { "name": "penduduk", "display_name": "Penduduk" },
          { "name": "kependudukan", "display_name": "Kependudukan" }
        ],
        "groups": []
      }
    ]
  }
}
```

---

### 2. Detail Dataset CKAN

Mengambil detail lengkap satu paket dataset.

```
GET /action/package_show?id={id_atau_name}
```

**Query Parameter**

| Parameter | Tipe     | Keterangan                         |
| --------- | -------- | ---------------------------------- |
| `id`      | `string` | UUID atau `name` slug dari dataset |

---

### 3. Daftar Nama Dataset

Mengambil daftar slug nama semua dataset yang tersedia.

```
GET /action/package_list
```

**Response**

```json
{
  "success": true,
  "result": ["data-penduduk-2024", "produksi-buah-buahan-2023"]
}
```

---

### 4. Preview Data (Datastore)

Mengambil data tabular dari resource yang telah diindeks ke Datastore CKAN.
Hanya tersedia jika `resource.datastore_active === true`.

```
GET /action/datastore_search?resource_id={resource_id}&limit={limit}
```

**Query Parameter**

| Parameter     | Tipe          | Default | Keterangan                       |
| ------------- | ------------- | ------- | -------------------------------- |
| `resource_id` | `string`      | —       | ID resource dari `package_show`  |
| `limit`       | `number`      | `100`   | Jumlah baris yang diambil        |
| `offset`      | `number`      | `0`     | Offset untuk paginasi            |
| `filters`     | `JSON string` | —       | Filter kolom: `{"tahun":"2024"}` |

**Response**

```json
{
  "success": true,
  "result": {
    "resource_id": "ec80b1ae-...",
    "fields": [
      { "id": "kecamatan", "type": "text" },
      { "id": "jumlah_penduduk", "type": "int4" }
    ],
    "records": [
      { "_id": 1, "kecamatan": "TB Tengah", "jumlah_penduduk": 45230 }
    ],
    "total": 9
  }
}
```

---

## Kode Error

### Laravel

| Kode HTTP | Keterangan                       |
| --------- | -------------------------------- |
| `200`     | Berhasil                         |
| `401`     | Token tidak valid atau tidak ada |
| `403`     | Tidak memiliki izin akses        |
| `404`     | Dataset tidak ditemukan          |
| `500`     | Kesalahan server internal        |

### CKAN

| `success` | Keterangan                                        |
| --------- | ------------------------------------------------- |
| `true`    | Request berhasil, data ada di `result`            |
| `false`   | Request gagal, pesan error ada di `error.message` |

```json
{
  "success": false,
  "error": {
    "message": "Not found",
    "__type": "Not Found Error"
  }
}
```

---

## Catatan Pengembang

### CORS di Development

Kedua API memerlukan proxy saat development lokal. Tambahkan konfigurasi berikut di `vite.config.ts`:

```typescript
server: {
  proxy: {
    "/ckan-api": {
      target: "https://data-api.tubaba.go.id/api",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/ckan-api/, ""),
    },
    "/laravel-api": {
      target: "https://aplikasi.tubaba.go.id/api/satu_data",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/laravel-api/, ""),
    },
  },
}
```

### Rate Limiting

Tidak ada dokumentasi resmi rate limit dari kedua API saat ini. Disarankan:

- Gunakan `staleTime: 5 * 60 * 1000` pada React Query untuk cache 5 menit
- Hindari polling atau refetch berlebihan
- Gunakan `rows=1000` hanya untuk fetch awal, tidak untuk polling

---

_Dokumentasi ini dibuat berdasarkan response API aktual per Mei 2026._
