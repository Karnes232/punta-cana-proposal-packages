import { FiArrowRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts } from "@/components/HomePage/styles";

interface HowItWorksCTAButtonsProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

/** The gold booking button and an outlined second choice. */
export default function HowItWorksCTAButtons({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HowItWorksCTAButtonsProps) {
  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
      {primaryHref && (
        <Link href={primaryHref} className={buttonClass(homeButtonParts)}>
          {primaryLabel}
          <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
        </Link>
      )}
      {secondaryHref && (
        <Link
          href={secondaryHref}
          className={buttonClass({
            ...homeButtonParts,
            colors:
              "border-[#b99a62] bg-transparent text-ivory [&:hover:not(:disabled)]:text-black",
          })}
        >
          {secondaryLabel}
        </Link>
      )}
    </div>
  );
}
