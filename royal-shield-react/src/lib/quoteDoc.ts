import type { QuoteRecord } from "./storage";
import { money } from "./engine";
import { fmtDate } from "./format";

export interface QuoteLabels {
  readonly product: string;
  readonly cover: string;
  readonly risk: string;
  readonly extras: readonly string[];
}

const cap = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

export function quoteLabels(rec: QuoteRecord): QuoteLabels {
  const d = rec.data as Record<string, unknown>;
  const str = (key: string): string => String(d[key] ?? "");
  const num = (key: string): number => Number(d[key] ?? 0);
  const flag = (key: string): boolean => d[key] === true;
  const isMotor = rec.lob === "motor";

  const product = isMotor
    ? str("usage") === "commercial"
      ? "Motor — Commercial"
      : "Motor — Private"
    : "Health — " + cap(rec.planType);

  const cover = isMotor
    ? str("coverType") === "comprehensive"
      ? "Comprehensive"
      : str("coverType") === "tpft"
        ? "Third Party, Fire & Theft"
        : "Third Party Only"
    : cap(str("plan") || "plus") + " plan";

  const risk = isMotor
    ? [
        `${str("make")} ${str("model")}`,
        str("year"),
        `${str("cc")}cc`,
        `KES ${num("value").toLocaleString()}`,
      ]
        .filter(Boolean)
        .join(" · ")
    : [
        `Age ${str("age")}`,
        rec.planType === "family" ? "Family" : rec.planType === "senior" ? "Senior" : "Individual",
        str("premiumMode") === "monthly" ? "Monthly" : "Annual",
      ]
        .filter(Boolean)
        .join(" · ");

  const extras: string[] = [];
  if (isMotor && flag("windscreen")) extras.push("Extended windscreen cover");
  if (isMotor && flag("tracker")) extras.push("GPS tracker discount applied");
  if (!isMotor && flag("maternity")) extras.push("Maternity extension");
  if (!isMotor && flag("dental")) extras.push("Dental & optical extension");

  return { product, cover, risk, extras };
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Builds a standalone, print-ready HTML copy of the quotation. It downloads as
 * a single file with no external assets, opens in any browser and prints or
 * saves to PDF with Ctrl/Cmd + P.
 */
export function quoteHtml(rec: QuoteRecord): string {
  const { product, cover, risk, extras } = quoteLabels(rec);
  const p = rec.pricing;
  const e = escapeHtml;

  const rows = p.lines
    .map((line) => {
      const negative = (line.amount ?? 0) < 0 || line.isDiscount;
      return `<tr class="${negative ? "neg" : ""}"><td>${e(line.label)}</td><td>${
        negative ? "−" : ""
      }KES ${money(Math.abs(line.amount))}</td></tr>`;
    })
    .join("");

  const extraList =
    extras.length > 0
      ? `<ul class="extras">${extras.map((x) => `<li>${e(x)}</li>`).join("")}</ul>`
      : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Quotation ${e(rec.ref)} — Royal Shield Insurance Agency</title>
<style>
  :root { --royal:#4169e1; --royal-deep:#16255e; --maroon:#800000; --line:#dbe2f2; --ink:#141c33; --muted:#6b7695; }
  * { box-sizing: border-box; }
  body { margin:0; padding:32px 20px; background:#f1f5ff; color:#3b4767;
         font:15px/1.65 "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  .doc { max-width:820px; margin:0 auto; background:#fff; border:1px solid var(--line);
         border-radius:14px; overflow:hidden; }
  header { background:linear-gradient(135deg,var(--royal-deep),var(--royal)); color:#fff; padding:26px 30px; }
  header h1 { margin:0; font-size:20px; letter-spacing:.16em; }
  header .sub { font-size:11px; letter-spacing:.3em; text-transform:uppercase; color:#ffc9c9; margin-top:4px; }
  header .meta { display:flex; flex-wrap:wrap; gap:26px; margin-top:18px; font-size:13px; color:rgba(255,255,255,.85); }
  header .meta b { display:block; color:#fff; font-size:15px; }
  .badge { display:inline-block; background:var(--maroon); color:#fff; font-size:11px; font-weight:700;
           letter-spacing:.1em; text-transform:uppercase; padding:5px 12px; border-radius:999px; margin-bottom:14px; }
  main { padding:28px 30px 34px; }
  h2 { font-size:13px; letter-spacing:.12em; text-transform:uppercase; color:var(--muted);
       margin:26px 0 10px; border-bottom:2px solid var(--line); padding-bottom:6px; }
  h2:first-child { margin-top:0; }
  .grid { display:flex; flex-wrap:wrap; gap:16px; }
  .card { flex:1 1 220px; background:#f1f5ff; border:1px solid var(--line); border-radius:10px; padding:14px 16px; }
  .card span { display:block; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
  .card b { display:block; color:var(--ink); font-size:15px; margin-top:3px; }
  .premium { background:linear-gradient(135deg,var(--royal),var(--royal-deep)); color:#fff;
             border-radius:12px; padding:20px; text-align:center; margin:18px 0; }
  .premium .lbl { font-size:11px; letter-spacing:.14em; text-transform:uppercase; opacity:.85; }
  .premium .amt { font-size:34px; font-weight:700; line-height:1.2; margin:6px 0 2px; }
  .premium .sub { font-size:12px; opacity:.8; }
  table { width:100%; border-collapse:collapse; font-size:14px; }
  th { background:var(--royal-deep); color:#fff; text-align:left; padding:9px 14px;
       font-size:11px; letter-spacing:.1em; text-transform:uppercase; }
  th:last-child, td:last-child { text-align:right; }
  td { padding:9px 14px; border-bottom:1px solid #ecf0fa; }
  tr.neg td:last-child { color:#0f7b6c; font-weight:600; }
  tr.grand td { background:#f1f5ff; font-weight:700; color:var(--ink); border-top:2px solid var(--royal); }
  tr.grand td:last-child { color:var(--maroon); font-size:17px; }
  .decl { background:#f1f5ff; border:1px solid var(--line); border-radius:10px; padding:16px 18px;
          font-size:13px; line-height:1.7; }
  .decl b { display:block; color:var(--ink); margin-bottom:4px; }
  .extras { margin:8px 0 0; padding-left:18px; font-size:13px; }
  .note { background:#f7eaea; border-left:4px solid var(--maroon); padding:12px 16px; font-size:13px;
          color:#660000; margin-top:22px; }
  footer { border-top:1px solid var(--line); padding:16px 30px 26px; font-size:12px; color:var(--muted); }
  footer b { color:var(--ink); }
  @media print {
    body { background:#fff; padding:0; }
    .doc { border:none; border-radius:0; }
    .note { display:none; }
  }
</style>
</head>
<body>
<div class="doc">
  <header>
    <div class="badge">Indicative quotation</div>
    <h1>ROYAL SHIELD INSURANCE AGENCY</h1>
    <div class="sub"></div>
    <div class="meta">
      <div><span>Quotation</span><b>${e(rec.ref)}</b></div>
      <div><span>Product</span><b>${e(product)}</b></div>
      <div><span>Issued</span><b>${e(fmtDate(rec.issued))}</b></div>
      <div><span>Valid until</span><b>${e(fmtDate(rec.expires))}</b></div>
      <div><span>Prepared for</span><b>${e(rec.customer.name || "—")}</b></div>
    </div>
  </header>

  <main>
    <h2>Risk summary</h2>
    <div class="grid">
      <div class="card"><span>Cover</span><b>${e(cover)}</b></div>
      <div class="card"><span>Risk insured</span><b>${e(risk)}</b></div>
      <div class="card"><span>Contact</span><b>${e(rec.customer.phone || rec.customer.email || "—")}</b></div>
    </div>
    ${extraList}

    <h2>Premium breakdown</h2>
    <table>
      <thead><tr><th>Line</th><th>Amount</th></tr></thead>
      <tbody>
        ${rows}
        <tr class="grand"><td>Total annual premium</td><td>KES ${money(p.total)}</td></tr>
      </tbody>
    </table>

    <div class="premium">
      <div class="lbl">Annual premium payable</div>
      <div class="amt">KES ${Math.round(p.total).toLocaleString()}</div>
      <div class="sub">includes IPT, statutory levies and stamp duty</div>
    </div>

    <div class="decl">
      <b>Declaration &amp; disclosure</b>
      This is an indicative quotation generated by Royal Shield Insurance Agency's rating engine using the
      information supplied. It is not a contract of insurance. Final premium is subject to
      underwriter acceptance, verification of the risk and satisfactory valuation (comprehensive
      motor). Incorrect disclosure may void a claim. Cover is placed only after proposal
      acceptance and receipt of premium.
    </div>

    <div class="note">
      <b>Keep this file</b> — it is your quotation record. Press Ctrl&nbsp;+&nbsp;P (Cmd&nbsp;+&nbsp;P
      on Mac) to print it or save it as a PDF.
    </div>
  </main>

  <footer>
    <b>Royal Shield Insurance Agency</b> · Nairobi, Kenya ·
    +254 712 661 514 · quotes@royalshield.co.ke<br />
    This quotation expires on ${e(fmtDate(rec.expires))}.
  </footer>
</div>
</body>
</html>`;
}

export function downloadQuote(rec: QuoteRecord): void {
  const html = quoteHtml(rec);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `Royal-Shield-${String(rec.ref).replace(/[^\w-]+/g, "-")}.html`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}
