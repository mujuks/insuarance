import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogoFull } from "./Logo";
import { getSession } from "../lib/auth";

interface NavLinkItem {
  readonly to: string;
  readonly label: string;
  readonly end?: boolean;
}

const NAV_LINKS: readonly NavLinkItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About us" },
  { to: "/products", label: "Services" },
  { to: "/claims", label: "Claims" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/dashboard", label: "My Quotes" },
  { to: "/contact", label: "Contact" },
] as const;

const SOCIALS: readonly { readonly label: string; readonly short: string; readonly href: string }[] = [
  { label: "Facebook", short: "f", href: "https://www.facebook.com/" },
  { label: "Instagram", short: "ig", href: "https://www.instagram.com/" },
  { label: "LinkedIn", short: "in", href: "https://www.linkedin.com/" },
  { label: "WhatsApp", short: "wa", href: "https://wa.me/254712661514" },
] as const;

export default function Header(): React.JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const session = getSession();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled
          ? "border-b border-line shadow-[0_1px_2px_rgba(27,31,59,.06)]"
          : "border-b border-transparent"
      }`}
    >
      <div className={`${scrolled ? "hidden" : "hidden md:block"} topbar`}>
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <span className="opacity-90">📍 Nairobi, Kenya</span>
            <a href="mailto:quotes@royalshield.co.ke">quotes@royalshield.co.ke</a>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+254712661514">📞 +254 712 661 514</a>
            <span className="tb-social">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                >
                  {social.short}
                </a>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="container-x flex h-[68px] items-center justify-between gap-3 sm:h-[72px] sm:gap-5">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Lipa Insurance Agency home">
          <LogoFull className="h-10 w-auto sm:h-12" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end ?? false}
              className={({ isActive }): string =>
                `whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold transition xl:px-3 ${
                  isActive
                    ? "bg-royal-soft text-royal"
                    : "text-ink2 hover:bg-royal-soft hover:text-royal"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link to="/login" className="btn btn-outline btn-sm">
            {session ? "My account" : "Sign in"}
          </Link>
          <Link to="/quote" className="btn btn-maroon btn-sm">
            Get a Quote
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link to="/quote" className="btn btn-maroon btn-sm mobile-quote-btn">
            Get a Quote
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={(): void => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white"
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-white px-5 py-3 shadow-lg lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end ?? false}
                className={({ isActive }): string =>
                  `rounded-lg px-3 py-2.5 font-semibold transition ${
                    isActive ? "bg-royal-soft text-royal-dark" : "text-ink2 hover:bg-royal-mist"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/login"
              className="rounded-lg px-3 py-2.5 font-semibold text-ink2 hover:bg-royal-mist"
            >
              {session ? "My account" : "Sign in"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
