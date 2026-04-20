"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export interface PillNavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  items: PillNavItem[];
  baseColor?: string;
  pillColor?: string;
  pillTextColor?: string;
  hoverTextColor?: string;
  className?: string;
}

export default function PillNav({
  items,
  baseColor = "#ffffff",
  pillColor = "#0091d2",
  pillTextColor = "#ffffff",
  hoverTextColor = "#0091d2",
  className = "",
}: PillNavProps) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <motion.nav
      ref={navRef}
      className={`inline-flex items-center rounded-full p-1 ${className}`}
      style={{ backgroundColor: baseColor }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ul className="flex items-center gap-1 list-none m-0 p-0">
        {items.map((item, index) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const isHovered = hoveredIndex === index;

          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className="relative block px-5 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wide transition-colors duration-200 no-underline overflow-hidden"
                style={{
                  backgroundColor: pillColor,
                  color: isHovered ? hoverTextColor : pillTextColor,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated hover circle that expands from bottom */}
                <motion.span
                  className="absolute left-1/2 rounded-full pointer-events-none"
                  style={{
                    backgroundColor: baseColor,
                    width: "150%",
                    paddingBottom: "150%",
                    bottom: "-75%",
                    zIndex: 0,
                  }}
                  initial={{ scale: 0, x: "-50%" }}
                  animate={{
                    scale: isHovered ? 1.2 : 0,
                    x: "-50%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                />

                {/* Label container with slide animation */}
                <span className="relative z-10 block overflow-hidden">
                  {/* Default label - slides up on hover */}
                  <motion.span
                    className="block"
                    animate={{
                      y: isHovered ? -30 : 0,
                      opacity: isHovered ? 0 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    {item.label}
                  </motion.span>

                  {/* Hover label - slides in from bottom */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ color: hoverTextColor }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{
                      y: isHovered ? 0 : 30,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    {item.label}
                  </motion.span>
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.span
                    className="absolute left-1/2 -bottom-2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: baseColor }}
                    initial={{ scale: 0, x: "-50%" }}
                    animate={{ scale: 1, x: "-50%" }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                    }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
