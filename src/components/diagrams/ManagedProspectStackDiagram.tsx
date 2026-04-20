"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface FunnelSection {
  id: string;
  lines: string[];
  y: number;
  height: number;
}

// Funnel geometry — wide top, narrow bottom, centered on x=500.
const FUNNEL_TOP = 0;
const FUNNEL_BOTTOM = 940;
const FUNNEL_LEFT_TOP = 100;
const FUNNEL_RIGHT_TOP = 900;
const FUNNEL_LEFT_BOTTOM = 350;
const FUNNEL_RIGHT_BOTTOM = 650;

const SECTIONS: FunnelSection[] = [
  { id: "initial",  lines: ["Initial Contact Data"], y: 0, height: 160 },
  { id: "cleansed", lines: ["Cleansed Contact Records"], y: 160, height: 160 },
  { id: "dm",       lines: ["DM level Company Profile", "no. of desktops, no. of sites,", "applications etc\u2026", "Priorities & Challenges"], y: 320, height: 280 },
  { id: "held",     lines: ["Held leads", "e-fulfilment, DM xxxxx", "schedule call back, reporting"], y: 600, height: 220 },
  { id: "passed",   lines: ["Passed Leads"], y: 820, height: 120 },
];

function funnelLeftAt(y: number) {
  const t = (y - FUNNEL_TOP) / (FUNNEL_BOTTOM - FUNNEL_TOP);
  return FUNNEL_LEFT_TOP + (FUNNEL_LEFT_BOTTOM - FUNNEL_LEFT_TOP) * t;
}
function funnelRightAt(y: number) {
  const t = (y - FUNNEL_TOP) / (FUNNEL_BOTTOM - FUNNEL_TOP);
  return FUNNEL_RIGHT_TOP + (FUNNEL_RIGHT_BOTTOM - FUNNEL_RIGHT_TOP) * t;
}

const LINE_HEIGHT = 34;
const BRAND = "#0091d2";
const BRAND_DEEP = "#006ca0";
const OUTLINE = "#0f172a"; // neutral-900 — structural near-black

interface Props {
  className?: string;
}

export function ManagedProspectStackDiagram({ className }: Props) {
  return (
    <svg
      viewBox="0 0 1000 1360"
      className={cn("w-full h-auto", className)}
      role="img"
      aria-labelledby="mps-title mps-desc"
    >
      <title id="mps-title">Managed Prospect Stack</title>
      <desc id="mps-desc">
        A funnel showing the flow of contacts from raw data down to passed leads:
        Initial Contact Data to Cleansed Contact Records to DM level Company Profile
        (number of desktops, number of sites, applications, priorities and challenges)
        to Held leads (e-fulfilment, DM, scheduled call-back, reporting) to Passed
        Leads. Post-funnel stages: Sales Call / Appointment, Sales Cycle, COSE SALE
        RoMI, and Feedback.
      </desc>

      <defs>
        <linearGradient id="mps-pill-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND} />
          <stop offset="100%" stopColor={BRAND_DEEP} />
        </linearGradient>
        <filter id="mps-pill-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={BRAND_DEEP} floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Funnel outline */}
      <motion.path
        d={`M ${FUNNEL_LEFT_TOP} ${FUNNEL_TOP} L ${FUNNEL_RIGHT_TOP} ${FUNNEL_TOP} L ${FUNNEL_RIGHT_BOTTOM} ${FUNNEL_BOTTOM} L ${FUNNEL_LEFT_BOTTOM} ${FUNNEL_BOTTOM} Z`}
        fill="white"
        stroke={OUTLINE}
        strokeWidth={4}
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Section separator lines — horizontal, clipped to funnel edges */}
      {SECTIONS.slice(0, -1).map((s, i) => {
        const y = s.y + s.height;
        return (
          <motion.line
            key={`sep-${i}`}
            x1={funnelLeftAt(y)}
            y1={y}
            x2={funnelRightAt(y)}
            y2={y}
            stroke={OUTLINE}
            strokeWidth={3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.08, duration: 0.3 }}
          />
        );
      })}

      {/* Section text */}
      {SECTIONS.map((s, i) => {
        const totalTextHeight = (s.lines.length - 1) * LINE_HEIGHT;
        const firstLineY = s.y + s.height / 2 - totalTextHeight / 2;
        return (
          <motion.text
            key={s.id}
            textAnchor="middle"
            fontFamily="Ubuntu, sans-serif"
            fontSize="26"
            fontWeight={400}
            fill={OUTLINE}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 + i * 0.08, duration: 0.35 }}
          >
            {s.lines.map((line, idx) => (
              <tspan key={idx} x={500} y={firstLineY + idx * LINE_HEIGHT} dominantBaseline="middle">
                {line}
              </tspan>
            ))}
          </motion.text>
        );
      })}

      {/* Post-funnel blue pills */}
      <Pill cx={500} cy={1050} w={420} h={62} label="Sales Call / Appointment" delay={0.95} />
      <Pill cx={500} cy={1140} w={420} h={62} label="Sales Cycle"              delay={1.05} />
      <Pill cx={420} cy={1230} w={400} h={62} label="COSE SALE RoMI"           delay={1.15} />
      <Pill cx={790} cy={1230} w={180} h={62} label="Feedback"                 delay={1.25} />
    </svg>
  );
}

interface PillProps {
  cx: number;
  cy: number;
  w: number;
  h: number;
  label: string;
  delay: number;
}

function Pill({ cx, cy, w, h, label, delay }: PillProps) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx={h / 2}
        fill="url(#mps-pill-grad)"
        filter="url(#mps-pill-shadow)"
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Ubuntu, sans-serif"
        fontSize="22"
        fontWeight={500}
        fill="white"
      >
        {label}
      </text>
    </motion.g>
  );
}
