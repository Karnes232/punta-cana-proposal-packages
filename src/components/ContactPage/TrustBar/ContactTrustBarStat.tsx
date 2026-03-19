interface ContactTrustBarStatProps {
  value: string;
  label: string;
}

export default function ContactTrustBarStat({
  value,
  label,
}: ContactTrustBarStatProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      {/* Value — large italic display, gold */}
      <p className="font-display italic font-normal text-gold leading-none text-[clamp(32px,4vw,52px)]">
        {value}
      </p>
      {/* Label — matches FeaturedStoryMeta location/date style */}
      <p className="text-[11px] font-light tracking-[0.18em] uppercase text-white/40">
        {label}
      </p>
    </div>
  );
}
