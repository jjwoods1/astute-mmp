"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TargetDatabaseSlide7() {
  const router = useRouter();
  const currentSlide = 7;

  return (
    <main
      className="relative min-h-screen flex items-center justify-center text-black font-[ubuntu]"
      style={{
        backgroundImage: "url('/images/Process Page - resize.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Slide Selector Dots */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-5 z-20">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <button
            key={num}
            onClick={() =>
              router.push(`/process/campaign-data-key-considerations/enhance-current-target-database-slides/${num}`)
            }
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition ${
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
        Target Database – Key Considerations
      </div>

      {/* Content Box */}
      <div
        id="content-box"
        className="bg-white p-8 rounded-xl shadow-lg w-[65%] h-[550px] flex flex-col mt-32 text-gray-800"
      >
        <div className="flex items-start">
          <div
            className="w-12 h-12 flex items-center justify-center text-white text-xl font-bold rounded-full mr-4"
            style={{ backgroundColor: "#0091d2" }}
          >
            7
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Are there any suppression files we should remove from the data you would like to purchase?
            </h1>
            <ul className="text-lg list-disc list-inside text-gray-700 mb-6">
              <li>Customer suppressions</li>
              <li>Top prospect suppressions</li>
              <li>Opt-out contacts</li>
            </ul>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-end mt-6">
          <Image
            src="/images/data-with-one-page.png"
            alt="Suppression Files"
            width={250}
            height={200}
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
