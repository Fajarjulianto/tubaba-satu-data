import { ChevronRight } from "lucide-react";
import { DocSection, DocItem } from "@/types/doc";

interface DocSidebarProps {
  sections: DocSection[];
}

export const DocSidebar = ({ sections }: { sections: DocSection[] }) => (
  <aside className="lg:col-span-1">
    <div className="sticky top-24 space-y-8 px-2">
      {sections.map((section: DocSection) => (
        <div key={section.id}>
          {/* Label Kategori Sidebar */}
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            <section.icon className="w-3.5 h-3.5 text-primary/60" />
            {section.title}
          </div>

          <ul className="space-y-1">
            {section.items.map((item: DocItem) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary py-1.5 transition-all group font-medium"
                >
                  {/* Efek indikator saat hover */}
                  <ChevronRight
                    size={12}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                    {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </aside>
);
