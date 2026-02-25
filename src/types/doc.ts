/**
 * Definisi lokasi parameter dalam request API
 */
export type ParameterLocation = "query" | "path" | "header";

/**
 * Definisi Method HTTP yang didukung oleh Portal Satu Data
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Interface untuk parameter API individu
 */
export interface ApiParam {
  name: string;
  in: ParameterLocation;
  required: boolean;
  type: string;
  description: string;
  example?: string;
}

/**
 * Interface utama untuk definisi Endpoint API
 */
export interface ApiEndpoint {
  method: HttpMethod;
  path: string;
  summary: string;
  description: string;
  params: ApiParam[];
  response: Record<string, unknown>;
  tag: "Dataset" | "Kategori" | "Statistik" | "Autentikasi" | string;
}

/**
 * Interface untuk struktur navigasi sidebar dokumentasi
 */
export interface DocItem {
  href: string;
  title: string;
}

export interface DocSection {
  id: string;
  icon: React.ElementType; // Menggunakan tipe Lucide Icon
  title: string;
  items: DocItem[];
}
