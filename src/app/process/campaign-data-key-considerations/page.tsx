"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// New Company Data Slides
const newCompanyDataSlides = [
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
    imageLayout: "row-3"
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
    imageLayout: "row-2"
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

// Enhance Target Database Slides
const enhanceTargetDatabaseSlides = [
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

type SlideType = 'none' | 'new-company' | 'enhance-database';

export default function CampaignDataKeyConsiderations() {
  const router = useRouter();
  const pathname = usePathname();

  const [activeSlideSet, setActiveSlideSet] = useState<SlideType>('none');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSlideAnimating, setIsSlideAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const sidebarLinks = [
    { href: "/process/campaign-data-key-considerations", title: "Campaign Data - Key Considerations" },
    { href: "/process/campaign-planning-cycle", title: "Campaign Planning Cycle" },
    { href: "/process/campaign-in-progress", title: "Campaign in Progress" },
    { href: "/process/market-platform-approach", title: "Market Platform Approach" },
    { href: "/process/inside-sales-team", title: "Inside Sales Team" },
    { href: "/process/managed-prospect-stack", title: "Managed Prospect Stack" },
    { href: "/process/lead-nurture-animation", title: "Lead Nurture Animation" }
  ];

  const slides = activeSlideSet === 'new-company' ? newCompanyDataSlides : enhanceTargetDatabaseSlides;
  const slideTitle = activeSlideSet === 'new-company'
    ? 'Campaign Data – Key Considerations'
    : 'Target Database – Key Considerations';

  const openSlideSet = (type: SlideType) => {
    setIsTransitioning(true);
    setCurrentSlide(0);
    setActiveSlideSet(type);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const closeSlideSet = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setActiveSlideSet('none');
      setCurrentSlide(0);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide || isSlideAnimating) return;

    setSlideDirection(index > currentSlide ? 'next' : 'prev');
    setIsSlideAnimating(true);

    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => {
        setIsSlideAnimating(false);
      }, 50);
    }, 250);
  };

  // Image modal handlers
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
  const isShowingSlides = activeSlideSet !== 'none';

  // SELECTION VIEW (Original page with sidebar)
  if (!isShowingSlides) {
    return (
      <main className={`relative min-h-screen flex items-center p-10 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/Process Page - resize.png')",
            filter: "blur(8px)",
            zIndex: -1
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

        {/* Sidebar */}
        <aside className="fixed right-0 top-0 h-full w-80 bg-[#0091d2] p-6 flex flex-col justify-between shadow-lg z-10">
          <nav className="space-y-3">
            {sidebarLinks.map(({ href, title }) => (
              <Link
                key={title}
                href={href}
                className={`block text-lg font-medium py-4 px-4 rounded-lg transition ${
                  pathname === href
                    ? "bg-white text-[#0091d2] font-bold shadow-md"
                    : "text-white hover:bg-white hover:text-[#0091d2]"
                }`}
              >
                {title}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => router.push("/reception")}
            className="bg-white text-[#0091d2] p-3 rounded-lg font-bold hover:bg-[#007bb0] hover:text-white transition"
          >
            Back to Reception
          </button>
        </aside>

        {/* Content Container */}
        <div className="flex flex-col items-center w-full max-w-5xl pr-96 ml-auto mr-auto z-10 space-y-10">
          {/* Title Box */}
          <div className="bg-white text-[#0091d2] text-2xl font-extrabold px-8 py-4 rounded-xl border-4 border-[#0091d2] shadow-xl text-center">
            Campaign Data - Key Considerations
          </div>

          {/* Main Action Box */}
          <div className="bg-white p-12 rounded-2xl shadow-2xl text-black w-full border-4 border-gray-300 flex flex-col items-center space-y-6 text-center">
            <button
              onClick={() => openSlideSet('new-company')}
              className="block bg-[#0091d2] text-white px-8 py-5 rounded-xl text-lg font-semibold transition hover:bg-white hover:text-[#0091d2] hover:scale-105 w-[90%] shadow-md text-center"
            >
              Would you like to purchase <span className="font-bold">NEW</span> company data?
            </button>

            <p className="text-[#0091d2] text-xl font-semibold">or / and</p>

            <button
              onClick={() => openSlideSet('enhance-database')}
              className="block bg-[#0091d2] text-white px-8 py-5 rounded-xl text-lg font-semibold transition hover:bg-white hover:text-[#0091d2] hover:scale-105 w-[90%] shadow-md text-center"
            >
              Enhance a current target database that you hold in-house?
            </button>
          </div>
        </div>
      </main>
    );
  }

  // SLIDE VIEW (Full screen like original slide pages)
  return (
    <main
      className={`relative min-h-screen flex items-center justify-center text-black font-[ubuntu] transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
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
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition
              ${
                index === currentSlide
                  ? "bg-[#0091d2] text-white"
                  : "bg-white text-[#0091d2] border-2 border-[#0091d2] hover:bg-[#0091d2] hover:text-white"
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
        {slideTitle}
      </div>

      {/* Content Box */}
      <div
        className={`bg-white p-8 rounded-xl shadow-lg w-[65%] h-[550px] flex flex-col mt-32 text-gray-800 transition-all duration-300 ease-out
          ${isSlideAnimating
            ? slideDirection === 'next'
              ? 'opacity-0 translate-x-8'
              : 'opacity-0 -translate-x-8'
            : 'opacity-100 translate-x-0'
          }`}
      >
        {/* Header with Numbered Circle */}
        <div className="flex items-start">
          <div
            className="w-12 h-12 flex items-center justify-center text-white text-xl font-bold rounded-full mr-4"
            style={{ backgroundColor: "#0091d2" }}
          >
            {slide?.id}
          </div>
          <div>
            {slide?.description && (
              <p className="text-lg text-gray-700 mb-6">
                {slide.description}
              </p>
            )}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {slide?.title}
            </h1>
            {slide?.bullets && (
              <ul className="text-lg list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                {slide.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Images */}
        <div
          className={`flex mt-auto flex-1 items-end pb-2
            ${slide?.imageLayout === 'center' ? 'justify-center' : ''}
            ${slide?.imageLayout === 'right' ? 'justify-end' : ''}
            ${slide?.imageLayout === 'row-3' ? 'justify-center space-x-4' : ''}
            ${slide?.imageLayout === 'row-2' ? 'justify-center space-x-6' : ''}
          `}
        >
          {slide?.images.map((img, idx) => (
            <div
              key={idx}
              className={`relative
                ${slide.imageLayout === 'row-3' ? 'flex-1 max-w-[180px] h-[280px]' : ''}
                ${slide.imageLayout === 'row-2' ? 'w-[250px] h-[200px]' : ''}
                ${slide.imageLayout === 'center' ? 'w-[350px] h-[250px]' : ''}
                ${slide.imageLayout === 'right' ? 'w-[250px] h-[200px]' : ''}
              `}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={`rounded-lg object-contain transition
                  ${img.clickable ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={() => img.clickable && showImage(img.src)}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={closeSlideSet}
        className="absolute bottom-10 left-10 bg-white text-[#0091d2] px-6 py-3 rounded-lg font-bold hover:bg-[#0091d2] hover:text-white transition shadow-md"
        style={{ fontFamily: "ubuntu" }}
      >
        Back to Campaign Data
      </button>

      {/* Image Modal */}
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
