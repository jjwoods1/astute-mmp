"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Modal, SectionHeader } from "@/components/ui";
import { FadeIn, StaggerChildren, StaggerItem, HoverLift } from "@/components/motion";

interface ApiVideoTestimonial {
  id: number;
  companyTag?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface FormattedTestimonial {
  id: number;
  companyTag: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const cleanImageUrl = (url: string | undefined): string => {
  if (!url || url.includes("/undefined/") || url.trim() === "") return "/images/default-thumbnail.jpg";
  if (url.startsWith("http") || url.startsWith("gs://")) return url;
  return url.startsWith("/") ? url : `/images/${url}`;
};

const cleanVideoUrl = (url: string | undefined): string => {
  if (!url || url.includes("/undefined/") || url.trim() === "") return "";
  if (url.startsWith("http") || url.startsWith("gs://")) return url;
  return `/${url.replace(/^\/+/, "")}`;
};

export default function VideoTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<FormattedTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/video-testimonials");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: ApiVideoTestimonial[] = await res.json();
        setTestimonials(
          (data || []).map((item) => ({
            id: item.id,
            companyTag: item.companyTag || "Unknown",
            thumbnailUrl: cleanImageUrl(item.thumbnailUrl),
            videoUrl: cleanVideoUrl(item.videoUrl),
          })),
        );
      } catch (err) {
        console.error("Error fetching video testimonials:", err);
        setError("Error loading testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu text-neutral-900">
      <div className="max-w-6xl mx-auto px-10 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <FadeIn y={0} duration={0.4}>
            <SectionHeader
              eyebrow="Testimonials · Video"
              title="Video Testimonials"
              lede="Click a thumbnail to play."
            />
          </FadeIn>
          <FadeIn y={0} duration={0.4} delay={0.1}>
            <nav className="flex items-center gap-1">
              <Link href="/testimonials/written">
                <Button variant="ghost" size="sm">Written</Button>
              </Link>
              <Link href="/telemarketing-guide">
                <Button variant="ghost" size="sm">Guide</Button>
              </Link>
              <Link href="/reception">
                <Button variant="secondary" size="sm">← Reception</Button>
              </Link>
            </nav>
          </FadeIn>
        </div>

        {error ? <p className="text-red-500">{error}</p> : null}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-video rounded-lg bg-white border border-neutral-200 animate-pulse" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-body text-neutral-500 py-16 text-center">No video testimonials available.</div>
        ) : (
          <StaggerChildren stagger={0.06} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <StaggerItem key={t.id}>
                <HoverLift>
                  <Card
                    interactive
                    padded={false}
                    onClick={() => setSelectedVideo(t.videoUrl)}
                    className="overflow-hidden group"
                  >
                    <div className="relative aspect-video bg-neutral-900">
                      <Image
                        src={t.thumbnailUrl}
                        alt={`${t.companyTag} testimonial`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
                        <span className="w-14 h-14 rounded-pill bg-white/95 text-brand-500 flex items-center justify-center text-2xl shadow-md">
                          ▶
                        </span>
                      </span>
                    </div>
                    {t.companyTag !== "Unknown" ? (
                      <div className="px-4 py-3 text-body-sm text-neutral-700 font-medium">{t.companyTag}</div>
                    ) : null}
                  </Card>
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>

      <Modal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} size="xl">
        {selectedVideo ? (
          <video src={selectedVideo} controls autoPlay className="w-full rounded-lg">
            Your browser does not support the video tag.
          </video>
        ) : null}
      </Modal>
    </main>
  );
}
