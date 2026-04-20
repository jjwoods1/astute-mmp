"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PillNav from "@/components/PillNav";

interface Company {
  companyTag: string;
  name: string;
  logoUrl: string;
}

interface ApiCompany {
  companyTag: string;
  name: string;
  logoUrl?: string | null;
}

export default function WrittenTestimonials() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/companies?hasWrittenTestimonial=true");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const companyData: Company[] = (data || []).map((item: ApiCompany) => ({
          companyTag: item.companyTag,
          name: item.name,
          logoUrl: item.logoUrl?.startsWith("/") ? item.logoUrl : `/${item.logoUrl ?? ""}`,
        }));

        setCompanies(companyData);
      } catch (err) {
        console.error("Error loading company logos:", err);
        setError("Error loading company logos. Please try again later.");
      }
    };

    fetchCompanies();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <main className="bg-[#0091d2] text-white min-h-screen text-center p-6">
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Written Testimonials
      </motion.h1>

      {/* Pill Navigation Bar */}
      <div className="my-6 flex justify-center">
        <PillNav
          items={[
            { label: "Video", href: "/testimonials/video" },
            { label: "Written", href: "/testimonials/written" },
            { label: "Telemarketing Guide", href: "/telemarketing-guide" },
            { label: "Reception", href: "/reception" },
          ]}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Company Logo Grid with Animations */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {companies.length === 0 && !error ? (
          <p className="text-lg">No written testimonials available.</p>
        ) : (
          companies.map((company) => (
            <Link key={company.companyTag} href={`/testimonials/written/${company.companyTag}`}>
              <motion.div
                className="cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  width={150}
                  height={75}
                  unoptimized
                  className="object-contain h-[75px] w-auto"
                />
              </motion.div>
            </Link>
          ))
        )}
      </motion.div>
    </main>
  );
}
