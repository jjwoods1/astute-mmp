"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface ExcludedCompany {
  id: number;
  company: string;
}

export default function UserDashboard() {
  const [excludedCompanies, setExcludedCompanies] = useState<string[]>([]);
  const [newCompany, setNewCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchExcludedCompanies();
  }, []);

  const fetchExcludedCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('excluded_companies')
        .select('*');

      if (error) throw error;
      setExcludedCompanies((data || []).map((r: ExcludedCompany) => r.company));
    } catch (err) {
      console.error("Error fetching excluded companies:", err);
      setError("Error fetching company exclusions. Please try again.");
    }
  };

  const addCompany = async () => {
    if (!newCompany.trim()) return;

    try {
      const { error } = await supabase
        .from('excluded_companies')
        .insert({ company: newCompany.trim() });

      if (error) {
        if (error.code === '23505') {
          setError("Company already exists in exclusion list");
        } else {
          throw error;
        }
        return;
      }

      setExcludedCompanies((prev) => [...prev, newCompany.trim()]);
      setNewCompany("");
      setError(null);
    } catch (err) {
      setError("Failed to add company.");
    }
  };

  const removeCompany = async (company: string) => {
    try {
      const { error } = await supabase
        .from('excluded_companies')
        .delete()
        .eq('company', company);

      if (error) throw error;
      setExcludedCompanies((prev) => prev.filter((c) => c !== company));
    } catch (err) {
      setError("Failed to remove company.");
    }
  };

  return (
    <main className="font-[Ubuntu] bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-[#0091d2] text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <nav className="space-x-6">
            <a href="/" className="text-white text-lg hover:underline">Home</a>
            <a href="/dashboard/astute-proposal" className="text-white text-lg hover:underline">
              Edit Channel Lead Generation Proposal
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto p-10 mt-6">
        <h2 className="text-2xl font-semibold text-[#0091d2] mb-6">Manage Companies to Exclude from MMP</h2>

        {error && <p className="text-red-500">{error}</p>}

        {/* Company Input Section */}
        <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <input
            type="text"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            placeholder="Enter company name"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0091d2] text-lg"
          />
          <button
            onClick={addCompany}
            className="bg-[#0091d2] text-white px-6 py-3 rounded-lg hover:bg-[#007bb8] transition-shadow shadow-md hover:shadow-lg"
          >
            Add Company
          </button>
        </div>

        {/* Excluded Companies List */}
        <div className="mt-8 space-y-3">
          {excludedCompanies.length > 0 ? (
            excludedCompanies.map((company) => (
              <div key={company} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <span className="text-gray-800 text-lg">{company}</span>
                <button
                  onClick={() => removeCompany(company)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-shadow shadow-md hover:shadow-lg"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">No companies excluded.</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex gap-6">
          <a href="/dashboard/astute-proposal">
            <button className="bg-[#0091d2] text-white px-6 py-3 rounded-lg hover:bg-[#007bb8] transition-shadow shadow-md hover:shadow-lg text-lg">
              Edit Channel Lead Generation Proposal
            </button>
          </a>
          <a href="/">
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-shadow shadow-md hover:shadow-lg text-lg">
              Back to Home
            </button>
          </a>
        </div>
      </section>
    </main>
  );
}
