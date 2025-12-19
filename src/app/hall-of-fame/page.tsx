"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HallOfFame() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [images, setImages] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const missingImage = "/images/hall-of-fame/HOF-missing.png";

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const placements = ["1st", "2nd", "3rd"];
  const years = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2025 - i); // Generate years from 2025 to 2000

  useEffect(() => {
    fetchImages(selectedYear);
  }, [selectedYear]);

  const fetchImages = async (year: number) => {
    try {
      const response = await fetch(`/api/get-hof-images?year=${year}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Loaded Images:", data); // Debugging: Check what images are returned
        setImages(data);
      } else {
        console.error("Error loading images:", data.error);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#0091d2] p-10 font-ubuntu text-white relative">
      {/* Back to Reception Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/reception">
          <button className="px-4 py-2 bg-white text-[#0091d2] font-semibold rounded-lg hover:bg-[#007bb5] hover:text-white transition">
            ← Back to Reception
          </button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6">Hall of Fame</h1>

      {/* Year Selector */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={() => setSelectedYear(Math.max(selectedYear - 1, 2000))}
          disabled={selectedYear === 2000}
          className="px-4 py-2 bg-white text-[#0091d2] font-bold rounded-lg hover:bg-[#007bb5] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &#9665;
        </button>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="px-6 py-3 rounded-lg text-xl font-bold bg-white text-[#0091d2] cursor-pointer border-none outline-none"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={() => setSelectedYear(Math.min(selectedYear + 1, 2025))}
          disabled={selectedYear === 2025}
          className="px-4 py-2 bg-white text-[#0091d2] font-bold rounded-lg hover:bg-[#007bb5] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &#9655;
        </button>
      </div>

      {/* Hall of Fame Grid - Always 12 Images Per Row */}
      <div className="space-y-10">
        {placements.map((placement) => (
          <div key={placement}>
            <h2 className="text-2xl font-bold text-center mb-4">{placement} Place Winners - {selectedYear}</h2>

            <div className="grid grid-cols-12 gap-4">
              {months.map((month) => {
                const key = `${month.toLowerCase()}-${placement}`;
                const imageUrl = images[key] ? images[key] : missingImage;

                return (
                  <div key={month} className="flex justify-center">
                    <div className="relative w-full aspect-[2/3]">
                      <Image
                        src={imageUrl}
                        alt={`${month} ${placement}`}
                        fill
                        sizes="(max-width: 768px) 8vw, 100px"
                        quality={100}
                        className="cursor-pointer transition-transform duration-200 hover:scale-110 hover:z-10 rounded-lg object-contain"
                        onClick={() => setSelectedImage(imageUrl)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative p-4 max-w-full max-h-full">
            <Image
              src={selectedImage}
              alt="Enlarged Image"
              width={900}
              height={1200}
              quality={100}
              className="rounded-lg shadow-lg max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
