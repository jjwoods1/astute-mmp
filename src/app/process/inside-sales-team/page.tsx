"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function InsideSalesTeam() {
  const router = useRouter();
  const pathname = usePathname();
  const [showVideo, setShowVideo] = useState(false);

  const sidebarLinks = [
    { href: "/process/campaign-planning-cycle", title: "Campaign Planning Cycle" },
    { href: "/process/campaign-data-key-considerations", title: "Campaign Data - Key Considerations" },
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

      {/* Content Area */}
      <div className="flex flex-col items-center w-full max-w-5xl pr-96 ml-auto mr-auto z-10">
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-gray-300 w-full max-w-[600px] text-center">
          {/* Title */}
          <div className="bg-white text-[#0091d2] text-lg font-bold px-6 py-2 rounded-full shadow-md border border-gray-300 inline-block mb-6">
            Inside Sales Team Contracts
          </div>

          {/* Bullet List */}
          <ul className="text-lg text-[#003d5c] space-y-3 text-left">
            <li>• Experienced Graduate Agents</li>
            <li>• Take Sales Process Through to Closure</li>
            <li>• Full Quotation and Order Processing Agreed</li>
            <li>• Clear Pipeline and Quarterly Closed Sales Targets</li>
            <li>• Minimum 12-Month Partnership Contract Agreements</li>
            <li>• Relationship Consultancy Set-up Cost</li>
            <li>• 3Com and SonicWALL Renewals</li>
          </ul>

          {/* Video Thumbnail */}
          <div className="mt-6 flex justify-center">
            <button onClick={() => setShowVideo(true)} className="relative">
              <Image
                src="/images/video-thumbnail.jpg"
                alt="Click to Play Video"
                width={250}
                height={140}
                className="rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-transform hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">▶</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg max-w-3xl w-full shadow-xl">
            <button
              className="absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-gray-900"
              onClick={() => setShowVideo(false)}
            >
              &times;
            </button>
            <iframe
              className="w-full h-96 rounded-lg"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </main>
  );
}
