"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BTCampaignPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0091d2] p-10 font-ubuntu">
      {/* Header Section with Back Button */}
      <div className="relative max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-white">BT Campaign</h1>
        <button
          onClick={() => router.push("/example-client-campaigns")}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 px-6 py-3 bg-white text-[#0091d2] font-medium rounded-lg hover:bg-gray-200 transition shadow-md"
        >
          ⬅ Back to Campaigns
        </button>
      </div>

      {/* Campaign Details Card */}
      <div className="max-w-3xl mx-auto bg-white border-4 border-white shadow-lg rounded-lg overflow-hidden text-center">
        {/* Logo Section */}
        <div className="bg-[#0091d2] flex justify-center items-center h-40">
          <Image
            src="/images/Written-Testimonial-Images/TEST-1739530415344.png"
            alt="BT Logo"
            width={200}
            height={150}
            className="max-w-[80%] max-h-[80%] object-contain"
            priority
          />
        </div>

        {/* Campaign Details */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800">BT</h2>
          <p className="text-gray-600 mt-4">
            Promoting BT’s networking and connectivity services for enterprises worldwide.
          </p>
          <div className="mt-6 text-gray-700">
            <p>
              <b>Leads Generated:</b> 110
            </p>
            <p>
              <b>Conversion Rate:</b> 13%
            </p>
          </div>
          <button
            onClick={() => router.push("/example-client-campaigns")}
            className="mt-6 px-6 py-3 bg-[#0091d2] text-white rounded-lg hover:bg-[#007bb5] transition shadow-md"
          >
            ⬅ Back to Campaigns
          </button>
        </div>
      </div>
    </main>
  );
}
