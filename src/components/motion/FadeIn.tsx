"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> {
  delay?: number;
  duration?: number;
  y?: number;
  /**
   * When true, wait until the element intersects the viewport before animating.
   * Default false — animate on mount. Scroll-triggered behaviour proved
   * unreliable when components mount after an async delay, so mount-triggered
   * is the safer default.
   */
  scrollTriggered?: boolean;
  children: ReactNode;
}

export function FadeIn({
  delay = 0,
  duration = 0.5,
  y = 12,
  scrollTriggered = false,
  children,
  ...rest
}: FadeInProps) {
  const motionProps = scrollTriggered
    ? {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      }
    : {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      {...motionProps}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
