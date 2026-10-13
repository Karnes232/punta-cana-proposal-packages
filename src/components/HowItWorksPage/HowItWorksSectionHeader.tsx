import { eyebrowClass } from "@/components/ExperienceCatalog/styles";

interface HowItWorksSectionHeaderProps {
  /** The heading's id, named by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
}

/** The centered label, heading and intro opening a light section. */
export default function HowItWorksSectionHeader({
  id,
  eyebrow,
  heading,
  headingAccent,
  subheading,
}: HowItWorksSectionHeaderProps) {
  return (
    <div className="mb-14 flex flex-col items-center gap-4 text-center md:mb-20">
      {eyebrow && <p className={eyebrowClass()}>{eyebrow}</p>}
      <h2
        id={id}
        className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-normal text-balance text-black"
      >
        {heading} <span className="text-[#9b773d]">{headingAccent}</span>
      </h2>
      {subheading && (
        <p className="max-w-[60ch] text-[17px] leading-[1.7] text-pretty text-[#3f3f44]">
          {subheading}
        </p>
      )}
    </div>
  );
}
