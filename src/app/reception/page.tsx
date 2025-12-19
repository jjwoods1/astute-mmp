"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background Image - Updated */}
      <Image
        src="/images/mmp-front-page-image.png"
        alt="Reception"
        layout="fill"
        objectFit="cover"
      />

      {/* Hotspots - Corrected Page Links */}
      <Link href="/testimonials/video">
        <div className="hotspot" style={{ top: "31.9%", left: "67.8%" }} title="Video Testimonials" />
      </Link>
      <Link href="/campaign-data">
        <div className="hotspot" style={{ top: "31.9%", left: "78.4%" }} title="Campaign Data" />
      </Link>
      <Link href="/process/campaign-data-key-considerations">
        <div className="hotspot" style={{ top: "24.3%", left: "41.0%" }} title="Process" />
      </Link>
      <Link href="/company-map">
        <div className="hotspot" style={{ top: "59.9%", left: "29.5%" }} title="Company Map" />
      </Link>
      <Link href="/system-demonstration">
        <div className="hotspot" style={{ top: "39.9%", left: "56.1%" }} title="System Demonstration" />
      </Link>
      <Link href="/agent">
        <div className="hotspot" style={{ top: "55.2%", left: "67.8%" }} title="Agent Page" />
      </Link>

      {/* Tailwind Styles */}
      <style jsx>{`
        .hotspot {
          position: absolute;
          background-color: #0091d2;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          cursor: pointer;
          animation: pulse 1.5s infinite;
        }
        .hotspot:hover {
          background-color: #006ca3;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
