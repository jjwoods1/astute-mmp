"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

// Role details data
const roleDetails: Record<string, { title: string; description: string; responsibilities: string[]; skills: string[] }> = {
  sdr: {
    title: "Sales Development Representative",
    description: "SDRs are the front line of the sales team, responsible for identifying and qualifying new business opportunities.",
    responsibilities: [
      "Prospecting and lead generation",
      "Initial outreach via phone, email, and social",
      "Qualifying leads based on criteria",
      "Setting appointments for Account Executives"
    ],
    skills: ["Communication", "Research", "CRM proficiency", "Resilience"]
  },
  ldr: {
    title: "Lead Development Representative",
    description: "LDRs focus on nurturing and developing inbound leads, converting marketing qualified leads into sales opportunities.",
    responsibilities: [
      "Responding to inbound inquiries",
      "Lead qualification and scoring",
      "Database management and enrichment",
      "Coordinating with marketing teams"
    ],
    skills: ["Lead nurturing", "Data analysis", "Marketing alignment", "Follow-up skills"]
  },
  spm: {
    title: "Sales Project Manager",
    description: "SPMs coordinate complex sales processes, ensuring smooth handoffs and successful deal execution.",
    responsibilities: [
      "Managing sales pipeline stages",
      "Coordinating cross-functional teams",
      "Tracking deal progress and milestones",
      "Ensuring customer requirements are met"
    ],
    skills: ["Project management", "Stakeholder management", "Process optimization", "Attention to detail"]
  },
  csdr: {
    title: "Customer Sales Development Representative",
    description: "CSDRs work with existing customers to identify expansion and upsell opportunities.",
    responsibilities: [
      "Customer account analysis",
      "Identifying upsell opportunities",
      "Cross-selling additional products",
      "Building customer relationships"
    ],
    skills: ["Account management", "Product knowledge", "Relationship building", "Upselling techniques"]
  },
  cldr: {
    title: "Customer Lead Development Representative",
    description: "CLDRs focus on developing leads within existing customer accounts for expansion revenue.",
    responsibilities: [
      "Mining existing accounts for leads",
      "Customer success collaboration",
      "Renewal opportunity identification",
      "Customer journey mapping"
    ],
    skills: ["Customer insight", "Strategic thinking", "Collaboration", "Revenue optimization"]
  },
  "account-manager": {
    title: "Account Manager",
    description: "Account Managers own the overall relationship with key customers, driving retention and growth.",
    responsibilities: [
      "Managing key customer relationships",
      "Developing account strategies",
      "Negotiating contracts and renewals",
      "Serving as customer advocate"
    ],
    skills: ["Strategic planning", "Negotiation", "Executive presence", "Business acumen"]
  }
};

export default function FTERole() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load Ubuntu font from Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Adjusted hexagon positions & updated labels
  const hexagonSections = [
    { id: "sdr", label: "SDR", top: "16%", left: "50%" },
    { id: "ldr", label: "LDR", top: "34%", left: "27%" },
    { id: "spm", label: "SPM", top: "34%", left: "73%" },
    { id: "csdr", label: "CSDR", top: "61%", left: "27%" },
    { id: "cldr", label: "CLDR", top: "61%", left: "73%" },
    { id: "account-manager", label: "Account Manager", top: "80%", left: "50%" },
  ];

  const handleRoleClick = (roleId: string) => {
    if (selectedRole === roleId) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRole(null);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRole(roleId);
        setIsAnimating(false);
      }, 150);
    }
  };

  const closePanel = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedRole(null);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-50"
      style={{ fontFamily: "Ubuntu, sans-serif" }}
    >
      {/* Subtle brand-tinted background wash (tints of brand blue only) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(0, 145, 210, 0.12), transparent 45%), radial-gradient(circle at 80% 70%, rgba(0, 145, 210, 0.08), transparent 50%)",
        }}
        aria-hidden
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex items-center justify-center gap-8 w-full max-w-[1400px] px-8">
        {/* Computer Frame */}
        <div className={`relative flex items-center justify-center transition-all duration-500 ${selectedRole ? "w-[700px] h-[430px]" : "w-[900px] h-[550px]"}`}>
          <Image
            src="/images/astute-computer-screen.png"
            alt="Astute Computer Screen"
            width={selectedRole ? 700 : 900}
            height={selectedRole ? 430 : 550}
            priority
            className="drop-shadow-2xl transition-all duration-500"
          />

          {/* Interactive Content (Honeycomb Layout) */}
          <div className={`absolute flex items-center justify-center top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${selectedRole ? "w-[580px] h-[390px]" : "w-[750px] h-[500px]"}`}>
            {/* Central Hexagon */}
            <div
              className={`absolute text-white flex flex-col items-center justify-center text-center font-bold shadow-lg p-4 transition-all duration-500 ${selectedRole ? "w-28 h-28 text-sm" : "w-40 h-40 text-lg"}`}
              style={{
                backgroundColor: "#0091d2",
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                top: "48%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span>FTE Roles within Clients</span>
            </div>

            {/* Surrounding Hexagon Buttons */}
            {hexagonSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleRoleClick(section.id)}
                className={`absolute flex items-center justify-center text-center font-medium transition-all duration-300 cursor-pointer ${
                  selectedRole === section.id
                    ? "scale-110 z-10"
                    : selectedRole
                    ? "opacity-70 hover:opacity-100"
                    : "hover:scale-110"
                } ${selectedRole ? "w-24 h-24 text-xs p-2" : "w-32 h-32 text-sm p-3"}`}
                style={{
                  top: section.top,
                  left: section.left,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: selectedRole === section.id ? "#0091d2" : "white",
                  color: selectedRole === section.id ? "white" : "#0091d2",
                  outline: `3px solid ${selectedRole === section.id ? "#005f8a" : "#0091d2"}`,
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  animationDelay: `${index * 100}ms`,
                }}
                onMouseEnter={(e) => {
                  if (selectedRole !== section.id) {
                    e.currentTarget.style.backgroundColor = "#0091d2";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedRole !== section.id) {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#0091d2";
                  }
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel - Slides in from right */}
        <div
          className={`bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
            selectedRole && !isAnimating
              ? "w-[450px] opacity-100 translate-x-0"
              : "w-0 opacity-0 translate-x-20"
          }`}
        >
          {selectedRole && roleDetails[selectedRole] && (
            <div className="p-7 h-[500px] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-label uppercase rounded-pill mb-3">
                    {selectedRole.toUpperCase().replace("-", " ")}
                  </span>
                  <h2 className="text-h3 text-neutral-900">
                    {roleDetails[selectedRole].title}
                  </h2>
                </div>
                <button
                  onClick={closePanel}
                  className="w-9 h-9 rounded-pill bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Description */}
              <p className="text-body-sm text-neutral-600 mb-6 leading-relaxed">
                {roleDetails[selectedRole].description}
              </p>

              {/* Responsibilities */}
              <div className="mb-6">
                <div className="text-label text-brand-500 uppercase mb-3">01 · Key Responsibilities</div>
                <ul className="flex flex-col gap-2">
                  {roleDetails[selectedRole].responsibilities.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-body-sm text-neutral-700 animate-slide-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="font-mono text-brand-500 font-bold shrink-0 pt-0.5" aria-hidden>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <div className="text-label text-brand-500 uppercase mb-3">02 · Required Skills</div>
                <div className="flex flex-wrap gap-2">
                  {roleDetails[selectedRole].skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-brand-50 text-brand-700 text-body-sm rounded-pill border border-brand-200 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition cursor-default animate-fade-in"
                      style={{ animationDelay: `${index * 100 + 400}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200">
                <p className="text-body-sm text-neutral-400 text-center">
                  Click another role to compare or click the same role to close
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back to Reception Button */}
      <button
        onClick={() => router.push("/reception")}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-5 py-2.5 rounded-pill font-medium text-white bg-brand-500 shadow-sm hover:bg-brand-600 transition-all duration-300 hover:scale-[1.02] z-20 text-body-sm"
      >
        ← Back to Reception
      </button>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
