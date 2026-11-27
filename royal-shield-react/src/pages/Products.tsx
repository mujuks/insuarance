import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { COVERS } from "../data/covers";
import { MARKET_FACTS, UNDERWRITERS } from "../data/market";

const FEATURED_IDS = new Set(["motor", "health"]);

export default function Products(): React.JSX.Element {
  const rest = COVERS.filter((cover) => !FEATURED_IDS.has(cover.id));

  return (
    <>
      <section className="grad-royal py-12 text-white">
        <div className="container-x">
          <div className="mb-3 text-sm text-white/70">
            <Link to="/" className="text-white/70 hover:text-white">
              Home
            </Link>{" "}
            / Products
          </div>
          <h1 className="mb-3 text-[clamp(1.9rem,4vw,2.8rem)] text-white">What we cover</h1>
          <p className="max-w-2xl text-white/80">
            Nine lines of business, three of them priced instantly online. Every quotation compares
            the same panel of underwriters on the same statutory charges — so like is compared with
            like.
          </p>
        </div>
      </section>

      <section className="bg-royal-mist py-14">
        <div className="container-x">
          <div className="mb-7">
            <span className="chip chip-maroon mb-3">Quote online now</span>
            <h2 className="mb-2 text-[clamp(1.6rem,3vw,2.2rem)]">Cover you can price in two minutes</h2>
            <p className="mb-0 max-w-2xl text-muted">
              Full premium breakdown, line by line — base rate, loadings, discounts, IPT, levies and
              stamp duty.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_14px_rgba(27,31,59,.06)] transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(27,31,59,.1)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-3.5 left-3.5 rounded-full px-3 py-1 text-[0.7rem] font-bold tracking-wider uppercase ${product.tagClass}`}
                  >
                    {product.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl">{product.title}</h3>
                  <p className="mb-4 text-[0.92rem] text-muted">{product.body}</p>
                  <ul className="mb-6 flex flex-col gap-1.5 text-[0.88rem] text-ink2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="text-royal">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={product.to} className={`btn ${product.btn} btn-block mt-auto`}>
                    {product.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-x">
          <div className="mb-9">
            <span className="chip chip-blue mb-3">Also arranged</span>
            <h2 className="mb-2 text-[clamp(1.6rem,3vw,2.2rem)]">
              {rest.length} more risks we place for you
            </h2>
            <p className="mb-0 max-w-2xl text-muted">
              Brokered rather than instantly rated — send us the basics and a named broker comes back
              with an itemised, comparable quotation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((cover) => (
              <Link key={cover.id} to={cover.to} className="cover-card" aria-label={cover.title}>
                <span className="cc-icon" aria-hidden="true">
                  {cover.icon}
                </span>
                <h3 className="text-ink">{cover.title}</h3>
                <p>{cover.body}</p>
                <span className="cc-more">{cover.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-royal-mist py-16">
        <div className="container-x">
          <div className="mb-9">
            <span className="chip chip-maroon mb-3">Do your homework</span>
            <h2 className="mb-2 text-[clamp(1.6rem,3vw,2.2rem)]">
              Six things worth knowing before you buy
            </h2>
            <p className="mb-0 max-w-2xl text-muted">
              Drawn from Kenyan statute, regulator guidance and current market practice — not from a
              sales script.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MARKET_FACTS.map((fact, index) => (
              <div
                key={fact.title}
                className="rounded-2xl border border-line bg-white p-6 transition hover:border-royal"
              >
                <span className="mb-3 inline-block font-display text-2xl font-bold text-maroon">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-lg">{fact.title}</h3>
                <p className="mb-0 text-[0.9rem] leading-relaxed text-muted">{fact.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-12">
        <div className="container-x">
          <p className="mb-6 text-center text-xs font-bold tracking-[0.16em] text-muted uppercase">
            Placing risk with Kenya's leading underwriters
          </p>
          <div className="marquee">
            <div className="marquee-track">
              {[...UNDERWRITERS, ...UNDERWRITERS].map((underwriter, index) => (
                <span
                  key={`${underwriter.name}-${index}`}
                  className="whitespace-nowrap rounded-xl border border-line bg-royal-mist px-6 py-3 text-sm font-bold text-royal-dark"
                >
                  {underwriter.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-royal-mist py-16">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl grad-royal-r px-8 py-12 text-white shadow-[0_18px_50px_rgba(22,37,94,.28)] sm:px-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="mb-2 text-[clamp(1.4rem,2.6vw,1.9rem)] text-white">
                Not sure which cover you need?
              </h2>
              <p className="mb-0 max-w-xl text-white/85">
                Start a quotation and switch products inside the wizard — pricing updates instantly.
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
