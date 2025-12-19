"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function FTERole() {
  const router = useRouter();

  // Load Ubuntu font from Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Adjusted hexagon positions & updated labels
  const hexagonSections = [
    { id: "sdr", label: "SDR", top: "16%", left: "50%" },
    { id: "ldr", label: "LDR", top: "34%", left: "27%" },
    { id: "spm", label: "SPM", top: "34%", left: "73%" },
    { id: "csdr", label: "CSDR", top: "61%", left: "27%" }, // Updated from CSRD
    { id: "cldr", label: "CLDR", top: "61%", left: "73%" }, // Updated from CLOR
    { id: "account-manager", label: "Account Manager", top: "80%", left: "50%" },
  ];

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100"
      style={{ fontFamily: "Ubuntu, sans-serif" }}
    >
      {/* Computer Frame */}
      <div className="relative w-[900px] h-[550px] flex items-center justify-center">
        <Image
          src="/images/astute-computer-screen.png"
          alt="Astute Computer Screen"
          width={900}
          height={550}
          priority
        />

        {/* Interactive Content (Honeycomb Layout) */}
        <div className="absolute w-[750px] h-[500px] flex items-center justify-center top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Central Hexagon (Updated Text) */}
          <div
            className="absolute w-40 h-40 text-white flex flex-col items-center justify-center text-center font-bold text-lg shadow-lg p-4"
            style={{
              backgroundColor: "#0091d2",
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              top: "48%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(0deg)",
            }}
          >
            <span className="text-lg">FTE Roles within Clients</span> {/* Updated Text */}
          </div>

          {/* Surrounding Hexagon Buttons */}
          {hexagonSections.map((section) => (
            <button
              key={section.id}
              className="absolute w-32 h-32 flex items-center justify-center text-center font-medium p-3 transition cursor-pointer"
              style={{
                top: section.top,
                left: section.left,
                transform: "translate(-50%, -50%) rotate(0deg)",
                backgroundColor: "white",
                color: "#0091d2",
                outline: "3px solid #0091d2",
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                fontSize: "14px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0091d2";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#0091d2";
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Back to Reception Button */}
      <div className="w-full flex justify-center mt-8">
        <button
          onClick={() => router.push("/reception")}
          className="px-4 py-2 rounded-md font-semibold text-white transition"
          style={{
            backgroundColor: "#0091d2",
            fontFamily: "Ubuntu, sans-serif",
            fontSize: "14px",
            border: "2px solid white",
            position: "fixed",
            bottom: "40px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#007bb5";
            e.currentTarget.style.border = "2px solid #ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0091d2";
            e.currentTarget.style.border = "2px solid white";
          }}
        >
          ⬅ Back to Reception
        </button>
      </div>
    </main>
  );
}
