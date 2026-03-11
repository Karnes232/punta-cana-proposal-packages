// Server Component

import Link from "next/link";

interface HowItWorksCTAProps {
  label?: string;
  href?: string;
}

export default function HowItWorksCTA({
  label = "Learn More",
  href = "/how-it-works",
}: HowItWorksCTAProps) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className="
          inline-flex items-center gap-2.5
          border border-black/20 text-black/60
          text-[11px] font-medium tracking-[0.18em] uppercase
          px-8 py-3.5
          transition-all duration-300
          hover:border-gold hover:text-black hover:bg-gold/60
          group
        "
      >
        {label}
        <svg
          width="13"
          height="13"
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
    </div>
  );
}
