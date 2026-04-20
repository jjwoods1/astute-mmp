"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Card, Modal } from "@/components/ui";
import { SlideShell } from "@/components/ui/SlideShell";
import type { CampaignDataSlide } from "@/lib/process-data";
import { cn } from "@/lib/cn";

interface Props {
  slides: CampaignDataSlide[];
  eyebrow: string;
}

export function CampaignDataSlideFlow({ slides, eyebrow }: Props) {
  const [index, setIndex] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const slide = slides[index];

  return (
    <>
      <Card className="max-w-5xl">
        <div className="text-label text-brand-500 uppercase mb-6">{eyebrow}</div>

        <SlideShell
          index={index}
          total={slides.length}
          onPrev={() => setIndex((i) => Math.max(0, i - 1))}
          onNext={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
          onGoTo={setIndex}
        >
          <div className="flex gap-5 items-start mb-6">
            <div className="w-11 h-11 rounded-pill bg-brand-500 text-white font-bold flex items-center justify-center shrink-0 text-body">
              {slide.id}
            </div>
            <div className="flex-1 min-w-0">
              {slide.description ? (
                <p className="text-body text-neutral-500 mb-3">{slide.description}</p>
              ) : null}
              <h2 className="text-h2 text-neutral-900">{slide.title}</h2>
              {slide.bullets ? (
                <ul className="mt-5 flex flex-col gap-2">
                  {slide.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3 text-body text-neutral-700">
                      <span className="font-mono text-brand-500 font-bold shrink-0 pt-0.5" aria-hidden>→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div
            className={cn(
              "flex gap-4 pt-4 flex-wrap",
              slide.imageLayout === "center" && "justify-center",
              slide.imageLayout === "right" && "justify-end",
              slide.imageLayout === "row-3" && "justify-center",
              slide.imageLayout === "row-2" && "justify-center",
            )}
          >
            {slide.images.map((img, idx) => (
              <motion.div
                key={idx}
                className={cn(
                  "relative",
                  slide.imageLayout === "row-3" && "flex-1 max-w-[180px] h-[260px]",
                  slide.imageLayout === "row-2" && "w-[250px] h-[200px]",
                  slide.imageLayout === "center" && "w-[360px] h-[240px]",
                  slide.imageLayout === "right" && "w-[240px] h-[200px]",
                )}
                whileHover={img.clickable ? { scale: 1.03 } : undefined}
                whileTap={img.clickable ? { scale: 0.98 } : undefined}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={cn(
                    "object-contain",
                    img.clickable && "cursor-pointer hover:opacity-80 transition-opacity",
                  )}
                  onClick={() => img.clickable && setModalImage(img.src)}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </SlideShell>
      </Card>

      {/* Image zoom modal — reuses the shared Modal primitive but injects
          the raw image so we can keep fit-to-screen behaviour. */}
      <AnimatePresence>
        {modalImage ? (
          <Modal isOpen={!!modalImage} onClose={() => setModalImage(null)} size="xl">
            <div className="relative w-full aspect-[4/3]">
              <Image src={modalImage} alt="Zoomed" fill className="object-contain" />
            </div>
          </Modal>
        ) : null}
      </AnimatePresence>
    </>
  );
}
