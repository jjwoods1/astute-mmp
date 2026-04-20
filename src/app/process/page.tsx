"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, ChapterRail, SectionHeader } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { CampaignInProgressDiagram } from "@/components/diagrams/CampaignInProgressDiagram";
import { ManagedProspectStackDiagram } from "@/components/diagrams/ManagedProspectStackDiagram";

// ============ CAMPAIGN DATA KEY CONSIDERATIONS ============
const newCompanyDataSlides = [
  {
    id: 1,
    title: "If you would like to purchase new / fresh company data, have you considered the target market you would like to address?",
    bullets: ["Employee size of organisations (example 100-500 employees)", "Industry sectors", "UK or International regions", "Key decision maker roles"],
    images: [
      { src: "/images/Number of Employees Table.png", alt: "Number of Employees Table", clickable: true },
      { src: "/images/Nature Of Business Table.png", alt: "Nature of Business Table", clickable: true },
      { src: "/images/Region Table.png", alt: "Region Table", clickable: true },
    ],
    imageLayout: "row-3",
  },
  {
    id: 2,
    title: "Do you require contacts WITH a personal email address?",
    description: "This would support an email send prior to a calling campaign.",
    images: [{ src: "/images/Person-envelope-pen.png", alt: "Data Enhancement Image", clickable: false }],
    imageLayout: "center",
  },
  {
    id: 3,
    title: "Would you like to procure multiple contacts or single contacts per company?",
    bullets: ["Single contacts allow the purchase of more companies within your budget", "Multiple contacts provide more avenues into larger organisations, increasing your chance of booking a meeting with your target companies"],
    images: [
      { src: "/images/2 people with line.png", alt: "Single contacts", clickable: false },
      { src: "/images/5 People with connection line.png", alt: "Multiple contacts", clickable: false },
    ],
    imageLayout: "row-2",
  },
  {
    id: 4,
    title: "How much data do you need to support your lead generation campaign?",
    bullets: ["Astute estimates 40 companies are needed per day of calling", "A 30-day campaign requires 1,200 company records"],
    images: [{ src: "/images/Data Volume Matrix.png", alt: "Data Volume Matrix", clickable: true }],
    imageLayout: "center",
  },
  {
    id: 5,
    title: "Are there any suppression files we should remove from the data you would like to purchase?",
    bullets: ["Customer suppressions", "Top prospect suppressions", "Opt-out contacts"],
    images: [{ src: "/images/data icon with 2 pages.png", alt: "Suppression Data Icon", clickable: false }],
    imageLayout: "right",
  },
];

const enhanceTargetDatabaseSlides = [
  { id: 1, description: "If you would like to enhance a current database before calling, consider the following aspects:", title: "Are you confident that the companies you would like to enhance fall within your target market?", images: [{ src: "/images/Data icon with +.png", alt: "Data Icon with Plus", clickable: false }], imageLayout: "right" },
  { id: 2, title: "Does your current data include large volumes of company/contact duplications, and how fresh is your data?", images: [{ src: "/images/Data With Question Marks.png", alt: "Data with Question Marks", clickable: false }], imageLayout: "right" },
  { id: 3, title: "Would you like to purchase company-level / technical intelligence appends, as well as new contacts?", bullets: ["For example, volume of PC users", "Installed server vendor", "Installed security vendor", "Installed PBX vendor", "and more..."], images: [{ src: "/images/New Data.png", alt: "New Data", clickable: false }], imageLayout: "right" },
  { id: 4, title: "Would you like to purchase companies within your identified target market, but NOT in your current prospect database?", images: [{ src: "/images/Search Data.png", alt: "Database Search Icon", clickable: false }], imageLayout: "right" },
  { id: 5, title: "Do you require contacts with email addresses?", images: [{ src: "/images/Email Data.png", alt: "Email Data Icon", clickable: false }], imageLayout: "right" },
  { id: 6, title: "Would you like to procure multiple contacts or single contacts per company?", bullets: ["Single contacts allow the purchase of more companies within your budget", "Multiple contacts provide more avenues into larger organisations, increasing your chance of booking a meeting with your target companies"], images: [{ src: "/images/2 pages.png", alt: "Multiple Contacts", clickable: false }], imageLayout: "right" },
  { id: 7, title: "Are there any suppression files we should remove from the data you would like to purchase?", bullets: ["Customer suppressions", "Top prospect suppressions", "Opt-out contacts"], images: [{ src: "/images/data-with-one-page.png", alt: "Suppression Files", clickable: false }], imageLayout: "right" },
];

// ============ CAMPAIGN PLANNING CYCLE ============
const processSteps = [
  { title: "Initial Briefing Session", description: "Initial meeting or audio conference call to discuss the background of the campaign and document clear objectives and targets/benchmarks." },
  { title: "Target Audience", description: "Defining the ideal customer profile and identifying key target segments." },
  { title: "Sizing the Campaign", description: "Determining the scope and scale of the campaign based on available resources and goals." },
  { title: "Profiling Questions", description: "Crafting questions to gather necessary information and qualify prospects." },
  { title: "Supporting Collateral", description: "Providing relevant materials to support the campaign efforts." },
  { title: "Proposition Development", description: "Creating a compelling value proposition tailored to the target audience." },
  { title: "Call To Action(s)", description: "Establishing the key actions you want prospects to take after engagement." },
  { title: "Call Instrument", description: "Deciding the best method for communication (phone, email, etc.)." },
  { title: "Lead Distribution", description: "Allocating leads to the appropriate sales representatives." },
  { title: "Campaign Reporting", description: "Tracking performance metrics and analyzing the effectiveness of the campaign." },
  { title: "Agent Training", description: "Ensuring agents are well-trained to execute the campaign successfully." },
];

// ============ LEAD NURTURE SLIDES ============
const leadNurtureSlides = [
  { video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_1", title: "Lead Nurture (Short)", description: `"A sustained relationship with (the) influencers and decision-makers in a potential customer, through which relevant and valuable insight is delivered through integrated channels in a coordinated process, in exchange for increasing intimacy and influence."`, author: "Forrester Research" },
  { video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2", title: "Lead Nurture (Long)", description: `"Effective nurturing strategies are built around the customer's journey through the buying process."`, author: "Lori Wizdo, Forrester Research" },
  { video: "", title: "Email & Lead Nurturing Stats", description: `"Over-emailing and irrelevant content are the top reasons people unsubscribe from email mailing lists."`, author: "Chadwick Martin Bailey" },
];

type SectionType = "campaign-data" | "campaign-planning" | "campaign-in-progress" | "market-platform" | "inside-sales" | "managed-prospect" | "lead-nurture";
type SlideSetType = "none" | "new-company" | "enhance-database";

const sections: { id: SectionType; title: string }[] = [
  { id: "campaign-data", title: "Campaign Data - Key Considerations" },
  { id: "campaign-planning", title: "Campaign Planning Cycle" },
  { id: "campaign-in-progress", title: "Campaign in Progress" },
  { id: "market-platform", title: "Market Platform Approach" },
  { id: "inside-sales", title: "Inside Sales Team" },
  { id: "managed-prospect", title: "Managed Prospect Stack" },
  { id: "lead-nurture", title: "Lead Nurture Animation" },
];

export default function ProcessPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionType>("campaign-data");

  // Campaign Data specific state
  const [activeSlideSet, setActiveSlideSet] = useState<SlideSetType>("none");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideAnimating, setIsSlideAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  // Campaign Planning specific state
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  // Inside Sales specific state
  const [showVideo, setShowVideo] = useState(false);

  // Lead Nurture specific state
  const [leadNurtureIndex, setLeadNurtureIndex] = useState(0);

  // Image modal state
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const activeSectionData = sections[activeIndex];

  const switchSection = (sectionId: SectionType) => {
    if (sectionId === activeSection) return;
    // Reset section-specific state
    setActiveSlideSet("none");
    setCurrentSlide(0);
    setHoveredStep(null);
    setShowVideo(false);
    setLeadNurtureIndex(0);
    setActiveSection(sectionId);
  };

  const slides = activeSlideSet === "new-company" ? newCompanyDataSlides : enhanceTargetDatabaseSlides;

  const goToSlide = (index: number) => {
    if (index === currentSlide || isSlideAnimating) return;
    setSlideDirection(index > currentSlide ? "next" : "prev");
    setIsSlideAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => setIsSlideAnimating(false), 50);
    }, 250);
  };

  const openSlideSet = (type: SlideSetType) => {
    setCurrentSlide(0);
    setActiveSlideSet(type);
  };

  const showImage = (src: string) => {
    setModalImage(src);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.max(1, Math.min(prev + e.deltaY * -0.001, 3)));
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - startPosition.x, y: e.clientY - startPosition.y });
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleDoubleClick = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // ============ RENDER SECTION CONTENT ============
  const renderContent = () => {
    switch (activeSection) {
      case "campaign-data":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            <button onClick={() => openSlideSet("new-company")} className="group text-left">
              <Card interactive className="h-full flex flex-col justify-between min-h-[180px]">
                <div className="text-label text-brand-500 uppercase mb-3">Option A</div>
                <div>
                  <div className="text-h3 text-neutral-900 mb-2 leading-snug">
                    Would you like to purchase <span className="text-brand-500 font-bold">NEW</span> company data?
                  </div>
                  <div className="text-body-sm text-neutral-500 mt-4 flex items-center gap-2">
                    <span>5 slides</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden />
                    <span>~4 min</span>
                    <span className="ml-auto text-brand-500 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Card>
            </button>
            <button onClick={() => openSlideSet("enhance-database")} className="group text-left">
              <Card interactive className="h-full flex flex-col justify-between min-h-[180px]">
                <div className="text-label text-brand-500 uppercase mb-3">Option B</div>
                <div>
                  <div className="text-h3 text-neutral-900 mb-2 leading-snug">
                    Enhance a current target database that you hold in-house?
                  </div>
                  <div className="text-body-sm text-neutral-500 mt-4 flex items-center gap-2">
                    <span>7 slides</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden />
                    <span>~6 min</span>
                    <span className="ml-auto text-brand-500 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Card>
            </button>
          </div>
        );

      case "campaign-planning":
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {processSteps.map((step, i) => {
                const active = hoveredStep === step.title;
                return (
                  <button
                    key={i}
                    onMouseEnter={() => setHoveredStep(step.title)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onFocus={() => setHoveredStep(step.title)}
                    onBlur={() => setHoveredStep(null)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-pill border text-body-sm font-medium transition-all duration-200 ease-out-expo ${
                      active
                        ? "bg-brand-500 text-white border-brand-500 shadow-sm"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-brand-300 hover:text-brand-500"
                    }`}
                  >
                    <span className={`font-mono text-label ${active ? "text-white/80" : "text-neutral-400"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step.title}</span>
                  </button>
                );
              })}
            </div>
            <Card className="max-w-3xl">
              {hoveredStep ? (
                <>
                  <div className="text-label text-brand-500 uppercase mb-2">Step</div>
                  <div className="text-h3 text-neutral-900 mb-2">{hoveredStep}</div>
                  <p className="text-body text-neutral-600">
                    {processSteps.find((s) => s.title === hoveredStep)?.description}
                  </p>
                </>
              ) : (
                <p className="text-body text-neutral-500">Hover a step to see its description.</p>
              )}
            </Card>
          </div>
        );

      case "campaign-in-progress":
        return (
          <Card className="max-w-5xl">
            <CampaignInProgressDiagram />
          </Card>
        );

      case "market-platform":
        return (
          <div className="flex flex-col gap-4 max-w-4xl">
            {[
              { title: "BUYING PLATFORM: Maximising Revenue", items: ["Increase new-logo sales & maximise account revenues (Geog region, No. of employees, etc).", "Vendor & partner work in tandem.", "Increase BUYING Platform revenues throughout the year."] },
              { title: "WORKING PLATFORM: Sales Cycle Development", items: ["Astute Client and Partners develop sales opportunities to closure.", "'Pass-back' lost sales opportunities to Market Platform."] },
              { title: "MARKET PLATFORM: Addressable Market", items: ["Integrate Astute DB / Client DB.", "Contract Strategy of approx 5 calls per year plus marketing e-shots, DM, White Papers.", "Define Passed Lead Criteria.", "Astute to keep longer-term interests/opportunities warm until criteria met.", "Astute Client to report & track 'passed' leads from working to buying platform.", "Maximise cross-selling opportunities.", "Ongoing professional contact strategy."] },
            ].map((platform) => (
              <Card key={platform.title} className="relative border-l-4 border-l-brand-500">
                <div className="text-label text-brand-500 uppercase mb-4">{platform.title}</div>
                <ul className="flex flex-col gap-2.5">
                  {platform.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-body text-neutral-700">
                      <span className="font-mono text-brand-500 font-bold shrink-0 pt-0.5" aria-hidden>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        );

      case "inside-sales":
        return (
          <div className="max-w-2xl">
            <Card>
              <div className="text-label text-brand-500 uppercase mb-5">Inside Sales Team Contracts</div>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Experienced Graduate Agents",
                  "Take Sales Process Through to Closure",
                  "Full Quotation and Order Processing Agreed",
                  "Clear Pipeline and Quarterly Closed Sales Targets",
                  "Minimum 12-Month Partnership Contract Agreements",
                  "Relationship Consultancy Set-up Cost",
                  "3Com and SonicWALL Renewals",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-body text-neutral-700">
                    <span className="font-mono text-brand-500 font-bold shrink-0 pt-0.5" aria-hidden>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowVideo(true)}
                className="mt-6 group relative rounded-lg overflow-hidden ring-1 ring-neutral-200 hover:ring-brand-500 transition-all"
              >
                <Image src="/images/video-thumbnail.jpg" alt="Click to play video" width={320} height={180} className="block" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
                  <span className="w-14 h-14 rounded-pill bg-white/95 text-brand-500 flex items-center justify-center text-2xl shadow-md">▶</span>
                </span>
              </button>
            </Card>
            <AnimatePresence>
              {showVideo ? (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm" onClick={() => setShowVideo(false)} />
                  <motion.div
                    className="relative bg-white rounded-xl max-w-3xl w-full shadow-lg p-6"
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  >
                    <button className="absolute top-3 right-3 w-9 h-9 rounded-pill bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center" onClick={() => setShowVideo(false)} aria-label="Close">
                      ×
                    </button>
                    <iframe className="w-full aspect-video rounded-lg" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameBorder="0" allowFullScreen />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );

      case "managed-prospect":
        return (
          <Card className="max-w-3xl">
            <ManagedProspectStackDiagram />
          </Card>
        );

      case "lead-nurture": {
        const currentLead = leadNurtureSlides[leadNurtureIndex];
        return (
          <Card className="max-w-2xl">
            <div className="text-label text-brand-500 uppercase mb-5">Lead Nurture Animation</div>
            {currentLead.video ? (
              <iframe className="w-full aspect-video rounded-md mb-6" src={currentLead.video} frameBorder="0" allowFullScreen />
            ) : (
              <div className="w-full aspect-video rounded-md mb-6 bg-brand-50 flex items-center justify-center text-neutral-400 text-body-sm">No video for this entry</div>
            )}
            <div className="text-h3 text-neutral-900 mb-2">{currentLead.title}</div>
            <blockquote className="text-body text-neutral-700 leading-relaxed border-l-2 border-brand-500 pl-4 my-4">
              {currentLead.description}
            </blockquote>
            <div className="text-body-sm text-neutral-500 italic">— {currentLead.author}</div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setLeadNurtureIndex((leadNurtureIndex - 1 + leadNurtureSlides.length) % leadNurtureSlides.length)}
                className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 transition-colors"
              >
                <span>←</span>
                <span>Previous</span>
              </button>
              <div className="text-label text-neutral-400 font-mono">
                {String(leadNurtureIndex + 1).padStart(2, "0")} / {String(leadNurtureSlides.length).padStart(2, "0")}
              </div>
              <button
                onClick={() => setLeadNurtureIndex((leadNurtureIndex + 1) % leadNurtureSlides.length)}
                className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 transition-colors"
              >
                <span>Next</span>
                <span>→</span>
              </button>
            </div>
          </Card>
        );
      }

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex font-ubuntu">
      {/* Left chapter rail */}
      <div className="sticky top-0 h-screen flex flex-col">
        <ChapterRail
          heading="The Process"
          items={sections.map((s) => ({ id: s.id, title: s.title, onSelect: () => switchSection(s.id) }))}
          activeId={activeSection}
          className="flex-1"
        />
        <div className="bg-white border-r border-t border-neutral-200 p-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/reception")} className="w-full justify-start">
            ← Back to Reception
          </Button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 min-w-0 px-10 lg:px-16 py-12">
        <FadeIn y={0} duration={0.5}>
          <SectionHeader
            eyebrow={`Chapter ${String(activeIndex + 1).padStart(2, "0")}`}
            title={activeSectionData?.title ?? ""}
          />
        </FadeIn>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <div className="flex items-center gap-1.5" aria-label={`Chapter ${activeIndex + 1} of ${sections.length}`}>
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => switchSection(s.id)}
                className={`h-1 flex-1 rounded-pill transition-colors ${i <= activeIndex ? "bg-brand-500" : "bg-neutral-200 hover:bg-neutral-300"}`}
                aria-label={`Go to chapter ${i + 1}`}
              />
            ))}
            <span className="ml-3 font-mono text-label text-neutral-400 whitespace-nowrap">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="opacity-50"> / {String(sections.length).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Campaign Data Slides Overlay — behaviour preserved; chrome restyled */}
      <AnimatePresence>
        {activeSlideSet !== "none" ? (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-neutral-900/55 backdrop-blur-md" onClick={() => setActiveSlideSet("none")} />

            <motion.div
              className="relative w-[min(1100px,92vw)] max-h-[88vh] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Slide overlay header */}
              <div className="px-8 pt-7 pb-5 border-b border-neutral-200 flex items-center justify-between gap-4">
                <div>
                  <div className="text-label text-brand-500 uppercase mb-2">
                    {activeSlideSet === "new-company" ? "Campaign Data — Key Considerations" : "Target Database — Key Considerations"}
                  </div>
                  <div className="font-mono text-label text-neutral-400">
                    {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </div>
                </div>
                <button
                  onClick={() => setActiveSlideSet("none")}
                  className="w-9 h-9 rounded-pill bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center shrink-0"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Slide body */}
              <div className="flex-1 overflow-y-auto px-8 py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: slideDirection === "next" ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: slideDirection === "next" ? -40 : 40 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="flex gap-5 items-start mb-6">
                      <div className="w-11 h-11 rounded-pill bg-brand-500 text-white font-bold flex items-center justify-center shrink-0 text-body">
                        {slides[currentSlide]?.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        {slides[currentSlide]?.description ? (
                          <p className="text-body text-neutral-500 mb-3">{slides[currentSlide].description}</p>
                        ) : null}
                        <h2 className="text-h2 text-neutral-900">{slides[currentSlide]?.title}</h2>
                        {slides[currentSlide]?.bullets ? (
                          <ul className="mt-5 flex flex-col gap-2">
                            {slides[currentSlide].bullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-3 text-body text-neutral-700">
                                <span className="font-mono text-brand-500 font-bold shrink-0 pt-0.5" aria-hidden>→</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className={`flex gap-4 pt-4 flex-wrap
                        ${slides[currentSlide]?.imageLayout === "center" ? "justify-center" : ""}
                        ${slides[currentSlide]?.imageLayout === "right" ? "justify-end" : ""}
                        ${slides[currentSlide]?.imageLayout === "row-3" ? "justify-center" : ""}
                        ${slides[currentSlide]?.imageLayout === "row-2" ? "justify-center" : ""}
                      `}
                    >
                      {slides[currentSlide]?.images.map((img, idx) => (
                        <motion.div
                          key={idx}
                          className={`relative
                            ${slides[currentSlide].imageLayout === "row-3" ? "flex-1 max-w-[180px] h-[260px]" : ""}
                            ${slides[currentSlide].imageLayout === "row-2" ? "w-[250px] h-[200px]" : ""}
                            ${slides[currentSlide].imageLayout === "center" ? "w-[360px] h-[240px]" : ""}
                            ${slides[currentSlide].imageLayout === "right" ? "w-[240px] h-[200px]" : ""}
                          `}
                          whileHover={img.clickable ? { scale: 1.03 } : {}}
                          whileTap={img.clickable ? { scale: 0.98 } : {}}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className={`object-contain ${img.clickable ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
                            onClick={() => img.clickable && showImage(img.src)}
                            loading="lazy"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide overlay footer navigation */}
              <div className="px-8 py-5 border-t border-neutral-200 flex items-center gap-3">
                <button
                  onClick={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
                  disabled={currentSlide === 0}
                  className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>
                <div className="flex-1 flex items-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`h-1 flex-1 rounded-pill transition-colors ${i <= currentSlide ? "bg-brand-500" : "bg-neutral-200 hover:bg-neutral-300"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => currentSlide < slides.length - 1 && goToSlide(currentSlide + 1)}
                  disabled={currentSlide === slides.length - 1}
                  className="inline-flex items-center gap-2 text-body-sm text-neutral-600 hover:text-brand-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Image Modal — zoom/pan preserved */}
      <AnimatePresence>
        {modalImage ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/80"
            onClick={() => setModalImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative flex items-center justify-center overflow-hidden rounded-xl"
              onWheel={handleWheelZoom}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDoubleClick={handleDoubleClick}
              style={{ width: "90vw", height: "80vh", cursor: zoom > 1 ? "grab" : "default" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Image
                src={modalImage}
                alt="Zoom"
                width={1200}
                height={900}
                className="rounded-lg select-none"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                }}
              />
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-pill bg-white/95 text-neutral-700 hover:bg-brand-500 hover:text-white transition-colors flex items-center justify-center shadow-md"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
