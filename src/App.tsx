import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import UploadDataAdmin from "./components/admin/UploadData";
import ManageDatasets from "./components/admin/ManageDataset";
import Dashboard from "./pages/admin/dashboard";
const Home = lazy(() => import("./pages/Home"));
const Dataset = lazy(() => import("./pages/Dataset"));
const DatasetDetails = lazy(() => import("./pages/DatasetDetails"));
const Statistik = lazy(() => import("./pages/Statistik"));
const Metadata = lazy(() => import("./pages/Metadata"));
const Analisis = lazy(() => import("./pages/Analisis"));
const Dokumentasi = lazy(() => import("./pages/Dokumentasi"));
const Kontak = lazy(() => import("./pages/Kontak"));
const Organisasi = lazy(() => import("./pages/Organisasi"));
const LoginPage = lazy(() => import("./pages/login"));
const Test = lazy(() => import("./test/test"));
const NotFound = lazy(() => import("./pages/NotFound"));

// 2. Konfigurasi QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="h-screen w-screen flex items-center justify-center bg-slate-50 font-tubaba">
              <div className="animate-pulse text-primary font-bold uppercase tracking-widest">
                Memuat Satu Data Tubaba...
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dataset" element={<Dataset />} />
            <Route path="/datasets/:id" element={<DatasetDetails />} />
            <Route path="/statistik" element={<Statistik />} />
            <Route path="/metadata" element={<Metadata />} />
            <Route path="/analisis" element={<Analisis />} />
            <Route path="/dokumentasi" element={<Dokumentasi />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/organisasi" element={<Organisasi />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/upload" element={<UploadDataAdmin />} />
              <Route path="/admin/datasets" element={<ManageDatasets />} />
              {/* Halaman admin lainnya aman di sini */}
              {/* </Route> */}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
