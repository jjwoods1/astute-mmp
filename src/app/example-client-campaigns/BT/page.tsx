"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Card, SectionHeader, StatTile } from "@/components/ui";
import { FadeIn } from "@/components/motion";

export default function BTCampaignPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu">
      <div className="max-w-6xl mx-auto px-10 py-14">
        {/* Header row */}
        <div className="flex items-start justify-between gap-6 mb-10 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => router.push("/example-client-campaigns")}>
            ← Back to Campaigns
          </Button>
        </div>

        {/* Split hero: left copy, right logo panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 mb-12">
          <FadeIn y={0} duration={0.5}>
            <div>
              <SectionHeader
                eyebrow="Case Study"
                title="BT"
                lede={<>Promoting BT&rsquo;s networking and connectivity services for enterprises worldwide.</>}
                size="display"
              />
            </div>
          </FadeIn>
          <FadeIn y={0} duration={0.6} delay={0.15}>
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100 ring-1 ring-neutral-200 aspect-[4/3] flex items-center justify-center p-10">
              <Image
                src="/images/Written-Testimonial-Images/TEST-1739530415344.png"
                alt="BT Logo"
                width={280}
                height={180}
                className="max-w-[70%] max-h-[70%] object-contain"
                priority
              />
            </div>
          </FadeIn>
        </div>

        {/* Stat strip */}
        <FadeIn y={0} duration={0.5} delay={0.3}>
          <Card className="mb-10">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-12">
              <StatTile value="110" label="Leads generated" size="xl" />
              <StatTile value="13%" label="Conversion rate" size="xl" />
            </div>
          </Card>
        </FadeIn>

        {/* Editorial body */}
        <FadeIn y={0} duration={0.5} delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
            <div>
              <div className="text-label text-brand-500 uppercase mb-4">About the campaign</div>
              <p className="text-body-lg text-neutral-700 leading-relaxed">
                Promoting BT&rsquo;s networking and connectivity services for enterprises worldwide.
              </p>
            </div>
            <Card>
              <div className="text-label text-brand-500 uppercase mb-3">Programme at a glance</div>
              <dl className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-body-sm text-neutral-500">Client</dt>
                  <dd className="text-body text-neutral-900 font-medium">BT</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-body-sm text-neutral-500">Focus</dt>
                  <dd className="text-body text-neutral-900 font-medium">Networking & connectivity</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-body-sm text-neutral-500">Scale</dt>
                  <dd className="text-body text-neutral-900 font-medium">Worldwide enterprise</dd>
                </div>
              </dl>
            </Card>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
