"use client";

import Link from "next/link";
import { ProcessSubPageShell } from "@/components/ProcessSubPageShell";
import { CampaignDataSlideFlow } from "@/components/CampaignDataSlideFlow";
import { Button } from "@/components/ui";
import { NEW_COMPANY_DATA_SLIDES } from "@/lib/process-data";

export default function NewCompanyDataSlidesPage() {
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
        slides={NEW_COMPANY_DATA_SLIDES}
        eyebrow="Campaign Data — Key Considerations · NEW company data"
      />
    </ProcessSubPageShell>
  );
}
