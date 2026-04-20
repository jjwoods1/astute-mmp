"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CampaignDataSlide2() {
  const router = useRouter();
  const currentSlide = 2;

  return (
    <main
      className="relative min-h-screen flex items-center justify-center text-black font-[ubuntu]"
      style={{
        backgroundImage: "url('/images/Process Page - resize.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Slide Selector Dots (Right side) */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-5 z-20">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() =>
              router.push(`/process/campaign-data-key-considerations/new-company-data-slides/${num}`)
            }
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition
              ${
                num === currentSlide
                  ? "bg-[#0091d2] text-white"
                  : "bg-white text-[#0091d2] border-2 border-[#0091d2] hover:bg-[#0091d2] hover:text-white"
              }`}
            style={{ fontFamily: "ubuntu" }}
            aria-label={`Go to slide ${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Title Bubble */}
      <div
        className="absolute bg-white px-8 py-4 rounded-xl shadow-lg border-2 text-xl font-bold z-10"
        style={{
          borderColor: "#0091d2",
          color: "#0091d2",
          top: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "ubuntu",
          whiteSpace: "nowrap",
        }}
      >
        Campaign Data – Key Considerations
      </div>

      {/* Standardized Content Box */}
      <div
        id="content-box"
        className="bg-white p-8 rounded-xl shadow-lg w-[65%] h-[550px] flex flex-col mt-32 text-gray-800"
      >
        {/* Header with Numbered Circle */}
        <div className="flex items-start">
          <div
            className="w-12 h-12 flex items-center justify-center text-white text-xl font-bold rounded-full mr-4"
            style={{ backgroundColor: "#0091d2" }}
          >
            2
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Do you require contacts <strong>WITH</strong> a personal email address?
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              This would support an email send prior to a calling campaign.
            </p>
          </div>
        </div>

        {/* Static Image */}
        <div className="flex justify-center mt-6">
          <Image
            src="/images/Person-envelope-pen.png"
            alt="Data Enhancement Image"
            width={350}
            height={250}
            className="rounded-lg object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/process/campaign-data-key-considerations")}
        className="absolute bottom-10 left-10 bg-white text-[#0091d2] px-6 py-3 rounded-lg font-bold hover:bg-[#0091d2] hover:text-white transition shadow-md"
        style={{ fontFamily: "ubuntu" }}
      >
        Back to Campaign Data
      </button>
    </main>
  );
}
