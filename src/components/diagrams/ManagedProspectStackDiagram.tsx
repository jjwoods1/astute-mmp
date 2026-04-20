"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface FunnelSection {
  id: string;
  lines: string[];
  y: number;
  height: number;
}

// Funnel geometry — centered in a 1200-wide viewBox so the left loop arrow
// and right bracket label have room in the side margins.
const FUNNEL_TOP = 20;
const FUNNEL_BOTTOM = 960;
const FUNNEL_LEFT_TOP = 200;
const FUNNEL_RIGHT_TOP = 1000;
const FUNNEL_LEFT_BOTTOM = 450;
const FUNNEL_RIGHT_BOTTOM = 750;
const FUNNEL_CENTER_X = (FUNNEL_LEFT_TOP + FUNNEL_RIGHT_TOP) / 2;

const SECTIONS: FunnelSection[] = [
  { id: "initial",  lines: ["Initial Contact Data"], y: 20, height: 160 },
  { id: "cleansed", lines: ["Cleansed Contact Records"], y: 180, height: 160 },
  { id: "dm",       lines: ["DM level Company Profile", "no. of desktops, no. of sites,", "applications etc\u2026", "Priorities & Challenges"], y: 340, height: 280 },
  { id: "held",     lines: ["Held leads", "e-fulfilment, DM xxxxx", "schedule call back, reporting"], y: 620, height: 220 },
  { id: "passed",   lines: ["Passed Leads"], y: 840, height: 120 },
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

// Below-funnel pill stack
const PILL_W = 420;
const PILL_H = 62;
const FEEDBACK_W = 180;
const SALES_CALL_Y = 1060;
const SALES_CYCLE_Y = 1155;
const COSE_Y = 1250;
const FEEDBACK_X = 960;

interface Props {
  className?: string;
}

export function ManagedProspectStackDiagram({ className }: Props) {
  return (
    <svg
      viewBox="0 0 1200 1310"
      className={cn("w-full h-auto", className)}
      role="img"
      aria-labelledby="mps-title mps-desc"
    >
      <title id="mps-title">Managed Prospect Stack</title>
      <desc id="mps-desc">
        A funnel from Initial Contact Data through Cleansed Contact Records,
        DM-level Company Profile, Held leads, to Passed Leads, with a
        feedback loop arrow wrapping round the left side and a right-side
        bracket labelled Client Feedback. Below the funnel, three stacked
        stages — Sales Call / Appointment, Sales Cycle, COSE SALE RoMI —
        with an arrow from COSE SALE RoMI across to Feedback.
      </desc>

      <defs>
        <linearGradient id="mps-pill-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND} />
          <stop offset="100%" stopColor={BRAND_DEEP} />
        </linearGradient>
        <filter id="mps-pill-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={BRAND_DEEP} floodOpacity="0.2" />
        </filter>
        <marker
          id="mps-arrow-brand"
          viewBox="0 0 12 12"
          refX="11"
          refY="6"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 12 6 L 0 12 z" fill={BRAND} />
        </marker>
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

      {/* Section separators — clipped to funnel edges */}
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
              <tspan
                key={idx}
                x={FUNNEL_CENTER_X}
                y={firstLineY + idx * LINE_HEIGHT}
                dominantBaseline="middle"
              >
                {line}
              </tspan>
            ))}
          </motion.text>
        );
      })}

      {/* Left feedback loop — exits funnel bottom-left, wraps round, re-enters top-left */}
      <motion.path
        d={`M ${FUNNEL_LEFT_BOTTOM} ${FUNNEL_BOTTOM} L 160 ${FUNNEL_BOTTOM} Q 120 ${FUNNEL_BOTTOM} 120 ${FUNNEL_BOTTOM - 40} L 120 90 Q 120 50 160 50 L 198 50`}
        fill="none"
        stroke={BRAND}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#mps-arrow-brand)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
      />

      {/* Right bracket — spans full funnel height; label "Client Feedback" */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        <path
          d={`M 1040 ${FUNNEL_TOP + 20} L 1080 ${FUNNEL_TOP + 20} L 1080 ${FUNNEL_BOTTOM - 20} L 1040 ${FUNNEL_BOTTOM - 20}`}
          fill="none"
          stroke={OUTLINE}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g transform={`translate(1130 ${(FUNNEL_TOP + FUNNEL_BOTTOM) / 2}) rotate(90)`}>
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Ubuntu, sans-serif"
            fontSize="24"
            fontWeight={500}
            fill={OUTLINE}
          >
            Client Feedback
          </text>
        </g>
      </motion.g>

      {/* Below-funnel blue pills */}
      <Pill cx={FUNNEL_CENTER_X} cy={SALES_CALL_Y}  w={PILL_W}      h={PILL_H} label="Sales Call / Appointment" delay={1.1} />
      <Pill cx={FUNNEL_CENTER_X} cy={SALES_CYCLE_Y} w={PILL_W}      h={PILL_H} label="Sales Cycle"              delay={1.2} />
      <Pill cx={FUNNEL_CENTER_X} cy={COSE_Y}        w={PILL_W}      h={PILL_H} label="COSE SALE RoMI"           delay={1.3} />
      <Pill cx={FEEDBACK_X}      cy={COSE_Y}        w={FEEDBACK_W}  h={PILL_H} label="Feedback"                 delay={1.4} />

      {/* Pill-to-pill arrows: three vertical + one horizontal to Feedback */}
      <PillArrow
        x1={FUNNEL_CENTER_X} y1={SALES_CALL_Y + PILL_H / 2}
        x2={FUNNEL_CENTER_X} y2={SALES_CYCLE_Y - PILL_H / 2}
        delay={1.45}
      />
      <PillArrow
        x1={FUNNEL_CENTER_X} y1={SALES_CYCLE_Y + PILL_H / 2}
        x2={FUNNEL_CENTER_X} y2={COSE_Y - PILL_H / 2}
        delay={1.55}
      />
      <PillArrow
        x1={FUNNEL_CENTER_X + PILL_W / 2} y1={COSE_Y}
        x2={FEEDBACK_X - FEEDBACK_W / 2}  y2={COSE_Y}
        delay={1.65}
      />
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

interface PillArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

function PillArrow({ x1, y1, x2, y2, delay }: PillArrowProps) {
  // End the stroke ~6px before the target so the arrow marker sits cleanly
  // against the next pill rather than overlapping it.
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const trim = 6;
  const ex = x2 - (dx / len) * trim;
  const ey = y2 - (dy / len) * trim;
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={ex}
      y2={ey}
      stroke={BRAND}
      strokeWidth={3}
      strokeLinecap="round"
      markerEnd="url(#mps-arrow-brand)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    />
  );
}
