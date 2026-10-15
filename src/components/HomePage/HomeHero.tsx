import Link from "next/link";
import SanityPhoto from "@/components/ui/SanityPhoto";
import type { Image, Locale } from "@/lib/experience/types";
import { buttonClass, eyebrowClass } from "../ExperienceCatalog/styles";
import HomeButtonLink from "./HomeButtonLink";
import type { HomeText } from "./homeData";
import { actionsClass, homeButtonParts } from "./styles";

/**
 * The full-screen opening: photo, headline, the proposals and dinners
 * buttons, and the deposit note under them.
 */
export default function HomeHero({
  locale,
  prefix,
  t,
  photo,
}: {
  locale: Locale;
  prefix: string;
  t: HomeText;
  photo?: Image;
}) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-black px-[max(24px,calc((100vw_-_1200px)/2))] pt-[clamp(112px,16vh,148px)] pb-[72px] text-ivory upto700:px-6 upto700:pt-[112px] upto700:pb-12">
      <SanityPhoto
        photo={photo}
        locale={locale}
        priority
        className="-z-2 animate-[lux-hero-drift_6s_ease-out_forwards] object-cover motion-reduce:[animation:none] motion-reduce:[transform:none]"
      />
      <div className="absolute inset-0 -z-1 bg-[linear-gradient(90deg,#000c,#0005),linear-gradient(0deg,#0008,transparent)]" />
      <div className="max-w-[1000px] animate-[lux-enter_0.6s_ease-out]">
        <p
          className={`${eyebrowClass({ color: "text-[#e7ca97]" })} max-w-[760px]`}
        >
          {t("eyebrow")}
        </p>
        <h1 className="max-w-[1050px] text-[clamp(2.75rem,4.6vw,4.75rem)] text-balance upto700:text-[clamp(2.1rem,9vw,2.75rem)]">
          {t("headline")}
        </h1>
        <p className="max-w-[60ch] text-[18px] text-pretty text-ivory upto700:text-[16px]">
          {t("introduction")}
        </p>
        <div
          className={`${actionsClass} upto700:flex-col upto700:items-stretch`}
        >
          <HomeButtonLink href={`${prefix}/proposals`}>
            {t("exploreProposals")}
          </HomeButtonLink>
          <Link
            className={buttonClass({
              ...homeButtonParts,
              colors:
                "border-[#b99a62] bg-[#0b0b0c50] [background-position:initial] text-ivory",
            })}
            href={`${prefix}/romantic-dinners`}
          >
            {t("exploreDinners")}
          </Link>
        </div>
        <p className="mt-4 max-w-[60ch] text-[14px] text-[#d3cec6]">
          {t("deposit")}
        </p>
      </div>
    </section>
  );
}
