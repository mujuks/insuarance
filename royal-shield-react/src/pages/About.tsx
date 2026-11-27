import { Link } from "react-router-dom";

const BUYER_GUIDE = [
  {
    number: "01",
    title: "Check who you are dealing with",
    body: "The Insurance Regulatory Authority regulates and supervises Kenya’s insurance industry. Check that the insurer and intermediary you choose are licensed.",
  },
  {
    number: "02",
    title: "Know what motor cover does",
    body: "Third-party motor insurance is required for vehicles used on roads in Kenya. It is not the same as comprehensive cover for damage to your own vehicle.",
  },
  {
    number: "03",
    title: "Read beyond the premium",
    body: "Compare benefits, limits, excesses, exclusions, fees and claim requirements. The lowest price may not provide the protection you expect.",
  },
] as const;

export default function About(): React.JSX.Element {
  return (
    <>
      <section className="relative overflow-hidden grad-royal py-16 text-white sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container-x relative">
          <p className="mb-4 text-sm font-bold tracking-[0.12em] text-white/75 uppercase">
            About Royal Shield
          </p>
          <h1 className="mb-5 max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)] text-white">
            Local knowledge. Clearer insurance choices.
          </h1>
          <p className="mb-0 max-w-2xl text-lg leading-relaxed text-white/85">
            We are a Nairobi-based insurance agency helping individuals and
            businesses explore cover for the risks they face at home, on the road and at work.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative">
            <img
              src="/images/about-insurance.jpeg"
              alt="Insurance coverage icons for health, auto, travel, family and home"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_18px_50px_rgba(30,58,143,.16)]"
              loading="lazy"
            />
            <div className="absolute -bottom-4 right-4 rounded-2xl border border-line bg-white px-5 py-3 shadow-lg sm:right-7">
              <span className="block text-xs font-bold tracking-[0.12em] text-royal uppercase">
                Nairobi, Kenya
              </span>
              <span className="text-sm font-semibold text-ink">Working with people and businesses</span>
            </div>
          </div>

          <div>
            <span className="chip chip-blue mb-3">Our story</span>
            <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)]">
              Insurance should make sense before you need it.
            </h2>
            <p className="mb-4 text-muted">
              Insurance is a promise set out in a contract. As an agency, we help you understand
              available options, review policy terms and connect with insurers whose cover may fit
              your needs and budget.
            </p>
            <p className="mb-0 text-muted">
              Our services include auto, home, life and business insurance, alongside motor, health
              and other covers. When you need to use your
              policy, we can help you understand the process and communicate with the insurer. The
              insurer makes the final decision on cover and claims under the policy terms.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-royal-mist py-16 sm:py-20">
        <div className="container-x">
          <div className="mb-9 max-w-2xl">
            <span className="chip chip-blue mb-3">Insurance in Kenya</span>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)]">Three things to know before you choose.</h2>
            <p className="mb-0 text-muted">
              A little context can help you ask better questions and compare policies on more than
              price.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {BUYER_GUIDE.map((item) => (
              <article
                key={item.number}
                className="rounded-2xl border border-line bg-white p-6 shadow-[0_4px_14px_rgba(27,31,59,.04)] sm:p-7"
              >
                <span className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-royal-soft text-sm font-bold text-royal">
                  {item.number}
                </span>
                <h3 className="mb-2 text-lg">{item.title}</h3>
                <p className="mb-0 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href="https://www.ira.go.ke/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-royal underline underline-offset-4 hover:text-royal-dark"
            >
              Insurance Regulatory Authority
            </a>
            <a
              href="https://www.pcf.go.ke/index.php/about-us/service-delivery-charter/english?download=18%3Ainsurance-motor-vehicles-third-party-risks-act-12-of-1945&id=8%3Aacts-and-regulations&view=category"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-royal underline underline-offset-4 hover:text-royal-dark"
            >
              Motor Vehicles Third Party Risks Act, Cap. 405
            </a>
            <a
              href="https://ira.go.ke/assets/file/Guidelines_on__Insurance_Products.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-royal underline underline-offset-4 hover:text-royal-dark"
            >
              IRA insurance product guidelines
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-royal-deep to-royal px-7 py-9 text-white shadow-[0_18px_50px_rgba(30,58,143,.2)] sm:px-10 sm:py-11 lg:flex-row lg:items-center">
          <div>
            <h2 className="mb-2 text-[clamp(1.5rem,2.8vw,2.1rem)] text-white">
              Want to compare cover options?
            </h2>
            <p className="mb-0 max-w-xl text-white/85">
              Explore the products we offer or start a quotation for motor or health cover.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/quote" className="btn btn-white btn-lg">
              Get a quote
            </Link>
            <Link to="/products" className="btn btn-ghost-light btn-lg">
              Explore cover
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
