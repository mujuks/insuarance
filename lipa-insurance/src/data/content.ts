export interface Step {
  readonly title: string;
  readonly body: string;
}

export interface WhyItem {
  readonly title: string;
  readonly body: string;
}

export const STEPS: readonly Step[] = [
  {
    title: "Choose your cover",
    body: "Pick motor or health, then the exact product — comprehensive, third party, family plan and so on.",
  },
  {
    title: "Tell us about the risk",
    body: "Vehicle make, value and usage — or ages and plan tier. Only the fields that move your premium.",
  },
  {
    title: "Get an instant price",
    body: "The engine returns a full breakdown: base premium, loadings, discounts, IPT and stamp duty — nothing hidden.",
  },
  {
    title: "Save, print or bind",
    body: "Your quotation is stored in My Quotes, valid 30 days. Email it to yourself or contact our agency to discuss the next steps.",
  },
  {
    title: "We handle the paperwork",
    body: "Logbook copies, valuation letters and proposal forms — our agency team can guide you through the paperwork.",
  },
  {
    title: "Claims, we stand by you",
    body: "One number to call. We can help you understand the claims process and contact your insurer.",
  },
] as const;

export const WHY_US: readonly WhyItem[] = [
  {
    title: "Practical cover guidance",
    body: "We help you understand available cover options and connect with insurers for policy applications.",
  },
  {
    title: "Transparent indicative pricing",
    body: "Every quotation shows the rating factors — loadings, discounts, taxes — line by line.",
  },
  {
    title: "Agency support, direct line",
    body: "You are assigned an agency representative who knows your file — not a ticket queue.",
  },
  {
    title: "Claims support",
    body: "We can help you understand the claims process and contact your insurer.",
  },
] as const;
