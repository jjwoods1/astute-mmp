"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SlideShellProps {
  index: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
  onGoTo?: (i: number) => void;
  children: ReactNode;
  className?: string;
  enableKeyboard?: boolean;
}

export function SlideShell({
  index,
  total,
  onPrev,
  onNext,
  onGoTo,
  children,
  className,
  enableKeyboard = true,
}: SlideShellProps) {
  useEffect(() => {
    if (!enableKeyboard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enableKeyboard, onPrev, onNext]);

  const atStart = index === 0;
  const atEnd = index === total - 1;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Progress bar */}
      <div className="flex items-center gap-1.5 mb-6" aria-label={`Slide ${index + 1} of ${total}`}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onGoTo?.(i)}
            className={cn(
              "h-1 flex-1 rounded-pill transition-colors",
              i <= index ? "bg-brand-500" : "bg-neutral-200 hover:bg-neutral-300",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
        <span className="ml-3 font-mono text-label text-neutral-400 whitespace-nowrap">
          {String(index + 1).padStart(2, "0")}
          <span className="opacity-50"> / {String(total).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav chevrons */}
      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          onClick={onPrev}
          disabled={atStart}
          className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4L6 8l4 4" />
          </svg>
          <span>Previous</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={atEnd}
          className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next slide"
        >
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
