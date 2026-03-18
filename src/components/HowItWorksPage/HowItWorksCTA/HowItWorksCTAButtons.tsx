import { Link } from "@/i18n/navigation";

interface HowItWorksCTAButtonsProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export default function HowItWorksCTAButtons({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HowItWorksCTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
      {/* Primary — dark fill with gold border, inverts on hover */}
      <Link
        href={primaryHref}
        className="
          group inline-flex items-center gap-3
          px-10 py-4
          border border-gold/70 bg-transparent
          text-[11px] font-light tracking-[0.22em] uppercase text-gold
          transition-all duration-300
          hover:bg-gold hover:text-[#0B0B0C] hover:border-gold
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60
        "
      >
        {primaryLabel}
        {/* Arrow that slides right on hover */}
        <svg
          viewBox="0 0 16 10"
          fill="none"
          className="w-4 h-2.5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M1 5h14M10 1l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* Secondary — ghost, subtle */}
      <Link
        href={secondaryHref}
        className="
          inline-flex items-center gap-2
          px-10 py-4
          border border-white/15 bg-transparent
          text-[11px] font-light tracking-[0.22em] uppercase text-white/40
          transition-all duration-300
          hover:border-white/30 hover:text-white/70
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20
        "
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}
