"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function MarketPlatformApproach() {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarLinks = [
    { href: "/process/campaign-data-key-considerations", title: "Campaign Data - Key Considerations" },
    { href: "/process/campaign-planning-cycle", title: "Campaign Planning Cycle" },
    { href: "/process/campaign-in-progress", title: "Campaign in Progress" },
    { href: "/process/market-platform-approach", title: "Market Platform Approach" },
    { href: "/process/inside-sales-team", title: "Inside Sales Team" },
    { href: "/process/managed-prospect-stack", title: "Managed Prospect Stack" },
    { href: "/process/lead-nurture-animation", title: "Lead Nurture Animation" }
  ];

  return (
    <main className="relative min-h-screen flex items-center p-10">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Process Page - resize.png')",
          filter: "blur(8px)",
          zIndex: -1
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-full w-80 bg-[#0091d2] p-6 flex flex-col justify-between shadow-lg z-10">
        <nav className="space-y-3">
          {sidebarLinks.map(({ href, title }) => (
            <Link
              key={title}
              href={href}
              className={`block text-lg font-medium py-4 px-4 rounded-lg transition ${
                pathname === href
                  ? "bg-white text-[#0091d2] font-bold shadow-md"
                  : "text-white hover:bg-white hover:text-[#0091d2]"
              }`}
            >
              {title}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => router.push("/reception")}
          className="bg-white text-[#0091d2] p-3 rounded-lg font-bold hover:bg-[#007bb0] hover:text-white transition"
        >
          Back to Reception
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full max-w-5xl pr-96 ml-auto mr-auto z-10 space-y-10">
        {/* BUYING PLATFORM */}
        <div className="w-full">
          <div className="bg-[#0091d2] text-white text-xl font-semibold px-8 py-4 rounded-t-lg shadow-md">
            BUYING PLATFORM: Maximising Revenue
          </div>
          <div className="bg-white p-8 rounded-b-lg shadow-lg text-left border border-t-0 border-gray-300">
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Increase new-logo sales & maximise account revenues (Geog region, No. of employees, etc).</li>
              <li>Vendor & partner work in tandem.</li>
              <li>Increase BUYING Platform revenues throughout the year.</li>
            </ul>
          </div>
        </div>

        {/* WORKING PLATFORM */}
        <div className="w-full">
          <div className="bg-[#0091d2] text-white text-xl font-semibold px-8 py-4 rounded-t-lg shadow-md">
            WORKING PLATFORM: Sales Cycle Development
          </div>
          <div className="bg-white p-8 rounded-b-lg shadow-lg text-left border border-t-0 border-gray-300">
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Astute Client and Partners develop sales opportunities to closure.</li>
              <li>&lsquo;Pass-back&rsquo; lost sales opportunities to Market Platform.</li>
            </ul>
          </div>
        </div>

        {/* MARKET PLATFORM */}
        <div className="w-full">
          <div className="bg-[#0091d2] text-white text-xl font-semibold px-8 py-4 rounded-t-lg shadow-md">
            MARKET PLATFORM: Addressable Market
          </div>
          <div className="bg-white p-8 rounded-b-lg shadow-lg text-left border border-t-0 border-gray-300">
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Integrate Astute DB / Client DB.</li>
              <li>Contract Strategy of approx 5 calls per year plus marketing e-shots, DM, White Papers.</li>
              <li>Define Passed Lead Criteria.</li>
              <li>Astute to keep longer-term interests/opportunities warm until criteria met.</li>
              <li>Astute Client to report & track ‘passed’ leads from working to buying platform.</li>
              <li>Maximise cross-selling opportunities.</li>
              <li>Ongoing professional contact strategy.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
