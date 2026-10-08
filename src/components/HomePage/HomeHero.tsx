import Link from "next/link";
import { FiArrowDown } from "react-icons/fi";
import SanityPhoto from "@/components/ui/SanityPhoto";
import type { Image, Locale } from "@/lib/experience/types";
import { buttonClass, eyebrowClass } from "../ExperienceCatalog/styles";
import HomeButtonLink from "./HomeButtonLink";
import type { HomeText } from "./homeData";
import { actionsClass, homeButtonParts, homeIcon } from "./styles";

/**
 * The full-screen opening: photo, headline, the proposals and dinners
 * buttons, and an arrow down to the planning section.
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
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-black px-[max(24px,calc((100vw_-_1200px)/2))] pt-[176px] pb-[72px] text-ivory upto700:px-6 upto700:pt-[144px] upto700:pb-12">
      <SanityPhoto
        photo={photo}
        locale={locale}
        priority
        className="-z-2 animate-[lux-hero-drift_6s_ease-out_forwards] object-cover object-center motion-reduce:[animation:none] motion-reduce:[transform:none]"
      />
      <div className="absolute inset-0 -z-1 bg-[linear-gradient(90deg,#000c,#0005),linear-gradient(0deg,#0008,transparent)]" />
      <div className="max-w-[1000px] animate-[lux-enter_0.6s_ease-out]">
        <p
          className={`${eyebrowClass({ color: "text-[#e7ca97]" })} max-w-[760px]`}
        >
          {t("eyebrow")}
        </p>
        <h1 className="max-w-[1050px] text-[clamp(3.5rem,6vw,6.5rem)] upto700:text-[clamp(2.5rem,11vw,4rem)]">
          {t("headline")}
        </h1>
        <p className="max-w-[760px] text-[18px] text-ivory upto700:text-[16px]">
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
        <p className="max-w-[780px] text-[14px] text-ivory">{t("deposit")}</p>
        <a
          className="mt-2 inline-flex border border-[#cfae7066] p-4"
          href="#planning"
          aria-label={t("planning")}
        >
          <FiArrowDown aria-hidden="true" className={homeIcon} />
        </a>
      </div>
    </section>
  );
}
