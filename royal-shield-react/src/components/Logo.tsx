export function LogoFull({ className = "h-11" }: { className?: string }) {
  return (
    <span className={`logo-lockup ${className}`} role="img" aria-label="Royal Shield Insurance Agency">
      <img src="/images/royal-shield-crest.jpeg" alt="" className="logo-lockup-image" />
      <span className="logo-lockup-type">
        <b>Royal Shield</b>
        <small>INSURANCE AGENCY</small>
      </span>
    </span>
  );
}
