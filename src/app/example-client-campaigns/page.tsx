"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Campaign {
  id: number;
  name: string;
  logo: string;
  description: string;
  leadsGenerated: number;
  conversionRate: string;
}

export default function ExampleClientCampaigns() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCampaigns([
        {
          id: 1,
          name: "Mitel",
          logo: "/images/clients/mitel-logo.png",
          description: "Generating leads for Mitel’s communication solutions.",
          leadsGenerated: 135,
          conversionRate: "14%",
        },
        {
          id: 2,
          name: "BT",
          logo: "/images/Written-Testimonial-Images/TEST-1739530415344.png",
          description: "Promoting BT’s networking and connectivity services.",
          leadsGenerated: 110,
          conversionRate: "13%",
        },
        {
          id: 3,
          name: "Lenovo",
          logo: "/images/clients/lenovo-logo.png",
          description: "Driving interest in Lenovo’s computing solutions.",
          leadsGenerated: 145,
          conversionRate: "16%",
        },
        {
          id: 4,
          name: "Samsung",
          logo: "/images/clients/samsung-logo.png",
          description: "Lead generation for Samsung’s enterprise products.",
          leadsGenerated: 120,
          conversionRate: "15%",
        },
        {
          id: 5,
          name: "Palo Alto",
          logo: "/images/clients/paloalto-logo.png",
          description: "Security-focused campaigns for Palo Alto’s solutions.",
          leadsGenerated: 130,
          conversionRate: "17%",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="min-h-screen bg-[#0091d2] p-10 font-ubuntu relative">
      {/* Title & Button Section */}
      <div className="relative max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Example Client Campaigns</h1>

        {/* Back to Reception Button - Positioned to the Right */}
        <button
          onClick={() => router.push("/reception")}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 px-6 py-3 bg-white text-[#0091d2] font-medium rounded-lg hover:bg-gray-200 transition shadow-md"
          aria-label="Back to Reception"
        >
          ⬅ Back to Reception
        </button>
      </div>

      {loading ? (
        <div className="text-center text-white">Loading campaigns...</div>
      ) : campaigns.length === 0 ? (
        <div className="text-center text-white">No campaigns available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white border-4 border-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => router.push(`/example-client-campaigns/${encodeURIComponent(campaign.name)}`)}
            >
              {/* Logo Section with Blue Background */}
              <div className="bg-[#0091d2] flex justify-center items-center h-32">
                <Image
                  src={campaign.logo}
                  alt={`${campaign.name} Logo`}
                  width={150}
                  height={100}
                  className="max-w-[80%] max-h-[80%] object-contain"
                  priority
                />
              </div>

              {/* Campaign Details */}
              <div className="p-6 text-center">
                <h2 className="text-xl font-medium text-gray-800">{campaign.name}</h2>
                <p className="text-gray-600 mt-2">{campaign.description}</p>
                <div className="mt-4 text-gray-700">
                  <p>
                    <b>Leads Generated:</b> {campaign.leadsGenerated}
                  </p>
                  <p>
                    <b>Conversion Rate:</b> {campaign.conversionRate}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents clicking the button from triggering the whole box click
                    router.push(`/example-client-campaigns/${encodeURIComponent(campaign.name)}`);
                  }}
                  className="mt-4 px-6 py-2 bg-[#0091d2] text-white rounded-lg hover:bg-[#007bb5] transition shadow-md"
                  aria-label={`View details about ${campaign.name}`}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
