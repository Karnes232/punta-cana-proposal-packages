import { Link } from "@/i18n/navigation";

interface ContactFormSuccessProps {
  heading: string;
  body: string;
  cta: string;
}

export default function ContactFormSuccess({
  heading,
  body,
  cta,
}: ContactFormSuccessProps) {
  return (
    <div className="flex flex-col items-start gap-6 py-10 animate-[fadeSlideUp_0.6s_ease_forwards]">
      {/* Gold check ornament */}
      <div
        className="w-12 h-12 flex items-center justify-center border border-gold/50"
        aria-hidden="true"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CFAE70"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Diamond divider */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="block w-8 h-px bg-gold/40" />
        <span className="block w-1 h-1 rotate-45 bg-gold/60" />
        <span className="block w-8 h-px bg-gold/40" />
      </div>

      <h3 className="font-display font-normal italic text-[clamp(28px,3.5vw,40px)] text-black leading-tight">
        {heading}
      </h3>

      <p className="font-body font-light text-[15px] text-gray leading-[1.85] max-w-sm">
        {body}
      </p>

      <Link
        href="/"
        className="
          inline-flex items-center gap-3 mt-2
          text-[11px] font-body font-medium tracking-[0.18em] uppercase
          text-black border border-gold
          px-8 py-3.5
          transition-all duration-300
          hover:bg-gold hover:text-black
          group
        "
      >
        {cta}
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
