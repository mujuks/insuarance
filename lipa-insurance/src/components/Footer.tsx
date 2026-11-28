import { Link } from "react-router-dom";
import { useState } from "react";
import { LogoFull } from "./Logo";

interface FooterProps {
  readonly compact?: boolean;
}

interface FooterLink {
  readonly to: string;
  readonly label: string;
}

const PRODUCT_LINKS: readonly FooterLink[] = [
  { to: "/quote?lob=motor&cover=comprehensive", label: "Comprehensive Motor" },
  { to: "/quote?lob=motor&cover=tpo", label: "Third Party & TPFT" },
  { to: "/quote?lob=motor", label: "Fleet & Commercial" },
  { to: "/quote?lob=health", label: "Health & Medical" },
  { to: "/products", label: "All covers we arrange" },
] as const;

const COMPANY_LINKS: readonly FooterLink[] = [
  { to: "/about", label: "About us" },
  { to: "/products", label: "Products" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/claims", label: "Claims" },
  { to: "/dashboard", label: "My Quotes" },
  { to: "/terms", label: "Terms & Conditions" },
] as const;

const SOCIALS: readonly { readonly label: string; readonly short: string; readonly href: string }[] = [
  { label: "Facebook", short: "f", href: "https://www.facebook.com/" },
  { label: "Instagram", short: "in", href: "https://www.instagram.com/" },
  { label: "LinkedIn", short: "li", href: "https://www.linkedin.com/" },
  { label: "X", short: "x", href: "https://x.com/" },
] as const;

export default function Footer({ compact = false }: FooterProps): React.JSX.Element {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  if (compact) {
    return (
      <footer className="border-t border-line bg-royal-deep text-white/80">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-sm">
          <span>© {year} Lipa Insurance Agency</span>
          <span className="flex gap-5">
            <Link to="/terms" className="text-white/70 hover:text-white">
              Terms
            </Link>
            <Link to="/dashboard" className="text-white/70 hover:text-white">
              My Quotes
            </Link>
          </span>
        </div>
      </footer>
    );
  }

  const onSubscribe = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="grad-royal-r pt-16 pb-8 text-white/80">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3"><LogoFull className="h-12" /></div>
            <p className="text-sm leading-relaxed">
              A Nairobi-based insurance agency supporting individuals and businesses with cover options for vehicles, homes, health, life and business risks.
            </p>
            <div className="mt-4 flex gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/10 text-xs font-bold text-white transition hover:bg-maroon hover:border-maroon"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-[0.78rem] font-bold tracking-[0.12em] text-white uppercase">
              Products
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[0.78rem] font-bold tracking-[0.12em] text-white uppercase">
              Company
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[0.78rem] font-bold tracking-[0.12em] text-white uppercase">
              Contact
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                📍
                Nairobi, Kenya
              </li>
              <li>
                📞{" "}
                <a href="tel:+254712661514" className="hover:text-white">
                  +254 712 661 514
                </a>
              </li>
              <li>
                ✉️{" "}
                <a href="https://lipainsurance.co.ke" className="hover:text-white">
                  lipainsurance.co.ke
                </a>
              </li>
              <li>
                💬{" "}
                <a href="https://wa.me/254712661514" className="hover:text-white">
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 rounded-2xl border border-white/15 bg-white/5 p-6 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <h4 className="mb-1 text-base font-bold text-white">Newsletter</h4>
            <p className="mb-0 text-sm text-white/70">
              Cover changes, claims deadlines and premium-saving tips — one short email a month.
            </p>
          </div>
          <div>
            <form className="news-form" onSubmit={onSubscribe} noValidate>
              <input
                type="email"
                name="newsletter-email"
                placeholder="you@company.co.ke"
                aria-label="Email address"
                value={email}
                onChange={(event): void => setEmail(event.target.value)}
              />
              <button type="submit" className="btn btn-maroon btn-sm">
                Subscribe
              </button>
            </form>
            <p className="news-note">
              {sent ? "Thanks — you're on the list." : "No spam. Unsubscribe any time."}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs">
          <span>© {year} Lipa Insurance Agency. All rights reserved.</span>
          <span className="flex gap-5">
            <Link to="/terms" className="hover:text-white">
              Privacy & Terms
            </Link>
            <Link to="/claims" className="hover:text-white">
              Complaints
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
