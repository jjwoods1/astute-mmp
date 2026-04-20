"use client";

import { ProcessSubPageShell } from "@/components/ProcessSubPageShell";
import { Card } from "@/components/ui";
import { PLATFORMS } from "@/lib/process-data";

export default function MarketPlatformApproachPage() {
  return (
    <ProcessSubPageShell activeId="market-platform">
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
    </ProcessSubPageShell>
  );
}
