import { SearchX, Database, Plus } from "lucide-react";
import { Button } from "@/components/index";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "search" | "data";
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icon = "data",
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in duration-500",
        className,
      )}
    >
      {/* Icon Container dengan style halus */}
      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
        {icon === "search" ? (
          <SearchX className="w-10 h-10 text-slate-300" />
        ) : (
          <Database className="w-10 h-10 text-slate-300" />
        )}
      </div>

      {/* Teks Informasi */}
      <div className="max-w-xs space-y-2">
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>

      {/* Tombol Aksi Opsional */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-8 bg-primary hover:bg-primary/90 text-white font-bold gap-2 px-6"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
