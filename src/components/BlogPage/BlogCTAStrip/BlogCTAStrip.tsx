import { Link } from "@/i18n/navigation";

interface BlogCTAStripProps {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function BlogCTAStrip({
  eyebrow,
  heading,
  headingAccent,
  subheading,
  ctaLabel,
  ctaHref,
}: BlogCTAStripProps) {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Top fade from ivory into black */}
      <div
        className="absolute inset-x-0 top-0 h-16 pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial gold bloom */}
      <div
        className="absolute inset-x-0 bottom-0 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(207,174,112,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Gold corner accents */}
      <div
        className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-gold/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-gold/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-24 md:py-32 text-center max-w-[720px] mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
          <p className="text-[10.5px] font-body font-light tracking-[0.28em] uppercase text-gold/80">
            {eyebrow}
          </p>
          <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h2 className="font-display font-normal text-[clamp(40px,5.5vw,72px)] leading-[1.08] tracking-tight">
          <span className="block text-white">{heading}</span>
          <span className="block italic text-gold">{headingAccent}</span>
        </h2>

        {/* Divider */}
        <div
          className="flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="block w-12 h-px bg-gold/30" />
          <span className="block w-1 h-1 rotate-45 bg-gold/50" />
          <span className="block w-12 h-px bg-gold/30" />
        </div>

        {/* Subheading */}
        <p className="font-body font-light text-white/55 leading-[1.85] text-[clamp(14px,1.5vw,17px)] max-w-[460px]">
          {subheading}
        </p>

        {/* CTA */}
        <Link
          href={ctaHref}
          className="
            inline-flex items-center gap-3
            bg-gold text-black
            text-[11.5px] font-body font-medium tracking-[0.18em] uppercase
            px-10 py-4 mt-2
            transition-all duration-300
            hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(207,174,112,0.2)]
            group
          "
        >
          {ctaLabel}
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
      </div>
    </section>
  );
}
