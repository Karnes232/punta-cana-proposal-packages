import { Link } from "@/i18n/navigation";

interface FaqContactStripCTAProps {
  label: string;
}

export default function FaqContactStripCTA({ label }: FaqContactStripCTAProps) {
  return (
    <Link
      href="/contact"
      className="
        inline-flex items-center gap-3
        text-[11.5px] font-body font-medium tracking-[0.18em] uppercase
        text-white border border-gold
        px-10 py-4 mt-2
        transition-all duration-300
        hover:bg-gold hover:text-black
        hover:shadow-[0_0_30px_rgba(207,174,112,0.15)]
        group
      "
    >
      {label}
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
  );
}
