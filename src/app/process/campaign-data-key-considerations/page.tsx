"use client";

import Link from "next/link";
import { ProcessSubPageShell } from "@/components/ProcessSubPageShell";
import { Card } from "@/components/ui";

export default function CampaignDataKeyConsiderationsPage() {
  return (
    <ProcessSubPageShell activeId="campaign-data">
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
    </ProcessSubPageShell>
  );
}
