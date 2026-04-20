"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader, Button } from "@/components/ui";
import { FadeIn, StaggerChildren, StaggerItem, HoverLift } from "@/components/motion";

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

function CompanyLogo({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src || src === "/") {
    const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    return (
      <div className="w-20 h-20 rounded-pill bg-white border border-brand-200 flex items-center justify-center">
        <span className="text-h2 text-brand-500 font-bold tracking-tight">{initials}</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={160}
      height={80}
      className="max-w-[75%] max-h-[75%] object-contain"
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}

export default function WrittenTestimonials() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu text-neutral-900">
      <div className="max-w-6xl mx-auto px-10 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <FadeIn y={0} duration={0.4}>
            <SectionHeader
              eyebrow="Testimonials · Written"
              title="Written Testimonials"
              lede="Select a client to view their testimonials."
            />
          </FadeIn>
          <FadeIn y={0} duration={0.4} delay={0.1}>
            <nav className="flex items-center gap-1">
              <Link href="/testimonials/video">
                <Button variant="ghost" size="sm">Video</Button>
              </Link>
              <Link href="/telemarketing-guide">
                <Button variant="ghost" size="sm">Guide</Button>
              </Link>
              <Link href="/reception">
                <Button variant="secondary" size="sm">← Reception</Button>
              </Link>
            </nav>
          </FadeIn>
        </div>

        {error ? <p className="text-red-500">{error}</p> : null}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-32 rounded-lg bg-white border border-neutral-200 animate-pulse" />
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="text-body text-neutral-500 py-16 text-center">No written testimonials available.</div>
        ) : (
          <StaggerChildren stagger={0.06} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {companies.map((company) => (
              <StaggerItem key={company.companyTag}>
                <HoverLift>
                  <Link href={`/testimonials/written/${company.companyTag}`}>
                    <div className="h-32 bg-white border border-neutral-200 rounded-lg flex items-center justify-center p-5 hover:border-brand-500 transition-colors">
                      <CompanyLogo name={company.name} src={company.logoUrl} />
                    </div>
                  </Link>
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </main>
  );
}
