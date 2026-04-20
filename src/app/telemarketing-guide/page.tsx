"use client";

import Link from "next/link";

export default function TelemarketingGuide() {
  return (
    <main className="flex flex-col h-screen bg-gray-100" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
      {/* Header Section */}
      <header className="p-6 text-white text-center" style={{ backgroundColor: '#0091d2' }}>
        <h1 className="text-3xl font-bold">Telemarketing Guide</h1>
        <nav className="mt-4">
          <Link href="/testimonials/video" className="mx-4 text-white hover:underline">
            Video Testimonials
          </Link>
          <Link href="/testimonials/written" className="mx-4 text-white hover:underline">
            Written Testimonials
          </Link>
          <Link href="/reception" className="mx-4 text-white hover:underline">
            Back to Reception
          </Link>
        </nav>
      </header>

      {/* PDF Embed */}
      <div className="flex-grow">
        <iframe
          src="/Telemarketing%20Guide%20-%20singular%20pages.pdf"
          className="w-full h-full border-none"
        />
      </div>
    </main>
  );
}
