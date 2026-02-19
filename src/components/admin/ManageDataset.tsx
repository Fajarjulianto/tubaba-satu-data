import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  MoreHorizontal,
  FileText,
  ExternalLink,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardContent,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/index";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/emptyState";
import { Dataset, DatasetApiResponse } from "@/types/index";

const ManageDatasets = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce<string>(searchTerm, 500);

  // 1. useQuery dengan tipe data eksplisit
  const { data: datasets = [], isLoading } = useQuery<Dataset[]>({
    queryKey: ["datasets", debouncedSearch],
    queryFn: async () => {
      const response = await axiosInstance.get<Dataset[]>(
        `/datasets?search=${debouncedSearch}`,
      );
      return response.data;
    },
  });

  // 2. useMutation dengan tipe data eksplisit
  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/api/datasets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datasets"] });
      toast.success("Dataset berhasil dihapus");
    },
    onError: (error) => toast.error(error.message || "Gagal menghapus dataset"),
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus dataset ini?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
        {datasets.length === 0 && !isLoading ? (
          <EmptyState
            title="Tidak ada data"
            description="Dataset yang Anda cari tidak ditemukan atau belum ada data yang diunggah."
          />
        ) : (
          <div className="hidden md:block overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-slate-100">
                {datasets.map((data: Dataset) => (
                  <tr
                    key={data.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 text-sm">
                        {data.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">
                        Update: {data.lastUpdated}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {data.agency}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={data.status} />
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                      {data.downloads}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ActionMenu
                        onDelete={() => handleDelete(data.id)}
                        onView={() => navigate(`/datasets/${data.id}`)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Dataset["status"] }) => (
  <Badge
    className={cn(
      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm",
      status === "Dipublikasi"
        ? "bg-green-100 text-green-700 border-green-200"
        : "bg-amber-100 text-amber-700 border-amber-200",
    )}
  >
    {status}
  </Badge>
);

const ActionMenu = ({
  onDelete,
  onView,
}: {
  onDelete: () => void;
  onView: () => void;
}) => (
  <DropdownMenuContent
    align="end"
    className="w-52 p-2 rounded-xl border-slate-200 shadow-xl"
  >
    <DropdownMenuItem className="gap-3 p-3 rounded-lg cursor-pointer font-medium text-slate-600">
      <FileText className="w-4 h-4 text-primary" /> Edit Dataset
    </DropdownMenuItem>
    <div className="h-px bg-slate-100 my-1" />
    <DropdownMenuItem className="gap-3 p-3 rounded-lg cursor-pointer font-medium text-red-600 hover:bg-red-50">
      <Trash2 className="w-4 h-4" /> Hapus Dataset
    </DropdownMenuItem>
  </DropdownMenuContent>
);

export default ManageDatasets;
