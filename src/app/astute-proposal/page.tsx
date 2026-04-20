"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button, ChapterRail, SectionHeader, StatTile } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import type { ChapterRailItem } from "@/components/ui";

interface TableRow {
  description: string;
  value: string;
  cost: string;
  totalCost: string;
}

interface ProposalData {
  companyName: string;
  tableRows: TableRow[];
  totalCampaignCost: string;
  leadBenchmark: string;
  primaryObjective: string;
  secondaryObjective: string;
}

type SectionId = "summary" | "costs" | "objectives";

export default function ChannelLeadGenerationProposal() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionId>("summary");
  const [data, setData] = useState<ProposalData>({
    companyName: "Loading...",
    tableRows: [],
    totalCampaignCost: "",
    leadBenchmark: "",
    primaryObjective: "",
    secondaryObjective: "",
  });
  const [sanitizedData, setSanitizedData] = useState({
    leadBenchmark: "",
    primaryObjective: "",
    secondaryObjective: "",
  });

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const res = await fetch("/api/proposals");
        if (!res.ok) throw new Error("Failed to fetch");
        const proposalData = await res.json();

        if (proposalData) {
          const proposal: ProposalData = {
            companyName: proposalData.companyName || "Company",
            tableRows: proposalData.tableRows || [],
            totalCampaignCost: proposalData.totalCampaignCost?.toString() || "",
            leadBenchmark: proposalData.leadBenchmark || "",
            primaryObjective: proposalData.primaryObjective || "",
            secondaryObjective: proposalData.secondaryObjective || "",
          };

          setData(proposal);

          setSanitizedData({
            leadBenchmark: sanitizeHtml(await marked.parse(proposal.leadBenchmark)),
            primaryObjective: sanitizeHtml(await marked.parse(proposal.primaryObjective)),
            secondaryObjective: sanitizeHtml(await marked.parse(proposal.secondaryObjective)),
          });
        }
      } catch (err) {
        console.log("No proposal found:", err);
      }
    };
    fetchProposal();
  }, []);

  const sections: ChapterRailItem[] = [
    { id: "summary",    title: "Summary",    onSelect: () => setActiveSection("summary") },
    { id: "costs",      title: "Costs",      onSelect: () => setActiveSection("costs") },
    { id: "objectives", title: "Objectives", onSelect: () => setActiveSection("objectives") },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "summary":
        return (
          <div>
            <SectionHeader
              eyebrow="Prepared for"
              title={<>{data.companyName}</>}
              lede="Channel Lead Generation Proposal"
            />
            {data.totalCampaignCost ? (
              <div className="mt-10 grid grid-cols-[auto_1fr] gap-x-12 gap-y-8 max-w-2xl">
                <StatTile
                  value={data.totalCampaignCost}
                  label="Total campaign cost"
                  size="xl"
                />
              </div>
            ) : null}
          </div>
        );

      case "costs":
        return (
          <div>
            <SectionHeader eyebrow="01 · Breakdown" title="Proposal Cost Breakdown" />
            <div className="mt-10 max-w-4xl">
              <div className="flex items-center text-label text-neutral-400 uppercase px-4 py-3 border-b border-neutral-200">
                <div className="flex-1">Description</div>
                <div className="w-24 text-center">Value</div>
                <div className="w-32 text-right">Item cost</div>
                <div className="w-40 text-right">Total line cost</div>
              </div>
              {data.tableRows.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center px-4 py-4 border-b border-neutral-200 hover:bg-brand-50/40 transition-colors"
                >
                  <div className="flex-1 text-body text-neutral-800">
                    {row.description.replace(/\{COMPANY\}/g, data.companyName)}
                  </div>
                  <div className="w-24 text-center text-body text-neutral-600 tabular-numbers">{row.value}</div>
                  <div className="w-32 text-right text-body text-neutral-600 tabular-numbers">{row.cost}</div>
                  <div className="w-40 text-right text-body font-medium text-neutral-900 tabular-numbers">{row.totalCost}</div>
                </div>
              ))}
              {data.totalCampaignCost ? (
                <div className="flex items-center px-4 py-5 border-t-2 border-brand-500">
                  <div className="flex-1 text-h3 text-neutral-900 font-medium">Total campaign cost</div>
                  <div className="w-40 text-right text-h3 font-bold text-brand-500 tabular-numbers">{data.totalCampaignCost}</div>
                </div>
              ) : null}
            </div>
          </div>
        );

      case "objectives":
        return (
          <div>
            <SectionHeader eyebrow="02 · Objectives" title="Lead Benchmark & Objectives" />
            <div className="mt-10 max-w-3xl flex flex-col gap-8">
              {[
                { label: "Lead benchmark",     html: sanitizedData.leadBenchmark },
                { label: "Primary objective",  html: sanitizedData.primaryObjective },
                { label: "Secondary objective", html: sanitizedData.secondaryObjective },
              ].map((obj) => (
                <div key={obj.label} className="flex gap-5">
                  <span className="font-mono text-brand-500 font-bold pt-1 shrink-0" aria-hidden>→</span>
                  <div className="flex-1">
                    <div className="text-label text-brand-500 uppercase mb-2">{obj.label}</div>
                    <div
                      className="text-body text-neutral-700 leading-relaxed [&>p]:mb-3 [&>strong]:text-neutral-900 [&>strong]:font-semibold [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mt-2 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:pl-5"
                      dangerouslySetInnerHTML={{ __html: obj.html }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex font-ubuntu">
      {/* Left rail */}
      <div className="sticky top-0 h-screen flex flex-col bg-white border-r border-neutral-200 w-[260px] shrink-0">
        <div className="p-5 border-b border-neutral-200">
          <div className="text-label text-neutral-400 uppercase mb-1">Proposal</div>
          <div className="text-h3 text-neutral-900 leading-tight">{data.companyName}</div>
        </div>
        <ChapterRail
          heading="Contents"
          items={sections}
          activeId={activeSection}
          className="flex-1 border-r-0"
        />
        {data.totalCampaignCost ? (
          <div className="p-4 border-t border-neutral-200">
            <div className="rounded-lg bg-brand-500 text-white p-4 shadow-sm">
              <div className="text-label uppercase opacity-80 mb-1">Total</div>
              <div className="text-h2 font-bold leading-none tabular-numbers">{data.totalCampaignCost}</div>
            </div>
          </div>
        ) : null}
        <div className="p-4 border-t border-neutral-200">
          <Button variant="ghost" size="sm" onClick={() => router.push("/reception")} className="w-full justify-start">
            ← Back to Reception
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 min-w-0 px-10 lg:px-16 py-12">
        <FadeIn y={0} duration={0.4}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </FadeIn>
      </div>
    </main>
  );
}
