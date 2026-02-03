import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderSectionProps {
  title: string;
  description: string;
  className?: string;
}

export function HeaderSection({
  title,
  description,
  className,
}: HeaderSectionProps) {
  return (
    <header
      className={cn(
        "bg-primary text-primary-foreground py-8 md:py-12",
        className,
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-3 md:mb-4">
          {title}
        </h1>
        <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl">
          {description}
        </p>
      </div>
    </header>
  );
}
