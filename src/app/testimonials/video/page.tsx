"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default function VideoTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('video_testimonials')
        .select('*');

      if (error) throw error;

      const formattedTestimonials = (data || []).map((item) => ({
        id: item.id,
        companyTag: item.company_tag || "Unknown",
        thumbnailUrl: cleanImageUrl(item.thumbnail_url),
        videoUrl: cleanVideoUrl(item.video_url),
      }));

      setTestimonials(formattedTestimonials);
    } catch (err) {
      console.error("Error fetching video testimonials:", err);
      setError("Error loading testimonials. Please try again later.");
    }
  };

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

  return (
    <main style={{ backgroundColor: "#0091d2" }} className="text-white min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold">Video Testimonials</h1>

      <nav className="my-4">
        <Link href="/testimonials/written" className="mx-4 text-white hover:underline">
          Written Testimonials
        </Link>
        <Link href="/telemarketing-guide" className="mx-4 text-white hover:underline">
          Telemarketing Guide
        </Link>
        <Link href="/reception" className="mx-4 text-white hover:underline">
          Back to Reception
        </Link>
      </nav>

      <h2 className="text-xl my-6">Click On A Picture To View Our Video Testimonials</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {testimonials.length === 0 && !error ? (
          <p className="text-lg">Loading testimonials...</p>
        ) : (
          testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="cursor-pointer"
              onClick={() => setSelectedVideo(testimonial.videoUrl)}
            >
              <Image
                src={testimonial.thumbnailUrl}
                alt="Testimonial Thumbnail"
                width={200}
                height={150}
                className="rounded-lg transition transform hover:scale-105 w-auto h-auto"
                priority={index === 0}
                unoptimized
              />
            </div>
          ))
        )}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg max-w-lg w-full">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            <video src={cleanVideoUrl(selectedVideo)} controls className="w-full rounded-lg">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </main>
  );
}
