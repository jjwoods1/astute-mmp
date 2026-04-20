"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button, ChapterRail, SectionHeader } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { CHAPTERS, ChapterId } from "@/lib/process-data";

interface ProcessSubPageShellProps {
  activeId: ChapterId;
  children: ReactNode;
}

export function ProcessSubPageShell({ activeId, children }: ProcessSubPageShellProps) {
  const router = useRouter();
  const activeIndex = CHAPTERS.findIndex((c) => c.id === activeId);
  const activeChapter = CHAPTERS[activeIndex];

  return (
    <main className="min-h-screen bg-neutral-50 flex font-ubuntu">
      {/* Left chapter rail */}
      <div className="sticky top-0 h-screen flex flex-col">
        <ChapterRail
          heading="The Process"
          items={CHAPTERS.map((c) => ({ id: c.id, title: c.title, href: c.href }))}
          activeId={activeId}
          className="flex-1"
        />
        <div className="bg-white border-r border-t border-neutral-200 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/reception")}
            className="w-full justify-start"
          >
            ← Back to Reception
          </Button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 px-10 lg:px-16 py-12">
        <FadeIn y={0} duration={0.45}>
          <SectionHeader
            eyebrow={`Chapter ${String(activeIndex + 1).padStart(2, "0")}`}
            title={activeChapter.title}
          />
        </FadeIn>

        <div className="mt-10">{children}</div>

        {/* Bottom progress bar spanning the 7 chapters */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <div
            className="flex items-center gap-1.5"
            aria-label={`Chapter ${activeIndex + 1} of ${CHAPTERS.length}`}
          >
            {CHAPTERS.map((c, i) => (
              <a
                key={c.id}
                href={c.href}
                className={`h-1 flex-1 rounded-pill transition-colors ${
                  i <= activeIndex ? "bg-brand-500" : "bg-neutral-200 hover:bg-neutral-300"
                }`}
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
