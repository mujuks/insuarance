import { Link } from "react-router-dom";

export default function Contact(): React.JSX.Element {
  return (
    <>
      <section className="grad-royal py-14 text-white sm:py-18">
        <div className="container-x">
          <p className="mb-3 text-sm text-white/70"><Link to="/">Home</Link> / Contact</p>
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] text-white">Talk to our agency</h1>
          <p className="mb-0 max-w-2xl text-white/85">Contact Royal Shield Insurance Agency in Nairobi to discuss auto, home, life, business and other insurance services.</p>
        </div>
      </section>
      <section className="py-14 sm:py-18">
        <div className="container-x grid gap-5 md:grid-cols-3">
          <a className="rounded-2xl border border-line bg-white p-6 shadow-sm" href="tel:+254712661514">
            <span className="chip chip-blue mb-4">Call us</span><h2 className="mb-2 text-xl">+254 712 661 514</h2><p className="mb-0 text-sm text-muted">Speak with our agency team.</p>
          </a>
          <a className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-success" href="https://wa.me/254712661514" target="_blank" rel="noreferrer noopener" aria-label="Chat with Royal Shield Insurance Agency on WhatsApp at +254 712 661 514">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e8f7ef] px-3 py-1.5 text-sm font-bold text-[#16894b]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 2a9.7 9.7 0 0 0-8.3 14.7L2.4 22l5.5-1.4A10 10 0 1 0 12 2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.9.8-3.2-.2-.3A7.9 7.9 0 1 1 12 19.8Zm4.4-5.9c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.7.9-.9 1.1-.2.2-.3.2-.5.1a6.5 6.5 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.8c-.1-.2 0-.3.1-.4l.4-.4c.1-.1.2-.3.2-.4 0-.2 0-.3-.1-.4-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.4 3.8 3.3.5.2.9.4 1.2.4.5.2 1 .2 1.4.1.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z" />
              </svg>
              WhatsApp
            </span>
            <h2 className="mb-2 text-xl">Message our team</h2>
            <p className="mb-0 text-sm text-muted">Send us your insurance enquiry.</p>
          </a>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <span className="chip chip-blue mb-4">Visit</span><h2 className="mb-2 text-xl">Nairobi, Kenya</h2><p className="mb-0 text-sm text-muted">Our agency is based in Nairobi.</p>
          </div>
        </div>
      </section>
    </>
  );
}
