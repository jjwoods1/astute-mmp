"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Modal } from "@/components/ui";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";

interface AgentSection {
  id: string;
  label: string;
  content?: string[];
  videoUrl?: string;
  graph?: boolean;
}

const agentSections: AgentSection[] = [
  {
    id: "typical",
    label: "Typical Agent Profile",
    content: [
      "Degree level educated with a passion for IT in business",
      "Successfully recruited through Astute\u2019s selection process",
      "Motivated salaried staff (no temps)",
      "Keen and hungry to build a career in the IT sector",
      "Benefit from ongoing personal development",
      "Low agent attrition due to business model",
      "",
      "Energetic, enthusiastic with the ability to perform unscripted calling into the corporate sector",
      "",
      "Understands that a 'LEADSHEET' represents their capabilities to a potential employer",
    ],
  },
  { id: "graduate",     label: "Graduate Placements",       videoUrl: "/videos/graduate-placement.mp4" },
  { id: "international", label: "International Agents",      videoUrl: "/videos/international-agents.mp4" },
  { id: "productivity",  label: "Productivity Curve",        graph: true },
  {
    id: "progress",
    label: "Sales Progress Manager Role",
    content: [
      "Dedicated Head Resource",
      "Basis for a successful programme",
      "Ensures all generated leads meet the defined lead criteria",
      "",
      "Manages all MIS Systems Integration co-ordination inclusive of importing PA\u2019s, Hot Leads and data",
      "",
      "Manages a defined quality assurance process",
      "",
      "Manage all 'Lead Handovers' to Direct Touch & Channel ensuring they understand the 'context' and opportunity",
      "",
      "Manage new entries to a Lead Development programme",
      "Ongoing management, monitoring and reporting of Lead status within a lead tracking application",
      "Providing feedback loop for Direct Touch",
      "",
      "Phase 3 quality assurance calling RoI reporting:",
      "",
      "In-depth WEEKLY & MONTHLY reporting on number of prospects, leads and opportunities generated",
      "Detailed CLOSE-LOOP analysis & RoI figures",
      "Moving Forward - trend analysis by campaign",
      "",
      "Sales visit report management and uploading onto Lead Tracking System",
      "Quality call into end user following appointment",
      "End Prospect is experiencing significant value from the appointment delivery",
    ],
  },
];

function ProductivityGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Axes — neutral-900
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(550, 350);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 350);
    ctx.stroke();

    // Dashed guides — neutral-300
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "#cbd5e1";
    for (let i = 1; i <= 4; i++) {
      const xPos = 50 + i * 125;
      ctx.beginPath();
      ctx.moveTo(xPos, 50);
      ctx.lineTo(xPos, 350);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.font = "20px Ubuntu, sans-serif";
      ctx.fillStyle = "#475569";
      ctx.fillText(String(i), xPos - 10, 380);
    }

    // Productivity curve — brand-500
    ctx.strokeStyle = "#0091d2";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.quadraticCurveTo(175, 100, 300, 200);
    ctx.quadraticCurveTo(425, 300, 550, 250);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(300, 250);
    ctx.quadraticCurveTo(425, 100, 550, 150);
    ctx.stroke();

    const updateHoverText = (x: number) => {
      const el = hoverTextRef.current;
      if (!el) return;
      if (x >= 50 && x < 175) el.innerText = "Phase 1: Initial Growth Stage";
      else if (x >= 175 && x < 300) el.innerText = "Phase 2: Peak Performance Stage";
      else if (x >= 300 && x < 425) el.innerText = "Phase 3: Transition Stage";
      else if (x >= 425 && x <= 550) el.innerText = "Phase 4: Maturity and Decline";
      else el.innerText = "Hover over the numbers to see details.";
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      updateHoverText(x);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width="600" height="400" className="max-w-full" />
      <div ref={hoverTextRef} className="text-center mt-2 text-body font-medium text-neutral-700">
        Hover over the numbers to see details.
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<AgentSection | null>(null);

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu">
      <div className="max-w-6xl mx-auto px-10 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <FadeIn y={0} duration={0.4}>
            <div>
              <div className="text-label text-brand-500 uppercase mb-4">Our People</div>
              <h1 className="text-h1 text-neutral-900">Agents</h1>
              <p className="mt-4 text-body-lg text-neutral-600 max-w-xl">
                Select a section to learn more.
              </p>
            </div>
          </FadeIn>
          <FadeIn y={0} duration={0.4} delay={0.1}>
            <Button variant="secondary" size="md" onClick={() => router.push("/reception")}>
              ← Back to Reception
            </Button>
          </FadeIn>
        </div>

        <StaggerChildren stagger={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {agentSections.map((section) => (
            <StaggerItem key={section.id}>
              <Card
                interactive
                onClick={() => setActiveModal(section)}
                className="h-full flex items-center justify-between gap-3"
              >
                <span className="text-body font-medium text-neutral-900">{section.label}</span>
                <span className="text-brand-500 transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        size={activeModal?.graph ? "xl" : "lg"}
        title={activeModal?.label}
      >
        {activeModal?.videoUrl ? (
          <video controls className="w-full rounded-lg">
            <source src={activeModal.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : activeModal?.graph ? (
          <ProductivityGraph />
        ) : (
          <ul className="flex flex-col gap-2.5">
            {activeModal?.content?.map((item, index) =>
              item ? (
                <li key={index} className="flex gap-3 text-body text-neutral-700">
                  <span className="font-mono text-brand-500 font-bold shrink-0 pt-0.5" aria-hidden>→</span>
                  <span>{item}</span>
                </li>
              ) : (
                <li key={index} className="h-2" aria-hidden />
              ),
            )}
          </ul>
        )}
      </Modal>
    </main>
  );
}
