"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

interface Company {
  companyTag: string;
  name: string;
  logoUrl: string;
}

export default function WrittenTestimonials() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('has_written_testimonial', true);

        if (error) throw error;

        const companyData = (data || []).map((item) => ({
          companyTag: item.company_tag,
          name: item.name,
          logoUrl: item.logo_url?.startsWith("/") ? item.logo_url : `/${item.logo_url}`,
        }));

        setCompanies(companyData);
      } catch (err) {
        console.error("Error loading company logos:", err);
        setError("Error loading company logos. Please try again later.");
      }
    };

    fetchCompanies();
  }, []);

  return (
    <main className="bg-[#0091d2] text-white min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold">Written Testimonials</h1>

      {/* Navigation Bar */}
      <nav className="my-6 flex justify-center space-x-6 text-lg font-medium">
        <Link href="/reception" className="hover:underline">Back to Reception</Link>
        <Link href="/testimonials/video" className="hover:underline">Video Testimonials</Link>
        <Link href="/telemarketing-guide" className="hover:underline">Telemarketing Guide</Link>
      </nav>

      {error && <p className="text-red-500">{error}</p>}

      {/* Company Logo Grid (Smaller Images) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {companies.length === 0 && !error ? (
          <p className="text-lg">No written testimonials available.</p>
        ) : (
          companies.map((company) => (
            <Link key={company.companyTag} href={`/testimonials/written/${company.companyTag}`} >
              <div className="cursor-pointer hover:scale-105 transition">
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  width={150}
                  height={75}
                  unoptimized
                  className="object-contain h-[75px] w-auto"
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
