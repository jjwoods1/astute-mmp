"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  // Handle F11 key press for fullscreen mode
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F11") {
        event.preventDefault(); // Prevent default browser behavior
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
        } else {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main
      className="flex flex-col items-center justify-center h-screen text-center bg-cover bg-center bg-no-repeat font-ubuntu"
      style={{
        backgroundImage: "url('/images/Astute Building image 3.png')",
      }}
    >
      {/* Semi-transparent overlay box */}
      <div className="bg-white bg-opacity-95 p-10 rounded-lg shadow-lg w-3/4 max-w-lg relative mt-8 flex flex-col items-center">

        {/* Company Logo */}
        <Image
          src="/images/Astute_logo_with_tag_line_3.png"
          alt="Astute MMP Logo"
          width={200}
          height={100}
          className="mb-4"
        />

        {/* Welcome Message */}
        <h1 className="text-4xl font-bold text-[#0091d2] mb-6">Welcome to Astute MMP</h1>
        <p className="text-lg text-gray-700 mb-8">Please choose where you'd like to go:</p>

        {/* Navigation Buttons */}
        <div className="flex flex-col space-y-4 w-full mb-6">
          <button
            onClick={() => router.push("/reception")}
            className="px-6 py-3 bg-[#0091d2] text-white rounded-lg text-lg hover:bg-blue-800 transition w-full"
          >
            Go to Reception
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition w-full"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Fullscreen Message */}
        <p className="text-sm text-gray-500">Press <span className="font-bold">F11</span> to enter/exit fullscreen mode.</p>
      </div>
    </main>
  );
}
