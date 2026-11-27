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
    body: "Your quotation is stored in My Quotes, valid 30 days. Email it to yourself or let your broker place it.",
  },
  {
    title: "We handle the paperwork",
    body: "Logbook copies, valuation letters and proposal forms — your named broker chases every underwriter desk.",
  },
  {
    title: "Claims, we stand by you",
    body: "One number to call. We lobby the insurer, track your reserve and escalate until your claim is settled.",
  },
] as const;

export const WHY_US: readonly WhyItem[] = [
  {
    title: "Independent market access",
    body: "We place risk with 12+ IRA-regulated insurers and negotiate terms on your behalf.",
  },
  {
    title: "Transparent indicative pricing",
    body: "Every quotation shows the rating factors — loadings, discounts, taxes — line by line.",
  },
  {
    title: "Named broker, direct line",
    body: "You are assigned a licensed broker who knows your file — not a ticket queue.",
  },
  {
    title: "Claims advocacy",
    body: "We prepare your proof of loss, track the reserve and escalate until settlement.",
  },
] as const;
