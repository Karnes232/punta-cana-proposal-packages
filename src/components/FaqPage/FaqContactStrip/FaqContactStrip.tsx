import { eyebrowClass } from "@/components/ExperienceCatalog/styles";
import FaqContactStripCTA from "./FaqContactStripCTA";

// ─── Props ────────────────────────────────────────────────────────────────────

interface FaqContactStripProps {
  eyebrow: string;
  line1: string;
  line2: string;
  body: string;
  cta: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/** The black band after the questions: a heading, a line and the contact link. */
export default function FaqContactStrip({
  eyebrow,
  line1,
  line2,
  body,
  cta,
}: FaqContactStripProps) {
  const heading = [line1, line2].filter(Boolean).join(" ");

  return (
    <section className="w-full bg-black text-ivory">
      <div className="mx-auto flex max-w-[680px] flex-col items-center gap-5 px-6 py-20 text-center md:py-24">
        {eyebrow && (
          <p className={eyebrowClass({ color: "text-gold" })}>{eyebrow}</p>
        )}
        {heading && (
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-normal text-balance">
            {heading}
          </h2>
        )}
        {body && (
          <p className="max-w-[46ch] text-[16px] leading-[1.75] text-pretty text-ivory/75">
            {body}
          </p>
        )}
        {cta && <FaqContactStripCTA label={cta} />}
      </div>
    </section>
  );
}
