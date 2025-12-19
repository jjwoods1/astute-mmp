"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ChannelLeadGenerationProposal() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [proposalId, setProposalId] = useState<number | null>(null);
  const [data, setData] = useState({
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
    fetchProposalData();
  }, []);

  const fetchProposalData = async () => {
    // Fetch the first proposal (since there's no auth)
    const { data: proposalData, error } = await supabase
      .from('proposals')
      .select('*')
      .limit(1)
      .single();

    if (!error && proposalData) {
      setProposalId(proposalData.id);
      setData({
        companyName: proposalData.company_name || data.companyName,
        tableRows: proposalData.table_rows || data.tableRows,
        totalCampaignCost: proposalData.total_campaign_cost?.toString() || data.totalCampaignCost,
        leadBenchmark: proposalData.lead_benchmark || data.leadBenchmark,
        primaryObjective: proposalData.primary_objective || data.primaryObjective,
        secondaryObjective: proposalData.secondary_objective || data.secondaryObjective,
      });
    }
    setLoading(false);
  };

  const handleChange = (field: string, value: any) => {
    setData({ ...data, [field]: value });
  };

  const handleSave = async () => {
    const proposalData = {
      user_id: 'default',
      company_name: data.companyName,
      table_rows: data.tableRows,
      total_campaign_cost: data.totalCampaignCost,
      lead_benchmark: data.leadBenchmark,
      primary_objective: data.primaryObjective,
      secondary_objective: data.secondaryObjective,
    };

    let error;
    if (proposalId) {
      // Update existing
      const result = await supabase
        .from('proposals')
        .update(proposalData)
        .eq('id', proposalId);
      error = result.error;
    } else {
      // Insert new
      const result = await supabase
        .from('proposals')
        .insert(proposalData);
      error = result.error;
    }

    if (error) {
      console.error("Error saving:", error);
      alert("Failed to save: " + error.message);
    } else {
      alert("Data saved successfully!");
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
            <a href="/" className="text-white text-lg hover:underline">Home</a>
            <a href="/dashboard" className="text-white text-lg hover:underline">Dashboard</a>
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
                value={(data as any)[field]}
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
