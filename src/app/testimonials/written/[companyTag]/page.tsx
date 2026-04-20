"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Modal, SectionHeader } from "@/components/ui";
import { FadeIn, StaggerChildren, StaggerItem, HoverLift } from "@/components/motion";

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

export default function CompanyTestimonialsPage() {
  const { companyTag } = useParams();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const companyRes = await fetch(`/api/companies/${companyTag}`);
        if (companyRes.ok) {
          const companyData = await companyRes.json();
          setCompanyName(companyData.name);
        }
        const testimonialRes = await fetch(`/api/written-testimonials?companyTag=${companyTag}`);
        if (!testimonialRes.ok) throw new Error("Failed to fetch testimonials");
        const testimonialData = await testimonialRes.json();
        setTestimonials(
          (testimonialData || []).map((item: ApiWrittenTestimonial) => ({
            id: item.id.toString(),
            imageUrl: item.testimonialImageUrl ?? "",
            text: item.testimonialText || "",
          })),
        );
      } catch (err) {
        console.error("Error loading testimonials:", err);
        setError("Error loading testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [companyTag]);

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu text-neutral-900">
      <div className="max-w-6xl mx-auto px-10 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <FadeIn y={0} duration={0.4}>
            <SectionHeader
              eyebrow="Testimonials · Written"
              title={`${companyName ?? "Client"} Testimonials`}
            />
          </FadeIn>
          <FadeIn y={0} duration={0.4} delay={0.1}>
            <nav className="flex items-center gap-1 flex-wrap">
              <Link href="/testimonials/written">
                <Button variant="ghost" size="sm">← All clients</Button>
              </Link>
              <Link href="/testimonials/video">
                <Button variant="ghost" size="sm">Video</Button>
              </Link>
              <Link href="/telemarketing-guide">
                <Button variant="ghost" size="sm">Guide</Button>
              </Link>
            </nav>
          </FadeIn>
        </div>

        {error ? <p className="text-red-500">{error}</p> : null}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[280px] rounded-lg bg-white border border-neutral-200 animate-pulse" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-body text-neutral-500 py-16 text-center">No testimonials found for this client.</div>
        ) : (
          <StaggerChildren stagger={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <StaggerItem key={t.id}>
                <HoverLift>
                  <Card
                    interactive
                    padded={false}
                    onClick={() => setSelectedImage(t.imageUrl)}
                    className="overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] bg-neutral-100">
                      {t.imageUrl ? (
                        <Image
                          src={t.imageUrl}
                          alt="Testimonial"
                          fill
                          unoptimized
                          className="object-contain p-4"
                        />
                      ) : null}
                    </div>
                    {t.text ? (
                      <div className="p-5 text-body text-neutral-700 leading-relaxed">{t.text}</div>
                    ) : null}
                  </Card>
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>

      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} size="xl">
        {selectedImage ? (
          <div className="relative w-full aspect-[3/4]">
            <Image src={selectedImage} alt="Testimonial" fill unoptimized className="object-contain" />
          </div>
        ) : null}
      </Modal>
    </main>
  );
}
