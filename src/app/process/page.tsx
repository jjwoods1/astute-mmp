"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, ChapterRail, Modal, SectionHeader } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { CampaignInProgressDiagram } from "@/components/diagrams/CampaignInProgressDiagram";
import { ManagedProspectStackDiagram } from "@/components/diagrams/ManagedProspectStackDiagram";
import {
  CHAPTERS,
  ChapterId,
  PLANNING_STEPS,
  INSIDE_SALES_BULLETS,
  LEAD_NURTURE_SLIDES,
  PLATFORMS,
} from "@/lib/process-data";

export default function ProcessPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<ChapterId>("campaign-data");

  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [leadNurtureIndex, setLeadNurtureIndex] = useState(0);

  const activeIndex = CHAPTERS.findIndex((c) => c.id === activeSection);
  const activeChapter = CHAPTERS[activeIndex];

  const switchSection = (sectionId: ChapterId) => {
    if (sectionId === activeSection) return;
    setHoveredStep(null);
    setShowVideo(false);
    setLeadNurtureIndex(0);
    setActiveSection(sectionId);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "campaign-data":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            <Link href="/process/campaign-data-key-considerations/new-company-data-slides" className="group">
              <Card interactive className="h-full flex flex-col justify-between min-h-[180px]">
                <div className="text-label text-brand-500 uppercase mb-3">Option A</div>
                <div>
                  <div className="text-h3 text-neutral-900 mb-2 leading-snug">
                    Would you like to purchase <span className="text-brand-500 font-bold">NEW</span> company data?
                  </div>
                  <div className="text-body-sm text-neutral-500 mt-4 flex items-center gap-2">
                    <span>5 slides</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden />
                    <span>~4 min</span>
                    <span className="ml-auto text-brand-500 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/process/campaign-data-key-considerations/enhance-current-target-database-slides" className="group">
              <Card interactive className="h-full flex flex-col justify-between min-h-[180px]">
                <div className="text-label text-brand-500 uppercase mb-3">Option B</div>
                <div>
                  <div className="text-h3 text-neutral-900 mb-2 leading-snug">
                    Enhance a current target database that you hold in-house?
                  </div>
                  <div className="text-body-sm text-neutral-500 mt-4 flex items-center gap-2">
                    <span>7 slides</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden />
                    <span>~6 min</span>
                    <span className="ml-auto text-brand-500 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        );

      case "campaign-planning":
        return (
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
        );

      case "campaign-in-progress":
        return (
          <Card className="max-w-5xl">
            <CampaignInProgressDiagram />
          </Card>
        );

      case "market-platform":
        return (
          <div className="flex flex-col gap-4 max-w-4xl">
            {PLATFORMS.map((platform) => (
              <Card key={platform.title} className="border-l-4 border-l-brand-500">
                <div className="text-label text-brand-500 uppercase mb-4">{platform.title}</div>
                <ul className="flex flex-col gap-2.5">
                  {platform.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-body text-neutral-700">
                      <span className="font-mono text-brand-500 font-bold shrink-0 pt-0.5" aria-hidden>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        );

      case "inside-sales":
        return (
          <div className="max-w-2xl">
            <Card>
              <div className="text-label text-brand-500 uppercase mb-5">Inside Sales Team Contracts</div>
              <ul className="flex flex-col gap-2.5">
                {INSIDE_SALES_BULLETS.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-neutral-700">
                    <span className="font-mono text-brand-500 font-bold shrink-0 pt-0.5" aria-hidden>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowVideo(true)}
                className="mt-6 group relative rounded-lg overflow-hidden ring-1 ring-neutral-200 hover:ring-brand-500 transition-all"
              >
                {/* Using plain img so the missing file shows a broken icon
                    gracefully rather than throwing — the thumbnail asset may
                    not exist in every environment. */}
                <span className="block w-80 h-44 bg-brand-50 flex items-center justify-center text-brand-500">
                  <span className="w-14 h-14 rounded-pill bg-white text-brand-500 flex items-center justify-center text-2xl shadow-md">▶</span>
                </span>
              </button>
            </Card>
            <Modal isOpen={showVideo} onClose={() => setShowVideo(false)} size="xl">
              <iframe
                className="w-full aspect-video rounded-lg"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                frameBorder="0"
                allowFullScreen
                title="Inside Sales Team"
              />
            </Modal>
          </div>
        );

      case "managed-prospect":
        return (
          <Card className="max-w-3xl">
            <ManagedProspectStackDiagram />
          </Card>
        );

      case "lead-nurture": {
        const current = LEAD_NURTURE_SLIDES[leadNurtureIndex];
        return (
          <Card className="max-w-2xl">
            <div className="text-label text-brand-500 uppercase mb-5">Lead Nurture Animation</div>
            {current.video ? (
              <iframe
                className="w-full aspect-video rounded-md mb-6"
                src={current.video}
                frameBorder="0"
                allowFullScreen
                title={current.title}
              />
            ) : (
              <div className="w-full aspect-video rounded-md mb-6 bg-brand-50 flex items-center justify-center text-neutral-400 text-body-sm">
                No video for this entry
              </div>
            )}
            <div className="text-h3 text-neutral-900 mb-2">{current.title}</div>
            <blockquote className="text-body text-neutral-700 leading-relaxed border-l-2 border-brand-500 pl-4 my-4">
              {current.description}
            </blockquote>
            <div className="text-body-sm text-neutral-500 italic">— {current.author}</div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-200">
              <button
                onClick={() =>
                  setLeadNurtureIndex((leadNurtureIndex - 1 + LEAD_NURTURE_SLIDES.length) % LEAD_NURTURE_SLIDES.length)
                }
                className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 transition-colors"
              >
                <span>←</span>
                <span>Previous</span>
              </button>
              <div className="text-label text-neutral-400 font-mono">
                {String(leadNurtureIndex + 1).padStart(2, "0")} / {String(LEAD_NURTURE_SLIDES.length).padStart(2, "0")}
              </div>
              <button
                onClick={() => setLeadNurtureIndex((leadNurtureIndex + 1) % LEAD_NURTURE_SLIDES.length)}
                className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 transition-colors"
              >
                <span>Next</span>
                <span>→</span>
              </button>
            </div>
          </Card>
        );
      }

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex font-ubuntu">
      {/* Left chapter rail */}
      <div className="sticky top-0 h-screen flex flex-col">
        <ChapterRail
          heading="The Process"
          items={CHAPTERS.map((c) => ({ id: c.id, title: c.title, onSelect: () => switchSection(c.id) }))}
          activeId={activeSection}
          className="flex-1"
        />
        <div className="bg-white border-r border-t border-neutral-200 p-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/reception")} className="w-full justify-start">
            ← Back to Reception
          </Button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 px-10 lg:px-16 py-12">
        <FadeIn y={0} duration={0.5}>
          <SectionHeader
            eyebrow={`Chapter ${String(activeIndex + 1).padStart(2, "0")}`}
            title={activeChapter?.title ?? ""}
          />
        </FadeIn>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <div className="flex items-center gap-1.5" aria-label={`Chapter ${activeIndex + 1} of ${CHAPTERS.length}`}>
            {CHAPTERS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => switchSection(c.id)}
                className={`h-1 flex-1 rounded-pill transition-colors ${i <= activeIndex ? "bg-brand-500" : "bg-neutral-200 hover:bg-neutral-300"}`}
                aria-label={`Go to chapter ${i + 1}`}
              />
            ))}
            <span className="ml-3 font-mono text-label text-neutral-400 whitespace-nowrap">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="opacity-50"> / {String(CHAPTERS.length).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
