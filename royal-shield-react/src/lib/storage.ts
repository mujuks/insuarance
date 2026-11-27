import type { Pricing } from "./engine";

export interface QuoteRecord {
  ref: string;
  lob: "motor" | "health";
  planType: string;
  data: Record<string, unknown>;
  pricing: Pricing;
  issued: string;
  expires: string;
  status: string;
  customer: { name?: string; phone?: string; email?: string };
}

const QUOTES_KEY = "rsb_quotes";

export function loadQuotes(): QuoteRecord[] {
  try {
    return JSON.parse(localStorage.getItem(QUOTES_KEY) || "[]") as QuoteRecord[];
  } catch {
    return [];
  }
}

export function saveQuote(rec: QuoteRecord): void {
  const all = loadQuotes();
  all.unshift(rec);
  try {
    localStorage.setItem(QUOTES_KEY, JSON.stringify(all.slice(0, 50)));
  } catch {
    /* quota */
  }
}

export function deleteQuote(ref: string): void {
  const all = loadQuotes().filter((q) => q.ref !== ref);
  localStorage.setItem(QUOTES_KEY, JSON.stringify(all));
}

export function getQuote(ref: string): QuoteRecord | undefined {
  return loadQuotes().find((q) => q.ref === ref);
}
