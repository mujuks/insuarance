import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { WHY_US } from "../data/content";
import { PRODUCTS } from "../data/products";
import { MARKET_STATS } from "../data/market";

interface CounterProps {
  readonly to: number;
  readonly suffix?: string;
}

interface HeroStat {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

interface QuickPick {
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
  readonly to: string;
}

interface TrustItem {
  readonly icon: string;
  readonly title: string;
  readonly subtitle: string;
}

const HERO_STATS: readonly HeroStat[] = [
  { value: 12, suffix: "+", label: "Underwriter partners" },
  { value: 4800, suffix: "+", label: "Policies placed" },
  { value: 96, suffix: "%", label: "Claims retained" },
  { value: 11, suffix: " yrs", label: "Brokerage experience" },
] as const;

const QUICK_PICKS: readonly QuickPick[] = [
  {
    icon: "🚗",
    title: "Motor Insurance",
    subtitle: "Comprehensive · TPFT · Third Party",
    to: "/quote?lob=motor",
  },
  {
    icon: "🩺",
    title: "Health Cover",
    subtitle: "Individual · Family · Senior",
    to: "/quote?lob=health",
  },
  {
    icon: "🛡️",
    title: "Fleet & Commercial",
    subtitle: "Business use vehicles from 3 units",
    to: "/quote?lob=motor",
  },
] as const;

const TRUST_ITEMS: readonly TrustItem[] = [
  { icon: "🏛️", title: "IRA", subtitle: "Licensed brokerage · Reg. No. IB/2026/0148" },
  { icon: "⚖️", title: "100%", subtitle: "Independent — we work for you, not insurers" },
  { icon: "⚡", title: "< 2 min", subtitle: "Instant online quotation engine" },
  { icon: "🤝", title: "Dedicated", subtitle: "Named broker on every policy" },
] as const;

function Counter({ to, suffix = "" }: CounterProps): React.JSX.Element {
  const [n, setN] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const duration = 1100;

        const tick = (now: number): void => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setN(Math.round(to * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <>
      <section className="relative overflow-hidden grad-royal text-white">
        <div
          className="absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.15fr_.85fr] lg:py-22">
          <div>
            <span className="mb-5 inline-flex rounded-full bg-maroon px-4 py-1.5 text-[0.78rem] font-bold tracking-[0.08em] text-white uppercase shadow-[0_6px_18px_rgba(128,0,0,.4)]">
              IRA-Licensed Insurance Brokers
            </span>
            <h1 className="mb-5 text-[clamp(2.2rem,4.6vw,3.5rem)] leading-[1.12] font-bold tracking-tight text-white">
              Insurance,{" "}
              <em className="font-display font-semibold not-italic text-[#ffc9c9]">engineered</em>{" "}
              around your life.
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/85">
              Royal Shield Brokers compares cover from Kenya's leading underwriters and returns an
              instant, transparent quotation — motor or health — in under two minutes. No call
              centres. No hidden fees.
            </p>
            <div className="mb-10 flex flex-wrap gap-3">
              <Link to="/quote" className="btn btn-white btn-lg">
                Get my instant quote →
              </Link>
              <Link to="/products" className="btn btn-ghost-light btn-lg">
                Explore cover
              </Link>
            </div>
            <div className="grid max-w-lg grid-cols-2 gap-5 sm:grid-cols-4">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <b className="block font-display text-2xl font-semibold text-white">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </b>
                  <span className="text-xs text-white/65">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 text-ink2 shadow-[0_18px_50px_rgba(30,58,143,.35)]">
            <h2 className="mb-1 text-xl font-bold">Start your quotation</h2>
            <p className="mb-5 text-sm text-muted">
              Pick a cover — we'll guide you through four short steps.
            </p>
            <div className="flex flex-col gap-2.5">
              {QUICK_PICKS.map((pick) => (
                <Link
                  key={pick.title}
                  to={pick.to}
                  className="flex items-center gap-3.5 rounded-2xl border border-line bg-white p-3.5 text-left transition hover:border-royal hover:bg-royal-mist"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-royal-soft text-xl">
                    {pick.icon}
                  </span>
                  <span className="flex flex-col">
                    <b className="text-[0.97rem] text-ink">{pick.title}</b>
                    <span className="text-[0.8rem] text-muted">{pick.subtitle}</span>
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-center text-[0.78rem] text-muted">
              Indicative pricing · Valid 30 days · No card required
            </p>
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
              Cover you can read. Premiums you can audit. Claims we chase for you.
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
              src="/images/advisor.jpg"
              alt="Broker reviewing policy documents with a client"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_18px_50px_rgba(30,58,143,.18)]"
              loading="lazy"
            />
            <div className="absolute -right-3 -bottom-5 flex flex-col items-center rounded-2xl bg-maroon px-6 py-4 text-white shadow-lg sm:-right-5">
              <span className="font-display text-3xl font-semibold">12+</span>
              <span className="text-center text-[0.72rem] leading-tight font-semibold tracking-wide uppercase">
                Underwriters
                <br />
                compared on
                <br />
                every quote
              </span>
            </div>
          </div>
          <div>
            <span className="chip chip-blue mb-3">Why Royal Shield</span>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.5rem)]">
              A broker that works for you — not for the insurer
            </h2>
            <p className="mb-6 text-muted">
              We are paid commission by insurers after placement, so our advice costs you nothing.
              Our loyalty sits with your policy at claim time.
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
