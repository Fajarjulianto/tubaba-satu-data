import { useState } from "react";
import { ChevronDown, ChevronUp, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApiEndpoint } from "@/types/doc";

const methodColors: Record<string, string> = {
  GET: "bg-blue-100 text-blue-700 border-blue-200",
  POST: "bg-emerald-100 text-emerald-700 border-emerald-200",
  PUT: "bg-amber-100 text-amber-700 border-amber-200",
  DELETE: "bg-red-100 text-red-700 border-red-200",
};

export const ApiEndpointCard = ({ endpoint }: { endpoint: ApiEndpoint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "border rounded-2xl overflow-hidden transition-all duration-300 bg-white",
        isOpen
          ? "border-slate-300 shadow-md"
          : "border-slate-100 hover:border-slate-200",
      )}
    >
      {/* Header Row */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50/50"
      >
        <span
          className={cn(
            "text-[10px] font-black px-2.5 py-1 rounded-lg font-mono w-16 text-center uppercase",
            methodColors[endpoint.method],
          )}
        >
          {endpoint.method}
        </span>
        <code className="text-sm font-mono text-slate-700 flex-1 truncate">
          {endpoint.path}
        </code>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-6 border-t border-slate-50 bg-slate-50/30 space-y-6 animate-in slide-in-from-top-2">
          <p className="text-sm text-slate-600 leading-relaxed">
            {endpoint.description}
          </p>

          {/* Code Block Example */}
          <div className="relative group">
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                onClick={() =>
                  handleCopy(JSON.stringify(endpoint.response, null, 2))
                }
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-slate-400"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
            <pre className="bg-slate-900 text-emerald-400 p-5 rounded-2xl text-xs font-mono overflow-x-auto">
              <code>{JSON.stringify(endpoint.response, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
