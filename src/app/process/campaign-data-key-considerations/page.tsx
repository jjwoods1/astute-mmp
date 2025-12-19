"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function CampaignDataKeyConsiderations() {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarLinks = [
    { href: "/process/campaign-planning-cycle", title: "Campaign Planning Cycle" },
    { href: "/process/campaign-data-key-considerations", title: "Campaign Data - Key Considerations" },
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

      {/* Content Container */}
      <div className="flex flex-col items-center w-full max-w-5xl pr-96 ml-auto mr-auto z-10 space-y-10">
        {/* Title Box */}
        <div className="bg-white text-[#0091d2] text-2xl font-extrabold px-8 py-4 rounded-xl border-4 border-[#0091d2] shadow-xl text-center">
          Campaign Data - Key Considerations
        </div>

        {/* Main Action Box */}
        <div className="bg-white p-12 rounded-2xl shadow-2xl text-black w-full border-4 border-gray-300 flex flex-col items-center space-y-6 text-center">
          <Link
            href="/process/campaign-data-key-considerations/new-company-data-slides/1"
            className="block bg-[#0091d2] text-white px-8 py-5 rounded-xl text-lg font-semibold transition hover:bg-white hover:text-[#0091d2] hover:scale-105 w-[90%] shadow-md text-center"
          >
            Would you like to purchase <span className="font-bold">NEW</span> company data?
          </Link>

          <p className="text-[#0091d2] text-xl font-semibold">or / and</p>

          <Link
            href="/process/campaign-data-key-considerations/enhance-current-target-database-slides/1"
            className="block bg-[#0091d2] text-white px-8 py-5 rounded-xl text-lg font-semibold transition hover:bg-white hover:text-[#0091d2] hover:scale-105 w-[90%] shadow-md text-center"
          >
            Enhance a current target database that you hold in-house?
          </Link>
        </div>
      </div>
    </main>
  );
}
