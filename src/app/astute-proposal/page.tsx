"use client";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { supabase } from "@/lib/supabase";
import sanitizeHtml from "sanitize-html";

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

export default function ChannelLeadGenerationProposal() {
  const [data, setData] = useState<ProposalData>({
    companyName: "Loading...",
    tableRows: [],
    totalCampaignCost: "$0.00",
    leadBenchmark: "Loading...",
    primaryObjective: "Loading...",
    secondaryObjective: "Loading...",
  });
  const [sanitizedData, setSanitizedData] = useState({
    leadBenchmark: "",
    primaryObjective: "",
    secondaryObjective: "",
  });

  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    // For now, fetch the first proposal (since there's no auth)
    // In a real app, you'd pass a user_id or proposal_id via URL params
    const { data: proposalData, error } = await supabase
      .from('proposals')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.log("No proposal found:", error);
      return;
    }

    if (proposalData) {
      const proposal: ProposalData = {
        companyName: proposalData.company_name || "Company",
        tableRows: proposalData.table_rows || [],
        totalCampaignCost: proposalData.total_campaign_cost?.toString() || "$0.00",
        leadBenchmark: proposalData.lead_benchmark || "",
        primaryObjective: proposalData.primary_objective || "",
        secondaryObjective: proposalData.secondary_objective || "",
      };

      setData(proposal);

      setSanitizedData({
        leadBenchmark: sanitizeHtml(await marked.parse(proposal.leadBenchmark)),
        primaryObjective: sanitizeHtml(await marked.parse(proposal.primaryObjective)),
        secondaryObjective: sanitizeHtml(await marked.parse(proposal.secondaryObjective)),
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#0091d2] font-[Ubuntu] flex flex-col items-center p-10">
      {/* Proposal Header Box */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
        {/* Proposal Title (Left) */}
        <h1 className="text-3xl font-bold text-[#0091d2]">
          {data.companyName} - Channel Lead Generation Proposal
        </h1>

        {/* Back to Reception Button (Right) */}
        <a
          href="/reception"
          className="bg-[#0091d2] text-white px-5 py-2 rounded-lg font-bold text-md hover:bg-[#007bb8] shadow-md transition"
        >
          ← Back to Reception
        </a>
      </div>

      {/* Proposal Content */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-8 mt-6">
        {/* Proposal Cost Breakdown */}
        <h2 className="text-2xl font-bold text-[#0091d2] mb-4">Proposal Cost Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-black">
            <thead>
              <tr className="bg-[#0091d2] text-white text-lg">
                <th className="border px-4 py-3 text-left">Description</th>
                <th className="border px-4 py-3 text-center">Value</th>
                <th className="border px-4 py-3 text-center">Item Cost</th>
                <th className="border px-4 py-3 text-right">Total Line Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row: TableRow, index) => (
                <tr key={index} className="border hover:bg-gray-100">
                  <td className="border px-4 py-3">{row.description.replace(/\{COMPANY\}/g, data.companyName)}</td>
                  <td className="border px-4 py-3 text-center">{row.value}</td>
                  <td className="border px-4 py-3 text-center">{row.cost}</td>
                  <td className="border px-4 py-3 text-right">{row.totalCost}</td>
                </tr>
              ))}

              {/* Total Campaign Cost */}
              <tr className="bg-[#0091d2] text-white font-bold text-xl">
                <td colSpan={3} className="border px-4 py-4 text-right">
                  TOTAL CAMPAIGN COST
                </td>
                <td className="border px-4 py-4 text-right">{data.totalCampaignCost}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Text Sections */}
        <div className="mt-8 space-y-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#0091d2] mb-2">Lead Benchmark</h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: sanitizedData.leadBenchmark }}
            />
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#0091d2] mb-2">Primary Objective</h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: sanitizedData.primaryObjective }}
            />
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#0091d2] mb-2">Secondary Objective</h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: sanitizedData.secondaryObjective }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
