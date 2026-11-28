/* Lipa Insurance — Premium engine (TypeScript port) */

export interface RateLine {
  label: string;
  amount: number;
  isDiscount?: boolean;
}

export interface Pricing {
  lineOfBusiness: "motor" | "health";
  lines: RateLine[];
  subtotal: number;
  ipt: number;
  rtc: number;
  stamp: number;
  total: number;
  currency: "KES";
}

export interface MotorInput {
  coverType?: "comprehensive" | "tpft" | "tpo";
  value?: number;
  year?: number;
  cc?: number;
  usage?: "private" | "commercial";
  region?: string;
  ncd?: "none" | "one" | "two" | "three";
  driverAge?: number;
  alarm?: boolean;
  tracker?: boolean;
  windscreen?: boolean;
  claims3yr?: number | string;
  [k: string]: unknown;
}

export interface HealthInput {
  age?: number;
  spouseAge?: number | null;
  children?: number;
  plan?: "essential" | "plus" | "premier";
  planType?: "individual" | "family" | "senior";
  maternity?: boolean;
  dental?: boolean;
  outpatient?: boolean;
  premiumMode?: "annual" | "monthly";
  [k: string]: unknown;
}

const IPT_RATE = 0.12;
const STAMP_DUTY = 40;
const RTC_LEVY_RATE = 0.005;
export const QUOTE_DAYS = 30;

const r2 = (n: number) => Math.round(n * 100) / 100;

export function money(n: number): string {
  return n.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const TPO_BANDS: [number, number][] = [
  [1000, 6500],
  [1500, 8500],
  [2000, 12000],
  [3000, 18000],
  [99999, 26000],
];

function bandFor(cc: number): number {
  for (const [max, prem] of TPO_BANDS) if (cc <= max) return prem;
  return TPO_BANDS[TPO_BANDS.length - 1][1];
}

function rateFor(value: number, year: number, coverType: string): number {
  let base = coverType === "tpft" ? 0.029 : 0.036;
  const age = new Date().getFullYear() - year;
  if (age <= 3) base += 0.004;
  else if (age >= 12) base -= 0.005;
  if (value < 400000) base += 0.004;
  if (value > 3000000) base -= 0.003;
  return base;
}

function finalize(lines: RateLine[], subtotal: number, lob: "motor" | "health"): Pricing {
  const ipt = r2(subtotal * IPT_RATE);
  const rtc = r2(subtotal * RTC_LEVY_RATE);
  lines.push({ label: "Insurance Premium Tax (IPT) 12%", amount: ipt });
  lines.push({ label: "Regulatory & training levy 0.5%", amount: rtc });
  lines.push({ label: "Stamp duty", amount: STAMP_DUTY });
  const total = r2(subtotal + ipt + rtc + STAMP_DUTY);
  return { lineOfBusiness: lob, lines, subtotal: r2(subtotal), ipt, rtc, stamp: STAMP_DUTY, total, currency: "KES" };
}

export function motor(input: MotorInput): Pricing {
  const cover = input.coverType ?? "comprehensive";
  const lines: RateLine[] = [];
  let base = 0;

  if (cover === "tpo") {
    base = bandFor(input.cc || 1500);
    lines.push({ label: "Third Party Only premium (CC band)", amount: base });
    if (input.usage === "commercial") {
      const cLoad = r2(base * 0.35);
      lines.push({ label: "Commercial / business use loading 35%", amount: cLoad });
      base += cLoad;
    }
  } else {
    const value = input.value || 0;
    const rate = rateFor(value, input.year || 2020, cover);
    base = r2(value * rate);
    lines.push({
      label: `${cover === "tpft" ? "Third Party, Fire & Theft" : "Comprehensive"} rate ${(rate * 100).toFixed(2)}% × KES ${value.toLocaleString()}`,
      amount: base,
    });

    if (input.usage === "commercial") {
      const cu = r2(base * 0.3);
      lines.push({ label: "Commercial use loading 30%", amount: cu });
      base += cu;
    }
    const year = input.year || 2020;
    if (new Date().getFullYear() - year >= 15) {
      const ov = r2(base * 0.1);
      lines.push({ label: "Vintage vehicle loading 10%", amount: ov });
      base += ov;
    }
    if (input.region === "coast") {
      const rg = r2(base * 0.05);
      lines.push({ label: "Coast region loading 5%", amount: rg });
      base += rg;
    }
    const ncdMap: Record<string, number> = { none: 0, one: 0.1, two: 0.175, three: 0.25 };
    const ncd = ncdMap[input.ncd ?? "none"] || 0;
    if (ncd > 0) {
      const d = -r2(base * ncd);
      lines.push({ label: `No-claims discount ${Math.round(ncd * 100)}%`, amount: d, isDiscount: true });
      base += d;
    }
    if (input.driverAge && input.driverAge < 25) {
      const yd = r2(base * 0.15);
      lines.push({ label: "Young driver loading (under 25) 15%", amount: yd });
      base += yd;
    }
    if (input.alarm === false) {
      const al = r2(base * 0.03);
      lines.push({ label: "No alarm / immobiliser loading 3%", amount: al });
      base += al;
    }
    if (input.tracker === true) {
      const tr = -r2(base * 0.05);
      lines.push({ label: "Tracker / telematics discount 5%", amount: tr, isDiscount: true });
      base += tr;
    }
    const claims = Number(input.claims3yr || 0);
    if (claims > 0) {
      const cl = r2(base * 0.1 * claims);
      lines.push({ label: `Claims history loading (${claims} in 3 yrs)`, amount: cl });
      base += cl;
    }
    if (input.windscreen) {
      const ws = Math.max(r2(value * 0.0015), 1500);
      lines.push({ label: "Extended windscreen cover", amount: ws });
      base += ws;
    }
  }

  if (base < 3000) {
    lines.push({ label: "Minimum premium adjustment", amount: r2(3000 - base) });
    base = 3000;
  }
  return finalize(lines, base, "motor");
}

function ageBandRate(age: number): number {
  if (age <= 17) return 9500;
  if (age <= 30) return 14500;
  if (age <= 45) return 21000;
  if (age <= 55) return 29500;
  if (age <= 65) return 42000;
  return 61000;
}

const PLAN_MULTIPLIER: Record<string, number> = { essential: 1, plus: 1.45, premier: 2.1 };

export function health(input: HealthInput): Pricing {
  const lines: RateLine[] = [];
  const plan = input.plan ?? "plus";
  const mult = PLAN_MULTIPLIER[plan] ?? 1;
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  const members: { role: string; age: number }[] = [];
  const primaryAge = Number(input.age) || 30;
  members.push({ role: "Principal", age: primaryAge });

  if (input.planType === "family") {
    if (input.spouseAge) members.push({ role: "Spouse", age: Number(input.spouseAge) });
    const kids = Math.min(Number(input.children) || 0, 6);
    for (let i = 0; i < kids; i++) members.push({ role: `Child ${i + 1}`, age: 8 });
  }
  if (input.planType === "senior") {
    members[0] = { role: "Principal (senior)", age: Math.max(primaryAge, 60) };
    if (input.spouseAge) members.push({ role: "Spouse", age: Number(input.spouseAge) });
  }

  let total = 0;
  for (const m of members) {
    const r = ageBandRate(m.age);
    total += r;
    lines.push({ label: `${m.role} (age ${m.age}) — base rate`, amount: r });
  }

  const planLoad = r2(total * (mult - 1));
  if (planLoad > 0) {
    lines.push({ label: `${planLabel} plan loading ${Math.round((mult - 1) * 100)}%`, amount: planLoad });
    total += planLoad;
  }

  if (input.outpatient !== false && plan === "essential") {
    const credit = -r2(total * 0.06);
    lines.push({ label: "Outpatient sub-limit restriction credit", amount: credit, isDiscount: true });
    total += credit;
  }
  if (input.maternity === true) {
    const mt = r2(total * 0.18);
    lines.push({ label: "Maternity extension 18%", amount: mt });
    total += mt;
  }
  if (input.dental === true) {
    const dn = r2(total * 0.05);
    lines.push({ label: "Dental & optical extension 5%", amount: dn });
    total += dn;
  }
  if (input.premiumMode === "monthly") {
    const conv = r2(total * 0.04);
    lines.push({ label: "Monthly payment convenience (×1.04)", amount: conv });
    total += conv;
  }

  if (total < 6000) {
    lines.push({ label: "Minimum premium adjustment", amount: r2(6000 - total) });
    total = 6000;
  }
  return finalize(lines, total, "health");
}

export function makeRef(): string {
  const d = new Date();
  const y = String(d.getFullYear()).slice(2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `RSB-${y}${m}${day}-${rand}`;
}

export function expiry(days: number = QUOTE_DAYS): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}
