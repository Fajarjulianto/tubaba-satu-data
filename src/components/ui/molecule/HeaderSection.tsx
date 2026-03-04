import { cn } from "@/lib/utils";
import { TapisPattern, TapisBorder } from "@/constant/motiftapis";

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
        "relative bg-primary text-primary-foreground py-8 md:py-12 overflow-hidden",
        className,
      )}
    >
      {/* Dekorasi tapis */}
      <TapisPattern />
      <TapisBorder flip />
      <div className="absolute bottom-[18px] left-0 w-full h-px bg-secondary/20 z-10" />

      {/* Konten */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
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
