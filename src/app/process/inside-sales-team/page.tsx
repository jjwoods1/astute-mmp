"use client";

import { useState } from "react";
import Image from "next/image";
import { ProcessSubPageShell } from "@/components/ProcessSubPageShell";
import { Card, Modal } from "@/components/ui";
import { INSIDE_SALES_BULLETS } from "@/lib/process-data";

export default function InsideSalesTeamPage() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <ProcessSubPageShell activeId="inside-sales">
      <div className="max-w-2xl">
        <Card>
          <div className="text-label text-brand-500 uppercase mb-5">Inside Sales Team Contracts</div>
          <ul className="flex flex-col gap-2.5">
            {INSIDE_SALES_BULLETS.map((item) => (
              <li key={item} className="flex gap-3 text-body text-neutral-700">
                <span className="font-mono text-brand-500 font-bold shrink-0 pt-0.5" aria-hidden>→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowVideo(true)}
            className="mt-6 group relative rounded-lg overflow-hidden ring-1 ring-neutral-200 hover:ring-brand-500 transition-all"
          >
            <Image src="/images/video-thumbnail.jpg" alt="Click to play video" width={320} height={180} className="block" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
              <span className="w-14 h-14 rounded-pill bg-white/95 text-brand-500 flex items-center justify-center text-2xl shadow-md">▶</span>
            </span>
          </button>
        </Card>
      </div>

      <Modal isOpen={showVideo} onClose={() => setShowVideo(false)} size="xl">
        <iframe
          className="w-full aspect-video rounded-lg"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          frameBorder="0"
          allowFullScreen
          title="Inside Sales Team"
        />
      </Modal>
    </ProcessSubPageShell>
  );
}
