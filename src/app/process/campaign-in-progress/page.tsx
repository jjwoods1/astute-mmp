"use client";

import { ProcessSubPageShell } from "@/components/ProcessSubPageShell";
import { Card } from "@/components/ui";
import { CampaignInProgressDiagram } from "@/components/diagrams/CampaignInProgressDiagram";

export default function CampaignInProgressPage() {
  return (
    <ProcessSubPageShell activeId="campaign-in-progress">
      <Card className="max-w-5xl">
        <CampaignInProgressDiagram />
      </Card>
    </ProcessSubPageShell>
  );
}
