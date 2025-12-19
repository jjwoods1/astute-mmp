"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WorldMap from "@/components/WorldMap";

// Country names for display
const countryNames: Record<string, string> = {
  GB: "United Kingdom",
  FR: "France",
  DE: "Germany",
  IT: "Italy",
  ES: "Spain",
  AE: "UAE",
  BE: "Belgium",
  DK: "Denmark",
  FI: "Finland",
  IE: "Ireland",
  SE: "Sweden",
  PL: "Poland",
  AT: "Austria",
  NL: "Netherlands",
  NO: "Norway",
  US: "USA",
  PT: "Portugal",
  CH: "Switzerland",
  GR: "Greece",
  CZ: "Czech Republic",
  HU: "Hungary",
  RO: "Romania",
  BG: "Bulgaria",
  HR: "Croatia",
  SK: "Slovakia",
  SI: "Slovenia",
  LT: "Lithuania",
  LV: "Latvia",
  EE: "Estonia",
  LU: "Luxembourg",
  MT: "Malta",
  CY: "Cyprus",
};

// Helper function to get flag URL from CDN
const getFlagUrl = (countryCode: string, width: number = 40): string => {
  return `https://flagcdn.com/w${width}/${countryCode.toLowerCase()}.png`;
};

export default function CompanyMap() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredCountryName, setHoveredCountryName] = useState<string | null>(null);

  // Define company data with logo filenames and countries
  const companyData: Record<string, { logo: string; countries: string[] }> = {
    cisco: {
      logo: "Cisco Logo Sized.png",
      countries: ["GB", "FR", "DE", "IT", "ES"],
    },
    fortinet: {
      logo: "Fortinet Sized.png",
      countries: ["FR", "DE", "IT", "ES", "AE"],
    },
    sonicwall: {
      logo: "Sonicwall Logo - Sized.png",
      countries: ["BE", "DK", "FI", "IE"],
    },
    transmode: {
      logo: "Transmode Logo Sized.png",
      countries: ["GB", "SE", "PL", "DE"],
    },
    alcatel: {
      logo: "Alcatel Lucent Sized.png",
      countries: ["AT", "FR", "DE", "IE"],
    },
    expand: {
      logo: "Expand Networks Sized.png",
      countries: ["FR", "DE", "ES", "GB"],
    },
    hp: {
      logo: "HP Logo Sized.png",
      countries: ["BE", "NL", "NO", "PL"],
    },
    vmware: {
      logo: "VMware Logo Sized.png",
      countries: ["GB", "US", "AT", "DE"],
    },
  };

  // Get highlighted country codes based on selected company
  const getHighlightedCountries = (): string[] => {
    if (!selectedCompany || !companyData[selectedCompany]) return [];
    return companyData[selectedCompany].countries;
  };

  const handleCountryHover = (countryCode: string | null, countryName: string | null) => {
    setHoveredCountry(countryCode);
    setHoveredCountryName(countryName);
  };

  return (
    <main className="h-screen overflow-hidden bg-[#0091d2] font-ubuntu flex flex-col">
      {/* Back to Reception Button */}
      <div className="absolute top-3 left-3 z-50">
        <Link href="/reception">
          <button className="px-3 py-1.5 bg-white text-[#0091d2] font-semibold rounded-lg hover:bg-[#007bb5] hover:text-white transition shadow-md text-sm">
            ← Back to Reception
          </button>
        </Link>
      </div>

      {/* Header Section */}
      <div className="pt-12 pb-3 px-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-center text-white">
          International Coverage
        </h1>
        <p className="text-center text-white/80 text-sm">
          Hover over a client logo to view their regional coverage
        </p>
      </div>

      {/* Company Logos Section */}
      <div className="px-4 pb-3 flex-shrink-0">
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(companyData).map(([company, data]) => (
              <div
                key={company}
                className={`p-2 transition-all duration-200 cursor-pointer ${
                  selectedCompany === company
                    ? "scale-110"
                    : "opacity-80 hover:opacity-100 hover:scale-105"
                }`}
                onMouseEnter={() => setSelectedCompany(company)}
              >
                <Image
                  src={`/Images/Company- Logos/${data.logo}`}
                  alt={company}
                  width={80}
                  height={40}
                  className="object-contain h-[35px] w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flag Strip Section */}
      <div className="px-4 pb-3 flex-shrink-0">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-3 h-[60px] flex items-center justify-center">
          {selectedCompany ? (
            <div className="flex flex-wrap justify-center items-center gap-4">
              {companyData[selectedCompany]?.countries.map((countryCode) => (
                <img
                  key={countryCode}
                  src={getFlagUrl(countryCode, 80)}
                  alt={countryNames[countryCode] || countryCode}
                  className="h-[40px] w-auto rounded shadow-sm border border-gray-100 transition-transform hover:scale-110"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm">
              Select a company above to see their coverage
            </p>
          )}
        </div>
      </div>

      {/* Interactive Map Section - Takes remaining space */}
      <div className="px-4 pb-4 flex-1 min-h-0">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-2 h-full overflow-hidden">
          <WorldMap
            highlightedCountries={getHighlightedCountries()}
            onCountryHover={handleCountryHover}
          />
        </div>
      </div>

      {/* Country Info Tooltip - Shows when hovering on map */}
      {hoveredCountry && hoveredCountryName && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border border-gray-100 text-sm">
          <img
            src={getFlagUrl(hoveredCountry, 40)}
            alt={hoveredCountryName}
            width={24}
            height={16}
            className="rounded shadow-sm"
          />
          <span className="font-semibold">{hoveredCountryName}</span>
        </div>
      )}
    </main>
  );
}
