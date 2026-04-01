interface PackageHeroPriceProps {
  price: number;
  label: string;
}

export default function PackageHeroPrice({
  price,
  label,
}: PackageHeroPriceProps) {
  return (
    <div className="flex items-center gap-3 animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:700ms]">
      <span className="text-[11px] font-light tracking-[0.14em] uppercase text-white/40">
        {label}
      </span>
      <span className="text-[22px] font-medium text-gold tabular-nums leading-tight">
        ${price.toLocaleString()}
      </span>
    </div>
  );
}
