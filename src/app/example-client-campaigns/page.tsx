"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Card, SectionHeader } from "@/components/ui";
import { FadeIn, StaggerChildren, StaggerItem, HoverLift } from "@/components/motion";

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
        { id: 1, name: "Mitel",     logo: "/images/clients/mitel-logo.png",                                    description: "Generating leads for Mitel\u2019s communication solutions.", leadsGenerated: 135, conversionRate: "14%" },
        { id: 2, name: "BT",        logo: "/images/Written-Testimonial-Images/TEST-1739530415344.png",         description: "Promoting BT\u2019s networking and connectivity services.",  leadsGenerated: 110, conversionRate: "13%" },
        { id: 3, name: "Lenovo",    logo: "/images/clients/lenovo-logo.png",                                   description: "Driving interest in Lenovo\u2019s computing solutions.",     leadsGenerated: 145, conversionRate: "16%" },
        { id: 4, name: "Samsung",   logo: "/images/clients/samsung-logo.png",                                  description: "Lead generation for Samsung\u2019s enterprise products.",    leadsGenerated: 120, conversionRate: "15%" },
        { id: 5, name: "Palo Alto", logo: "/images/clients/paloalto-logo.png",                                 description: "Security-focused campaigns for Palo Alto\u2019s solutions.", leadsGenerated: 130, conversionRate: "17%" },
      ]);
      setLoading(false);
    }, 400);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu">
      <div className="max-w-6xl mx-auto px-10 py-14">
        {/* Header */}
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <FadeIn y={0} duration={0.5}>
            <SectionHeader
              eyebrow="Case Studies"
              title="Example Client Campaigns"
              lede="A selection of lead-generation programmes Astute has delivered for enterprise clients."
            />
          </FadeIn>
          <FadeIn y={0} duration={0.5} delay={0.15}>
            <Button variant="secondary" size="md" onClick={() => router.push("/reception")}>
              ← Back to Reception
            </Button>
          </FadeIn>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-lg h-[300px] animate-pulse" />
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-20 text-body text-neutral-500">No campaigns available.</div>
        ) : (
          <StaggerChildren stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {campaigns.map((campaign) => (
              <StaggerItem key={campaign.id}>
                <HoverLift>
                  <Card
                    padded={false}
                    onClick={() => router.push(`/example-client-campaigns/${encodeURIComponent(campaign.name)}`)}
                    className="cursor-pointer overflow-hidden h-full flex flex-col"
                  >
                    {/* Logo panel */}
                    <div className="relative h-36 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center p-6">
                      <Image
                        src={campaign.logo}
                        alt={`${campaign.name} logo`}
                        width={160}
                        height={80}
                        className="max-w-[75%] max-h-[75%] object-contain"
                        priority
                      />
                      {/* Soft gradient veil at the bottom for legibility */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(255,255,255,0.8), transparent)" }}
                        aria-hidden
                      />
                    </div>

                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-h3 text-neutral-900 mb-2">{campaign.name}</div>
                      <p className="text-body text-neutral-600 leading-relaxed">{campaign.description}</p>

                      {/* Stat strip */}
                      <div className="mt-5 pt-5 border-t border-neutral-200 flex gap-8">
                        <div>
                          <div className="text-h3 text-brand-500 font-bold leading-none tabular-numbers">{campaign.leadsGenerated}</div>
                          <div className="text-label text-neutral-400 uppercase mt-2">Leads generated</div>
                        </div>
                        <div>
                          <div className="text-h3 text-brand-500 font-bold leading-none tabular-numbers">{campaign.conversionRate}</div>
                          <div className="text-label text-neutral-400 uppercase mt-2">Conversion rate</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </HoverLift>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </main>
  );
}
