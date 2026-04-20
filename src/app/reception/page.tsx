"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Hotspot {
  href: string;
  label: string;
  top: string;
  left: string;
}

const HOTSPOTS: Hotspot[] = [
  { href: "/company-map",        label: "Company Map",  top: "59.9%", left: "29.5%" },
  { href: "/hall-of-fame",       label: "Hall of Fame", top: "31.9%", left: "67.8%" },
  { href: "/process",            label: "Process",      top: "24.3%", left: "41.0%" },
  { href: "/testimonials/video", label: "Testimonials", top: "31.9%", left: "78.4%" },
  { href: "/whiteboard",         label: "Whiteboard",   top: "39.9%", left: "56.1%" },
  { href: "/fte-role",           label: "FTE Role",     top: "55.2%", left: "67.8%" },
];

export default function ReceptionPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden font-ubuntu">
      {/* Background image */}
      <Image
        src="/images/mmp-front-page-image.png"
        alt="Reception"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Hotspots */}
      {HOTSPOTS.map((spot, i) => (
        <HotspotMarker key={spot.href} spot={spot} index={i} />
      ))}
    </main>
  );
}

function HotspotMarker({ spot, index }: { spot: Hotspot; index: number }) {
  return (
    <Link
      href={spot.href}
      aria-label={spot.label}
      className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
      style={{ top: spot.top, left: spot.left }}
    >
      {/* Outer breathing ring (always visible) */}
      <motion.span
        className="absolute inset-0 m-auto w-12 h-12 rounded-pill"
        style={{ background: "radial-gradient(circle, rgba(0,145,210,0.35), transparent 70%)" }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0.15, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
        aria-hidden
      />
      {/* Core dot */}
      <motion.span
        className="relative block w-12 h-12 rounded-pill bg-brand-500 shadow-brand-glow ring-4 ring-white/70 ring-offset-0 transition-colors group-hover:bg-brand-700 cursor-pointer"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.25 + index * 0.08 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Inner white pinprick */}
        <span className="absolute inset-0 m-auto w-2 h-2 rounded-pill bg-white" aria-hidden />
      </motion.span>

      {/* Hover label */}
      <span
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-3 whitespace-nowrap rounded-pill bg-neutral-900/90 text-white px-3 py-1 text-body-sm opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
      >
        {spot.label}
      </span>
    </Link>
  );
}
