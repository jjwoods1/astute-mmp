"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface DiagramNode {
  id: string;
  lines: string[];
  cx: number;
  cy: number;
  w: number;
  h: number;
}

interface DiagramEdge {
  from: string;
  to: string;
  d: string;
}

const NODES: DiagramNode[] = [
  { id: "profile",    lines: ["Optional:", "Profile/Clean Data"],                        cx: 530, cy: 80,  w: 260, h: 90  },
  { id: "start",      lines: ["Start of Campaign"],                                      cx: 150, cy: 310, w: 220, h: 70  },
  { id: "edispatch",  lines: ["Optional:", "eDispatch and/or", "DM dispatch"],           cx: 530, cy: 310, w: 260, h: 100 },
  { id: "qual",       lines: ["Lead/Appointment", "Qualification and/or", "DM Surveys"], cx: 935, cy: 310, w: 280, h: 110 },
  { id: "doubleconf", lines: ["Double Lead", "Confirmation Process"],                    cx: 935, cy: 490, w: 270, h: 90  },
  { id: "teleweb",    lines: ["Astute TeleWeb", "Publish leads/", "Appointments Daily"], cx: 935, cy: 680, w: 280, h: 110 },
  { id: "reporting",  lines: ["Campaign Reporting", "& Monitoring"],                     cx: 530, cy: 680, w: 260, h: 90  },
  { id: "feedback",   lines: ["Client lead Feedback", "& RoMI"],                         cx: 150, cy: 680, w: 250, h: 90  },
];

const EDGES: DiagramEdge[] = [
  { from: "start",      to: "profile",    d: "M 260 310 L 330 310 L 330 80 L 392 80" },
  { from: "profile",    to: "edispatch",  d: "M 530 125 L 530 252" },
  { from: "edispatch",  to: "qual",       d: "M 660 310 L 787 310" },
  { from: "qual",       to: "doubleconf", d: "M 935 365 L 935 437" },
  { from: "doubleconf", to: "teleweb",    d: "M 935 535 L 935 617" },
  { from: "teleweb",    to: "reporting",  d: "M 795 680 L 668 680" },
  { from: "reporting",  to: "feedback",   d: "M 400 680 L 283 680" },
];

const LINE_HEIGHT = 22;
const BRAND = "#0091d2";
const BRAND_DEEP = "#006ca0";

interface Props {
  className?: string;
}

export function CampaignInProgressDiagram({ className }: Props) {
  return (
    <svg
      viewBox="0 0 1100 780"
      className={cn("w-full h-auto", className)}
      role="img"
      aria-labelledby="cip-title cip-desc"
    >
      <title id="cip-title">Campaign in Progress</title>
      <desc id="cip-desc">
        Flow diagram: Start of Campaign leads to an optional Profile / Clean Data step, then
        continues through optional eDispatch / DM dispatch, Lead/Appointment Qualification
        and/or DM Surveys, a Double Lead Confirmation Process, Astute TeleWeb Publish leads
        /Appointments Daily, Campaign Reporting &amp; Monitoring, and finally Client Lead
        Feedback &amp; RoMI.
      </desc>

      <defs>
        <marker
          id="cip-arrow"
          viewBox="0 0 12 12"
          refX="11"
          refY="6"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 12 6 L 0 12 z" fill={BRAND} />
        </marker>
        <linearGradient id="cip-node-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND} />
          <stop offset="100%" stopColor={BRAND_DEEP} />
        </linearGradient>
        <filter id="cip-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={BRAND_DEEP} floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Edges — fade-in stagger */}
      <g>
        {EDGES.map((e, i) => (
          <motion.path
            key={`${e.from}-${e.to}`}
            d={e.d}
            fill="none"
            stroke={BRAND}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd="url(#cip-arrow)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: "easeOut" }}
          />
        ))}
      </g>

      {/* Nodes — stagger rise */}
      <g>
        {NODES.map((n, i) => {
          const x = n.cx - n.w / 2;
          const y = n.cy - n.h / 2;
          const totalTextHeight = (n.lines.length - 1) * LINE_HEIGHT;
          const firstLineY = n.cy - totalTextHeight / 2;
          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect
                x={x}
                y={y}
                width={n.w}
                height={n.h}
                rx={14}
                fill="url(#cip-node-grad)"
                filter="url(#cip-shadow)"
              />
              <text
                textAnchor="middle"
                fontFamily="Ubuntu, sans-serif"
                fontSize="17"
                fontWeight={500}
                fill="white"
              >
                {n.lines.map((line, idx) => (
                  <tspan key={idx} x={n.cx} y={firstLineY + idx * LINE_HEIGHT} dominantBaseline="middle">
                    {line}
                  </tspan>
                ))}
              </text>
            </motion.g>
          );
        })}
      </g>
    </svg>
  );
}
