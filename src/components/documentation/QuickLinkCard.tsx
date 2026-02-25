import { BookOpen, Code, Key } from "lucide-react";
import { Card, CardContent } from "@/components/index";
import { cn } from "@/lib/utils";

// Definisi data link secara lokal untuk kemudahan maintenance
const QUICK_LINKS = [
  {
    icon: BookOpen,
    title: "Mulai Cepat",
    desc: "Panduan dasar penggunaan portal dalam 5 menit",
    bg: "bg-primary/10",
    iconColor: "text-primary",
    href: "#getting-started",
  },
  {
    icon: Code,
    title: "Referensi API",
    desc: "Dokumentasi teknis untuk integrasi sistem",
    bg: "bg-secondary/10",
    iconColor: "text-secondary",
    href: "#api-overview",
  },
  {
    icon: Key,
    title: "Autentikasi",
    desc: "Kelola API Key dan Token akses Anda",
    bg: "bg-amber-100",
    iconColor: "text-amber-600",
    href: "#authentication",
  },
];

export const QuickLinkCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {QUICK_LINKS.map((link, i) => (
        <a key={i} href={link.href} className="group">
          <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-slate-200 h-full rounded-2xl md:rounded-3xl overflow-hidden">
            <CardContent className="p-5 md:p-6 flex items-center gap-4">
              {/* Icon Container dengan efek hover */}
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300",
                  link.bg,
                )}
              >
                <link.icon className={cn("w-6 h-6", link.iconColor)} />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-sm md:text-base text-slate-900 leading-tight group-hover:text-primary transition-colors">
                  {link.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {link.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
};
