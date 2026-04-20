"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button, Card, SectionHeader } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { errorMessage } from "@/lib/errors";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const PLACEMENTS = ["1st", "2nd", "3rd"] as const;

const START_YEAR = 2000;

export default function AdminHallOfFamePage() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const years = Array.from({ length: selectedYear - START_YEAR + 1 }, (_, i) => START_YEAR + i);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/get-hof-images?year=${selectedYear}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load images");
        setImages(data);
      } catch (error) {
        console.error(error);
        toast.error(`Failed to load images: ${errorMessage(error)}`);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, [selectedYear]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    month: string,
    placement: (typeof PLACEMENTS)[number],
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cellKey = `${month.toLowerCase()}-${placement}`;
    setUploading((prev) => ({ ...prev, [cellKey]: true }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("month", month);
    formData.append("placement", placement);
    formData.append("year", selectedYear.toString());

    try {
      const res = await fetch("/api/upload-hof", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImages((prev) => ({
        ...prev,
        [cellKey]: `${data.filePath}?t=${Date.now()}`,
      }));
      toast.success(`Uploaded ${month} ${placement}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(`Upload failed: ${errorMessage(error)}`);
    } finally {
      setUploading((prev) => ({ ...prev, [cellKey]: false }));
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu">
      <div className="max-w-7xl mx-auto px-10 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <FadeIn y={0} duration={0.4}>
            <SectionHeader eyebrow="Admin · Hall of Fame" title={`Manage images — ${selectedYear}`} />
          </FadeIn>
          <FadeIn y={0} duration={0.4} delay={0.1}>
            <Button variant="secondary" size="sm" onClick={() => router.push("/admin/dashboard")}>
              ← Dashboard
            </Button>
          </FadeIn>
        </div>

        {/* Year selector */}
        <div className="mb-10 flex flex-wrap gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1.5 rounded-pill text-body-sm font-medium border transition-all ${
                selectedYear === year
                  ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-300 hover:text-brand-500"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {PLACEMENTS.map((placement) => (
          <section key={placement} className="mb-12">
            <div className="text-label text-brand-500 uppercase mb-4">
              {placement} Place — {selectedYear}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {MONTHS.map((month) => {
                const key = `${month.toLowerCase()}-${placement}`;
                const url = images[key];
                const isUploading = uploading[key];
                return (
                  <Card key={month} padded={false} className="p-4 text-center">
                    <div className="text-body-sm font-medium text-neutral-900 mb-3">{month}</div>
                    <label className="block cursor-pointer">
                      <input
                        type="file"
                        accept="image/png"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, month, placement)}
                        disabled={isUploading}
                      />
                      <div
                        className={`border-2 border-dashed rounded-md py-3 text-body-sm transition-colors ${
                          isUploading
                            ? "border-brand-500 text-brand-500"
                            : "border-neutral-300 text-neutral-500 hover:border-brand-500 hover:text-brand-500"
                        }`}
                      >
                        {isUploading ? "Uploading…" : url ? "Replace" : "Upload image"}
                      </div>
                    </label>
                    {loading ? (
                      <div className="mt-3 aspect-[2/3] rounded-md bg-neutral-100 animate-pulse" />
                    ) : url ? (
                      <div className="mt-3 relative aspect-[2/3] rounded-md bg-neutral-50 overflow-hidden">
                        <Image
                          src={url}
                          alt={`${month} ${placement}`}
                          fill
                          sizes="160px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="mt-3 aspect-[2/3] rounded-md bg-neutral-50 border border-dashed border-neutral-200 flex items-center justify-center text-body-sm text-neutral-400">
                        No image
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
