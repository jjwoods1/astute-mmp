"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, SectionHeader } from "@/components/ui";
import { FadeIn } from "@/components/motion";

export default function TelemarketingGuidePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="flex flex-col h-screen bg-neutral-50 font-ubuntu">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white px-8 py-5 flex items-center justify-between gap-6 flex-wrap">
        <FadeIn y={0} duration={0.4}>
          <SectionHeader eyebrow="Resource" title="Telemarketing Guide" />
        </FadeIn>
        <nav className="flex items-center gap-1">
          <Link href="/testimonials/video">
            <Button variant="ghost" size="sm">Video Testimonials</Button>
          </Link>
          <Link href="/testimonials/written">
            <Button variant="ghost" size="sm">Written Testimonials</Button>
          </Link>
          <Link href="/reception">
            <Button variant="secondary" size="sm">← Reception</Button>
          </Link>
        </nav>
      </header>

      {/* PDF area */}
      <div className="flex-grow p-6 bg-neutral-100 relative">
        {!loaded ? (
          <div className="absolute inset-6 flex items-center justify-center bg-white rounded-lg border border-neutral-200">
            <div className="text-body text-neutral-500 flex items-center gap-3">
              <span className="w-5 h-5 rounded-pill border-2 border-neutral-300 border-t-brand-500 animate-spin" aria-hidden />
              <span>Loading guide…</span>
            </div>
          </div>
        ) : null}
        <iframe
          src="/Telemarketing%20Guide%20-%20singular%20pages.pdf"
          className="w-full h-full rounded-lg border border-neutral-200 bg-white shadow-sm"
          onLoad={() => setLoaded(true)}
          title="Telemarketing Guide PDF"
        />
      </div>
    </main>
  );
}
