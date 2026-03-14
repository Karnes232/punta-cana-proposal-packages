import { Link } from "@/i18n/navigation"; // your navigation.ts

interface HeroCTAProps {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function HeroCTA({
  primaryLabel = "View Packages",
  primaryHref = "/classic-proposals",
  secondaryLabel = "Our Stories",
  secondaryHref = "/stories",
}: HeroCTAProps) {
  return (
    <div
      className="
        flex flex-col sm:flex-row items-center justify-center gap-4
        animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:800ms]
      "
    >
      {/* Primary CTA — gold fill */}
      <Link
        href={primaryHref}
        className="
          inline-flex items-center gap-2.5
          bg-gold text-black
          text-[11.5px] font-medium tracking-[0.18em] uppercase
          px-8 py-4
          transition-all duration-300
          hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(207,174,112,0.25)]
          group
        "
      >
        {primaryLabel}
        {/* Arrow */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>

      {/* Secondary CTA — ghost / outline */}
      <Link
        href={secondaryHref}
        className="
          inline-flex items-center gap-2
          border border-white/25 text-white/70
          text-[11.5px] font-light tracking-[0.18em] uppercase
          px-8 py-4
          transition-all duration-300
          hover:border-gold/50 hover:text-gold
        "
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}
