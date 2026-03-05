import { Link } from "react-router-dom";
import {
  Database,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Music2,
  LucideIcon,
} from "lucide-react";
import { TapisPattern, TapisBorder } from "@/constant/motiftapis";

interface FooterLink {
  name: string;
  href: string;
}

interface ContactItemProps {
  icon: LucideIcon;
  text: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

const QUICK_LINKS: FooterLink[] = [
  { name: "Datasets", href: "/dataset" },
  { name: "Statistics", href: "/statistik" },
  { name: "Metadata", href: "/metadata" },
  { name: "Analysis", href: "/analisis" },
  { name: "Documentation", href: "/dokumentasi" },
];

const RESOURCES: FooterLink[] = [
  { name: "API Documentation", href: "/dokumentasi" },
  { name: "Data Standards", href: "/metadata" },
  { name: "Open Data Policy", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/kominfotubaba",
    label: "Facebook Kominfo Tubaba",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/diskominfotubaba/",
    label: "Instagram Diskominfo Tubaba",
  },
  {
    icon: Music2,
    href: "https://www.tiktok.com/@diskominfotubaba",
    label: "TikTok Diskominfo Tubaba",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@DiskomdigiTubaba",
    label: "Youtube Diskoomdigi Tubaba",
  },
];

export function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground border-t border-white/5 overflow-hidden">
      {/* Dekorasi tapis */}
      <TapisPattern />
      <TapisBorder />
      <div className="absolute top-[18px] left-0 w-full h-px bg-secondary/20 z-10" />

      {/* Konten */}
      <div className="relative z-10 container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Sosial Media */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                <Database className="w-6 h-6 text-secondary" />
              </div>
              <div className="leading-none">
                <span className="block text-xl font-bold uppercase tracking-tighter text-white">
                  Satu Data <span className="text-secondary">Tubaba</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-white leading-relaxed font-light">
              Portal data terpadu resmi Kabupaten Tulang Bawang Barat.
              Menyediakan akses data publik untuk mendukung transparansi dan
              pembangunan berbasis data.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-200 active:scale-90"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h4 className="text-secondary font-bold uppercase tracking-widest text-xs mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white hover:text-secondary hover:translate-x-1 inline-block transition-all duration-200 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sumber Daya */}
          <div>
            <h4 className="text-secondary font-bold uppercase tracking-widest text-xs mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {RESOURCES.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white hover:text-secondary hover:translate-x-1 inline-block transition-all duration-200 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-6">
            <h4 className="text-secondary font-bold uppercase tracking-widest text-xs">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <ContactItem
                icon={MapPin}
                text="Jl. Diponegoro No. 86 Panaragan Jaya, Panaragan, Kec. Tulang Bawang Tengah"
              />
              <ContactItem icon={Phone} text="(0726) 123456" />
              <ContactItem icon={Mail} text="Kominfo@tubaba.go.id" />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs tracking-widest text-white/40 text-center mt-5">
          <p className="text-white">
            © {new Date().getFullYear()} Dinas Komunikasi dan Informatika
            Kabupaten Tulang Bawang Barat.
          </p>
          <p>
            Powered by&nbsp;
            <span className="text-secondary font-bold">
              Satu Data Indonesia
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({ icon: Icon, text }: ContactItemProps) {
  return (
    <li className="flex items-start gap-3 text-sm text-white font-light">
      <Icon className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
      <span className="leading-snug">{text}</span>
    </li>
  );
}
