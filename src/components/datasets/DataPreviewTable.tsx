import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DatasetPreviewRow } from "@/types";

interface DataPreviewTableProps {
  data: DatasetPreviewRow[];
  itemsPerPage?: number;
}

export function DataPreviewTable({
  data,
  itemsPerPage = 5,
}: DataPreviewTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 italic">
        Data tidak tersedia
      </div>
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  const columns = Object.keys(data[0]);

  return (
    <div className="space-y-4">
      <div className="relative w-full overflow-x-auto border border-slate-100 rounded-xl">
        <div className="min-w-[600px] w-full">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4"
                  >
                    {col.replace("_", " ")}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-slate-50/30 transition-colors"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col}
                      className="text-sm font-medium text-slate-700 py-4"
                    >
                      {typeof row[col] === "number"
                        ? row[col].toLocaleString()
                        : row[col] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
          Menampilkan {startIndex + 1} -{" "}
          {Math.min(startIndex + itemsPerPage, data.length)} dari {data.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-bold text-primary px-4">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
