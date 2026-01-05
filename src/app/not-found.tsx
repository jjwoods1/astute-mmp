"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-ubuntu">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('/images/25 Oxford Road Reception.png')",
          filter: "blur(8px)",
        }}
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Content */}
      <div className="text-center z-10 px-8">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/Astute_logo_with_tag_line_3.png"
            alt="Astute MMP Logo"
            width={200}
            height={100}
            className="mx-auto drop-shadow-lg"
            priority
          />
        </div>

        {/* 404 Text */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-white drop-shadow-lg mb-2">
            404
          </h1>
          <div className="w-24 h-1 bg-[#0091d2] mx-auto rounded-full" />
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
          Page Not Found
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-[#0091d2] transition-all duration-300 shadow-lg"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push("/reception")}
            className="px-6 py-3 bg-[#0091d2] text-white border-2 border-[#0091d2] rounded-lg font-semibold hover:bg-white hover:text-[#0091d2] transition-all duration-300 shadow-lg"
          >
            Back to Reception
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 bg-[#0091d2] rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-[#0091d2] rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 bg-[#0091d2] rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </main>
  );
}
