"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminHallOfFame() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [images, setImages] = useState<Record<string, string>>({});

  // Generate years dynamically (2000 - Current Year)
  const years = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => 2000 + i);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const placements = ["1st", "2nd", "3rd"];

  useEffect(() => {
    loadExistingImages(selectedYear);
  }, [selectedYear]);

  const loadExistingImages = async (year: number) => {
    try {
      const response = await fetch(`/api/get-hof-images?year=${year}`);
      const data = await response.json();

      if (response.ok) {
        setImages(data);
      } else {
        console.error("Error loading images:", data.error);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, month: string, placement: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("month", month);
    formData.append("placement", placement);
    formData.append("year", selectedYear.toString());

    try {
      const response = await fetch("/api/upload-hof", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImages((prev) => ({
          ...prev,
          [`${month.toLowerCase()}-${placement}`]: data.filePath + `?t=${Date.now()}`,
        }));
      } else {
        console.error("Upload failed:", data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">Admin - Hall of Fame</h1>

      <button
        onClick={() => router.push("/admin/dashboard")}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        ← Back to Admin Dashboard
      </button>

      {/* Year Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold ${
              selectedYear === year ? "bg-blue-700 text-white" : "bg-white text-blue-700 border border-blue-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Hall of Fame Form */}
      <div className="space-y-10">
        {placements.map((placement) => (
          <div key={placement}>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{placement} Place - {selectedYear}</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
              {months.map((month) => {
                const key = `${month.toLowerCase()}-${placement}`;
                return (
                  <div key={month} className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold mb-2">{month}</h3>
                    <label className="block cursor-pointer">
                      <input
                        type="file"
                        accept="image/png"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, month, placement)}
                      />
                      <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg text-gray-600 hover:border-blue-500 transition">
                        Upload Image
                      </div>
                    </label>
                    {images[key] ? (
                      <Image
                        src={images[key]}
                        alt={`${month} ${placement}`}
                        width={160}
                        height={250}
                        className="rounded-lg shadow-md mt-2"
                      />
                    ) : (
                      <p className="text-gray-500 mt-2">No image uploaded</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
