"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CampaignInProgress() {
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
      {/* Blurred Background */}
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

      {/* Content: Centered Image in Available Space */}
      <div className="flex flex-col items-center w-full max-w-6xl pr-96 ml-auto mr-auto z-10">
        <Image
          src="/images/Campaign In Progress Image.png"
          alt="Campaign In Progress Flowchart"
          width={1000}
          height={750}
          className="rounded-lg"
        />
      </div>
    </main>
  );
}
