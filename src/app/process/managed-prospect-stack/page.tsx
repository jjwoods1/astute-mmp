"use client";

import { ProcessSubPageShell } from "@/components/ProcessSubPageShell";
import { Card } from "@/components/ui";
import { ManagedProspectStackDiagram } from "@/components/diagrams/ManagedProspectStackDiagram";

export default function ManagedProspectStackPage() {
  return (
    <ProcessSubPageShell activeId="managed-prospect">
      <Card className="max-w-3xl">
        <ManagedProspectStackDiagram />
      </Card>
    </ProcessSubPageShell>
  );
}
