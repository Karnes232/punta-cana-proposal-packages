interface ContactLocationCardProps {
  label: string;
  city: string;
  detail: string;
  mapsLink: string;
}

export default function ContactLocationCard({
  label,
  city,
  detail,
  mapsLink,
}: ContactLocationCardProps) {
  return (
    <div className="border border-gold/25 bg-white px-5 py-5 flex flex-col gap-4">
      {/* Label */}
      <p className="text-[10.5px] font-body font-medium tracking-[0.14em] uppercase text-black/50">
        {label}
      </p>

      {/* Pin icon + city */}
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center border border-gold/30 bg-gold/5"
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#CFAE70"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-display font-normal text-[16px] text-black leading-snug">
            {city}
          </span>
          <p className="font-body font-light text-[13px] text-gray leading-relaxed">
            {detail}
          </p>
        </div>
      </div>

      {/* Gold rule */}
      <div className="h-px bg-gold/15" aria-hidden="true" />

      {/* Maps link */}
      <a
        href="https://maps.google.com/?q=Punta+Cana+Dominican+Republic"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-2
          text-[11px] font-body font-medium tracking-[0.14em] uppercase
          text-black/50 transition-colors duration-300
          hover:text-gold
          group
        "
      >
        {mapsLink}
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
    </div>
  );
}
