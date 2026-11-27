import { Link } from "react-router-dom";
import { STEPS } from "../data/content";

export default function HowItWorks() {
  return (
    <>
      <section className="grad-royal py-12 text-white">
        <div className="container-x">
          <div className="mb-3 text-sm text-white/70">
            <Link to="/" className="text-white/70 hover:text-white">
              Home
            </Link>{" "}
            / How it works
          </div>
          <h1 className="mb-3 text-[clamp(1.9rem,4vw,2.8rem)] text-white">From question to quotation</h1>
          <p className="max-w-2xl text-white/80">
            Our engine prices your risk instantly using the same rating factors underwriters use — then a named broker
            reviews it before you bind.
          </p>
        </div>
      </section>

      <section className="bg-royal-mist py-14">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(27,31,59,.04)]"
              >
                <span className="mb-3 inline-grid h-9 w-9 place-items-center rounded-full bg-royal text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h2 className="mb-2 text-lg">{step.title}</h2>
                <p className="mb-0 text-[0.9rem] text-muted">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-8">
              <span className="chip chip-blue mb-3">What you get</span>
              <h2 className="text-2xl">Every quotation, fully transparent</h2>
              <ul className="mt-4 flex flex-col gap-3 text-[0.93rem] text-ink2">
                <li className="flex gap-2.5">
                  <span className="text-royal">✓</span>
                  Line-by-line premium breakdown — base rate, loadings, discounts, taxes
                </li>
                <li className="flex gap-2.5">
                  <span className="text-royal">✓</span>
                  30-day validity stored in My Quotes on this device
                </li>
                <li className="flex gap-2.5">
                  <span className="text-royal">✓</span>
                  Download or print it the moment your price is ready — one file, no account
                </li>
                <li className="flex gap-2.5">
                  <span className="text-royal">✓</span>
                  No card, no obligation — indicative pricing only
                </li>
              </ul>
              <Link to="/quote" className="btn btn-primary mt-7">
                Start my quotation
              </Link>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-royal-deep to-royal p-8 text-white">
              <span className="chip mb-3 bg-white/15 text-white">After you quote</span>
              <h2 className="mb-3 text-2xl text-white">A named broker takes over</h2>
              <p className="mb-5 text-white/85">
                Once you are happy with the indicative price, a licensed broker confirms terms with the underwriter,
                collects proposal documents and places your cover.
              </p>
              <ul className="flex flex-col gap-2.5 text-sm text-white/90">
                <li>· Logbook and valuation follow-up</li>
                <li>· Proposal form preparation</li>
                <li>· Direct line for renewals and claims</li>
              </ul>
              <Link to="/quote" className="btn btn-white mt-7">
                Get my instant quote →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
