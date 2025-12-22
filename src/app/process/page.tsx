"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ============ CAMPAIGN DATA KEY CONSIDERATIONS ============
const newCompanyDataSlides = [
  {
    id: 1,
    title: "If you would like to purchase new / fresh company data, have you considered the target market you would like to address?",
    bullets: ["Employee size of organisations (example 100-500 employees)", "Industry sectors", "UK or International regions", "Key decision maker roles"],
    images: [
      { src: "/images/Number of Employees Table.png", alt: "Number of Employees Table", clickable: true },
      { src: "/images/Nature Of Business Table.png", alt: "Nature of Business Table", clickable: true },
      { src: "/images/Region Table.png", alt: "Region Table", clickable: true }
    ],
    imageLayout: "row-3"
  },
  {
    id: 2,
    title: "Do you require contacts WITH a personal email address?",
    description: "This would support an email send prior to a calling campaign.",
    images: [{ src: "/images/Person-envelope-pen.png", alt: "Data Enhancement Image", clickable: false }],
    imageLayout: "center"
  },
  {
    id: 3,
    title: "Would you like to procure multiple contacts or single contacts per company?",
    bullets: ["Single contacts allow the purchase of more companies within your budget", "Multiple contacts provide more avenues into larger organisations, increasing your chance of booking a meeting with your target companies"],
    images: [
      { src: "/images/2 people with line.png", alt: "Single contacts", clickable: false },
      { src: "/images/5 People with connection line.png", alt: "Multiple contacts", clickable: false }
    ],
    imageLayout: "row-2"
  },
  {
    id: 4,
    title: "How much data do you need to support your lead generation campaign?",
    bullets: ["Astute estimates 40 companies are needed per day of calling", "A 30-day campaign requires 1,200 company records"],
    images: [{ src: "/images/Data Volume Matrix.png", alt: "Data Volume Matrix", clickable: true }],
    imageLayout: "center"
  },
  {
    id: 5,
    title: "Are there any suppression files we should remove from the data you would like to purchase?",
    bullets: ["Customer suppressions", "Top prospect suppressions", "Opt-out contacts"],
    images: [{ src: "/images/data icon with 2 pages.png", alt: "Suppression Data Icon", clickable: false }],
    imageLayout: "right"
  }
];

const enhanceTargetDatabaseSlides = [
  {
    id: 1,
    description: "If you would like to enhance a current database before calling, consider the following aspects:",
    title: "Are you confident that the companies you would like to enhance fall within your target market?",
    images: [{ src: "/images/Data icon with +.png", alt: "Data Icon with Plus", clickable: false }],
    imageLayout: "right"
  },
  {
    id: 2,
    title: "Does your current data include large volumes of company/contact duplications, and how fresh is your data?",
    images: [{ src: "/images/Data With Question Marks.png", alt: "Data with Question Marks", clickable: false }],
    imageLayout: "right"
  },
  {
    id: 3,
    title: "Would you like to purchase company-level / technical intelligence appends, as well as new contacts?",
    bullets: ["For example, volume of PC users", "Installed server vendor", "Installed security vendor", "Installed PBX vendor", "and more..."],
    images: [{ src: "/images/New Data.png", alt: "New Data", clickable: false }],
    imageLayout: "right"
  },
  {
    id: 4,
    title: "Would you like to purchase companies within your identified target market, but NOT in your current prospect database?",
    images: [{ src: "/images/Search Data.png", alt: "Database Search Icon", clickable: false }],
    imageLayout: "right"
  },
  {
    id: 5,
    title: "Do you require contacts with email addresses?",
    images: [{ src: "/images/Email Data.png", alt: "Email Data Icon", clickable: false }],
    imageLayout: "right"
  },
  {
    id: 6,
    title: "Would you like to procure multiple contacts or single contacts per company?",
    bullets: ["Single contacts allow the purchase of more companies within your budget", "Multiple contacts provide more avenues into larger organisations, increasing your chance of booking a meeting with your target companies"],
    images: [{ src: "/images/2 pages.png", alt: "Multiple Contacts", clickable: false }],
    imageLayout: "right"
  },
  {
    id: 7,
    title: "Are there any suppression files we should remove from the data you would like to purchase?",
    bullets: ["Customer suppressions", "Top prospect suppressions", "Opt-out contacts"],
    images: [{ src: "/images/data-with-one-page.png", alt: "Suppression Files", clickable: false }],
    imageLayout: "right"
  }
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
  { title: "Agent Training", description: "Ensuring agents are well-trained to execute the campaign successfully." }
];

// ============ LEAD NURTURE SLIDES ============
const leadNurtureSlides = [
  {
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_1",
    title: "Lead Nurture (Short)",
    description: `"A sustained relationship with (the) influencers and decision-makers in a potential customer, through which relevant and valuable insight is delivered through integrated channels in a coordinated process, in exchange for increasing intimacy and influence."`,
    author: "Forrester Research",
  },
  {
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2",
    title: "Lead Nurture (Long)",
    description: `"Effective nurturing strategies are built around the customer's journey through the buying process."`,
    author: "Lori Wizdo, Forrester Research",
  },
  {
    video: "",
    title: "Email & Lead Nurturing Stats",
    description: `"Over-emailing and irrelevant content are the top reasons people unsubscribe from email mailing lists."`,
    author: "Chadwick Martin Bailey",
  },
];

type SectionType = 'campaign-data' | 'campaign-planning' | 'campaign-in-progress' | 'market-platform' | 'inside-sales' | 'managed-prospect' | 'lead-nurture';
type SlideSetType = 'none' | 'new-company' | 'enhance-database';

const sections: { id: SectionType; title: string }[] = [
  { id: 'campaign-data', title: 'Campaign Data - Key Considerations' },
  { id: 'campaign-planning', title: 'Campaign Planning Cycle' },
  { id: 'campaign-in-progress', title: 'Campaign in Progress' },
  { id: 'market-platform', title: 'Market Platform Approach' },
  { id: 'inside-sales', title: 'Inside Sales Team' },
  { id: 'managed-prospect', title: 'Managed Prospect Stack' },
  { id: 'lead-nurture', title: 'Lead Nurture Animation' },
];

export default function ProcessPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionType>('campaign-data');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Campaign Data specific state
  const [activeSlideSet, setActiveSlideSet] = useState<SlideSetType>('none');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideAnimating, setIsSlideAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

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

  // Update indicator position when active section changes
  useEffect(() => {
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    const activeRef = navRefs.current[activeIndex];
    if (activeRef) {
      setIndicatorStyle({
        top: activeRef.offsetTop,
        height: activeRef.offsetHeight,
      });
    }
  }, [activeSection]);

  const switchSection = (sectionId: SectionType) => {
    if (sectionId === activeSection || isTransitioning) return;

    setIsTransitioning(true);
    // Reset section-specific state
    setActiveSlideSet('none');
    setCurrentSlide(0);
    setHoveredStep(null);
    setShowVideo(false);
    setLeadNurtureIndex(0);

    setTimeout(() => {
      setActiveSection(sectionId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  // Slide navigation for Campaign Data
  const slides = activeSlideSet === 'new-company' ? newCompanyDataSlides : enhanceTargetDatabaseSlides;

  const goToSlide = (index: number) => {
    if (index === currentSlide || isSlideAnimating) return;
    setSlideDirection(index > currentSlide ? 'next' : 'prev');
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

  // Image modal handlers
  const showImage = (src: string) => {
    setModalImage(src);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prevZoom) => Math.max(1, Math.min(prevZoom + e.deltaY * -0.001, 3)));
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
    const baseClass = `transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`;

    switch (activeSection) {
      // ============ CAMPAIGN DATA KEY CONSIDERATIONS ============
      case 'campaign-data':
        return (
          <div className={`flex flex-col items-center w-full space-y-10 ${baseClass}`}>
            <div className="bg-white text-[#0091d2] text-2xl font-extrabold px-8 py-4 rounded-xl border-4 border-[#0091d2] shadow-xl text-center">
              Campaign Data - Key Considerations
            </div>
            <div className="bg-white p-12 rounded-2xl shadow-2xl text-black w-full max-w-3xl border-4 border-gray-300 flex flex-col items-center space-y-6 text-center">
              <button
                onClick={() => openSlideSet('new-company')}
                className="block bg-[#0091d2] text-white px-8 py-5 rounded-xl text-lg font-semibold transition hover:bg-white hover:text-[#0091d2] hover:scale-105 w-[90%] shadow-md"
              >
                Would you like to purchase <span className="font-bold">NEW</span> company data?
              </button>
              <p className="text-[#0091d2] text-xl font-semibold">or / and</p>
              <button
                onClick={() => openSlideSet('enhance-database')}
                className="block bg-[#0091d2] text-white px-8 py-5 rounded-xl text-lg font-semibold transition hover:bg-white hover:text-[#0091d2] hover:scale-105 w-[90%] shadow-md"
              >
                Enhance a current target database that you hold in-house?
              </button>
            </div>
          </div>
        );

      // ============ CAMPAIGN PLANNING CYCLE ============
      case 'campaign-planning':
        return (
          <div className={`flex flex-col items-center w-full ${baseClass}`}>
            <div className="w-full flex flex-col space-y-8">
              {[
                ["Initial Briefing Session", "Target Audience", "Sizing the Campaign"],
                ["Profiling Questions", "Supporting Collateral", "Proposition Development"],
                ["Call To Action(s)", "Call Instrument", "Lead Distribution"],
                ["Campaign Reporting", "Agent Training"]
              ].map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center justify-center space-x-4">
                  {row.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <button
                        className="bg-[#0091d2] text-white w-56 h-14 flex items-center justify-center px-4 py-2 rounded-lg text-base font-semibold shadow-md hover:bg-white hover:text-[#0091d2] transition transform hover:scale-105"
                        onMouseEnter={() => setHoveredStep(step)}
                        onMouseLeave={() => setHoveredStep(null)}
                      >
                        {step}
                      </button>
                      {index < row.length - 1 && <div className="text-white text-2xl">→</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="w-full max-w-4xl p-6 mt-8 bg-white text-[#0091d2] rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold">{hoveredStep || "Hover over a step to see details"}</h3>
              <p className="mt-2 text-[#007bb0]">
                {hoveredStep ? processSteps.find((step) => step.title === hoveredStep)?.description : "Move your mouse over a step to display its description here."}
              </p>
            </div>
          </div>
        );

      // ============ CAMPAIGN IN PROGRESS ============
      case 'campaign-in-progress':
        return (
          <div className={`flex flex-col items-center w-full ${baseClass}`}>
            <Image src="/images/Campaign In Progress Image.png" alt="Campaign In Progress Flowchart" width={1000} height={750} className="rounded-lg" />
          </div>
        );

      // ============ MARKET PLATFORM APPROACH ============
      case 'market-platform':
        return (
          <div className={`flex flex-col items-center w-full space-y-8 ${baseClass}`}>
            {[
              { title: "BUYING PLATFORM: Maximising Revenue", items: ["Increase new-logo sales & maximise account revenues (Geog region, No. of employees, etc).", "Vendor & partner work in tandem.", "Increase BUYING Platform revenues throughout the year."] },
              { title: "WORKING PLATFORM: Sales Cycle Development", items: ["Astute Client and Partners develop sales opportunities to closure.", "'Pass-back' lost sales opportunities to Market Platform."] },
              { title: "MARKET PLATFORM: Addressable Market", items: ["Integrate Astute DB / Client DB.", "Contract Strategy of approx 5 calls per year plus marketing e-shots, DM, White Papers.", "Define Passed Lead Criteria.", "Astute to keep longer-term interests/opportunities warm until criteria met.", "Astute Client to report & track 'passed' leads from working to buying platform.", "Maximise cross-selling opportunities.", "Ongoing professional contact strategy."] }
            ].map((platform, idx) => (
              <div key={idx} className="w-full max-w-4xl">
                <div className="bg-[#0091d2] text-white text-xl font-semibold px-8 py-4 rounded-t-lg shadow-md">{platform.title}</div>
                <div className="bg-white p-8 rounded-b-lg shadow-lg text-left border border-t-0 border-gray-300">
                  <ul className="list-disc list-inside text-lg space-y-2">
                    {platform.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );

      // ============ INSIDE SALES TEAM ============
      case 'inside-sales':
        return (
          <div className={`flex flex-col items-center w-full ${baseClass}`}>
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-gray-300 w-full max-w-[600px] text-center">
              <div className="bg-white text-[#0091d2] text-lg font-bold px-6 py-2 rounded-full shadow-md border border-gray-300 inline-block mb-6">Inside Sales Team Contracts</div>
              <ul className="text-lg text-[#003d5c] space-y-3 text-left">
                {["Experienced Graduate Agents", "Take Sales Process Through to Closure", "Full Quotation and Order Processing Agreed", "Clear Pipeline and Quarterly Closed Sales Targets", "Minimum 12-Month Partnership Contract Agreements", "Relationship Consultancy Set-up Cost", "3Com and SonicWALL Renewals"].map((item, i) => <li key={i}>• {item}</li>)}
              </ul>
              <div className="mt-6 flex justify-center">
                <button onClick={() => setShowVideo(true)} className="relative">
                  <Image src="/images/video-thumbnail.jpg" alt="Click to Play Video" width={250} height={140} className="rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-transform hover:scale-105" />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">▶</span>
                </button>
              </div>
            </div>
            {showVideo && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                <div className="relative bg-white p-6 rounded-lg max-w-3xl w-full shadow-xl">
                  <button className="absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-gray-900" onClick={() => setShowVideo(false)}>&times;</button>
                  <iframe className="w-full h-96 rounded-lg" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameBorder="0" allowFullScreen></iframe>
                </div>
              </div>
            )}
          </div>
        );

      // ============ MANAGED PROSPECT STACK ============
      case 'managed-prospect':
        return (
          <div className={`flex flex-col items-center w-full ${baseClass}`}>
            <Image src="/images/Managed Prospect stack infographic.png" alt="Managed Prospect Stack Infographic" width={900} height={600} className="rounded-lg max-h-[80vh] object-contain" />
          </div>
        );

      // ============ LEAD NURTURE ANIMATION ============
      case 'lead-nurture':
        const currentLead = leadNurtureSlides[leadNurtureIndex];
        return (
          <div className={`flex flex-col items-center w-full ${baseClass}`}>
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-gray-300 w-full max-w-[700px] h-[600px] text-center flex flex-col">
              <div className="bg-white text-[#0091d2] text-lg font-bold px-6 py-2 rounded-full shadow-md border border-gray-300 inline-block mb-6">Lead Nurture Animation</div>
              <div className="flex flex-col items-center text-left flex-1">
                {currentLead.video ? (
                  <iframe className="w-full h-64 rounded-lg shadow-md mb-4" src={currentLead.video} frameBorder="0" allowFullScreen></iframe>
                ) : (
                  <div className="w-full h-64 mb-4"></div>
                )}
                <h2 className="text-xl font-bold text-[#0091d2]">{currentLead.title}</h2>
                <p className="text-gray-800 mt-2">{currentLead.description}</p>
                <p className="text-gray-500 italic mt-2">{currentLead.author}</p>
              </div>
              <div className="flex justify-between mt-auto pt-4">
                <button onClick={() => setLeadNurtureIndex((leadNurtureIndex - 1 + leadNurtureSlides.length) % leadNurtureSlides.length)} className="text-[#0091d2] text-2xl font-bold px-6 py-3 rounded-lg hover:bg-[#e6f7fc] transition border border-[#0091d2]">◁</button>
                <button onClick={() => setLeadNurtureIndex((leadNurtureIndex + 1) % leadNurtureSlides.length)} className="text-[#0091d2] text-2xl font-bold px-6 py-3 rounded-lg hover:bg-[#e6f7fc] transition border border-[#0091d2]">▷</button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="relative min-h-screen flex items-center p-10">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Process Page - resize.png')",
          filter: "blur(8px)",
          zIndex: -1
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      {/* Sidebar with sliding indicator */}
      <aside className="fixed right-0 top-0 h-full w-80 bg-[#0091d2] p-6 flex flex-col justify-between shadow-lg z-10">
        <nav className="space-y-3 relative">
          {/* Sliding indicator */}
          <div
            className="absolute left-0 right-0 bg-white rounded-lg shadow-md transition-all duration-300 ease-out z-0"
            style={{
              top: indicatorStyle.top,
              height: indicatorStyle.height,
            }}
          />

          {sections.map((section, index) => (
            <button
              key={section.id}
              ref={el => { navRefs.current[index] = el; }}
              onClick={() => switchSection(section.id)}
              className={`relative z-10 block w-full text-left text-lg font-medium py-4 px-4 rounded-lg transition-all duration-300 ${
                activeSection === section.id
                  ? "text-[#0091d2] font-bold"
                  : "text-white hover:bg-white/20 hover:text-white"
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
        <button
          onClick={() => router.push("/reception")}
          className="bg-white text-[#0091d2] p-3 rounded-lg font-bold hover:bg-[#007bb0] hover:text-white transition"
        >
          Back to Reception
        </button>
      </aside>

      {/* Content Area */}
      <div className="flex flex-col items-center w-full max-w-5xl pr-96 ml-auto mr-auto z-10">
        {renderContent()}
      </div>

      {/* Campaign Data Slides Overlay */}
      {activeSlideSet !== 'none' && (
        <div className="fixed inset-0 z-40">
          {/* Blurred backdrop of current page */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/40" />

          {/* Slide Content - Full screen layout matching original */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundImage: "url('/images/Process Page - resize.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Title Bubble - positioned at 12% from top like original */}
            <div
              className="absolute bg-white px-8 py-4 rounded-xl shadow-lg border-2 text-xl font-bold z-10"
              style={{
                borderColor: "#0091d2",
                color: "#0091d2",
                top: "12%",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              {activeSlideSet === 'new-company' ? 'Campaign Data – Key Considerations' : 'Target Database – Key Considerations'}
            </div>

            {/* Content Box - 65% width, 550px height like original */}
            <div
              className={`bg-white p-8 rounded-xl shadow-lg flex flex-col text-gray-800 transition-all duration-300 ease-out
                ${isSlideAnimating
                  ? slideDirection === 'next'
                    ? 'opacity-0 translate-x-8'
                    : 'opacity-0 -translate-x-8'
                  : 'opacity-100 translate-x-0'
                }`}
              style={{ width: "65%", height: "550px", marginTop: "80px" }}
            >
              {/* Header with Numbered Circle */}
              <div className="flex items-start">
                <div
                  className="w-12 h-12 flex items-center justify-center text-white text-xl font-bold rounded-full mr-4 flex-shrink-0"
                  style={{ backgroundColor: "#0091d2" }}
                >
                  {slides[currentSlide]?.id}
                </div>
                <div>
                  {slides[currentSlide]?.description && (
                    <p className="text-lg text-gray-700 mb-6">
                      {slides[currentSlide].description}
                    </p>
                  )}
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {slides[currentSlide]?.title}
                  </h1>
                  {slides[currentSlide]?.bullets && (
                    <ul className="text-lg list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                      {slides[currentSlide].bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Images */}
              <div
                className={`flex mt-auto flex-1 items-end pb-2
                  ${slides[currentSlide]?.imageLayout === 'center' ? 'justify-center' : ''}
                  ${slides[currentSlide]?.imageLayout === 'right' ? 'justify-end' : ''}
                  ${slides[currentSlide]?.imageLayout === 'row-3' ? 'justify-center space-x-4' : ''}
                  ${slides[currentSlide]?.imageLayout === 'row-2' ? 'justify-center space-x-6' : ''}
                `}
              >
                {slides[currentSlide]?.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative
                      ${slides[currentSlide].imageLayout === 'row-3' ? 'flex-1 max-w-[180px] h-[280px]' : ''}
                      ${slides[currentSlide].imageLayout === 'row-2' ? 'w-[250px] h-[200px]' : ''}
                      ${slides[currentSlide].imageLayout === 'center' ? 'w-[350px] h-[250px]' : ''}
                      ${slides[currentSlide].imageLayout === 'right' ? 'w-[250px] h-[200px]' : ''}
                    `}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className={`rounded-lg object-contain transition
                        ${img.clickable ? 'cursor-pointer hover:opacity-80' : ''}`}
                      onClick={() => img.clickable && showImage(img.src)}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Navigation - Under the content box */}
            <div
              className="absolute flex items-center justify-center space-x-3"
              style={{ bottom: "8%", left: "50%", transform: "translateX(-50%)" }}
            >
              <button
                onClick={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
                disabled={currentSlide === 0}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition shadow-md
                  ${currentSlide === 0 ? 'bg-gray-300 text-gray-500' : 'bg-white text-[#0091d2] hover:bg-[#0091d2] hover:text-white'}`}
              >
                ←
              </button>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition
                    ${index === currentSlide
                      ? "bg-[#0091d2] text-white"
                      : "bg-white text-[#0091d2] border-2 border-[#0091d2] hover:bg-[#0091d2] hover:text-white"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => currentSlide < slides.length - 1 && goToSlide(currentSlide + 1)}
                disabled={currentSlide === slides.length - 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition shadow-md
                  ${currentSlide === slides.length - 1 ? 'bg-gray-300 text-gray-500' : 'bg-white text-[#0091d2] hover:bg-[#0091d2] hover:text-white'}`}
              >
                →
              </button>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setActiveSlideSet('none')}
              className="absolute bottom-10 left-10 bg-white text-[#0091d2] px-6 py-3 rounded-lg font-bold hover:bg-[#0091d2] hover:text-white transition shadow-md"
            >
              ← Back to Campaign Data
            </button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50 p-4" onClick={() => setModalImage(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex justify-center items-center overflow-hidden"
            onWheel={handleWheelZoom}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            style={{ width: "90vw", height: "80vh", cursor: zoom > 1 ? "grab" : "default" }}
          >
            <Image src={modalImage} alt="Popup Image" width={800} height={600} className="rounded-lg shadow-lg" style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`, transition: isDragging ? "none" : "transform 0.2s ease-out" }} />
            <button onClick={() => setModalImage(null)} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-black font-bold hover:bg-[#0091d2] hover:text-white transition">&times;</button>
          </div>
        </div>
      )}
    </main>
  );
}
