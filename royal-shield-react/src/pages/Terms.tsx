import { Link } from "react-router-dom";

const toc = [
  ["intro", "1. Introduction"],
  ["who", "2. Who we are"],
  ["quotes", "3. Online quotations"],
  ["disclosure", "4. Duty of disclosure"],
  ["accounts", "5. Accounts"],
  ["privacy", "6. Privacy & data"],
  ["liability", "7. Limitation of liability"],
  ["ip", "8. Intellectual property"],
  ["complaints", "9. Complaints"],
  ["law", "10. Governing law"],
  ["changes", "11. Changes"],
];

export default function Terms() {
  return (
    <>
      <section className="grad-royal py-12 text-white">
        <div className="container-x">
          <div className="mb-3 text-sm text-white/70">
            <Link to="/" className="text-white/70 hover:text-white">Home</Link> / Terms &amp; Conditions
          </div>
          <h1 className="mb-3 text-[clamp(1.9rem,4vw,2.8rem)] text-white">Terms &amp; Conditions</h1>
          <p className="max-w-2xl text-white/80">
            The rules governing your use of the Royal Shield Brokers online quotation platform and our brokerage
            services.
          </p>
        </div>
      </section>

      <section className="bg-royal-mist py-12">
        <div className="container-x grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="sticky top-24 hidden self-start lg:block">
            <div className="rounded-2xl border border-line bg-white p-5">
              <h4 className="mb-3 border-b border-linesoft pb-2 text-[0.78rem] font-bold tracking-[0.1em] text-muted uppercase">
                On this page
              </h4>
              <nav className="flex flex-col gap-1.5 text-sm">
                {toc.map(([id, label]) => (
                  <a key={id} href={`#${id}`} className="rounded-md px-2 py-1 text-ink2 transition hover:bg-royal-mist hover:text-royal">
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(27,31,59,.04)] lg:p-10">
            <div className="mb-6 rounded-xl bg-royal-mist px-4 py-2.5 text-sm text-muted">
              📅 Last updated: 26 November 2026 · Version 2.1
            </div>

            <div className="prose-rs">
              <h2 id="intro" className="mt-8 mb-3 text-2xl scroll-mt-28">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Royal Shield Brokers Limited ("Royal Shield", "we", "us"). These Terms and Conditions
                ("Terms") form a binding agreement between you and Royal Shield governing your use of our website,
                online quotation engine and related services (together, the "Platform").
              </p>
              <p className="mb-4">
                By accessing or using the Platform you agree to comply with these Terms. If you do not agree, please
                discontinue use immediately. We offer a broad range of insurance products, provide consultations, and
                assist with the purchase of insurance policies from reputable insurance companies in Kenya. Please read
                these Terms carefully before using our services.
              </p>

              <h2 id="who" className="mt-8 mb-3 text-2xl scroll-mt-28">2. Who we are</h2>
              <p className="mb-4">
                Royal Shield Brokers Limited is an insurance brokerage firm licensed by the Insurance Regulatory
                Authority of Kenya (Licence No. IB/2026/0148) and a member of the Association of Insurance Brokers of
                Kenya. We act as an independent intermediary — we work for you, the insured, not for any particular
                insurer.
              </p>
              <ul className="mb-4 list-disc space-y-1.5 pl-6 text-ink2">
                <li>Registered office: 4th Floor, Shield House, Kimathi Street, Nairobi</li>
                <li>Telephone: +254 700 000 000 · Email: quotes@royalshield.co.ke</li>
                <li>
                  We are remunerated by commission paid by insurers after successful placement of your risk, unless
                  otherwise agreed in writing.
                </li>
              </ul>

              <h2 id="quotes" className="mt-8 mb-3 text-2xl scroll-mt-28">3. Online quotations</h2>
              <p className="mb-4">
                The quotation engine provides <b>indicative premiums</b> calculated automatically from the information
                you supply. Please note:
              </p>
              <ul className="mb-4 list-disc space-y-1.5 pl-6 text-ink2">
                <li>
                  An online quotation is <b>not a contract of insurance</b>, not an offer to insure, and not a binding
                  commitment by us or by any insurer.
                </li>
                <li>
                  Final premium and terms are subject to underwriter acceptance, verification of the risk, satisfactory
                  valuation (where applicable) and receipt of premium.
                </li>
                <li>
                  Quotations are valid for <b>30 days</b> from the issue date shown, after which rating factors may
                  have changed.
                </li>
                <li>
                  Prices are expressed in Kenya Shillings (KES) and include Insurance Premium Tax, regulatory levies
                  and stamp duty as applicable at the time of rating.
                </li>
                <li>
                  Any discount, loading or extension shown in the breakdown is indicative and may be adjusted by the
                  underwriter on final assessment.
                </li>
              </ul>

              <h2 id="disclosure" className="mt-8 mb-3 text-2xl scroll-mt-28">4. Duty of disclosure</h2>
              <p className="mb-4">
                You have a legal duty to disclose all material facts accurately and completely. Material facts include
                (without limitation) previous claims, criminal convictions, modifications to the insured vehicle or
                property, intended use, and any circumstances that would influence an insurer's assessment of the risk.
              </p>
              <ul className="mb-4 list-disc space-y-1.5 pl-6 text-ink2">
                <li>
                  Incorrect or misleading information may render a policy <b>voidable</b> and can cause a claim to be
                  declined.
                </li>
                <li>
                  You must notify us of any change in the risk (e.g. change of use, driver, address) before the change
                  takes effect.
                </li>
                <li>
                  Where you are unsure whether a fact is material, disclose it — we will advise whether it affects the
                  risk.
                </li>
              </ul>

              <h2 id="accounts" className="mt-8 mb-3 text-2xl scroll-mt-28">5. Accounts &amp; acceptable use</h2>
              <p className="mb-4">
                If you create an account on the Platform you are responsible for keeping your credentials confidential
                and for all activity under your account. You agree not to:
              </p>
              <ul className="mb-4 list-disc space-y-1.5 pl-6 text-ink2">
                <li>Use the Platform for any unlawful or fraudulent purpose;</li>
                <li>Attempt to gain unauthorised access to other accounts, systems or networks;</li>
                <li>Interfere with or disrupt the integrity or performance of the Platform;</li>
                <li>Reverse-engineer, scrape or systematically extract content from the Platform.</li>
              </ul>
              <p className="mb-4">
                We may suspend or terminate access where we reasonably believe these Terms have been breached.
              </p>

              <h2 id="privacy" className="mt-8 mb-3 text-2xl scroll-mt-28">6. Privacy &amp; data protection</h2>
              <p className="mb-4">
                We process personal data in accordance with the Data Protection Act, 2019 (Kenya). Quotations generated
                on this device are stored locally in your browser and are not transmitted to our servers unless you
                choose to submit them.
              </p>
              <ul className="mb-4 list-disc space-y-1.5 pl-6 text-ink2">
                <li>We collect only the information needed to quote, place and administer your cover.</li>
                <li>We do not sell your personal data to third parties.</li>
                <li>
                  You may request access to, correction of, or deletion of your personal data by writing to
                  quotes@royalshield.co.ke.
                </li>
                <li>Marketing messages are sent only with your consent, and you may opt out at any time.</li>
              </ul>

              <h2 id="liability" className="mt-8 mb-3 text-2xl scroll-mt-28">7. Limitation of liability</h2>
              <p className="mb-4">To the maximum extent permitted by law:</p>
              <ul className="mb-4 list-disc space-y-1.5 pl-6 text-ink2">
                <li>The Platform is provided "as is" without warranties of any kind, express or implied.</li>
                <li>
                  We are not liable for indirect, consequential or pure economic loss arising from use of the Platform
                  or reliance on an indicative quotation.
                </li>
                <li>
                  Our aggregate liability arising from any quotation or placement shall not exceed the total premium
                  payable on the policy concerned, or KES 1,000,000, whichever is the lower — save where liability
                  cannot be excluded by law (including for death or personal injury caused by negligence, or fraud).
                </li>
                <li>
                  Nothing in these Terms excludes or limits any duty owed to you under the Insurance Act (Cap. 487) or
                  the Insurance Regulatory Authority's conduct requirements.
                </li>
              </ul>

              <h2 id="ip" className="mt-8 mb-3 text-2xl scroll-mt-28">8. Intellectual property</h2>
              <p className="mb-4">
                All content on the Platform — including the Royal Shield name, shield device, logos, copy, rating logic
                and design — is the property of Royal Shield Brokers Limited or its licensors and is protected by
                applicable intellectual property law. You may view and print content for personal, non-commercial use
                only. Reproduction or redistribution requires our prior written consent.
              </p>

              <h2 id="complaints" className="mt-8 mb-3 text-2xl scroll-mt-28">9. Complaints &amp; dispute resolution</h2>
              <p className="mb-4">We take complaints seriously. If you are dissatisfied with our service:</p>
              <ul className="mb-4 list-disc space-y-1.5 pl-6 text-ink2">
                <li>
                  <b>Step 1</b> — Write to the Compliance Officer, Royal Shield Brokers Ltd, 4th Floor, Shield House,
                  Kimathi Street, Nairobi, or email complaints@royalshield.co.ke. We acknowledge within{" "}
                  <b>3 working days</b> and resolve within <b>14 working days</b>.
                </li>
                <li>
                  <b>Step 2</b> — If unresolved, you may escalate to the <b>Insurance Regulatory Authority</b>{" "}
                  (Insurance Complaints Unit, IRA Tower, Waiyaki Way, Nairobi · info@ira.go.ke).
                </li>
                <li>
                  <b>Step 3</b> — Either party may refer the matter to the courts of Kenya, or to arbitration under the
                  Arbitration Act, 1995 if both parties agree.
                </li>
              </ul>

              <h2 id="law" className="mt-8 mb-3 text-2xl scroll-mt-28">10. Governing law</h2>
              <p className="mb-4">
                These Terms are governed by and construed in accordance with the laws of the Republic of Kenya, and the
                parties submit to the exclusive jurisdiction of the Kenyan courts.
              </p>

              <h2 id="changes" className="mt-8 mb-3 text-2xl scroll-mt-28">11. Changes to these Terms</h2>
              <p className="mb-4">
                We may update these Terms from time to time to reflect changes in law, regulation or our services. The
                "Last updated" date at the top of this page shows the latest revision. Material changes will be
                notified by email or a prominent notice on the Platform. Continued use after an update constitutes
                acceptance of the revised Terms.
              </p>

              <div className="decl-box mt-10">
                <b>Contact for anything in these Terms</b>
                Compliance Officer · Royal Shield Brokers Limited · 4th Floor, Shield House, Kimathi Street, Nairobi ·{" "}
                <a href="mailto:compliance@royalshield.co.ke" className="text-royal">
                  compliance@royalshield.co.ke
                </a>{" "}
                · +254 700 000 000
              </div>

              <div className="result-actions mt-8">
                <Link to="/quote" className="btn btn-maroon">Start a quotation</Link>
                <Link to="/" className="btn btn-outline">Back to home</Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
