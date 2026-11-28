export interface Cover {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly body: string;
  readonly to: string;
  readonly cta: string;
}

/**
 * Lines of business Lipa Insurance arranges. Descriptions are written against the
 * Insurance (Motor Vehicles Third Party Risks) Act (Cap. 405), the Insurance Act
 * (Cap. 487) and IRA's published standardised policies.
 */
export const COVERS: readonly Cover[] = [
  {
    id: "motor",
    icon: "🚗",
    title: "Motor Insurance",
    body: "Comprehensive, Third Party Fire & Theft and Third Party Only. Third party cover is compulsory for every vehicle on a Kenyan road under Cap. 405.",
    to: "/quote?lob=motor",
    cta: "Get a motor quote",
  },
  {
    id: "health",
    icon: "🩺",
    title: "Health & Medical",
    body: "In-patient, out-patient, maternity, dental and optical for individuals, families and seniors — including NHIF/SHA top-up arrangements with the leading underwriters.",
    to: "/quote?lob=health",
    cta: "Get a health quote",
  },
  {
    id: "life",
    icon: "🕯️",
    title: "Life & Family",
    body: "Term life, education, personal accident and funeral cover that keeps your dependants' plans funded if the unthinkable happens.",
    to: "/contact",
    cta: "Talk to an adviser",
  },
  {
    id: "property",
    icon: "🏠",
    title: "Property & Fire",
    body: "Fire, theft, flood and natural calamity cover for homes, offices, shops and industrial premises — domestic package or commercial all risks.",
    to: "/contact",
    cta: "Protect a property",
  },
  {
    id: "liability",
    icon: "⚖️",
    title: "Liability",
    body: "Public liability, employer's liability and professional indemnity that absorb the legal cost of a claim arising from your business operations.",
    to: "/contact",
    cta: "Assess my exposure",
  },
  {
    id: "business",
    icon: "🏢",
    title: "Business Insurance",
    body: "Cover for business property and operations, with options such as property protection, general liability and workers’ compensation subject to insurer terms.",
    to: "/contact",
    cta: "Discuss business cover",
  },
  {
    id: "travel",
    icon: "✈️",
    title: "Travel",
    body: "Medical emergencies, trip cancellation, baggage and personal effects abroad — required for most visa and scholaship applications.",
    to: "/contact",
    cta: "Cover a trip",
  },
  {
    id: "marine",
    icon: "🚢",
    title: "Marine Cargo",
    body: "Goods in transit by sea, air and road. Digital Marine Cargo cover is compulsory for imports through Kenyan ports from 1 November 2026.",
    to: "/contact",
    cta: "Cover a consignment",
  },
  {
    id: "agriculture",
    icon: "🌾",
    title: "Agriculture",
    body: "Crop, livestock and weather-index cover that pays out on measured triggers, shielding farmers from drought, flood and disease losses.",
    to: "/contact",
    cta: "Cover a season",
  },
  {
    id: "engineering",
    icon: "🏗️",
    title: "Engineering & Energy",
    body: "Contract works (CAR/EAR), machinery breakdown, erection and electrical installation cover for construction and plant projects.",
    to: "/contact",
    cta: "Quote a project",
  },
] as const;
