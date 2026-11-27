export interface MarketStat {
  readonly value: string;
  readonly label: string;
  readonly note: string;
}

export interface Underwriter {
  readonly name: string;
}

/**
 * Figures sourced from the Insurance Regulatory Authority (IRA) 2025 annual
 * insurance industry statistics (year ended 31 December 2025) and IRA / KRA
 * public notices. Presentational rounding only.
 */
export const MARKET_STATS: readonly MarketStat[] = [
  { value: "KES 466.6B", label: "Gross direct premiums written in 2025", note: "+16.5% on 2024" },
  { value: "2.63%", label: "Insurance penetration as a share of GDP", note: "Highest level since 2016" },
  { value: "KES 8,675", label: "Average premium paid per person", note: "Up from KES 7,573 in 2024" },
  { value: "59", label: "Licensed insurers in the market", note: "36 general · 23 long-term" },
  { value: "KES 93.2B", label: "Medical insurance premiums — largest class", note: "+22.3% year on year" },
  { value: "< 35%", label: "Share of premiums placed through brokers", note: "Room for independent advice" },
] as const;

export const MARKET_FACTS: readonly { readonly title: string; readonly body: string }[] = [
  {
    title: "Third-party motor cover is the law",
    body: "Section 4 of the Insurance (Motor Vehicles Third Party Risks) Act, Cap. 405, makes it an offence to use a motor vehicle on a public road without third-party cover. Section 10 also stops an insurer from using ordinary policy defences against an innocent third party.",
  },
  {
    title: "Your premium has statutory add-ons",
    body: "A Kenyan premium is the underwriter's rate times the sum insured, then 0.45% in levies (0.2% training levy and 0.25% Policyholders Compensation Fund) plus KES 40 stamp duty per policy.",
  },
  {
    title: "A financed car must be comprehensively insured",
    body: "Bank asset finance and hire purchase agreements require comprehensive cover with the financier named as first loss payee. Third party only breaches the loan agreement.",
  },
  {
    title: "Marine cargo is going digital",
    body: "From 1 November 2026 the KRA and IRA require every import into Kenya to carry a Digital Marine Cargo Insurance certificate issued by an IRA-licensed insurer and transmitted to iCMS before customs clearance.",
  },
  {
    title: "The regulator has standardized wordings",
    body: "IRA publishes model policies — burglary, public liability, goods in transit, money, fidelity guarantee, personal accident — so you can compare like with like instead of marketing copy.",
  },
  {
    title: "Buying from a broker costs you nothing extra",
    body: "Brokers are paid commission by the insurer after placement. In a market where intermediaries place under a third of all premiums, independent advice is still the exception rather than the rule.",
  },
] as const;

export const UNDERWRITERS: readonly Underwriter[] = [
  { name: "Britam" },
  { name: "CIC Insurance" },
  { name: "Jubilee Insurance" },
  { name: "APA Insurance" },
  { name: "Madison" },
  { name: "Sanlam" },
  { name: "Old Mutual" },
  { name: "Liberty" },
  { name: "Kenya Orient" },
  { name: "Trident" },
  { name: "Fidelity Shield" },
  { name: "First Assurance" },
  { name: "Geminia" },
  { name: "PACIS Insurance" },
  { name: "GA Insurance" },
  { name: "NCBA Insurance" },
] as const;

export interface ClaimStep {
  readonly title: string;
  readonly body: string;
}

/**
 * The claim journey a Kenyan policyholder actually follows, plus the documents
 * underwriters ask for on motor, medical and property claims.
 */
export const CLAIM_STEPS: readonly ClaimStep[] = [
  {
    title: "Report the incident immediately",
    body: "Call the insurer's 24-hour line and your broker the same day. On a road accident, also obtain an abstract or OB number from the nearest police station — most wordings require notification within 24 to 48 hours.",
  },
  {
    title: "We open the claim for you",
    body: "Royal Shield lodges the claim, records the reference number and tells you exactly which documents are outstanding, so you are not guessing what the loss adjuster wants next.",
  },
  {
    title: "Submit your documents",
    body: "Motor claims need the logbook, licence, valid inspection sticker and a completed claim form. Medical claims need the discharge summary and invoices. Fire, theft and burglary claims need a police abstract and a schedule of the items lost.",
  },
  {
    title: "Assessment and verification",
    body: "For material damage a licensed loss adjuster inspects the risk. On medical claims the insurer's assistance provider verifies the bills against the scheme tariff before authorising payment.",
  },
  {
    title: "Admission, settlement or dispute",
    body: "The insurer admits the claim and settles, or issues a written reason for repudiation. If you disagree, we take it up with the insurer's complaints desk first — and then to the IRA Complaints Handling Unit or the Insurance Ombudsman.",
  },
] as const;

export interface ClaimDoc {
  readonly forCover: string;
  readonly items: readonly string[];
}

export const CLAIM_DOCS: readonly ClaimDoc[] = [
  {
    forCover: "Motor accident",
    items: [
      "Completed claim form and police abstract / OB number",
      "Copy of logbook, driving licence and valid inspection sticker",
      "Driver's statement and, where relevant, third-party details",
      "Photographs of the damage and the scene",
      "Repair quotation approved by the loss adjuster",
    ],
  },
  {
    forCover: "Fire, theft & burglary",
    items: [
      "Police abstract confirming the report of the incident",
      "Fire brigade report for fire losses",
      "Schedule of items lost with proof of ownership",
      "Photographs and, for burglary, evidence of forced entry",
      "Inventory for stock losses and mitigation receipts",
    ],
  },
  {
    forCover: "Medical & health",
    items: [
      "Discharge summary, admission and treatment notes",
      "Original invoices, receipts and laboratory results",
      "Authorisation number from the assistance provider",
      "National ID and policy number of the principal member",
      "Referral letter where the scheme requires one",
    ],
  },
  {
    forCover: "Marine cargo & travel",
    items: [
      "Bill of lading, airway bill or policy of insurance",
      "Customs entry and the delivery order",
      "Survey report on damaged or short-landed goods",
      "Photographs of the consignment and packaging",
      "Supplier invoice and packing list",
    ],
  },
] as const;

export const CLAIM_CONTACTS: readonly {
  readonly label: string;
  readonly value: string;
  readonly href: string;
}[] = [
  { label: "Broker claims desk", value: "+254 700 000 000", href: "tel:+254700000000" },
  { label: "WhatsApp claims line", value: "Message us", href: "https://wa.me/254700000000" },
  { label: "Email", value: "claims@royalshield.co.ke", href: "mailto:claims@royalshield.co.ke" },
] as const;
