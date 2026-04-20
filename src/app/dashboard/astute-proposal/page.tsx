"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button, ChapterRail, SectionHeader } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import type { ChapterRailItem } from "@/components/ui";
import { errorMessage } from "@/lib/errors";

interface TableRow {
  description: string;
  value: number;
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

export default function EditableChannelLeadGenerationProposal() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [proposalId, setProposalId] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("summary");
  const [data, setData] = useState<ProposalData>({
    companyName: "8x8",
    tableRows: [
      { description: "{COMPANY} Confirmation Email Creation", value: 1, cost: "£150.00", totalCost: "£150.00" },
      { description: "Campaign Set-up and Reporting", value: 1, cost: "£500.00", totalCost: "£500.00" },
      { description: "Data Purchase (If {COMPANY} can't provide their own data)", value: 0, cost: "£1.25", totalCost: "-" },
      { description: "Agent Lead Generation Days", value: 63, cost: "£250.00", totalCost: "£15,750.00" },
      { description: "Awareness Email Dispatch (to warm base)", value: 1, cost: "-", totalCost: "Stamp out to execute and dispatch. Enquiries to feed to Astute to qualify." },
      { description: "Dedicated Domain Registration", value: 1, cost: "£100.00", totalCost: "£100.00" },
      { description: "Dedicated 0800 Registration", value: 1, cost: "£100.00", totalCost: "£100.00" },
    ],
    totalCampaignCost: "£16,600.00",
    leadBenchmark: "**Final Lead Output** to be confirmed...",
    primaryObjective: "**Astute's main responsibility** is to generate Virtual Meetings...",
    secondaryObjective: "In situations where an immediate interest is not identified...",
  });

  useEffect(() => {
    const fetchProposalData = async () => {
      try {
        const res = await fetch("/api/proposals");
        if (!res.ok) throw new Error("Failed to fetch");
        const proposalData = await res.json();

        if (proposalData) {
          setProposalId(proposalData.id);
          setData((prev) => ({
            companyName: proposalData.companyName || prev.companyName,
            tableRows: proposalData.tableRows || prev.tableRows,
            totalCampaignCost: proposalData.totalCampaignCost?.toString() || prev.totalCampaignCost,
            leadBenchmark: proposalData.leadBenchmark || prev.leadBenchmark,
            primaryObjective: proposalData.primaryObjective || prev.primaryObjective,
            secondaryObjective: proposalData.secondaryObjective || prev.secondaryObjective,
          }));
        }
      } catch (err) {
        console.error("Error fetching proposal:", err);
      }
      setLoading(false);
    };
    fetchProposalData();
  }, []);

  const updateRow = (index: number, field: keyof TableRow, value: string | number) => {
    setData((prev) => ({
      ...prev,
      tableRows: prev.tableRows.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const proposalData = {
      companyName: data.companyName,
      tableRows: data.tableRows,
      totalCampaignCost: data.totalCampaignCost,
      leadBenchmark: data.leadBenchmark,
      primaryObjective: data.primaryObjective,
      secondaryObjective: data.secondaryObjective,
    };

    try {
      let res;
      if (proposalId) {
        res = await fetch(`/api/proposals/${proposalId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proposalData),
        });
      } else {
        res = await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...proposalData, userId: "default" }),
        });
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save");
      }

      toast.success("Proposal saved");
    } catch (error) {
      console.error("Error saving:", error);
      toast.error(`Failed to save: ${errorMessage(error)}`);
    } finally {
      setSaving(false);
    }
  };

  const sections: ChapterRailItem[] = [
    { id: "summary",    title: "Summary",    onSelect: () => setActiveSection("summary") },
    { id: "costs",      title: "Costs",      onSelect: () => setActiveSection("costs") },
    { id: "objectives", title: "Objectives", onSelect: () => setActiveSection("objectives") },
  ];

  const inputCls =
    "w-full bg-white border border-neutral-200 rounded-md px-3 py-2 text-body text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors";
  const labelCls = "text-label text-neutral-500 uppercase mb-2 block";

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center font-ubuntu">
        <div className="text-body text-neutral-500">Loading…</div>
      </main>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "summary":
        return (
          <div>
            <SectionHeader
              eyebrow="Edit · Prepared for"
              title="Summary"
              lede="Update the client name and headline total."
            />
            <div className="mt-10 max-w-xl flex flex-col gap-6">
              <div>
                <label className={labelCls}>Company name</label>
                <input
                  type="text"
                  value={data.companyName}
                  onChange={(e) => setData((p) => ({ ...p, companyName: e.target.value }))}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Total campaign cost</label>
                <input
                  type="text"
                  value={data.totalCampaignCost}
                  onChange={(e) => setData((p) => ({ ...p, totalCampaignCost: e.target.value }))}
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        );

      case "costs":
        return (
          <div>
            <SectionHeader eyebrow="Edit · 01 · Breakdown" title="Cost Breakdown" />
            <div className="mt-10 max-w-5xl">
              <div className="flex items-center text-label text-neutral-400 uppercase px-4 py-3 border-b border-neutral-200">
                <div className="flex-1">Description</div>
                <div className="w-24 text-center">Value</div>
                <div className="w-36 text-right">Item cost</div>
                <div className="w-48 text-right">Total line cost</div>
              </div>
              {data.tableRows.map((row, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200">
                  <div className="flex-1 text-body text-neutral-800 min-w-0 truncate">
                    {row.description.replace(/\{COMPANY\}/g, data.companyName)}
                  </div>
                  <input
                    type="number"
                    value={row.value}
                    onChange={(e) => updateRow(i, "value", Number(e.target.value))}
                    className={`${inputCls} w-24 text-center`}
                  />
                  <input
                    type="text"
                    value={row.cost}
                    onChange={(e) => updateRow(i, "cost", e.target.value)}
                    className={`${inputCls} w-36 text-right tabular-numbers`}
                  />
                  <input
                    type="text"
                    value={row.totalCost}
                    onChange={(e) => updateRow(i, "totalCost", e.target.value)}
                    className={`${inputCls} w-48 text-right tabular-numbers`}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "objectives":
        return (
          <div>
            <SectionHeader eyebrow="Edit · 02 · Objectives" title="Objectives" lede="Markdown supported." />
            <div className="mt-10 max-w-3xl flex flex-col gap-6">
              {([
                ["leadBenchmark", "Lead benchmark"],
                ["primaryObjective", "Primary objective"],
                ["secondaryObjective", "Secondary objective"],
              ] as const).map(([field, label]) => (
                <div key={field}>
                  <label className={labelCls}>{label}</label>
                  <textarea
                    value={data[field]}
                    onChange={(e) => setData((p) => ({ ...p, [field]: e.target.value }))}
                    rows={4}
                    className={`${inputCls} font-mono text-body-sm leading-relaxed`}
                  />
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
          <div className="text-label text-neutral-400 uppercase mb-1">Edit Proposal</div>
          <div className="text-h3 text-neutral-900 leading-tight">{data.companyName}</div>
        </div>
        <ChapterRail heading="Contents" items={sections} activeId={activeSection} className="flex-1 border-r-0" />
        <div className="p-4 border-t border-neutral-200">
          <div className="rounded-lg bg-brand-500 text-white p-4 shadow-sm">
            <div className="text-label uppercase opacity-80 mb-1">Total</div>
            <div className="text-h2 font-bold leading-none tabular-numbers">{data.totalCampaignCost}</div>
          </div>
        </div>
        <div className="p-4 border-t border-neutral-200 flex flex-col gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="w-full justify-start">
            ← Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 px-10 lg:px-16 py-12 pb-28">
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

      {/* Floating save bar */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-white border border-neutral-200 rounded-pill shadow-lg px-3 py-2">
        <span className="text-body-sm text-neutral-500 pl-3">Unsaved changes in this session</span>
        <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </main>
  );
}
