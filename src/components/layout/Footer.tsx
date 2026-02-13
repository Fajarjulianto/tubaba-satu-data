import { Link } from "react-router-dom";
import {
  Database,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  LogIn,
  LucideIcon,
} from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
}

interface ContactItemProps {
  icon: LucideIcon;
  text: string;
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

const SOCIAL_ICONS: LucideIcon[] = [Facebook, Twitter, Instagram, Youtube];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-white/5">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Sosial Media */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                <Database className="w-6 h-6 text-secondary" />
              </div>
              <div className="leading-none">
                <span className="block text-xl uppercase tracking-tighter">
                  Satu Data <span className="text-secondary">Tubaba</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed font-light">
              Portal data terpadu resmi Kabupaten Tulang Bawang Barat.
              Menyediakan akses data publik untuk mendukung transparansi dan
              pembangunan berbasis data.
            </p>
            <div className="flex gap-3">
              {SOCIAL_ICONS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all active:scale-90"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h4 className="text-secondary uppercase tracking-widest text-sm mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sumber Daya */}
          <div>
            <h4 className="text-secondary uppercase tracking-widest text-sm mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {RESOURCES.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak & Login */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h4 className="text-secondary uppercase tracking-widest text-sm">
                Hubungi Kami
              </h4>
              <ul className="space-y-4">
                <ContactItem
                  icon={MapPin}
                  text="Jl. Jenderal Sudirman No.1, Panaragan Jaya, Tulang Bawang Barat, Lampung"
                />
                <ContactItem icon={Phone} text="(0726) 123456" />
                <ContactItem icon={Mail} text="satudata@tubaba.go.id" />
              </ul>
            </div>

            {/* Tombol Login */}
            <div className="pt-4 border-t border-white/5">
              <Link
                to="/login"
                className="w-full inline-flex items-center justify-center gap-2 bg-secondary text-primary px-6 py-3 rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-black/20"
              >
                <LogIn className="w-4 h-4" />
                Masuk Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs  tracking-widest text-primary-foreground/40 text-center">
            <p>
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
      </div>
    </footer>
  );
}

function ContactItem({ icon: Icon, text }: ContactItemProps) {
  return (
    <li className="flex items-start gap-3 text-sm text-primary-foreground/60 font-light">
      <Icon className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
      <span className="leading-snug">{text}</span>
    </li>
  );
}
