export function LogoFull({ className = "h-11" }: { className?: string }) {
  return (
    <img
      src="/images/lipa-insurance-logo.jpeg"
      alt="Lipa Insurance — Protect. Secure. Grow."
      className={`lipa-logo ${className}`}
    />
  );
}
