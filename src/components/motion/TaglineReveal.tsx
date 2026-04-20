"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface TaglineRevealProps {
  words: string[];
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  separator?: string;
}

export function TaglineReveal({
  words,
  className,
  wordClassName,
  stagger = 0.12,
  delay = 0.1,
  separator = " ",
}: TaglineRevealProps) {
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={words.join(separator)}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={cn("inline-block", wordClassName)}
          variants={{
            hidden: { opacity: 0, y: "0.4em" },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          aria-hidden
        >
          {word}
          {i < words.length - 1 ? <span className="inline-block">{separator}</span> : null}
        </motion.span>
      ))}
    </motion.span>
  );
}
