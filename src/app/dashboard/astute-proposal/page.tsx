"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function ChannelLeadGenerationProposal() {
  const [loading, setLoading] = useState(true);
  const [proposalId, setProposalId] = useState<number | null>(null);
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

  const handleChange = (field: string, value: string | number | TableRow[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
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

      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save: " + errorMessage(error));
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-100 font-[Ubuntu]">
      {/* Header */}
      <header className="bg-[#0091d2] text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Edit Channel Lead Generation Proposal - {data.companyName}</h1>
          <nav className="space-x-6">
            <Link href="/" className="text-white text-lg hover:underline">Home</Link>
            <Link href="/dashboard" className="text-white text-lg hover:underline">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto p-10">
        {/* Editable Company Name */}
        <div className="mb-6">
          <label className="text-lg font-bold text-gray-700">Company Name</label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0091d2] text-lg"
          />
        </div>

        {/* Editable Table */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-[#0091d2] mb-4">Proposal Cost Breakdown</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#0091d2] text-white">
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Value</th>
                <th className="border px-4 py-2">Item Cost</th>
                <th className="border px-4 py-2">Total Line Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row, index) => (
                <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                  <td className="border px-4 py-2">{row.description.replace(/\{COMPANY\}/g, data.companyName)}</td>
                  <td><input type="number" value={row.value} onChange={(e) => handleChange(`tableRows[${index}].value`, +e.target.value)} className="border p-2 w-full text-center" /></td>
                  <td><input type="text" value={row.cost} onChange={(e) => handleChange(`tableRows[${index}].cost`, e.target.value)} className="border p-2 w-full text-center" /></td>
                  <td><input type="text" value={row.totalCost} onChange={(e) => handleChange(`tableRows[${index}].totalCost`, e.target.value)} className="border p-2 w-full text-center" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Editable Text Sections */}
        <div className="mt-10 space-y-6">
          {["leadBenchmark", "primaryObjective", "secondaryObjective"].map((field) => (
            <div key={field}>
              <label className="text-lg font-bold text-gray-700 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
              <textarea
                value={data[field as keyof ProposalData] as string}
                onChange={(e) => handleChange(field, e.target.value)}
                className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-[#0091d2] text-lg"
                rows={4}
              ></textarea>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSave}
            className="bg-[#0091d2] px-8 py-4 text-white text-xl font-bold rounded-lg hover:bg-[#007bb8] shadow-lg transform hover:scale-105 transition-all"
          >
            Save Changes
          </button>
        </div>
      </section>
    </main>
  );
}
