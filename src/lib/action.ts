import { Dataset } from "@/types/index";

export const handleDownloadCSV = (dataset: Dataset): void => {
  try {
    console.log(`Memulai unduhan CSV untuk: ${dataset.title}`);

    const csvContent = `ID,Judul,Instansi,Kategori\n${dataset.id},"${dataset.title}","${dataset.agency}","${dataset.category}"`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `tubaba-data-${dataset.id}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`Berhasil mengunduh CSV: ${dataset.title}`);
  } catch (error) {
    console.error("Gagal mengunduh CSV:", error);
  }
};

export const handleDownloadExcel = (dataset: Dataset): void => {
  console.log(`Memicu unduhan Excel untuk: ${dataset.title}`);
  alert(`File Excel ${dataset.title}.xlsx sedang disiapkan...`);
};

export const handleShare = async (dataset: Dataset): Promise<void> => {
  const shareData = {
    title: `Satu Data Tubaba - ${dataset.title}`,
    text: dataset.description,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      console.log("Berhasil dibagikan");
    } else {
      // Fallback jika browser tidak mendukung Web Share API
      await navigator.clipboard.writeText(window.location.href);
      alert("Tautan berhasil disalin ke papan klip!");
    }
  } catch (error) {
    console.error("Gagal membagikan data:", error);
  }
};
