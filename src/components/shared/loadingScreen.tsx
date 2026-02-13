export const LoadingScreen = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 font-tubaba">
    <div className="relative flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
    </div>
    <div className="mt-6 flex flex-col items-center gap-1">
      <p className="text-primary font-bold uppercase tracking-[0.2em] text-sm animate-pulse">
        Memuat Satu Data Tubaba...
      </p>
    </div>
  </div>
);
