import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteQuote, loadQuotes, type QuoteRecord } from "../lib/storage";
import { fmtDate } from "../lib/format";
import { money } from "../lib/engine";
import { downloadQuote } from "../lib/quoteDoc";
import { LogoFull } from "../components/Logo";

export default function Dashboard() {
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [viewing, setViewing] = useState<QuoteRecord | null>(null);

  useEffect(() => {
    setQuotes(loadQuotes());
  }, []);

  const remove = (ref: string) => {
    deleteQuote(ref);
    setQuotes(loadQuotes());
    if (viewing?.ref === ref) setViewing(null);
  };

  const label = (q: QuoteRecord) => {
    const d = q.data as Record<string, string>;
    if (q.lob === "motor") {
      return `${d.make || ""} ${d.model || ""} · ${
        d.coverType === "comprehensive" ? "Comprehensive" : d.coverType === "tpft" ? "TPFT" : "Third Party"
      }`.trim();
    }
    const tier = (d.plan || "plus").toString();
    return `Health — ${q.planType.charAt(0).toUpperCase() + q.planType.slice(1)} · ${tier.charAt(0).toUpperCase() + tier.slice(1)}`;
  };

  return (
    <>
      <section className="grad-royal py-12 text-white">
        <div className="container-x">
          <div className="mb-3 text-sm text-white/70">
            <Link to="/" className="text-white/70 hover:text-white">Home</Link> / My Quotes
          </div>
          <h1 className="mb-3 text-[clamp(1.9rem,4vw,2.8rem)] text-white">Your quotations</h1>
          <p className="max-w-2xl text-white/80">
            Everything you've generated on this device — reopen, download or start a fresh quote.
          </p>
        </div>
      </section>

      <section className="bg-royal-mist py-12">
        <div className="container-x">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 className="mb-0 text-3xl">
              Saved quotations{" "}
              <span className="text-lg font-normal text-muted">({quotes.length})</span>
            </h2>
            <Link to="/quote" className="btn btn-primary">+ New quotation</Link>
          </div>

          {quotes.length === 0 ? (
            <div id="empty" className="rounded-2xl border border-line bg-white p-14 text-center">
              <div className="mb-3 text-4xl">📄</div>
              <h3 className="text-xl">No quotations yet</h3>
              <p className="mb-6 text-muted">Start a quote — it takes under two minutes and saves here automatically.</p>
              <Link to="/quote" className="btn btn-maroon">Get my instant quote →</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {quotes.map((q) => (
                <div
                  key={q.ref}
                  className="flex flex-wrap items-center gap-5 rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(27,31,59,.04)]"
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xl ${
                      q.lob === "motor" ? "bg-royal-soft" : "bg-maroon-soft"
                    }`}
                  >
                    {q.lob === "motor" ? "🚗" : "🩺"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <b className="block truncate text-ink">{label(q)}</b>
                    <span className="text-sm text-muted">
                      <Link to={`/dashboard?ref=${q.ref}`} className="font-semibold text-royal" onClick={(e) => { e.preventDefault(); setViewing(q); }}>
                        {q.ref}
                      </Link>{" "}
                      · {q.customer.name} · issued {fmtDate(q.issued)} · valid to {fmtDate(q.expires)}
                    </span>
                  </div>
                  <div className="text-right">
                    <b className="block font-display text-xl text-ink">
                      KES {Math.round(q.pricing.total).toLocaleString()}
                    </b>
                    <span className="text-xs text-muted">annual premium</span>
                  </div>
                  <span className="rounded-full bg-[#e6f6f3] px-3 py-1 text-[0.7rem] font-bold tracking-wider text-success uppercase">
                    Active
                  </span>
                  <div className="flex w-full gap-2 sm:w-auto">
                    <button className="btn btn-primary btn-sm" onClick={() => setViewing(q)}>
                      View
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => downloadQuote(q)}
                      aria-label={`Download quotation ${q.ref}`}
                    >
                      ⬇ Download
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => remove(q.ref)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/55 p-4 py-10"
          onClick={() => setViewing(null)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <LogoFull className="h-11" />
                <div>
                  <b className="block text-ink">Quotation {viewing.ref}</b>

                </div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setViewing(null)}>✕ Close</button>
            </div>

            <div className="mb-4 flex flex-wrap justify-between gap-3 rounded-xl bg-royal-mist px-4 py-3 text-sm">
              <span>
                <b className="text-ink">Issued</b> {fmtDate(viewing.issued)}
              </span>
              <span>
                <b className="text-ink">Valid until</b> {fmtDate(viewing.expires)}
              </span>
              <span>
                <b className="text-ink">{viewing.customer.name}</b>
              </span>
            </div>

            <div className="mb-4 overflow-x-auto">
              <table className="cover-table">
                <thead>
                  <tr><th>Premium breakdown</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  {viewing.pricing.lines.map((l, i) => {
                    const neg = l.amount < 0 || l.isDiscount;
                    return (
                      <tr key={i} className={neg ? "neg" : ""}>
                        <td>{l.label}</td>
                        <td>
                          {neg ? "−" : ""}KES {money(Math.abs(l.amount))}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="grand">
                    <td>Total annual premium</td>
                    <td>KES {money(viewing.pricing.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="btn btn-primary btn-sm" onClick={() => downloadQuote(viewing)}>
                ⬇ Download quote
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => window.print()}>
                🖨 Print / Save as PDF
              </button>
              <Link to="/quote" className="btn btn-maroon btn-sm" onClick={() => setViewing(null)}>
                Start another quote
              </Link>
            </div>
            <p className="mb-0 mt-3 text-xs text-muted">
              Download is a single file you can keep or print to PDF — no account needed.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
