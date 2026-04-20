"use client";

import { useState, useEffect, useRef } from "react";

interface AgentSection {
  id: string;
  label: string;
  content?: string[];
  videoUrl?: string;
  graph?: boolean;
}

// Agent Sections Data
const agentSections: AgentSection[] = [
  {
    id: "typical",
    label: "Typical Agent Profile",
    content: [
      "Degree level educated with a passion for IT in business",
      "Successfully recruited through Astute’s selection process",
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
  {
    id: "graduate",
    label: "Graduate Placements",
    videoUrl: "/videos/graduate-placement.mp4",
  },
  {
    id: "international",
    label: "International Agents",
    videoUrl: "/videos/international-agents.mp4",
  },
  {
    id: "productivity",
    label: "Productivity Curve",
    graph: true,
  },
  {
    id: "progress",
    label: "Sales Progress Manager Role",
    content: [
      "Dedicated Head Resource",
      "Basis for a successful programme",
      "Ensures all generated leads meet the defined lead criteria",
      "",
      "Manages all MIS Systems Integration co-ordination inclusive of importing PA’s, Hot Leads and data",
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

// Productivity Curve Component using Canvas API
function ProductivityGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#204050";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(550, 350);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 350);
    ctx.stroke();

    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "#a0a0a0";
    for (let i = 1; i <= 4; i++) {
      const xPos = 50 + i * 125;
      ctx.beginPath();
      ctx.moveTo(xPos, 50);
      ctx.lineTo(xPos, 350);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.font = "20px Ubuntu";
      ctx.fillStyle = "#204050";
      ctx.fillText(String(i), xPos - 10, 380);
    }

    ctx.strokeStyle = "#d81b60";
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
      if (x >= 50 && x < 175) {
        el.innerText = "Phase 1: Initial Growth Stage";
      } else if (x >= 175 && x < 300) {
        el.innerText = "Phase 2: Peak Performance Stage";
      } else if (x >= 300 && x < 425) {
        el.innerText = "Phase 3: Transition Stage";
      } else if (x >= 425 && x <= 550) {
        el.innerText = "Phase 4: Maturity and Decline";
      } else {
        el.innerText = "Hover over the numbers to see details.";
      }
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
      <canvas ref={canvasRef} width="600" height="400"></canvas>
      <div ref={hoverTextRef} className="text-center mt-2 text-lg font-bold text-gray-700">
        Hover over the numbers to see details.
      </div>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content?: string[];
  videoUrl?: string;
  graph?: boolean;
}

function Modal({ isOpen, onClose, title, content, videoUrl, graph }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-300 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-400 transition"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-blue-700 mb-4">{title}</h2>

        {videoUrl ? (
          <video controls className="w-full rounded-md">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : graph ? (
          <ProductivityGraph />
        ) : (
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {content?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Main Page Component
export default function Agents() {
  const [activeModal, setActiveModal] = useState<AgentSection | null>(null);

  const openModal = (modalId: string) => {
    const section = agentSections.find((s) => s.id === modalId);
    if (section) setActiveModal(section);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="absolute top-16 left-12 flex flex-col gap-2">
        {agentSections.map((section) => (
          <button key={section.id} onClick={() => openModal(section.id)} className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition">
            {section.label}
          </button>
        ))}
      </div>

      {activeModal && (
        <Modal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={activeModal.label}
          content={activeModal.content}
          videoUrl={activeModal.videoUrl}
          graph={activeModal.graph}
        />
      )}
    </main>
  );
}
