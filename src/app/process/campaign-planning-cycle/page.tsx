"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function CampaignPlanningCycle() {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  const processSteps = [
    { title: "Initial Briefing Session", description: "Initial meeting or audio conference call to discuss the background of the campaign and document clear objectives and targets/benchmarks." },
    { title: "Target Audience", description: "Defining the ideal customer profile and identifying key target segments." },
    { title: "Sizing the Campaign", description: "Determining the scope and scale of the campaign based on available resources and goals." },
    { title: "Profiling Questions", description: "Crafting questions to gather necessary information and qualify prospects." },
    { title: "Supporting Collateral", description: "Providing relevant materials to support the campaign efforts." },
    { title: "Proposition Development", description: "Creating a compelling value proposition tailored to the target audience." },
    { title: "Call To Action(s)", description: "Establishing the key actions you want prospects to take after engagement." },
    { title: "Call Instrument", description: "Deciding the best method for communication (phone, email, etc.)." },
    { title: "Lead Distribution", description: "Allocating leads to the appropriate sales representatives." },
    { title: "Campaign Reporting", description: "Tracking performance metrics and analyzing the effectiveness of the campaign." },
    { title: "Agent Training", description: "Ensuring agents are well-trained to execute the campaign successfully." }
  ];

  const navLinks = [
    { title: "Campaign Data - Key Considerations", href: "/process/campaign-data-key-considerations" },
    { title: "Campaign Planning Cycle", href: "/process/campaign-planning-cycle" },
    { title: "Campaign in Progress", href: "/process/campaign-in-progress" },
    { title: "Market Platform Approach", href: "/process/market-platform-approach" },
    { title: "Inside Sales Team", href: "/process/inside-sales-team" },
    { title: "Managed Prospect Stack", href: "/process/managed-prospect-stack" },
    { title: "Lead Nurture Animation", href: "/process/lead-nurture-animation" }
  ];

  return (
    <main className="relative min-h-screen flex items-start pt-32 p-10">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Process Page - resize.png')",
          filter: "blur(8px)",
          zIndex: -1
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      {/* Sidebar Navigation */}
      <aside className="fixed right-0 top-0 h-full w-80 bg-[#0091d2] p-6 flex flex-col justify-between shadow-lg z-10">
        <nav className="space-y-3">
          {navLinks.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className={`block text-lg font-medium py-4 px-4 rounded-lg transition ${pathname === href
                ? "bg-white text-[#0091d2] font-bold shadow-md"
                : "text-white hover:bg-white hover:text-[#0091d2]"
                }`}
            >
              {title}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => router.push("/reception")}
          className="bg-white text-[#0091d2] p-3 rounded-lg font-bold hover:bg-[#007bb0] hover:text-white transition"
        >
          Back to Reception
        </button>
      </aside>

      {/* Content Area */}
      <div className="flex flex-col items-center w-full max-w-5xl pr-96 ml-auto mr-auto z-10">
        {/* Process Flow */}
        <div className="w-full flex flex-col space-y-10">
          {[
            ["Initial Briefing Session", "Target Audience", "Sizing the Campaign"],
            ["Profiling Questions", "Supporting Collateral", "Proposition Development"],
            ["Call To Action(s)", "Call Instrument", "Lead Distribution"],
            ["Campaign Reporting", "Agent Training"]
          ].map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex items-center justify-center space-x-6">
              {row.map((step, index) => (
                <div key={`step-${rowIndex}-${index}`} className="flex items-center space-x-3">
                  <StepButton
                    title={step}
                    onMouseEnter={() => setHoveredStep(step)}
                    onMouseLeave={() => setHoveredStep(null)}
                  />
                  {index < row.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Step Description Box - Expands downward only */}
        <div className="w-full max-w-4xl p-6 mt-10 bg-white text-[#0091d2] rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">
            {hoveredStep ? hoveredStep : "Hover over a step to see details"}
          </h3>
          <p className="mt-2 text-[#007bb0]">
            {hoveredStep
              ? processSteps.find((step) => step.title === hoveredStep)?.description
              : "Move your mouse over a step to display its description here."}
          </p>
        </div>
      </div>
    </main>
  );
}

// Step Button Component
function StepButton({
  title,
  onMouseEnter,
  onMouseLeave
}: {
  title: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      className="bg-[#0091d2] text-white w-64 h-16 flex items-center justify-center px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-white hover:text-[#0091d2] transition transform hover:scale-105"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {title}
    </button>
  );
}

// Arrow Component
function Arrow() {
  return <div className="text-white text-2xl">→</div>;
}
