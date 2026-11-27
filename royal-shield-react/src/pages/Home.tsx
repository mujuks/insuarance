import { Link } from "react-router-dom";
import { WHY_US } from "../data/content";
import { PRODUCTS } from "../data/products";
import { MARKET_STATS } from "../data/market";

interface TrustItem {
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
}

const TRUST_ITEMS: readonly TrustItem[] = [
  { icon: "01", title: "Kenya", subtitle: "Local insurance agency" },
  { icon: "02", title: "Clear", subtitle: "Straightforward cover guidance" },
  { icon: "03", title: "Online", subtitle: "Indicative quotations for selected covers" },
  { icon: "04", title: "Dedicated", subtitle: "Support through your insurance journey" },
] as const;

export default function Home(): React.JSX.Element {
  return (
    <>
      <section className="home-hero">
        <div className="container-x home-hero-inner">
          <div className="home-hero-copy">
            <span className="home-eyebrow">Insurance guidance you can trust</span>
            <h1>Cover for the things that matter most.</h1>
            <p>
              Explore auto, home, life and business insurance with a Nairobi-based agency ready to
              help you understand your options.
            </p>
            <div className="home-hero-actions">
              <Link to="/quote" className="btn btn-white btn-lg">Get a Quote</Link>
              <Link to="/products" className="btn btn-ghost-light btn-lg">Explore Services</Link>
            </div>
            <div className="home-hero-note">
              <span aria-hidden="true">✓</span> Clear guidance from enquiry to application
            </div>
          </div>
          <div className="home-hero-image">
            <img src="/images/hero-kenyan-advisor.jpg" alt="Black businesswoman working in a modern office" fetchPriority="high" />
            <div className="home-image-caption">
              <span>Royal Shield Insurance Agency</span>
              <b>Local support. Cover for every stage.</b>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-line bg-white">
        <div className="container-x grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-3.5 px-2">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal-mist text-lg">
                {item.icon}
              </span>
              <div>
                <b className="block text-ink">{item.title}</b>
                <span className="text-[0.84rem] leading-snug text-muted">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-maroon py-8 text-white">
        <div className="container-x flex flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
          <div>
            <span className="text-xs font-bold tracking-[0.22em] text-white/60 uppercase">
              Our mantra
            </span>
            <p className="mb-0 font-display text-[clamp(1.25rem,2.6vw,1.9rem)] leading-tight font-bold text-white">
              Clear cover options. Straightforward pricing. Support when you need it.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Link to="/quote" className="btn btn-white btn-lg">
              Get a free quote
            </Link>
            <Link to="/claims" className="btn btn-ghost-light btn-lg">
              How claims work
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-royal-mist py-16 sm:py-20">
        <div className="container-x">
          <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="chip chip-blue mb-3">Choose your cover</span>
              <h2 className="mb-2 text-[clamp(1.7rem,3.2vw,2.5rem)]">
                Protection for life on the move
              </h2>
              <p className="mb-0 max-w-xl text-muted">
                Compare practical cover options and see the factors that shape your premium.
              </p>
            </div>
            <Link to="/products" className="text-sm font-bold text-royal hover:text-royal-dark">
              View all products →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-[#c8d4df] hover:shadow-[0_14px_38px_rgba(20,47,73,.11)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[0.68rem] font-bold tracking-[0.1em] uppercase ${product.tagClass}`}
                  >
                    {product.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl">{product.title}</h3>
                  <p className="mb-5 text-[0.92rem] leading-relaxed text-muted">{product.body}</p>
                  <Link
                    to={product.to}
                    className="inline-flex items-center gap-2 text-sm font-bold text-royal hover:text-royal-dark"
                  >
                    Explore cover <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src="/images/about-insurance.jpeg"
              alt="Insurance coverage icons for health, auto, travel, family and home"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_18px_50px_rgba(30,58,143,.18)]"
              loading="lazy"
            />
            <div className="absolute -right-3 -bottom-5 flex flex-col items-center rounded-2xl bg-maroon px-6 py-4 text-white shadow-lg sm:-right-5">
              <span className="font-display text-3xl font-semibold">4</span>
              <span className="text-center text-[0.72rem] leading-tight font-semibold tracking-wide uppercase">
                Core service
                <br />
                areas
              </span>
            </div>
          </div>
          <div>
            <span className="chip chip-blue mb-3">Why Royal Shield</span>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)]">
              An agency here to help you make informed choices
            </h2>
            <p className="mb-6 text-muted">
              We help explain cover options and policy details. Your insurer sets the final terms and
              handles claims according to the policy.
            </p>
            <ul className="mb-8 flex flex-col gap-4">
              {WHY_US.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-royal-soft text-sm font-bold text-royal">
                    ✓
                  </span>
                  <span>
                    <b className="block text-ink">{item.title}</b>
                    <span className="text-[0.9rem] text-muted">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to="/quote" className="btn btn-primary btn-lg">
                Start my quotation
              </Link>
              <Link to="/how-it-works" className="btn btn-outline btn-lg">
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grad-royal py-16 text-white sm:py-20">
        <div className="container-x">
          <div className="mb-9 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="chip mb-3 bg-maroon text-white">Kenya's insurance market</span>
              <h2 className="mb-2 max-w-2xl text-[clamp(1.7rem,3.2vw,2.5rem)] text-white">
                The numbers behind the cover you are buying
              </h2>
              <p className="mb-0 max-w-xl text-white/75">
                Sourced from the Insurance Regulatory Authority's 2025 annual industry statistics.
                Context matters when someone quotes you a price.
              </p>
            </div>
            <Link to="/about" className="text-sm font-bold text-white hover:underline">
              How we read the market →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MARKET_STATS.map((stat) => (
              <div key={stat.label} className="stat-tile">
                <b>{stat.value}</b>
                <span>{stat.label}</span>
                <i>{stat.note}</i>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-16">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl grad-royal-r px-8 py-12 text-white shadow-[0_18px_50px_rgba(22,37,94,.28)] sm:px-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-[clamp(1.5rem,2.8vw,2.1rem)] text-white">
                Ready for a price in two minutes?
              </h2>
              <p className="mb-0 max-w-xl text-white/85">
                Answer a few questions, see a full premium breakdown and keep your quotation for 30
                days. No obligation, no card required.
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
