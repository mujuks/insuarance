export function LogoFull({ className = "h-11" }: { className?: string }) {
  return <img src="/images/logo-full.svg" alt="Royal Shield Brokers" className={className} />;
}

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return <img src="/images/logo-mark.svg" alt="" className={className} />;
}
