import { DatasetMetadata } from "../../types/dataset";

interface MetadataRowProps {
  label: string;
  value: string | number | undefined;
}

const MetadataRow = ({ label, value }: MetadataRowProps) => (
  <div className="flex flex-col sm:flex-row sm:items-start py-4 md:py-5 border-b border-slate-100 last:border-0 group transition-colors hover:bg-slate-50/50 px-2 rounded-xl">
    <span className="w-full sm:w-1/3 text-sm font-semibold text-slate-500 font-tubaba leading-6">
      {label}
    </span>
    <span className="w-full sm:w-2/3 text-sm font-medium text-slate-900 mt-1 sm:mt-0 break-words leading-6 group-hover:text-primary transition-colors">
      {value || "-"}
    </span>
  </div>
);

export function MetadataSection({ metadata }: { metadata: DatasetMetadata }) {
  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      <MetadataRow label="Publisher" value={metadata.publisher} />
      <MetadataRow label="Identifier" value={metadata.identifier} />
      <MetadataRow label="Lisensi" value={metadata.license} />
      <MetadataRow label="Level Akses" value={metadata.accessLevel} />
      <MetadataRow label="Diterbitkan Pada" value={metadata.publishedDate} />
      <MetadataRow label="Diperbaharui Pada" value={metadata.lastUpdated} />
      <MetadataRow
        label="Tingkat Penyajian"
        value={metadata.presentationLevel}
      />
      <MetadataRow label="Cakupan Dataset" value={metadata.coverage} />
      <MetadataRow label="Periode" value={metadata.period} />
      <MetadataRow label="Sumber" value={metadata.source} />
    </div>
  );
}
