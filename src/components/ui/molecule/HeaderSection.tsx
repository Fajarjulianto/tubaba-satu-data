import { cn } from "@/lib/utils";
import tapisBackground from "@/assets/images/Tumpal Tubaba copy.png";

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
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${tapisBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.18,
        }}
      />

      {/* ── Gradient overlay ── */}
      <div
        className="absolute inset-0 z-0"
        // style={{
        //   background: [
        //     "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(107,30,42,0.7) 100%)",
        //     "linear-gradient(to bottom, rgba(107,30,42,0.3) 0%, rgba(107,30,42,0.6) 60%, rgba(107,30,42,0.95) 100%)",
        //     "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        //   ].join(", "),
        // }}
      />

      {/* ── Konten ── */}
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