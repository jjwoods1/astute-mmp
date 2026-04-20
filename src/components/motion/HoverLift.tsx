"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface HoverLiftProps extends Omit<HTMLMotionProps<"div">, "whileHover" | "whileTap"> {
  lift?: number;
  children: ReactNode;
}

export function HoverLift({ lift = 4, children, ...rest }: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y: -lift }}
      whileTap={{ y: -lift / 2 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
