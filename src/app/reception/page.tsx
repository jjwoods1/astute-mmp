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

      {/* Hotspots */}
      <Link href="/company-map">
        <div className="hotspot" style={{ top: "59.9%", left: "29.5%" }} title="Company Map" />
      </Link>
      <Link href="/hall-of-fame">
        <div className="hotspot" style={{ top: "31.9%", left: "67.8%" }} title="Hall of Fame" />
      </Link>
      <Link href="/process">
        <div className="hotspot" style={{ top: "24.3%", left: "41.0%" }} title="Process" />
      </Link>
      <Link href="/testimonials/video">
        <div className="hotspot" style={{ top: "31.9%", left: "78.4%" }} title="Testimonials" />
      </Link>
      <Link href="/whiteboard">
        <div className="hotspot" style={{ top: "39.9%", left: "56.1%" }} title="Whiteboard" />
      </Link>
      <Link href="/fte-role">
        <div className="hotspot" style={{ top: "55.2%", left: "67.8%" }} title="FTE Role" />
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
