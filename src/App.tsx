import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/authContext";
import { LoadingScreen } from "./components/shared/loadingScreen";
import { AnimatePresence } from "framer-motion";
// Layouts & Guards
import { AdminLayout } from "./components/admin/AdminLayout";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { PageTransition } from "./components/shared/pageTransition";

// Lazy Pages
const Home = lazy(() => import("./pages/Home"));
const Dataset = lazy(() => import("./pages/Dataset"));
const DatasetDetails = lazy(() => import("./pages/DatasetDetails"));
const Statistik = lazy(() => import("./pages/Statistik"));
const Metadata = lazy(() => import("./pages/Metadata"));
// const Analisis = lazy(() => import("./pages/Analisis"));
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
  // { path: "/analisis", element: <Analisis /> },
  { path: "/dokumentasi", element: <Dokumentasi /> },
  { path: "/kontak", element: <Kontak /> },
  { path: "/organisasi", element: <Organisasi /> },
  { path: "/login", element: <LoginPage /> },
];

// Komponen terpisah agar useLocation bisa digunakan di dalam BrowserRouter
const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PageTransition>{route.element}</PageTransition>}
          />
        ))}

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <PageTransition>
                <Dashboard />
              </PageTransition>
            }
          />
          <Route
            path="upload"
            element={
              <PageTransition>
                <UploadDataAdmin />
              </PageTransition>
            }
          />
          <Route
            path="datasets"
            element={
              <PageTransition>
                <ManageDatasets />
              </PageTransition>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <AppRoutes />
        </Suspense>
        <Toaster />
        <Sonner />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
