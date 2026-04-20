"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function LeadNurtureAnimation() {
  const router = useRouter();
  const pathname = usePathname();
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_1",
      title: "Lead Nurture (Short)",
      description: `“A sustained relationship with (the) influencers and decision-makers in a potential customer, 
      through which relevant and valuable insight is delivered through integrated channels in a coordinated process, 
      in exchange for increasing intimacy and influence.”`,
      author: "Forrester Research",
    },
    {
      video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2",
      title: "Lead Nurture (Long)",
      description: `“Effective nurturing strategies are built around the customer’s journey through the buying process.”`,
      author: "Lori Wizdo, Forrester Research",
    },
    {
      video: "",
      title: "Email & Lead Nurturing Stats",
      description: `“Over-emailing and irrelevant content are the top reasons people unsubscribe from email mailing lists.”`,
      author: "Chadwick Martin Bailey",
    },
  ];

  const nextSlide = () => {
    setSlideIndex((slideIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((slideIndex - 1 + slides.length) % slides.length);
  };

  const sidebarLinks = [
    { href: "/process/campaign-data-key-considerations", title: "Campaign Data - Key Considerations" },
    { href: "/process/campaign-planning-cycle", title: "Campaign Planning Cycle" },
    { href: "/process/campaign-in-progress", title: "Campaign in Progress" },
    { href: "/process/market-platform-approach", title: "Market Platform Approach" },
    { href: "/process/inside-sales-team", title: "Inside Sales Team" },
    { href: "/process/managed-prospect-stack", title: "Managed Prospect Stack" },
    { href: "/process/lead-nurture-animation", title: "Lead Nurture Animation" }
  ];

  return (
    <main className="relative min-h-screen flex items-center p-10">
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

      {/* Centered Content Area */}
      <div className="flex flex-col items-center w-full max-w-5xl pr-96 ml-auto mr-auto z-10">
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-gray-300 w-full max-w-[700px] h-[680px] text-center flex flex-col">
          {/* Title Box */}
          <div className="bg-white text-[#0091d2] text-lg font-bold px-6 py-2 rounded-full shadow-md border border-gray-300 inline-block mb-6">
            Lead Nurture Animation
          </div>

          {/* Slideshow */}
          <div className="flex flex-col items-center text-left flex-1">
            {slides[slideIndex].video ? (
              <iframe
                className="w-full h-64 rounded-lg shadow-md mb-4"
                src={slides[slideIndex].video}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-64 mb-4"></div>
            )}
            <h2 className="text-xl font-bold text-[#0091d2]">{slides[slideIndex].title}</h2>
            <p className="text-gray-800 mt-2">{slides[slideIndex].description}</p>
            <p className="text-gray-500 italic mt-2">{slides[slideIndex].author}</p>
          </div>

          {/* Navigation Buttons - Inside the box */}
          <div className="flex justify-between mt-auto pt-4">
            <button
              onClick={prevSlide}
              className="text-[#0091d2] text-2xl font-bold px-6 py-3 rounded-lg hover:bg-[#e6f7fc] transition border border-[#0091d2]"
            >
              &#9665;
            </button>
            <button
              onClick={nextSlide}
              className="text-[#0091d2] text-2xl font-bold px-6 py-3 rounded-lg hover:bg-[#e6f7fc] transition border border-[#0091d2]"
            >
              &#9655;
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
