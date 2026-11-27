import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import { health, makeRef, money, motor, expiry, QUOTE_DAYS, type Pricing } from "../lib/engine";
import { saveQuote, type QuoteRecord } from "../lib/storage";
import { EMAIL_RE, PHONE_RE, fmtDate, normalizePhone } from "../lib/format";
import { downloadQuote, quoteLabels } from "../lib/quoteDoc";
import { LogoFull } from "../components/Logo";

type Lob = "motor" | "health";
type PlanType = "individual" | "family" | "senior";
type Errors = Record<string, boolean>;

const MAKES = [
  "Toyota", "Nissan", "Mazda", "Subaru", "Honda", "Mitsubishi", "Isuzu", "Ford",
  "Mercedes-Benz", "BMW", "Volkswagen", "Hyundai", "Kia", "Land Rover", "Other",
];
const YEARS = Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => new Date().getFullYear() - i);

interface FormState {
  // motor
  make: string; model: string; year: string; value: string; cc: string; reg: string;
  coverType: "comprehensive" | "tpft" | "tpo";
  usage: "private" | "commercial";
  region: string; driverAge: string; claims3yr: string; ncd: string;
  alarm: "true" | "false"; tracker: boolean; windscreen: boolean;
  // health
  planType: PlanType; age: string; spouseAge: string; children: string;
  plan: "essential" | "plus" | "premier";
  premiumMode: "annual" | "monthly";
  maternity: boolean; dental: boolean; outpatient: boolean;
  // contact
  fullName: string; phone: string; email: string; notes: string; consent: boolean;
}

const initial: FormState = {
  make: "", model: "", year: "", value: "", cc: "", reg: "",
  coverType: "comprehensive",
  usage: "private",
  region: "nairobi", driverAge: "", claims3yr: "0", ncd: "none",
  alarm: "true", tracker: false, windscreen: false,
  planType: "individual", age: "", spouseAge: "", children: "0",
  plan: "plus",
  premiumMode: "annual",
  maternity: false, dental: false, outpatient: true,
  fullName: "", phone: "", email: "", notes: "", consent: false,
};

const STEP_LABELS = ["1 · Product", "2 · Details", "3 · Risk", "4 · Contact", "5 · Quote"];

function Field({
  label, required, hint, error, children, span,
}: {
  label: string; required?: boolean; hint?: string; error?: string;
  children: React.ReactNode; span?: boolean;
}) {
  return (
    <div className={`field ${span ? "span-2" : ""} ${error ? "show-err" : ""}`}>
      <label>
        {label} {required && <span className="req">*</span>}{" "}
        {hint && <span className="hint">({hint})</span>}
      </label>
      {children}
      {error && <span className="err">{error}</span>}
    </div>
  );
}

export default function Quote() {
  const [params] = useSearchParams();
  const lobParam = params.get("lob");
  const coverParam = params.get("cover");

  const [step, setStep] = useState(1);
  const [lob, setLob] = useState<Lob>(lobParam === "health" ? "health" : "motor");
  const [form, setForm] = useState<FormState>(() => ({
    ...initial,
    coverType:
      coverParam === "tpft" || coverParam === "tpo" || coverParam === "comprehensive"
        ? coverParam
        : "comprehensive",
    usage: lobParam === "motor" && coverParam === undefined ? initial.usage : initial.usage,
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<QuoteRecord | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => (e[k as string] ? { ...e, [k as string]: false } : e));
  };

  const goTo = (n: number) => {
    setStep(n);
    setErrors({});
    requestAnimationFrame(() => {
      const top = cardRef.current?.offsetTop ?? 0;
      window.scrollTo({ top: Math.max(top - 120, 0), behavior: "smooth" });
    });
  };

  const validate = (s: number): boolean => {
    const e: Errors = {};
    if (s === 2 && lob === "motor") {
      if (!form.make) e.make = true;
      if (!form.model.trim()) e.model = true;
      if (!form.year) e.year = true;
      const v = Number(form.value);
      if (!form.value || v < 50000) e.value = true;
      const cc = Number(form.cc);
      if (!form.cc || cc < 500 || cc > 8000) e.cc = true;
    }
    if (s === 2 && lob === "health") {
      const a = Number(form.age);
      if (!form.age || a < 18 || a > 99) e.age = true;
    }
    if (s === 3 && lob === "motor") {
      const d = Number(form.driverAge);
      if (!form.driverAge || d < 18 || d > 90) e.driverAge = true;
    }
    if (s === 4) {
      if (!form.fullName.trim()) e.fullName = true;
      if (!PHONE_RE.test(normalizePhone(form.phone))) e.phone = true;
      if (!EMAIL_RE.test(form.email.trim())) e.email = true;
      if (!form.consent) e.consent = true;
    }
    setErrors(e);
    if (Object.keys(e).length > 0) {
      requestAnimationFrame(() => {
        document.querySelector(".field.show-err")?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return false;
    }
    return true;
  };

  const next = () => {
    if (validate(step)) goTo(step + 1);
  };

  const finish = () => {
    if (!validate(4)) return;
    const pricing: Pricing =
      lob === "motor"
        ? motor({
            coverType: form.coverType,
            value: Number(form.value) || 0,
            year: Number(form.year) || 2020,
            cc: Number(form.cc) || 1500,
            usage: form.usage,
            region: form.region,
            ncd: form.ncd as "none" | "one" | "two" | "three",
            driverAge: Number(form.driverAge) || 30,
            alarm: form.alarm === "true",
            tracker: form.tracker,
            windscreen: form.windscreen,
            claims3yr: Number(form.claims3yr) || 0,
          })
        : health({
            age: Number(form.age) || 30,
            spouseAge: form.spouseAge ? Number(form.spouseAge) : null,
            children: Number(form.children) || 0,
            plan: form.plan,
            planType: form.planType,
            maternity: form.maternity,
            dental: form.dental,
            outpatient: form.outpatient,
            premiumMode: form.premiumMode,
          });

    const rec: QuoteRecord = {
      ref: makeRef(),
      lob,
      planType: form.planType,
      data: { ...form },
      pricing,
      issued: new Date().toISOString(),
      expires: expiry(QUOTE_DAYS).toISOString(),
      status: "active",
      customer: { name: form.fullName, phone: form.phone, email: form.email },
    };
    saveQuote(rec);
    setResult(rec);
    setEmailSent(false);
    goTo(5);
  };

  const restart = () => {
    setForm({ ...initial, coverType: form.coverType });
    setResult(null);
    goTo(1);
  };

  const summary = useMemo(() => {
    if (lob === "motor") {
      const product = form.usage === "commercial" ? "Motor — Commercial" : "Motor — Private";
      const cover =
        form.coverType === "comprehensive" ? "Comprehensive" : form.coverType === "tpft" ? "TP Fire & Theft" : "Third Party Only";
      const bits: string[] = [];
      if (form.make) bits.push(`${form.make} ${form.model}`.trim());
      if (form.value) bits.push(`KES ${Number(form.value).toLocaleString()}`);
      return { product, cover, risk: bits.length ? bits.join(" · ") : "—" };
    }
    const product =
      "Health — " + (form.planType === "senior" ? "Senior" : form.planType.charAt(0).toUpperCase() + form.planType.slice(1));
    const cover = form.plan.charAt(0).toUpperCase() + form.plan.slice(1) + " plan";
    const hb: string[] = [];
    if (form.age) hb.push(`age ${form.age}`);
    if (form.planType === "family" && form.children && form.children !== "0") hb.push(`${form.children} children`);
    return { product, cover, risk: hb.length ? hb.join(" · ") : "—" };
  }, [form, lob]);

  const lobTiles: { value: Lob; usage?: "commercial"; icon: string; title: string; sub: string }[] = [
    { value: "motor", icon: "🚗", title: "Motor — Private", sub: "Comprehensive, TPFT or third party for a personal-use vehicle." },
    { value: "motor", usage: "commercial", icon: "🚚", title: "Motor — Commercial", sub: "Business use: pickups, vans, lorries and fleet from 3 units." },
    { value: "health", icon: "🩺", title: "Health — Individual / Family", sub: "Medical scheme for you, spouse and children." },
    { value: "health", icon: "👴", title: "Health — Senior", sub: "Cover for members aged 60 and above." },
  ];

  const selectedTile = lob === "health" ? (form.planType === "senior" ? 3 : 2) : form.usage === "commercial" ? 1 : 0;

  return (
    <>
      <section className="grad-royal py-12 text-white">
        <div className="container-x">
          <div className="mb-3 text-sm text-white/70">
            <Link to="/" className="text-white/70 hover:text-white">Home</Link> / Get a Quote
          </div>
          <h1 className="mb-3 text-[clamp(1.9rem,4vw,2.8rem)] text-white">Your instant quotation</h1>
          <p className="max-w-2xl text-white/80">
            Four short steps. Full premium breakdown — base rate, loadings, discounts, taxes. Indicative only; a named
            broker confirms final terms.
          </p>
        </div>
      </section>

      <section className="bg-royal-mist py-10">
        <div className="container-x quote-layout">
          <div ref={cardRef}>
            <div className="wizard-progress">
              {STEP_LABELS.map((l, i) => (
                <div key={l} className={`wp-step ${step === i + 1 ? "active" : step > i + 1 ? "done" : ""}`}>
                  {l}
                </div>
              ))}
            </div>

            <div className="wizard-card">
              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h2>What would you like to insure?</h2>
                  <p className="step-sub">Choose a line of business. You can change this later.</p>
                  <div className="tile-grid">
                    {lobTiles.map((t, i) => (
                      <label key={t.title} className="radio-tile">
                        <input
                          type="radio"
                          checked={selectedTile === i}
                          onChange={() => {
                            setLob(t.value);
                            if (t.usage) set("usage", t.usage);
                            else if (t.value === "motor") set("usage", "private");
                            if (t.value === "health" && i === 3) set("planType", "senior");
                            else if (t.value === "health") set("planType", "individual");
                          }}
                        />
                        <span className="rt-icon">{t.icon}</span>
                        <b>{t.title}</b>
                        <span>{t.sub}</span>
                      </label>
                    ))}
                  </div>
                  <div className="wizard-nav">
                    <span className="step-count">Step 1 of 5</span>
                    <button className="btn btn-primary" onClick={next}>Continue →</button>
                  </div>
                </div>
              )}

              {/* STEP 2 motor */}
              {step === 2 && lob === "motor" && (
                <div>
                  <h2>Vehicle details</h2>
                  <p className="step-sub">These drive your rating — use the logbook values where possible.</p>
                  <div className="form-grid">
                    <Field label="Make" required error={errors.make ? "Please select the vehicle make." : undefined}>
                      <select value={form.make} onChange={(e) => set("make", e.target.value)}>
                        <option value="">Select make…</option>
                        {MAKES.map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </Field>
                    <Field label="Model" required error={errors.model ? "Please enter the model." : undefined}>
                      <input
                        type="text" placeholder="e.g. Axio, Forester, Hilux"
                        value={form.model} onChange={(e) => set("model", e.target.value)}
                      />
                    </Field>
                    <Field label="Year of manufacture" required error={errors.year ? "Please select the year." : undefined}>
                      <select value={form.year} onChange={(e) => set("year", e.target.value)}>
                        <option value="">Select year…</option>
                        {YEARS.map((y) => <option key={y}>{y}</option>)}
                      </select>
                    </Field>
                    <Field
                      label="Estimated value (KES)" required hint="logbook / market value"
                      error={errors.value ? "Enter a value of at least KES 50,000." : undefined}
                    >
                      <input
                        type="number" min={50000} step={1000} placeholder="e.g. 850000"
                        value={form.value} onChange={(e) => set("value", e.target.value)}
                      />
                    </Field>
                    <Field
                      label="Engine capacity (CC)" required
                      error={errors.cc ? "Enter engine size in CC." : undefined}
                    >
                      <input
                        type="number" min={500} max={8000} placeholder="e.g. 1500"
                        value={form.cc} onChange={(e) => set("cc", e.target.value)}
                      />
                    </Field>
                    <Field label="Registration no." hint="optional">
                      <input
                        type="text" placeholder="e.g. KDA 123A"
                        value={form.reg} onChange={(e) => set("reg", e.target.value)}
                      />
                    </Field>
                    <Field label="Cover required" required span>
                      <div className="opt-row">
                        {([
                          ["comprehensive", "Comprehensive", ""],
                          ["tpft", "Third Party, Fire & Theft", ""],
                          ["tpo", "Third Party Only", "maroon"],
                        ] as const).map(([v, l, cls]) => (
                          <label key={v} className={`opt-chip ${cls}`}>
                            <input
                              type="radio" checked={form.coverType === v}
                              onChange={() => set("coverType", v)}
                            />
                            <span>{l}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                  </div>
                  <div className="wizard-nav">
                    <button className="btn btn-outline" onClick={() => goTo(1)}>← Back</button>
                    <span className="step-count">Step 2 of 5</span>
                    <button className="btn btn-primary" onClick={next}>Continue →</button>
                  </div>
                </div>
              )}

              {/* STEP 2 health */}
              {step === 2 && lob === "health" && (
                <div>
                  <h2>Member details</h2>
                  <p className="step-sub">Premiums are rated by age band and plan tier.</p>
                  <div className="form-grid">
                    <Field label="Plan type" required span>
                      <div className="opt-row">
                        {([
                          ["individual", "Individual", ""],
                          ["family", "Family", ""],
                          ["senior", "Senior (60+)", "maroon"],
                        ] as const).map(([v, l, cls]) => (
                          <label key={v} className={`opt-chip ${cls}`}>
                            <input
                              type="radio" checked={form.planType === v}
                              onChange={() => set("planType", v)}
                            />
                            <span>{l}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                    <Field
                      label="Principal age" required
                      error={errors.age ? "Enter an age between 18 and 99." : undefined}
                    >
                      <input
                        type="number" min={18} max={99} placeholder="e.g. 34"
                        value={form.age} onChange={(e) => set("age", e.target.value)}
                      />
                    </Field>
                    {(form.planType === "family" || form.planType === "senior") && (
                      <Field label="Spouse age" hint="if applicable">
                        <input
                          type="number" min={18} max={99} placeholder="e.g. 36"
                          value={form.spouseAge} onChange={(e) => set("spouseAge", e.target.value)}
                        />
                      </Field>
                    )}
                    {form.planType === "family" && (
                      <Field label="Number of children" hint="under 18">
                        <select value={form.children} onChange={(e) => set("children", e.target.value)}>
                          {["0", "1", "2", "3", "4", "5", "6"].map((n) => (
                            <option key={n} value={n}>{n === "0" ? "None" : n}</option>
                          ))}
                        </select>
                      </Field>
                    )}
                    <Field label="Plan tier" required span>
                      <div className="tile-grid three mt-1">
                        {([
                          ["essential", "🥉", "Essential", "Inpatient core cover · budget friendly"],
                          ["plus", "🥈", "Plus", "Inpatient + outpatient · most popular"],
                          ["premier", "👑", "Premier", "Wider limits · private wing · dental"],
                        ] as const).map(([v, ic, t, s]) => (
                          <label key={v} className="radio-tile">
                            <input
                              type="radio" checked={form.plan === v}
                              onChange={() => set("plan", v)}
                            />
                            <span className="rt-icon">{ic}</span>
                            <b>{t}</b>
                            <span>{s}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                  </div>
                  <div className="wizard-nav">
                    <button className="btn btn-outline" onClick={() => goTo(1)}>← Back</button>
                    <span className="step-count">Step 2 of 5</span>
                    <button className="btn btn-primary" onClick={next}>Continue →</button>
                  </div>
                </div>
              )}

              {/* STEP 3 motor */}
              {step === 3 && lob === "motor" && (
                <div>
                  <h2>Risk profile</h2>
                  <p className="step-sub">
                    These factors adjust your premium — answer honestly; they protect you at claim time.
                  </p>
                  <div className="form-grid">
                    <Field label="Usage" required>
                      <select value={form.usage} onChange={(e) => set("usage", e.target.value as "private" | "commercial")}>
                        <option value="private">Private / social</option>
                        <option value="commercial">Commercial / business</option>
                      </select>
                    </Field>
                    <Field label="Region of registration" required>
                      <select value={form.region} onChange={(e) => set("region", e.target.value)}>
                        <option value="nairobi">Nairobi / Central</option>
                        <option value="rift">Rift Valley</option>
                        <option value="western">Western / Nyanza</option>
                        <option value="coast">Coast</option>
                        <option value="eastern">Eastern / North Eastern</option>
                      </select>
                    </Field>
                    <Field
                      label="Driver age" required
                      error={errors.driverAge ? "Enter the principal driver's age." : undefined}
                    >
                      <input
                        type="number" min={18} max={90} placeholder="e.g. 32"
                        value={form.driverAge} onChange={(e) => set("driverAge", e.target.value)}
                      />
                    </Field>
                    <Field label="Claims in last 3 years" required>
                      <select value={form.claims3yr} onChange={(e) => set("claims3yr", e.target.value)}>
                        <option value="0">None</option>
                        <option value="1">1 claim</option>
                        <option value="2">2 claims</option>
                        <option value="3">3 or more</option>
                      </select>
                    </Field>
                    <Field label="No-claims discount earned" required>
                      <select value={form.ncd} onChange={(e) => set("ncd", e.target.value as FormState["ncd"])}>
                        <option value="none">No discount yet</option>
                        <option value="one">1 year claim-free — 10%</option>
                        <option value="two">2 years claim-free — 17.5%</option>
                        <option value="three">3+ years claim-free — 25%</option>
                      </select>
                    </Field>
                    <Field label="Anti-theft" required>
                      <div className="opt-row">
                        <label className="opt-chip">
                          <input
                            type="radio" checked={form.alarm === "true"}
                            onChange={() => set("alarm", "true")}
                          />
                          <span>Alarm / immobiliser</span>
                        </label>
                        <label className="opt-chip maroon">
                          <input
                            type="radio" checked={form.alarm === "false"}
                            onChange={() => set("alarm", "false")}
                          />
                          <span>None</span>
                        </label>
                      </div>
                    </Field>
                    <Field label="Optional benefits" span>
                      <div className="addon-list">
                        <label className="addon">
                          <input
                            type="checkbox" checked={form.tracker}
                            onChange={(e) => set("tracker", e.target.checked)}
                          />
                          <span className="ad-text">
                            <b>GPS tracker / telematics</b>
                            <span>Approved device fitted — earns a 5% discount</span>
                          </span>
                          <span className="ad-price text-success">−5%</span>
                        </label>
                        <label className="addon">
                          <input
                            type="checkbox" checked={form.windscreen}
                            onChange={(e) => set("windscreen", e.target.checked)}
                          />
                          <span className="ad-text">
                            <b>Extended windscreen cover</b>
                            <span>Full replacement, no deduction from own damage</span>
                          </span>
                          <span className="ad-price">+0.15%</span>
                        </label>
                      </div>
                    </Field>
                  </div>
                  <div className="wizard-nav">
                    <button className="btn btn-outline" onClick={() => goTo(2)}>← Back</button>
                    <span className="step-count">Step 3 of 5</span>
                    <button className="btn btn-primary" onClick={next}>Continue →</button>
                  </div>
                </div>
              )}

              {/* STEP 3 health */}
              {step === 3 && lob === "health" && (
                <div>
                  <h2>Cover preferences</h2>
                  <p className="step-sub">Optional extensions are priced as a percentage of your base rate.</p>
                  <div className="form-grid">
                    <Field label="Payment frequency" required span>
                      <div className="opt-row">
                        <label className="opt-chip">
                          <input
                            type="radio" checked={form.premiumMode === "annual"}
                            onChange={() => set("premiumMode", "annual")}
                          />
                          <span>Annual (best price)</span>
                        </label>
                        <label className="opt-chip maroon">
                          <input
                            type="radio" checked={form.premiumMode === "monthly"}
                            onChange={() => set("premiumMode", "monthly")}
                          />
                          <span>Monthly (+4%)</span>
                        </label>
                      </div>
                    </Field>
                    <Field label="Extensions" span>
                      <div className="addon-list">
                        <label className="addon">
                          <input
                            type="checkbox" checked={form.maternity}
                            onChange={(e) => set("maternity", e.target.checked)}
                          />
                          <span className="ad-text">
                            <b>Maternity extension</b>
                            <span>Antenatal, delivery and postnatal benefit</span>
                          </span>
                          <span className="ad-price">+18%</span>
                        </label>
                        <label className="addon">
                          <input
                            type="checkbox" checked={form.dental}
                            onChange={(e) => set("dental", e.target.checked)}
                          />
                          <span className="ad-text">
                            <b>Dental & optical</b>
                            <span>Check-ups, fillings, frames and lenses</span>
                          </span>
                          <span className="ad-price">+5%</span>
                        </label>
                        <label className="addon">
                          <input
                            type="checkbox" checked={form.outpatient}
                            onChange={(e) => set("outpatient", e.target.checked)}
                          />
                          <span className="ad-text">
                            <b>Outpatient benefit</b>
                            <span>Consultations, pharmacy and lab (Essential tier credit applies if off)</span>
                          </span>
                          <span className="ad-price">included</span>
                        </label>
                      </div>
                    </Field>
                  </div>
                  <div className="wizard-nav">
                    <button className="btn btn-outline" onClick={() => goTo(2)}>← Back</button>
                    <span className="step-count">Step 3 of 5</span>
                    <button className="btn btn-primary" onClick={next}>Continue →</button>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div>
                  <h2>Where should we send it?</h2>
                  <p className="step-sub">
                    Your quotation is saved to My Quotes. We'll only call about this quote.
                  </p>
                  <div className="form-grid">
                    <Field
                      label="Full name" required
                      error={errors.fullName ? "Please enter your name." : undefined}
                    >
                      <input
                        type="text" placeholder="e.g. Amina Wanjiku"
                        value={form.fullName} onChange={(e) => set("fullName", e.target.value)}
                      />
                    </Field>
                    <Field
                      label="Phone" required
                      error={errors.phone ? "Enter a valid Kenyan phone number." : undefined}
                    >
                      <input
                        type="tel" placeholder="e.g. 0712 345 678"
                        value={form.phone} onChange={(e) => set("phone", e.target.value)}
                      />
                    </Field>
                    <Field
                      label="Email" required span
                      error={errors.email ? "Enter a valid email address." : undefined}
                    >
                      <input
                        type="email" placeholder="you@example.com"
                        value={form.email} onChange={(e) => set("email", e.target.value)}
                      />
                    </Field>
                    <Field label="Anything we should know?" hint="optional" span>
                      <textarea
                        rows={3}
                        placeholder="e.g. vehicle is on a hire purchase, occupation, preferred insurer…"
                        value={form.notes} onChange={(e) => set("notes", e.target.value)}
                      />
                    </Field>
                    <div className={`field span-2 ${errors.consent ? "show-err" : ""}`}>
                      <label className="addon cursor-pointer">
                        <input
                          type="checkbox" checked={form.consent}
                          onChange={(e) => set("consent", e.target.checked)}
                        />
                        <span className="ad-text">
                          <span className="text-[0.88rem] text-ink2">
                            I agree to the <Link to="/terms" target="_blank" className="text-royal">Terms & Conditions</Link>{" "}
                            and consent to being contacted about this quotation. <span className="req">*</span>
                          </span>
                        </span>
                      </label>
                      {errors.consent && <span className="err">You must accept the terms to continue.</span>}
                    </div>
                  </div>
                  <div className="wizard-nav">
                    <button className="btn btn-outline" onClick={() => goTo(3)}>← Back</button>
                    <span className="step-count">Step 4 of 5</span>
                    <button className="btn btn-maroon" onClick={finish}>Calculate my premium ⚡</button>
                  </div>
                </div>
              )}

              {/* STEP 5 result */}
              {step === 5 && result && <Result rec={result} emailSent={emailSent} onEmail={() => setEmailSent(true)} onRestart={restart} />}
            </div>
          </div>

          <aside className="quote-side">
            <div className="side-card">
              <h3>Live summary</h3>
              <div>
                <div className="sum-row"><span className="k">Product</span><span className="v">{summary.product}</span></div>
                <div className="sum-row"><span className="k">Cover</span><span className="v">{summary.cover}</span></div>
                <div className="sum-row"><span className="k">Risk</span><span className="v">{summary.risk}</span></div>
              </div>
              {result && (
                <div className="premium-hero mt-4">
                  <div className="ph-label">Estimated annual premium</div>
                  <div className="ph-amount">KES {Math.round(result.pricing.total).toLocaleString()}</div>
                  <div className="ph-sub">incl. IPT, levies & stamp duty</div>
                </div>
              )}
            </div>
            <div className="side-card">
              <h3>What you get</h3>
              <p className="side-note">
                <b>Full breakdown</b> — every loading and discount, line by line.
                <br /><br />
                <b>30-day validity</b> — save now, decide later.
                <br /><br />
                <b>Broker review</b> — a licensed broker confirms terms before you bind.
                <br /><br />
                <b>No card required</b> — this is a quotation, not a payment.
              </p>
            </div>
            <div className="side-card border-[#d5ddf8] bg-royal-mist">
              <h3 className="mb-2 border-none p-0">Need help?</h3>
              <p className="side-note">
                Call <b>+254 700 000 000</b> or WhatsApp us — a broker answers, 8am–6pm EAT.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Result({
  rec, emailSent, onEmail, onRestart,
}: {
  rec: QuoteRecord; emailSent: boolean; onEmail: () => void; onRestart: () => void;
}) {
  const p = rec.pricing;
  const d = rec.data as unknown as FormState;
  const isMotor = rec.lob === "motor";
  const { product: productLabel, cover: coverLabel, risk: riskLabel, extras } = quoteLabels(rec);

  return (
    <div>
      <div className="result-banner">
        <span className="rb-icon">✓</span>
        <span>
          <b>Your quotation is ready — {rec.ref}</b>
          <span>
            Indicative premium, valid until {fmtDate(rec.expires)}. A named broker will confirm final terms.
          </span>
        </span>
      </div>

      <div className="quote-doc-head">
        <div className="qd-brand">
          <LogoFull className="h-12" />
          <div>
            <b className="text-ink">Quotation {rec.ref}</b>
            <br />
            <span className="text-[0.85rem] text-muted">IRA Licence IB/2026/0148</span>
          </div>
        </div>
        <div className="qd-meta">
          <b>{productLabel}</b>
          <br />
          Issued {fmtDate(rec.issued)}
          <br />
          Valid until {fmtDate(rec.expires)}
          <br />
          {rec.customer.name}
        </div>
      </div>

      <div className="breakdown-grid">
        <div>
          <table className="cover-table">
            <thead>
              <tr><th>Premium breakdown</th><th>Amount</th></tr>
            </thead>
            <tbody>
              {p.lines.map((l, i) => {
                const neg = (l.amount ?? 0) < 0 || l.isDiscount;
                return (
                  <tr key={i} className={neg ? "neg" : ""}>
                    <td>{l.label}</td>
                    <td>
                      {neg ? "−" : ""}KES {money(Math.abs(l.amount))}
                    </td>
                  </tr>
                );
              })}
              <tr className="grand">
                <td>Total annual premium</td>
                <td>KES {money(p.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="premium-hero mb-4">
            <div className="ph-label">Annual premium payable</div>
            <div className="ph-amount">KES {Math.round(p.total).toLocaleString()}</div>
            <div className="ph-sub">
              {d.premiumMode === "monthly" && !isMotor
                ? `or ~KES ${Math.round(p.total / 12).toLocaleString()}/month`
                : "one annual payment"}
            </div>
          </div>
          <div className="decl-box">
            <b>{coverLabel} — risk summary</b>
            {riskLabel}
            {extras.length > 0 && (
              <ul className="mt-2.5 list-inside list-disc pl-0">
                {extras.map((x) => <li key={x}>{x}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="decl-box mt-5">
        <b>Declaration & disclosure</b>
        This is an indicative quotation generated by Royal Shield Brokers' rating engine using the information supplied.
        It is not a contract of insurance. Final premium is subject to underwriter acceptance, verification of the risk
        and satisfactory valuation (comprehensive motor). Please review all answers — incorrect disclosure may void a
        claim. Cover is placed only after proposal acceptance and receipt of premium.
      </div>

      <div className="result-actions">
        <button className="btn btn-primary" onClick={() => downloadQuote(rec)}>
          ⬇ Download quote
        </button>
        <button className="btn btn-outline" onClick={() => window.print()}>
          🖨 Print
        </button>
        <Link to="/dashboard" className="btn btn-maroon">View in My Quotes</Link>
        <button className="btn btn-outline" onClick={onEmail} disabled={emailSent}>
          {emailSent ? `✓ Sent to ${rec.customer.email || "your inbox"}` : "✉ Email me this quote"}
        </button>
        <button className="btn btn-outline" onClick={onRestart}>Start another quote</button>
        <p className="mb-0 w-full text-[0.8rem] text-muted">
          The download is a single self-contained file — keep it, or open it and press Ctrl&nbsp;+&nbsp;P
          to save a PDF.
        </p>
      </div>
    </div>
  );
}
