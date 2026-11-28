import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSession, signIn, signUp, clearSession } from "../lib/auth";
import { EMAIL_RE } from "../lib/format";
import { LogoFull } from "../components/Logo";

type Mode = "signin" | "signup" | "reset" | "signedin";

export default function Login() {
  const nav = useNavigate();
  const session = getSession();
  const [mode, setMode] = useState<Mode>(session ? "signedin" : "signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErr, setFieldErr] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (session && mode === "signin") setMode("signedin");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearAlerts = () => { setError(""); setSuccess(""); };

  const switchMode = () => {
    clearAlerts();
    setFieldErr({});
    if (mode === "signedin") {
      clearSession();
      setMode("signin");
      return;
    }
    setMode(mode === "signin" ? "signup" : "signin");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    clearAlerts();

    if (mode === "signedin") {
      nav("/dashboard");
      return;
    }

    const em = email.trim().toLowerCase();
    const emailOk = EMAIL_RE.test(em);
    setFieldErr({ email: !emailOk });
    if (!emailOk) return;

    if (mode === "reset") {
      setSuccess(`If an account exists for ${em}, a reset link has been sent. (Demo — no email was actually sent.)`);
      return;
    }

    const passOk = password.length >= 6;
    setFieldErr({ email: !emailOk, password: !passOk });
    if (!passOk) return;

    if (mode === "signup") {
      const nameOk = name.trim().length >= 2;
      setFieldErr({ email: !emailOk, password: !passOk, name: !nameOk });
      if (!nameOk) return;
      const r = signUp(name.trim(), em, password);
      if (!r.ok) {
        setError(r.error!);
        return;
      }
      setSuccess("Account created — redirecting to your quotations…");
      setTimeout(() => nav("/dashboard"), 900);
      return;
    }

    const r = signIn(em, password);
    if (!r.ok) {
      setError(r.error!);
      return;
    }
    setSuccess(`Welcome back, ${r.user!.name.split(" ")[0]} — redirecting…`);
    setTimeout(() => nav("/dashboard"), 800);
  };

  const titles: Record<Mode, [string, string, string]> = {
    signin: ["Sign in to your account", "Use your email and password to continue.", "Sign in"],
    signup: ["Create your account", "Save quotations and track your policies.", "Create account"],
    reset: ["Reset your password", "We'll email you a reset link (demo — no email is sent).", "Send reset link"],
    signedin: ["You're signed in", "Your quotations and policies are one click away.", "Go to My Quotes"],
  };
  const [title, sub, cta] = titles[mode];

  return (
    <div className="grid min-h-[calc(100vh-76px)] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="/images/login-side.jpg"
          alt="Insurance advisor at work"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-royal-deep/85 via-royal-deep/70 to-maroon/40" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <LogoFull className="h-12" />
          <div>
            <h2 className="mb-3 text-3xl text-white">Your cover, one dashboard.</h2>
            <p className="max-w-md text-white/85">
              Save quotations, track renewals and message your agency representative — all in one secure client portal.
            </p>
            <div className="mt-6 flex gap-6 text-sm text-white/70">
              <span>✓ 30-day quote validity</span>
              <span>✓ Full premium breakdown</span>
              <span>✓ Agency support</span>
            </div>
          </div>
          <p className="text-xs text-white/50">Lipa Insurance Agency</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-royal-mist px-5 py-14">
        <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-[0_4px_14px_rgba(27,31,59,.06)]">
          <div className="mb-6 lg:hidden">
            <LogoFull className="h-11" />
          </div>
          <h1 className="mb-1 text-2xl">{title}</h1>
          <p className="mb-6 text-[0.93rem] text-muted">{sub}</p>

          {error && (
            <div className="mb-4 rounded-xl border border-[#f3c1c1] bg-[#fdeeee] px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-xl border border-[#bfe5de] bg-[#e9f7f4] px-4 py-3 text-sm text-success">
              {success}
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-4" id="auth-form">
            {mode === "signup" && (
              <div className={`field ${fieldErr.name ? "show-err" : ""}`}>
                <label>Full name <span className="req">*</span></label>
                <input
                  name="name" type="text" placeholder="e.g. Amina Wanjiku"
                  value={name} onChange={(e) => setName(e.target.value)}
                />
                {fieldErr.name && <span className="err">Please enter your name.</span>}
              </div>
            )}

            {mode !== "signedin" && (
              <>
                <div className={`field ${fieldErr.email ? "show-err" : ""}`}>
                  <label>Email <span className="req">*</span></label>
                  <input
                    name="email" type="email" placeholder="you@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                  {fieldErr.email && <span className="err">Enter a valid email address.</span>}
                </div>
                {mode !== "reset" && (
                  <div className={`field ${fieldErr.password ? "show-err" : ""}`}>
                    <div className="flex justify-between">
                      <label>Password <span className="req">*</span></label>
                      {mode === "signin" && (
                        <button
                          type="button"
                          className="text-[0.8rem] font-semibold text-royal"
                          onClick={() => { clearAlerts(); setMode("reset"); }}
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <input
                      name="password" type="password" placeholder="••••••••"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    {fieldErr.password && <span className="err">Password must be at least 6 characters.</span>}
                  </div>
                )}
              </>
            )}

            <button type="submit" className="btn btn-maroon btn-block">{cta}</button>
          </form>

          <p className="mt-5 text-center text-[0.9rem] text-muted">
            {mode === "signedin" ? (
              <>
                Not {session?.name}?{" "}
                <button type="button" className="font-bold text-royal" onClick={switchMode}>
                  Sign out
                </button>
              </>
            ) : mode === "reset" ? (
              <>
                Remembered it?{" "}
                <button type="button" className="font-bold text-royal" onClick={() => setMode("signin")}>
                  Back to sign in
                </button>
              </>
            ) : mode === "signin" ? (
              <>
                New to Lipa Insurance?{" "}
                <button type="button" className="font-bold text-royal" onClick={switchMode}>
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" className="font-bold text-royal" onClick={switchMode}>
                  Sign in
                </button>
              </>
            )}
          </p>

          {mode === "signin" && (
            <p className="mt-4 rounded-xl bg-royal-mist px-4 py-2.5 text-center text-[0.8rem] text-muted">
              Demo: <b className="text-ink">demo@royalshield.co.ke</b> / <b className="text-ink">demo123</b>
            </p>
          )}

          <p className="mt-5 text-center text-xs">
            <Link to="/" className="text-muted hover:text-royal">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
