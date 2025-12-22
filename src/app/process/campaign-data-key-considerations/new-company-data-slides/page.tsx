"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Slide data - all content in one place
const slides = [
  {
    id: 1,
    title: "If you would like to purchase new / fresh company data, have you considered the target market you would like to address?",
    bullets: [
      "Employee size of organisations (example 100-500 employees)",
      "Industry sectors",
      "UK or International regions",
      "Key decision maker roles"
    ],
    images: [
      { src: "/images/Number of Employees Table.png", alt: "Number of Employees Table", clickable: true },
      { src: "/images/Nature Of Business Table.png", alt: "Nature of Business Table", clickable: true },
      { src: "/images/Region Table.png", alt: "Region Table", clickable: true }
    ],
    imageLayout: "row"
  },
  {
    id: 2,
    title: "Do you require contacts WITH a personal email address?",
    description: "This would support an email send prior to a calling campaign.",
    images: [
      { src: "/images/Person-envelope-pen.png", alt: "Data Enhancement Image", clickable: false }
    ],
    imageLayout: "center"
  },
  {
    id: 3,
    title: "Would you like to procure multiple contacts or single contacts per company?",
    bullets: [
      "Single contacts allow the purchase of more companies within your budget",
      "Multiple contacts provide more avenues into larger organisations, increasing your chance of booking a meeting with your target companies"
    ],
    images: [
      { src: "/images/2 people with line.png", alt: "Single contacts", clickable: false },
      { src: "/images/5 People with connection line.png", alt: "Multiple contacts", clickable: false }
    ],
    imageLayout: "row"
  },
  {
    id: 4,
    title: "How much data do you need to support your lead generation campaign?",
    bullets: [
      "Astute estimates 40 companies are needed per day of calling",
      "A 30-day campaign requires 1,200 company records"
    ],
    images: [
      { src: "/images/Data Volume Matrix.png", alt: "Data Volume Matrix", clickable: true }
    ],
    imageLayout: "center"
  },
  {
    id: 5,
    title: "Are there any suppression files we should remove from the data you would like to purchase?",
    bullets: [
      "Customer suppressions",
      "Top prospect suppressions",
      "Opt-out contacts"
    ],
    images: [
      { src: "/images/data icon with 2 pages.png", alt: "Suppression Data Icon", clickable: false }
    ],
    imageLayout: "right"
  }
];

export default function NewCompanyDataSlides() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const goToSlide = (index: number) => {
    if (index === currentSlide || isAnimating) return;

    setSlideDirection(index > currentSlide ? 'next' : 'prev');
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  };

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

  const slide = slides[currentSlide];

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
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 transform
              ${
                index === currentSlide
                  ? "bg-[#0091d2] text-white scale-110 shadow-lg"
                  : "bg-white text-[#0091d2] border-2 border-[#0091d2] hover:bg-[#0091d2] hover:text-white hover:scale-105"
              }`}
            style={{ fontFamily: "ubuntu" }}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index + 1}
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

      {/* Content Box with Animation */}
      <div
        className={`bg-white p-8 rounded-xl shadow-lg w-[65%] h-[550px] flex flex-col mt-32 text-gray-800 transition-all duration-300 ease-out
          ${isAnimating
            ? slideDirection === 'next'
              ? 'opacity-0 translate-x-8'
              : 'opacity-0 -translate-x-8'
            : 'opacity-100 translate-x-0'
          }`}
      >
        {/* Header with Numbered Circle */}
        <div className="flex items-start">
          <div
            className="w-12 h-12 flex items-center justify-center text-white text-xl font-bold rounded-full mr-4 flex-shrink-0 transition-transform duration-500"
            style={{
              backgroundColor: "#0091d2",
              transform: isAnimating ? 'scale(0.8)' : 'scale(1)'
            }}
          >
            {slide.id}
          </div>
          <div className="flex-1">
            <h1
              className="text-2xl font-bold text-gray-900 mb-4 transition-all duration-300"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)'
              }}
            >
              {slide.title}
            </h1>

            {slide.description && (
              <p
                className="text-lg text-gray-700 mb-6 transition-all duration-300 delay-75"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)'
                }}
              >
                {slide.description}
              </p>
            )}

            {slide.bullets && (
              <ul className="text-lg list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                {slide.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="transition-all duration-300"
                    style={{
                      opacity: isAnimating ? 0 : 1,
                      transform: isAnimating ? 'translateX(-20px)' : 'translateX(0)',
                      transitionDelay: `${(idx + 1) * 75}ms`
                    }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Images */}
        <div
          className={`flex mt-auto flex-1 items-end pb-2 transition-all duration-500
            ${slide.imageLayout === 'center' ? 'justify-center' : ''}
            ${slide.imageLayout === 'right' ? 'justify-end' : ''}
            ${slide.imageLayout === 'row' ? 'justify-center space-x-4' : ''}
          `}
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(20px) scale(0.95)' : 'translateY(0) scale(1)'
          }}
        >
          {slide.images.map((img, idx) => (
            <div
              key={idx}
              className={`relative transition-all duration-300 hover:scale-105
                ${slide.imageLayout === 'row' && slide.images.length === 3 ? 'flex-1 max-w-[180px] h-[280px]' : ''}
                ${slide.imageLayout === 'row' && slide.images.length === 2 ? 'w-[250px] h-[200px]' : ''}
                ${slide.imageLayout === 'center' ? 'w-[350px] h-[250px]' : ''}
                ${slide.imageLayout === 'right' ? 'w-[250px] h-[200px]' : ''}
              `}
              style={{
                transitionDelay: `${idx * 100 + 200}ms`
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={`rounded-lg object-contain transition-all duration-300
                  ${img.clickable ? 'cursor-pointer hover:opacity-80 hover:shadow-xl' : ''}`}
                onClick={() => img.clickable && showImage(img.src)}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 shadow-md
            ${currentSlide === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-white text-[#0091d2] hover:bg-[#0091d2] hover:text-white hover:scale-110'}`}
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 shadow-md
            ${currentSlide === slides.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-white text-[#0091d2] hover:bg-[#0091d2] hover:text-white hover:scale-110'}`}
        >
          &#8594;
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/process/campaign-data-key-considerations")}
        className="absolute bottom-10 left-10 bg-white text-[#0091d2] px-6 py-3 rounded-lg font-bold hover:bg-[#0091d2] hover:text-white transition-all duration-300 shadow-md hover:scale-105"
        style={{ fontFamily: "ubuntu" }}
      >
        Back to Campaign Data
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-white/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0091d2] transition-all duration-500 ease-out rounded-full"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Image Modal with Zoom */}
      {modalImage && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50 p-4 animate-fade-in"
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

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </main>
  );
}
