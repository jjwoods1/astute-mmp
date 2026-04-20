// Shared data for the Process chapters. Extracting here removes the
// duplication that previously existed between /process (inline switcher)
// and the 7 standalone /process/<chapter> routes.

export interface ChapterLink {
  id: ChapterId;
  title: string;
  href: string;
}

export type ChapterId =
  | "campaign-data"
  | "campaign-planning"
  | "campaign-in-progress"
  | "market-platform"
  | "inside-sales"
  | "managed-prospect"
  | "lead-nurture";

export const CHAPTERS: ChapterLink[] = [
  { id: "campaign-data",        title: "Campaign Data - Key Considerations", href: "/process/campaign-data-key-considerations" },
  { id: "campaign-planning",    title: "Campaign Planning Cycle",            href: "/process/campaign-planning-cycle" },
  { id: "campaign-in-progress", title: "Campaign in Progress",               href: "/process/campaign-in-progress" },
  { id: "market-platform",      title: "Market Platform Approach",           href: "/process/market-platform-approach" },
  { id: "inside-sales",         title: "Inside Sales Team",                  href: "/process/inside-sales-team" },
  { id: "managed-prospect",     title: "Managed Prospect Stack",             href: "/process/managed-prospect-stack" },
  { id: "lead-nurture",         title: "Lead Nurture Animation",             href: "/process/lead-nurture-animation" },
];

// ============ CAMPAIGN PLANNING CYCLE ============

export interface PlanningStep {
  title: string;
  description: string;
}

export const PLANNING_STEPS: PlanningStep[] = [
  { title: "Initial Briefing Session", description: "Initial meeting or audio conference call to discuss the background of the campaign and document clear objectives and targets/benchmarks." },
  { title: "Target Audience",          description: "Defining the ideal customer profile and identifying key target segments." },
  { title: "Sizing the Campaign",      description: "Determining the scope and scale of the campaign based on available resources and goals." },
  { title: "Profiling Questions",      description: "Crafting questions to gather necessary information and qualify prospects." },
  { title: "Supporting Collateral",    description: "Providing relevant materials to support the campaign efforts." },
  { title: "Proposition Development",  description: "Creating a compelling value proposition tailored to the target audience." },
  { title: "Call To Action(s)",        description: "Establishing the key actions you want prospects to take after engagement." },
  { title: "Call Instrument",          description: "Deciding the best method for communication (phone, email, etc.)." },
  { title: "Lead Distribution",        description: "Allocating leads to the appropriate sales representatives." },
  { title: "Campaign Reporting",       description: "Tracking performance metrics and analyzing the effectiveness of the campaign." },
  { title: "Agent Training",           description: "Ensuring agents are well-trained to execute the campaign successfully." },
];

// ============ INSIDE SALES TEAM ============

export const INSIDE_SALES_BULLETS = [
  "Experienced Graduate Agents",
  "Take Sales Process Through to Closure",
  "Full Quotation and Order Processing Agreed",
  "Clear Pipeline and Quarterly Closed Sales Targets",
  "Minimum 12-Month Partnership Contract Agreements",
  "Relationship Consultancy Set-up Cost",
  "3Com and SonicWALL Renewals",
];

// ============ LEAD NURTURE ============

export interface LeadNurtureSlide {
  video: string;
  title: string;
  description: string;
  author: string;
}

export const LEAD_NURTURE_SLIDES: LeadNurtureSlide[] = [
  {
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_1",
    title: "Lead Nurture (Short)",
    description:
      "\u201cA sustained relationship with (the) influencers and decision-makers in a potential customer, through which relevant and valuable insight is delivered through integrated channels in a coordinated process, in exchange for increasing intimacy and influence.\u201d",
    author: "Forrester Research",
  },
  {
    video: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2",
    title: "Lead Nurture (Long)",
    description:
      "\u201cEffective nurturing strategies are built around the customer\u2019s journey through the buying process.\u201d",
    author: "Lori Wizdo, Forrester Research",
  },
  {
    video: "",
    title: "Email & Lead Nurturing Stats",
    description:
      "\u201cOver-emailing and irrelevant content are the top reasons people unsubscribe from email mailing lists.\u201d",
    author: "Chadwick Martin Bailey",
  },
];

// ============ MARKET PLATFORM APPROACH ============

export interface Platform {
  title: string;
  items: string[];
}

export const PLATFORMS: Platform[] = [
  {
    title: "BUYING PLATFORM: Maximising Revenue",
    items: [
      "Increase new-logo sales & maximise account revenues (Geog region, No. of employees, etc).",
      "Vendor & partner work in tandem.",
      "Increase BUYING Platform revenues throughout the year.",
    ],
  },
  {
    title: "WORKING PLATFORM: Sales Cycle Development",
    items: [
      "Astute Client and Partners develop sales opportunities to closure.",
      "'Pass-back' lost sales opportunities to Market Platform.",
    ],
  },
  {
    title: "MARKET PLATFORM: Addressable Market",
    items: [
      "Integrate Astute DB / Client DB.",
      "Contract Strategy of approx 5 calls per year plus marketing e-shots, DM, White Papers.",
      "Define Passed Lead Criteria.",
      "Astute to keep longer-term interests/opportunities warm until criteria met.",
      "Astute Client to report & track 'passed' leads from working to buying platform.",
      "Maximise cross-selling opportunities.",
      "Ongoing professional contact strategy.",
    ],
  },
];

// ============ CAMPAIGN DATA SLIDE FLOWS ============

export type SlideImageLayout = "center" | "right" | "row-2" | "row-3";

export interface SlideImage {
  src: string;
  alt: string;
  clickable: boolean;
}

export interface CampaignDataSlide {
  id: number;
  title: string;
  description?: string;
  bullets?: string[];
  images: SlideImage[];
  imageLayout: SlideImageLayout;
}

export const NEW_COMPANY_DATA_SLIDES: CampaignDataSlide[] = [
  {
    id: 1,
    title: "If you would like to purchase new / fresh company data, have you considered the target market you would like to address?",
    bullets: [
      "Employee size of organisations (example 100-500 employees)",
      "Industry sectors",
      "UK or International regions",
      "Key decision maker roles",
    ],
    images: [
      { src: "/images/Number of Employees Table.png", alt: "Number of Employees Table", clickable: true },
      { src: "/images/Nature Of Business Table.png",  alt: "Nature of Business Table",  clickable: true },
      { src: "/images/Region Table.png",              alt: "Region Table",              clickable: true },
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
    bullets: [
      "Single contacts allow the purchase of more companies within your budget",
      "Multiple contacts provide more avenues into larger organisations, increasing your chance of booking a meeting with your target companies",
    ],
    images: [
      { src: "/images/2 people with line.png",             alt: "Single contacts",   clickable: false },
      { src: "/images/5 People with connection line.png",  alt: "Multiple contacts", clickable: false },
    ],
    imageLayout: "row-2",
  },
  {
    id: 4,
    title: "How much data do you need to support your lead generation campaign?",
    bullets: [
      "Astute estimates 40 companies are needed per day of calling",
      "A 30-day campaign requires 1,200 company records",
    ],
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

export const ENHANCE_TARGET_DATABASE_SLIDES: CampaignDataSlide[] = [
  {
    id: 1,
    description: "If you would like to enhance a current database before calling, consider the following aspects:",
    title: "Are you confident that the companies you would like to enhance fall within your target market?",
    images: [{ src: "/images/Data icon with +.png", alt: "Data Icon with Plus", clickable: false }],
    imageLayout: "right",
  },
  {
    id: 2,
    title: "Does your current data include large volumes of company/contact duplications, and how fresh is your data?",
    images: [{ src: "/images/Data With Question Marks.png", alt: "Data with Question Marks", clickable: false }],
    imageLayout: "right",
  },
  {
    id: 3,
    title: "Would you like to purchase company-level / technical intelligence appends, as well as new contacts?",
    bullets: [
      "For example, volume of PC users",
      "Installed server vendor",
      "Installed security vendor",
      "Installed PBX vendor",
      "and more...",
    ],
    images: [{ src: "/images/New Data.png", alt: "New Data", clickable: false }],
    imageLayout: "right",
  },
  {
    id: 4,
    title: "Would you like to purchase companies within your identified target market, but NOT in your current prospect database?",
    images: [{ src: "/images/Search Data.png", alt: "Database Search Icon", clickable: false }],
    imageLayout: "right",
  },
  {
    id: 5,
    title: "Do you require contacts with email addresses?",
    images: [{ src: "/images/Email Data.png", alt: "Email Data Icon", clickable: false }],
    imageLayout: "right",
  },
  {
    id: 6,
    title: "Would you like to procure multiple contacts or single contacts per company?",
    bullets: [
      "Single contacts allow the purchase of more companies within your budget",
      "Multiple contacts provide more avenues into larger organisations, increasing your chance of booking a meeting with your target companies",
    ],
    images: [{ src: "/images/2 pages.png", alt: "Multiple Contacts", clickable: false }],
    imageLayout: "right",
  },
  {
    id: 7,
    title: "Are there any suppression files we should remove from the data you would like to purchase?",
    bullets: ["Customer suppressions", "Top prospect suppressions", "Opt-out contacts"],
    images: [{ src: "/images/data-with-one-page.png", alt: "Suppression Files", clickable: false }],
    imageLayout: "right",
  },
];
