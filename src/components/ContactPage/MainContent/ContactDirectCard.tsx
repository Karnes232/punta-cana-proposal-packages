import { ReactNode } from "react";

interface ContactDirectCardProps {
  label: string;
  sub: string;
  href: string;
  icon: ReactNode;
}

export default function ContactDirectCard({
  label,
  sub,
  href,
  icon,
}: ContactDirectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex items-center gap-4
        border border-gold/25 bg-white
        px-5 py-4
        transition-all duration-300
        hover:border-gold/60 hover:bg-[#FDFCF9]
      "
    >
      {/* Icon circle */}
      <div
        className="
          flex-shrink-0 w-10 h-10
          flex items-center justify-center
          border border-gold/30 bg-gold/5
          transition-colors duration-300
          group-hover:border-gold group-hover:bg-gold/10
        "
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[11px] font-body font-medium tracking-[0.14em] uppercase text-black/50">
          {sub}
        </span>
        <span className="font-body font-light text-[15px] text-black truncate transition-colors duration-300 group-hover:text-gold">
          {label}
        </span>
      </div>

      {/* Arrow */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#CFAE70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-auto flex-shrink-0 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </a>
  );
}
