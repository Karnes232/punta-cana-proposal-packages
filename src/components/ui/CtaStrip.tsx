import { useId } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import {
  buttonClass,
  eyebrowClass,
} from "@/components/ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts } from "@/components/HomePage/styles";

interface CtaStripProps {
  eyebrow?: string;
  heading: string;
  /** The heading's last words, in gold. */
  headingAccent?: string;
  subheading?: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * The black band closing a page (stories, blog, the catalog pages), with one
 * button.
 */
export default function CtaStrip({
  eyebrow,
  heading,
  headingAccent,
  subheading,
  ctaLabel,
  ctaHref,
}: CtaStripProps) {
  const headingId = useId();
  // A banner without a link would point at the current page.
  if (!ctaHref) return null;
  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-black px-6 py-20 md:px-10 md:py-28 dark:border-t dark:border-gold/15"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          {eyebrow && (
            <p className={eyebrowClass({ color: "text-gold" })}>{eyebrow}</p>
          )}
          <h2
            id={headingId}
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.15] font-normal text-balance text-ivory"
          >
            {heading}
            {headingAccent && (
              <>
                {" "}
                <span className="text-gold">{headingAccent}</span>
              </>
            )}
          </h2>
          {subheading && (
            <p className="max-w-[52ch] text-[16px] leading-[1.75] text-pretty text-ivory/75">
              {subheading}
            </p>
          )}
        </div>
        <Link
          href={ctaHref}
          className={`${buttonClass(homeButtonParts)} w-full sm:w-auto`}
        >
          {ctaLabel}
          <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
        </Link>
      </div>
    </section>
  );
}
