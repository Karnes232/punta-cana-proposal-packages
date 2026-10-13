import { eyebrowClass } from "@/components/ExperienceCatalog/styles";

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
    <div className="flex flex-col items-center gap-4 text-center">
      {eyebrow && (
        <p className={eyebrowClass({ color: "text-gold" })}>{eyebrow}</p>
      )}
      {scriptLine && (
        <p className="font-display text-[clamp(18px,2vw,22px)] italic text-gold">
          {scriptLine}
        </p>
      )}
      <h2
        id="cta-heading"
        className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-normal text-balance text-ivory"
      >
        {heading} <span className="text-gold">{headingAccent}</span>
      </h2>
      {subheading && (
        <p className="max-w-[52ch] text-[16px] leading-[1.75] text-pretty text-ivory/75">
          {subheading}
        </p>
      )}
    </div>
  );
}
