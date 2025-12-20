"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HallOfFame() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [displayYear, setDisplayYear] = useState(2025);
  const [images, setImages] = useState<Record<string, string>>({});
  const [nextImages, setNextImages] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'loading' | 'ready' | 'flipping'>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const missingImage = "/images/hall-of-fame/HOF-missing.png";

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const placements = ["1st", "2nd", "3rd"];
  const startYear = 2000;
  const endYear = 2025;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  // Pre-fetch images for a year
  const fetchImages = async (year: number): Promise<Record<string, string>> => {
    try {
      const response = await fetch(`/api/get-hof-images?year=${year}`);
      const data = await response.json();
      if (response.ok) {
        return data;
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    return {};
  };

  // Initial load
  useEffect(() => {
    fetchImages(selectedYear).then(setImages);
  }, []);

  // Handle animation phase transitions
  useEffect(() => {
    if (animationPhase === 'ready') {
      // Small delay to let React render the new images on the back face
      const timer = setTimeout(() => {
        setAnimationPhase('flipping');
      }, 50);
      return () => clearTimeout(timer);
    }

    if (animationPhase === 'flipping') {
      // After animation completes, finalize
      const timer = setTimeout(() => {
        setImages(nextImages);
        setNextImages({});
        setDisplayYear(selectedYear);
        setAnimationPhase('idle');
      }, 650 + (11 * 25)); // Animation duration + stagger
      return () => clearTimeout(timer);
    }
  }, [animationPhase, nextImages, selectedYear]);

  const handleYearChange = async (year: number) => {
    if (year !== selectedYear && animationPhase === 'idle') {
      setAnimationPhase('loading');
      setSelectedYear(year);

      // Fetch new images first
      const newImages = await fetchImages(year);
      setNextImages(newImages);

      // Now ready to animate
      setAnimationPhase('ready');
    }
  };

  // Calculate year from slider position
  const getYearFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return selectedYear;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const yearIndex = Math.round(percentage * (years.length - 1));
    return years[Math.max(0, Math.min(yearIndex, years.length - 1))];
  }, [selectedYear, years]);

  // Mouse event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const year = getYearFromPosition(e.clientX);
    if (year !== selectedYear) {
      handleYearChange(year);
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && animationPhase === 'idle') {
      const year = getYearFromPosition(e.clientX);
      if (year !== selectedYear) {
        handleYearChange(year);
      }
    }
  }, [isDragging, animationPhase, getYearFromPosition, selectedYear]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const year = getYearFromPosition(e.touches[0].clientX);
    if (year !== selectedYear) {
      handleYearChange(year);
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && animationPhase === 'idle') {
      const year = getYearFromPosition(e.touches[0].clientX);
      if (year !== selectedYear) {
        handleYearChange(year);
      }
    }
  }, [isDragging, animationPhase, getYearFromPosition, selectedYear]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (animationPhase === 'idle') {
      const year = getYearFromPosition(e.clientX);
      if (year !== selectedYear) {
        handleYearChange(year);
      }
    }
  };

  const isAnimating = animationPhase !== 'idle';

  const sliderPosition = ((selectedYear - startYear) / (endYear - startYear)) * 100;

  return (
    <main className="min-h-screen bg-[#0091d2] p-6 font-ubuntu text-white relative overflow-hidden">
      {/* Back to Reception Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/reception">
          <button className="px-4 py-2 bg-white text-[#0091d2] font-semibold rounded-lg hover:bg-[#007bb5] hover:text-white transition shadow-md">
            ← Back to Reception
          </button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-4 mt-2">Hall of Fame</h1>

      {/* Timeline Slider */}
      <div className="max-w-4xl mx-auto mb-6">
        {/* Year Display */}
        <div className="text-center mb-4">
          <span className="text-6xl font-bold text-white drop-shadow-lg transition-all duration-300">
            {selectedYear}
          </span>
        </div>

        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="relative h-3 bg-white/30 rounded-full cursor-pointer mx-8 select-none"
          onClick={handleSliderClick}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Progress Fill */}
          <div
            className="absolute h-full bg-white rounded-full pointer-events-none"
            style={{
              width: `${sliderPosition}%`,
              transition: isDragging ? "none" : "width 0.3s ease"
            }}
          />

          {/* Slider Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-4 border-[#007bb5] cursor-grab active:cursor-grabbing hover:scale-110 ${isDragging ? "scale-110" : ""}`}
            style={{
              left: `calc(${sliderPosition}% - 16px)`,
              transition: isDragging ? "none" : "left 0.3s ease"
            }}
          />

          {/* Year Markers */}
          <div className="absolute w-full top-6 flex justify-between px-0">
            {[2000, 2005, 2010, 2015, 2020, 2025].map((year) => (
              <button
                key={year}
                onClick={(e) => {
                  e.stopPropagation();
                  handleYearChange(year);
                }}
                className={`text-sm font-semibold transition-all hover:scale-110 ${
                  selectedYear === year ? "text-white" : "text-white/70"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Arrow Buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => handleYearChange(Math.max(selectedYear - 1, startYear))}
            disabled={selectedYear === startYear}
            className="px-6 py-2 bg-white text-[#0091d2] font-bold rounded-lg hover:bg-[#007bb5] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            ← Previous Year
          </button>
          <button
            onClick={() => handleYearChange(Math.min(selectedYear + 1, endYear))}
            disabled={selectedYear === endYear}
            className="px-6 py-2 bg-white text-[#0091d2] font-bold rounded-lg hover:bg-[#007bb5] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Next Year →
          </button>
        </div>
      </div>

      {/* Hall of Fame Grid with Flip Animation */}
      <div className="space-y-8">
        {placements.map((placement) => (
          <div key={placement}>
            <h2 className="text-xl font-bold text-center mb-3 bg-white/20 backdrop-blur-sm py-2 rounded-lg mx-auto max-w-md">
              {placement} Place Winners - {displayYear}
            </h2>

            <div className="grid grid-cols-12 gap-2">
              {months.map((month, index) => {
                const key = `${month.toLowerCase()}-${placement}`;
                const currentImageUrl = images[key] || missingImage;
                const newImageUrl = nextImages[key] || missingImage;

                return (
                  <div
                    key={month}
                    className="flex flex-col items-center group"
                  >
                    <span className="text-xs text-white/80 mb-1 font-medium">
                      {month.slice(0, 3)}
                    </span>
                    {/* 3D Flip Card Container */}
                    <div
                      className="relative w-full aspect-[2/3]"
                      style={{ perspective: "1000px" }}
                    >
                      <div
                        className="flip-card-inner w-full h-full"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: animationPhase === 'flipping' ? undefined : "rotateY(0deg)",
                          animation: animationPhase === 'flipping'
                            ? `flipCard 600ms ease-in-out ${index * 25}ms forwards`
                            : "none",
                        }}
                      >
                        {/* Front Face - Current Image */}
                        <div
                          className="flip-card-front absolute w-full h-full"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <Image
                            src={currentImageUrl}
                            alt={`${month} ${placement}`}
                            fill
                            sizes="(max-width: 768px) 8vw, 100px"
                            quality={100}
                            className="cursor-pointer rounded-lg object-contain shadow-lg transition-all duration-300 hover:scale-125 hover:z-20 hover:shadow-2xl"
                            onClick={() => !isAnimating && setSelectedImage(currentImageUrl)}
                          />
                        </div>
                        {/* Back Face - New Image */}
                        <div
                          className="flip-card-back absolute w-full h-full"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <Image
                            src={newImageUrl}
                            alt={`${month} ${placement}`}
                            fill
                            sizes="(max-width: 768px) 8vw, 100px"
                            quality={100}
                            className="cursor-pointer rounded-lg object-contain shadow-lg transition-all duration-300 hover:scale-125 hover:z-20 hover:shadow-2xl"
                            onClick={() => !isAnimating && setSelectedImage(newImageUrl)}
                          />
                        </div>
                      </div>
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
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative p-4 max-w-full max-h-full animate-fade-in">
            <button
              className="absolute top-2 right-2 text-white text-3xl hover:text-gray-300 transition z-10"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Enlarged Image"
              width={900}
              height={1200}
              quality={100}
              className="rounded-lg shadow-2xl max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        @keyframes flipCard {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </main>
  );
}
