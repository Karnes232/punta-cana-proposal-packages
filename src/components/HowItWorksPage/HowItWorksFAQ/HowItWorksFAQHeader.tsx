interface HowItWorksFAQHeaderProps {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
}

export default function HowItWorksFAQHeader({
  eyebrow,
  heading,
  headingAccent,
  subheading,
}: HowItWorksFAQHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center mb-12">
      {/* Eyebrow */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="block w-8 h-px bg-gold/50" />
        <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/70">
          {eyebrow}
        </p>
        <span className="block w-8 h-px bg-gold/50" />
      </div>

      {/* Heading */}
      <h2
        className="
            font-display font-normal text-black leading-[1.1] tracking-tight
            text-[clamp(32px,4vw,52px)]
          "
      >
        {heading} <em className="not-italic text-gold">{headingAccent}</em>
      </h2>

      {/* Divider */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="block w-10 h-px bg-gold/30" />
        <span className="block w-1.5 h-1.5 rotate-45 bg-gold/40" />
        <span className="block w-10 h-px bg-gold/30" />
      </div>

      {/* Subheading */}
      <p className="font-body font-light text-gray text-[clamp(14px,1.3vw,16px)] leading-relaxed max-w-md">
        {subheading}
      </p>
    </div>
  );
}
