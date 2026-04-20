"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CampaignDataSlide4() {
  const router = useRouter();
  const currentSlide = 4;

  const [modalImage, setModalImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const showImage = (src: string) => {
    setModalImage(src);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prevZoom) => Math.max(1, Math.min(prevZoom + e.deltaY * -0.001, 3)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <main
      className="relative min-h-screen flex items-center justify-center text-black font-[ubuntu]"
      style={{
        backgroundImage: "url('/images/Process Page - resize.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Slide Selector Dots (Right side) */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-5 z-20">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() =>
              router.push(`/process/campaign-data-key-considerations/new-company-data-slides/${num}`)
            }
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition
              ${
                num === currentSlide
                  ? "bg-[#0091d2] text-white"
                  : "bg-white text-[#0091d2] border-2 border-[#0091d2] hover:bg-[#0091d2] hover:text-white"
              }`}
            style={{ fontFamily: "ubuntu" }}
            aria-label={`Go to slide ${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Title Bubble */}
      <div
        className="absolute bg-white px-8 py-4 rounded-xl shadow-lg border-2 text-xl font-bold z-10"
        style={{
          borderColor: "#0091d2",
          color: "#0091d2",
          top: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "ubuntu",
          whiteSpace: "nowrap",
        }}
      >
        Campaign Data – Key Considerations
      </div>

      {/* Standardized Content Box */}
      <div
        id="content-box"
        className="bg-white p-8 rounded-xl shadow-lg w-[65%] h-[550px] flex flex-col mt-32 text-gray-800"
      >
        {/* Header with Numbered Circle */}
        <div className="flex items-start">
          <div
            className="w-12 h-12 flex items-center justify-center text-white text-xl font-bold rounded-full mr-4"
            style={{ backgroundColor: "#0091d2" }}
          >
            4
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              How much data do you need to support your lead generation campaign?
            </h1>
            <ul className="text-lg list-disc list-inside text-gray-700 mb-6">
              <li><strong>Astute</strong> estimates 40 companies are needed per day of calling</li>
              <li>A <strong>30-day campaign</strong> requires 1,200 company records</li>
            </ul>
          </div>
        </div>

        {/* Image Thumbnail */}
        <div className="flex justify-center mt-6">
          <Image
            src="/images/Data Volume Matrix.png"
            alt="Data Volume Matrix"
            width={400}
            height={300}
            className="rounded-lg object-contain cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => showImage("/images/Data Volume Matrix.png")}
            loading="lazy"
          />
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/process/campaign-data-key-considerations")}
        className="absolute bottom-10 left-10 bg-white text-[#0091d2] px-6 py-3 rounded-lg font-bold hover:bg-[#0091d2] hover:text-white transition shadow-md"
        style={{ fontFamily: "ubuntu" }}
      >
        Back to Campaign Data
      </button>

      {/* Image Modal with Zoom */}
      {modalImage && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50 p-4"
          onClick={() => setModalImage(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex justify-center items-center overflow-hidden"
            onWheel={handleWheelZoom}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            style={{
              width: "90vw",
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              cursor: zoom > 1 ? "grab" : "default",
            }}
          >
            <Image
              src={modalImage}
              alt="Popup Image"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                objectFit: "contain",
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
            />
            {/* Close Button */}
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-black font-bold hover:bg-[#0091d2] hover:text-white transition"
              style={{ fontFamily: "ubuntu" }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
