interface HowItWorksCTACopyProps {
  eyebrow: string;
  scriptLine: string;
  heading: string;
  headingAccent: string;
  subheading: string;
}

export default function HowItWorksCTACopy({
  eyebrow,
  scriptLine,
  heading,
  headingAccent,
  subheading,
}: HowItWorksCTACopyProps) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      {/* Eyebrow */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="block w-8 h-px bg-gold/40" />
        <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/70">
          {eyebrow}
        </p>
        <span className="block w-8 h-px bg-gold/40" />
      </div>

      {/* Script decorative line */}
      <p
        className="font-display italic font-normal text-gold/60 text-[clamp(18px,2vw,24px)] leading-none"
        aria-hidden="true"
      >
        {scriptLine}
      </p>

      {/* Main heading */}
      <h2
        className="
            font-display font-normal text-white leading-[1.1] tracking-tight
            text-[clamp(30px,4.5vw,58px)]
          "
      >
        {heading} <em className="not-italic text-gold">{headingAccent}</em>
      </h2>

      {/* Divider */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="block w-10 h-px bg-gold/25" />
        <span className="block w-1.5 h-1.5 rotate-45 bg-gold/35" />
        <span className="block w-10 h-px bg-gold/25" />
      </div>

      {/* Subheading */}
      <p className="font-body font-light text-white/45 text-[clamp(14px,1.3vw,16px)] leading-[1.8] max-w-md">
        {subheading}
      </p>
    </div>
  );
}
