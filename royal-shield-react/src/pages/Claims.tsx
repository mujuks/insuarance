import { Link } from "react-router-dom";
import { CLAIM_STEPS, CLAIM_DOCS, CLAIM_CONTACTS } from "../data/market";

export default function Claims(): React.JSX.Element {
  return (
    <>
      <section className="grad-royal py-14 text-white">
        <div className="container-x">
          <div className="mb-3 text-sm text-white/70">
            <Link to="/" className="text-white/70 hover:text-white">
              Home
            </Link>{" "}
            / Claims
          </div>
          <h1 className="mb-3 max-w-3xl text-[clamp(1.9rem,4vw,2.8rem)] text-white">
            Support when you need to make a claim
          </h1>
          <p className="max-w-2xl text-white/80">
            We can help you understand the claims process and contact your insurer. Here is what
            to prepare and where to escalate if you disagree with a decision.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#report" className="btn btn-white btn-lg">
              Report a claim now
            </a>
            <Link to="/quote" className="btn btn-ghost-light btn-lg">
              Get covered first
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-x grid gap-6 py-9 sm:grid-cols-3">
          {[
            { big: "24h", v: "Notification window in most wordings" },
            { big: "30d", v: "Typical settlement window on straightforward claims" },
            { big: "Free", v: "Our claim handling on every policy we place" },
          ].map((item) => (
            <div key={item.big} className="flex items-center gap-4 px-1">
              <span className="grid h-12 w-14 shrink-0 place-items-center rounded-xl bg-maroon-soft font-display text-sm font-bold text-maroon">
                {item.big}
              </span>
              <span className="text-[0.88rem] leading-snug text-muted">{item.v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-royal-mist py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div id="report">
            <span className="chip chip-blue mb-3">The process</span>
            <h2 className="mb-8 text-[clamp(1.7rem,3.2vw,2.4rem)]">
              What happens after you call us
            </h2>
            <div>
              {CLAIM_STEPS.map((step, index) => (
                <div key={step.title} className="claim-step">
                  <span className="cs-num">{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-line bg-white p-6">
              <span className="chip chip-maroon mb-3">Start here</span>
              <h3 className="mb-3 text-xl">Report a claim</h3>
              <ul className="mb-5 flex flex-col gap-3 text-sm">
                {CLAIM_CONTACTS.map((contact) => (
                  <li key={contact.label} className="flex flex-col">
                    <span className="text-xs font-bold tracking-wide text-muted uppercase">
                      {contact.label}
                    </span>
                    <a
                      href={contact.href}
                      className="font-semibold break-words text-royal hover:text-royal-dark"
                    >
                      {contact.value}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mb-0 text-xs leading-relaxed text-muted">
                Have your policy number ready. Contact your insurer promptly and call us if you need
                help understanding the next steps.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-maroon p-6 text-white">
              <h3 className="mb-2 text-xl text-white">If a claim is refused</h3>
              <p className="mb-4 text-sm leading-relaxed text-white/85">
                Ask for the repudiation in writing with the specific clause relied on. Most
                disputes are handled through the insurer's complaints process. You can also contact
                the IRA Complaints Handling Unit or the Insurance Ombudsman.
              </p>
              <Link to="/terms" className="btn btn-white btn-sm">
                Read your rights
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="mb-9">
            <span className="chip chip-blue mb-3">Checklist</span>
            <h2 className="mb-2 text-[clamp(1.7rem,3.2vw,2.4rem)]">Documents underwriters ask for</h2>
            <p className="mb-0 max-w-2xl text-muted">
              Missing paperwork is the single biggest cause of delayed settlement. Send these in
              one bundle and your claim moves straight to assessment.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CLAIM_DOCS.map((group) => (
              <div
                key={group.forCover}
                className="rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(22,37,94,.12)]"
              >
                <h3 className="mb-3 border-b border-linesoft pb-3 text-base text-royal-dark">
                  {group.forCover}
                </h3>
                <ul className="mb-0 flex flex-col gap-2.5 text-[0.86rem] text-ink2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-maroon">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl grad-royal-r px-8 py-12 text-white shadow-[0_18px_50px_rgba(22,37,94,.28)] sm:px-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-[clamp(1.5rem,2.8vw,2.1rem)] text-white">
                Not insured with us yet?
              </h2>
              <p className="mb-0 max-w-xl text-white/85">
                Explore the covers we offer and contact our agency for help with your options.
              </p>
            </div>
            <Link to="/quote" className="btn btn-white btn-lg shrink-0">
              Get my instant quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
