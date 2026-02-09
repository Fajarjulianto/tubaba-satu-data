import { Link } from "react-router-dom";
import { Calendar, Building2, ArrowRight, FileType } from "lucide-react";
import { Badge, Button } from "@/components/index";
import { Dataset, fileTypeIcons, fileTypeColors } from "@/types/index";

interface DatasetCardProps {
  dataset: Dataset;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  const FileIcon = fileTypeIcons[dataset.fileType] || FileType;

  return (
    <article className="group bg-card border border-border rounded-xl p-4 md:p-5 hover:shadow-lg hover:border-secondary transition-all duration-300">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-burgundy-light flex items-center justify-center shrink-0">
            <FileIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
          <Badge variant="secondary" className="text-xs font-medium">
            {dataset.category}
          </Badge>
        </div>
        <Badge
          variant="outline"
          className={`text-xs font-medium shrink-0 ${fileTypeColors[dataset.fileType]}`}
        >
          {dataset.fileType}
        </Badge>
      </div>

      <h3 className="font-display font-semibold text-foreground text-base md:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {dataset.title}
      </h3>

      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
        {dataset.description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground mb-3 md:mb-4">
        <div className="flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{dataset.agency}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>{dataset.lastUpdated}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">
          {dataset.downloads.toLocaleString()} download
        </span>
        <Link to={`/datasets/${dataset.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary hover:bg-burgundy-light gap-1 text-xs md:text-sm font-medium"
          >
            Lihat Detail
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
