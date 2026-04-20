"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button, LogoMark } from "@/components/ui";
import { TaglineReveal, FadeIn } from "@/components/motion";

export default function HomePage() {
  const router = useRouter();

  // Preserve existing F11 fullscreen handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F11") {
        event.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
        } else {
          document.exitFullscreen();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-ubuntu grid grid-cols-[1.1fr_1fr]">
      {/* LEFT PANEL */}
      <section className="relative flex flex-col justify-between px-14 lg:px-20 py-12">
        {/* Top: brand mark */}
        <FadeIn y={0} duration={0.6}>
          <div className="flex items-center gap-5">
            <LogoMark size="sm" priority />
            <div className="h-7 w-px bg-neutral-200" aria-hidden />
            <div className="text-label text-neutral-500 uppercase">
              Multimedia Presentator
            </div>
          </div>
        </FadeIn>

        {/* Middle: the moment */}
        <div className="py-10">
          <div className="text-label text-brand-500 uppercase mb-6">— Since 1997</div>

          <h1 className="text-display-lg lg:text-display-xl text-neutral-900 font-bold leading-[0.95] tracking-[-0.02em]">
            <TaglineReveal
              words={["Discover.", "Nurture.", "Acquire."]}
              separator=" "
              wordClassName="whitespace-nowrap"
            />
          </h1>

          <FadeIn delay={0.6} duration={0.6} className="mt-8 max-w-lg">
            <p className="text-body-lg text-neutral-600 leading-relaxed">
              Welcome to Astute MMP — please choose where you&rsquo;d like to go.
            </p>
          </FadeIn>

          <FadeIn delay={0.8} duration={0.6} className="mt-10">
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push("/reception")}
                trailingIcon={<ArrowRight />}
              >
                Go to Reception
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Bottom: fullscreen hint */}
        <FadeIn delay={1.1} duration={0.5} y={0}>
          <div className="text-body-sm text-neutral-400 flex items-center gap-2">
            <kbd className="inline-flex items-center px-2 py-0.5 font-mono text-[11px] border border-neutral-200 rounded-md text-neutral-600 bg-neutral-50">
              F11
            </kbd>
            <span>to enter / exit fullscreen</span>
          </div>
        </FadeIn>
      </section>

      {/* RIGHT PANEL — soft brand-blue field holding the existing Astute photograph */}
      <section className="relative bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 overflow-hidden">
        {/* Decorative soft-glow orbs (tints of brand blue only — no new hues) */}
        <div
          className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,145,210,0.25), transparent 60%)" }}
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,145,210,0.18), transparent 60%)" }}
          aria-hidden
        />

        {/* The photograph, framed */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center p-10 lg:p-16"
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg ring-1 ring-white/60 bg-white">
            <Image
              src="/images/Astute Building image 3.png"
              alt="Astute"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7h8M8 4l3 3-3 3" />
    </svg>
  );
}
