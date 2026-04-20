"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface StaggerChildrenProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "variants"> {
  stagger?: number;
  delay?: number;
  /**
   * When true, wait until the element intersects the viewport before animating.
   * Default false — animate on mount. See FadeIn for rationale.
   */
  scrollTriggered?: boolean;
  children: ReactNode;
}

export function StaggerChildren({
  stagger = 0.08,
  delay = 0,
  scrollTriggered = false,
  children,
  ...rest
}: StaggerChildrenProps) {
  const variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const motionProps = scrollTriggered
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
        variants,
      }
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
        variants,
      };

  return (
    <motion.div {...motionProps} {...rest}>
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  y?: number;
  children: ReactNode;
}

export function StaggerItem({ y = 12, children, ...rest }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
