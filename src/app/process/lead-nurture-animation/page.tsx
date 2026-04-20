"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProcessSubPageShell } from "@/components/ProcessSubPageShell";
import { Card } from "@/components/ui";
import { LEAD_NURTURE_SLIDES } from "@/lib/process-data";

export default function LeadNurtureAnimationPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const slide = LEAD_NURTURE_SLIDES[index];
  const total = LEAD_NURTURE_SLIDES.length;

  const go = (delta: 1 | -1) => {
    setDirection(delta);
    setIndex((i) => (i + delta + total) % total);
  };

  return (
    <ProcessSubPageShell activeId="lead-nurture">
      <Card className="max-w-2xl">
        <div className="text-label text-brand-500 uppercase mb-5">Lead Nurture Animation</div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {slide.video ? (
              <iframe
                className="w-full aspect-video rounded-md mb-6"
                src={slide.video}
                frameBorder="0"
                allowFullScreen
                title={slide.title}
              />
            ) : (
              <div className="w-full aspect-video rounded-md mb-6 bg-brand-50 flex items-center justify-center text-neutral-400 text-body-sm">
                No video for this entry
              </div>
            )}
            <div className="text-h3 text-neutral-900 mb-2">{slide.title}</div>
            <blockquote className="text-body text-neutral-700 leading-relaxed border-l-2 border-brand-500 pl-4 my-4">
              {slide.description}
            </blockquote>
            <div className="text-body-sm text-neutral-500 italic">— {slide.author}</div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-200">
          <button
            onClick={() => go(-1)}
            className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 transition-colors"
            aria-label="Previous slide"
          >
            <span>←</span>
            <span>Previous</span>
          </button>
          <div className="flex items-center gap-2">
            {LEAD_NURTURE_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2 h-2 rounded-pill transition-colors ${i === index ? "bg-brand-500" : "bg-neutral-300 hover:bg-neutral-400"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 transition-colors"
            aria-label="Next slide"
          >
            <span>Next</span>
            <span>→</span>
          </button>
        </div>
      </Card>
    </ProcessSubPageShell>
  );
}
