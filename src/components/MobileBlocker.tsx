"use client";

import Image from "next/image";

export default function MobileBlocker() {
  return (
    <div className="lg:hidden fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700 p-8">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/images/astute-logo.png"
          alt="Astute Logo"
          width={180}
          height={54}
          className="drop-shadow-lg"
          priority
        />
      </div>

      {/* Icon */}
      <div className="mb-6">
        <svg
          className="w-24 h-24 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Message */}
      <div className="text-center max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-4">
          Desktop Only
        </h1>
        <p className="text-white/90 text-lg leading-relaxed mb-6">
          This presentation is designed for desktop and large screen viewing.
        </p>
        <p className="text-white/70 text-sm">
          Please access this application from a desktop computer, laptop, or tablet in landscape mode.
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="mt-10 flex gap-2">
        <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
        <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
      </div>

      {/* Minimum width indicator */}
      <div className="absolute bottom-6 text-white/40 text-xs">
        Minimum screen width: 1024px
      </div>
    </div>
  );
}
