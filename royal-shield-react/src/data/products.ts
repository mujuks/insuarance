export interface Product {
  readonly id: string;
  readonly img: string;
  readonly alt: string;
  readonly tag: "Motor" | "Health";
  readonly tagClass: string;
  readonly title: string;
  readonly body: string;
  readonly features: readonly string[];
  readonly cta: string;
  readonly to: string;
  readonly btn: "btn-primary" | "btn-outline" | "btn-maroon";
}

export const PRODUCTS: readonly Product[] = [
  {
    id: "comprehensive-motor",
    img: "/images/car-comprehensive.jpg",
    alt: "Comprehensive motor cover",
    tag: "Motor",
    tagClass: "bg-royal-soft text-royal-dark",
    title: "Comprehensive Motor",
    body: "Accidental damage, fire, theft and third-party liability for your own vehicle — plus windscreen and towing benefits.",
    features: ["Own-damage & total-loss cover", "Unlimited third-party liability", "24/7 roadside assistance"],
    cta: "Get comprehensive quote",
    to: "/quote?lob=motor&cover=comprehensive",
    btn: "btn-primary",
  },
  {
    id: "third-party-tpft",
    img: "/images/car-tparty.jpg",
    alt: "Third party motor cover",
    tag: "Motor",
    tagClass: "bg-royal-soft text-royal-dark",
    title: "Third Party & TPFT",
    body: "The legal minimum, or step up to fire & theft protection — the smart choice for older and lower-value vehicles.",
    features: ["Statutory third-party liability", "Fire & theft option (TPFT)", "Flat premiums by engine size"],
    cta: "Get TPO / TPFT quote",
    to: "/quote?lob=motor&cover=tpo",
    btn: "btn-outline",
  },
  {
    id: "health-medical",
    img: "/images/health-family.jpg",
    alt: "Health cover for families",
    tag: "Health",
    tagClass: "bg-maroon-soft text-maroon",
    title: "Health & Medical",
    body: "Individual, family and senior plans from leading HMOs — inpatient, outpatient, maternity and dental extensions.",
    features: ["Individual · Family · Senior", "Three plan tiers to match budget", "Maternity & dental add-ons"],
    cta: "Get health quote",
    to: "/quote?lob=health",
    btn: "btn-maroon",
  },
] as const;
