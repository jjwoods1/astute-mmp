"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Testimonial {
  id: string;
  imageUrl: string;
  text: string;
}

interface ApiWrittenTestimonial {
  id: number;
  testimonialImageUrl?: string | null;
  testimonialText?: string | null;
}

export default function CompanyTestimonials() {
  const { companyTag } = useParams();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Fetch company name
        const companyRes = await fetch(`/api/companies/${companyTag}`);
        if (companyRes.ok) {
          const companyData = await companyRes.json();
          setCompanyName(companyData.name);
        }

        // Fetch testimonials
        const testimonialRes = await fetch(`/api/written-testimonials?companyTag=${companyTag}`);
        if (!testimonialRes.ok) throw new Error("Failed to fetch testimonials");
        const testimonialData = await testimonialRes.json();

        const formattedTestimonials: Testimonial[] = (testimonialData || []).map((item: ApiWrittenTestimonial) => ({
          id: item.id.toString(),
          imageUrl: item.testimonialImageUrl ?? '',
          text: item.testimonialText || '',
        }));

        setTestimonials(formattedTestimonials);
      } catch (err) {
        console.error("Error loading testimonials:", err);
        setError("Error loading testimonials. Please try again later.");
      }
    };

    fetchTestimonials();
  }, [companyTag]);

  return (
    <main className="bg-[#0091d2] text-white min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold">{companyName || "Company"} Testimonials</h1>

      {/* Navigation Bar */}
      <nav className="my-6 flex justify-center space-x-6 text-lg font-medium">
        <Link href="/reception" className="hover:underline">Back to Reception</Link>
        <Link href="/testimonials/video" className="hover:underline">Video Testimonials</Link>
        <Link href="/telemarketing-guide" className="hover:underline">Telemarketing Guide</Link>
        <Link href="/testimonials/written" className="hover:underline">Back to All Companies</Link>
      </nav>

      {error && <p className="text-red-500">{error}</p>}

      {/* Testimonials Grid (No Background or Borders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {testimonials.length === 0 && !error ? (
          <p className="text-lg">No testimonials found for this company.</p>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-4 hover:scale-105 transition cursor-pointer" onClick={() => setSelectedImage(testimonial.imageUrl)}>
              <Image
                src={testimonial.imageUrl}
                alt="Testimonial"
                width={200}
                height={150}
                unoptimized
                className="object-contain"
              />
              <p className="text-lg mt-2">{testimonial.text}</p>
            </div>
          ))
        )}
      </div>

      {/* MODAL FOR FULL-SCREEN IMAGE */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full text-xl"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              &times;
            </button>
            <Image
              src={selectedImage}
              alt="Full-size Testimonial"
              width={800}
              height={600}
              unoptimized
              className="rounded-lg max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
