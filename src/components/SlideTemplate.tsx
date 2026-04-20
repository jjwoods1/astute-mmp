"use client";

import { ReactElement } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SlideTemplateProps {
  slideNumber: number;
  title: string;
  description: string | ReactElement;
  listItems?: string[];
  image?: string;
  images?: { src: string; alt: string }[];
}

export default function SlideTemplate({
  slideNumber,
  title,
  description,
  listItems,
  image,
  images,
}: SlideTemplateProps) {
  const router = useRouter();

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center text-black px-6"
      style={{
        backgroundImage: "url('/images/Process Page - resize.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Ubuntu', sans-serif",
      }}
    >
      {/* Title Bubble */}
      <div className="absolute left-10 top-10 bg-white px-6 py-3 rounded-lg shadow-lg border-2 border-[#0091d2] text-[#0091d2] text-xl font-bold">
        Campaign Data - Key Considerations
      </div>

      {/* Content Box */}
      <div className="bg-white p-8 rounded-xl shadow-xl text-black w-[65%] max-h-[80vh] flex flex-col overflow-auto mt-16 border-2 border-gray-300">
        {/* Header */}
        <div className="flex items-start">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-700 text-white text-xl font-bold rounded-full mr-4">
            {slideNumber}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-700 mb-4">{description}</p>
            {listItems && (
              <ul className="text-lg list-disc list-inside text-gray-700 mb-6">
                {listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Single Image Display */}
        {image && (
          <div className="flex justify-center mt-6">
            <Image
              src={image}
              alt={title}
              width={400}
              height={300}
              className="rounded-lg object-contain shadow-md"
              loading="lazy"
            />
          </div>
        )}

        {/* Multiple Images (Click to Enlarge) */}
        {images && (
          <div className="flex justify-center space-x-6 mt-6">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img.src}
                alt={img.alt}
                width={250}
                height={200}
                className="rounded-lg object-contain cursor-pointer transition-transform transform hover:scale-105 shadow-md"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>

      {/* Side Navigation */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <a
            key={num}
            href={`/process/campaign-data-key-considerations/slides/${num}`}
            className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold transition ${
              num === slideNumber ? "bg-blue-900 border-2 border-white" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {num}
          </a>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/process/campaign-data-key-considerations")}
        className="absolute bottom-10 left-10 bg-white text-[#0091d2] px-6 py-3 rounded-lg font-bold hover:bg-[#007bb5] hover:text-white transition shadow-md"
      >
        Back to Campaign Data
      </button>
    </main>
  );
}
