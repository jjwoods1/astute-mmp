"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PillNav from "@/components/PillNav";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

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

export default function VideoTestimonials() {
  const [testimonials, setTestimonials] = useState<FormattedTestimonial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/video-testimonials");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: ApiVideoTestimonial[] = await res.json();

        const formattedTestimonials: FormattedTestimonial[] = (data || []).map((item) => ({
          id: item.id,
          companyTag: item.companyTag || "Unknown",
          thumbnailUrl: cleanImageUrl(item.thumbnailUrl),
          videoUrl: cleanVideoUrl(item.videoUrl),
        }));

        setTestimonials(formattedTestimonials);
      } catch (err) {
        console.error("Error fetching video testimonials:", err);
        setError("Error loading testimonials. Please try again later.");
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <main style={{ backgroundColor: "#0091d2" }} className="text-white min-h-screen text-center p-6">
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Video Testimonials
      </motion.h1>

      <div className="my-6 flex justify-center">
        <PillNav
          items={[
            { label: "Video", href: "/testimonials/video" },
            { label: "Written", href: "/testimonials/written" },
            { label: "Telemarketing Guide", href: "/telemarketing-guide" },
            { label: "Reception", href: "/reception" },
          ]}
        />
      </div>

      <motion.h2
        className="text-xl my-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Click On A Picture To View Our Video Testimonials
      </motion.h2>

      {error && <p className="text-red-500">{error}</p>}

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {testimonials.length === 0 && !error ? (
          <p className="text-lg">Loading testimonials...</p>
        ) : (
          testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="cursor-pointer"
              onClick={() => setSelectedVideo(testimonial.videoUrl)}
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={testimonial.thumbnailUrl}
                alt="Testimonial Thumbnail"
                width={200}
                height={150}
                className="rounded-lg w-auto h-auto shadow-lg"
                unoptimized
              />
            </motion.div>
          ))
        )}
      </motion.div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative bg-white p-4 rounded-lg max-w-lg w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full"
                onClick={() => setSelectedVideo(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                &times;
              </motion.button>
              <video src={cleanVideoUrl(selectedVideo)} controls className="w-full rounded-lg">
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
