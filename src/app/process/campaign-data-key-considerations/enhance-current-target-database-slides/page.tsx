"use client";

import Link from "next/link";
import { ProcessSubPageShell } from "@/components/ProcessSubPageShell";
import { CampaignDataSlideFlow } from "@/components/CampaignDataSlideFlow";
import { Button } from "@/components/ui";
import { ENHANCE_TARGET_DATABASE_SLIDES } from "@/lib/process-data";

export default function EnhanceTargetDatabaseSlidesPage() {
  return (
    <ProcessSubPageShell activeId="campaign-data">
      <div className="mb-6">
        <Link href="/process/campaign-data-key-considerations">
          <Button variant="ghost" size="sm">
            ← Back to Campaign Data
          </Button>
        </Link>
      </div>
      <CampaignDataSlideFlow
        slides={ENHANCE_TARGET_DATABASE_SLIDES}
        eyebrow="Target Database — Key Considerations"
      />
    </ProcessSubPageShell>
  );
}
