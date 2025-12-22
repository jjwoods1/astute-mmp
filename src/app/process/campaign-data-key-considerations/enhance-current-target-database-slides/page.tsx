"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Slide data - all content in one place
const slides = [
  {
    id: 1,
    description: "If you would like to enhance a current database before calling, consider the following aspects:",
    title: "Are you confident that the companies you would like to enhance fall within your target market?",
    images: [
      { src: "/images/Data icon with +.png", alt: "Data Icon with Plus", clickable: false }
    ],
    imageLayout: "right"
  },
  {
    id: 2,
    title: "Does your current data include large volumes of company/contact duplications, and how fresh is your data?",
    images: [
      { src: "/images/Data With Question Marks.png", alt: "Data with Question Marks", clickable: false }
    ],
    imageLayout: "right"
  },
  {
    id: 3,
    title: "Would you like to purchase company-level / technical intelligence appends, as well as new contacts?",
    bullets: [
      "For example, volume of PC users",
      "Installed server vendor",
      "Installed security vendor",
      "Installed PBX vendor",
      "and more..."
    ],
    images: [
      { src: "/images/New Data.png", alt: "New Data", clickable: false }
    ],
    imageLayout: "right"
  },
  {
    id: 4,
    title: "Would you like to purchase companies within your identified target market, but NOT in your current prospect database?",
    images: [
      { src: "/images/Search Data.png", alt: "Database Search Icon", clickable: false }
    ],
    imageLayout: "right"
  },
  {
    id: 5,
    title: "Do you require contacts with email addresses?",
    images: [
      { src: "/images/Email Data.png", alt: "Email Data Icon", clickable: false }
    ],
    imageLayout: "right"
  },
  {
    id: 6,
    title: "Would you like to procure multiple contacts or single contacts per company?",
    bullets: [
      "Single contacts allow the purchase of more companies within your budget",
      "Multiple contacts provide more avenues into larger organisations, increasing your chance of booking a meeting with your target companies"
    ],
    images: [
      { src: "/images/2 pages.png", alt: "Multiple Contacts", clickable: false }
    ],
    imageLayout: "right"
  },
  {
    id: 7,
    title: "Are there any suppression files we should remove from the data you would like to purchase?",
    bullets: [
      "Customer suppressions",
      "Top prospect suppressions",
      "Opt-out contacts"
    ],
    images: [
      { src: "/images/data-with-one-page.png", alt: "Suppression Files", clickable: false }
    ],
    imageLayout: "right"
  }
];

export default function EnhanceTargetDatabaseSlides() {
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
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300 transform
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
        Target Database – Key Considerations
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
            {slide.description && (
              <p
                className="text-lg text-gray-700 mb-4 transition-all duration-300"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)'
                }}
              >
                {slide.description}
              </p>
            )}

            <h1
              className="text-2xl font-bold text-gray-900 mb-4 transition-all duration-300"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)',
                transitionDelay: slide.description ? '75ms' : '0ms'
              }}
            >
              {slide.title}
            </h1>

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
              className="relative w-[250px] h-[200px] transition-all duration-300 hover:scale-105"
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
