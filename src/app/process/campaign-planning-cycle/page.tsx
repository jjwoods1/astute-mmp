"use client";

import { useState } from "react";
import { ProcessSubPageShell } from "@/components/ProcessSubPageShell";
import { Card } from "@/components/ui";
import { PLANNING_STEPS } from "@/lib/process-data";

export default function CampaignPlanningCyclePage() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <ProcessSubPageShell activeId="campaign-planning">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {PLANNING_STEPS.map((step, i) => {
            const active = hoveredStep === step.title;
            return (
              <button
                key={step.title}
                onMouseEnter={() => setHoveredStep(step.title)}
                onMouseLeave={() => setHoveredStep(null)}
                onFocus={() => setHoveredStep(step.title)}
                onBlur={() => setHoveredStep(null)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-pill border text-body-sm font-medium transition-all duration-200 ease-out-expo ${
                  active
                    ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-300 hover:text-brand-500"
                }`}
              >
                <span className={`font-mono text-label ${active ? "text-white/80" : "text-neutral-400"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>
        <Card className="max-w-3xl">
          {hoveredStep ? (
            <>
              <div className="text-label text-brand-500 uppercase mb-2">Step</div>
              <div className="text-h3 text-neutral-900 mb-2">{hoveredStep}</div>
              <p className="text-body text-neutral-600">
                {PLANNING_STEPS.find((s) => s.title === hoveredStep)?.description}
              </p>
            </>
          ) : (
            <p className="text-body text-neutral-500">Hover a step to see its description.</p>
          )}
        </Card>
      </div>
    </ProcessSubPageShell>
  );
}
