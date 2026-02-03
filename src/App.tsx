import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dataset from "./pages/Dataset";
import DatasetDetails from "./pages/DatasetDetails";
import Statistik from "./pages/Statistik";
import Metadata from "./pages/Metadata";
import Analisis from "./pages/Analisis";
import Dokumentasi from "./pages/Dokumentasi";
import Kontak from "./pages/Kontak";
import NotFound from "./pages/NotFound";
import Test from "./test/test";
import Organisasi from "./pages/Organisasi";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/datasets/:id" element={<DatasetDetails />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/metadata" element={<Metadata />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/dokumentasi" element={<Dokumentasi />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/organisasi/" element={<Organisasi />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
