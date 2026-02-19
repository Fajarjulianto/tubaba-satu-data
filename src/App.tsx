import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/authContext";
import { LoadingScreen } from "./components/shared/loadingScreen";

// Layouts & Guards
import { AdminLayout } from "./components/admin/AdminLayout";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

// Lazy Pages
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
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const UploadDataAdmin = lazy(() => import("./components/admin/UploadData"));
const ManageDatasets = lazy(() => import("./components/admin/ManageDataset"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1, staleTime: 300000 },
  },
});

// Mapping Route Publik
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/dataset", element: <Dataset /> },
  { path: "/datasets/:id", element: <DatasetDetails /> },
  { path: "/statistik", element: <Statistik /> },
  { path: "/metadata", element: <Metadata /> },
  { path: "/analisis", element: <Analisis /> },
  { path: "/dokumentasi", element: <Dokumentasi /> },
  { path: "/kontak", element: <Kontak /> },
  { path: "/organisasi", element: <Organisasi /> },
  { path: "/login", element: <LoginPage /> },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {publicRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}

              {/* Route Admin*/}
              {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="upload" element={<UploadDataAdmin />} />
                <Route path="datasets" element={<ManageDatasets />} />
              </Route>
              {/* </Route> */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
