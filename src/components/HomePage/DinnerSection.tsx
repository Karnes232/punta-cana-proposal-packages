import { FiCheck } from "react-icons/fi";
import SanityPhoto from "@/components/ui/SanityPhoto";
import { label } from "@/lib/experience/labels";
import type { Image, Locale, Settings } from "@/lib/experience/types";
import { eyebrowClass } from "../ExperienceCatalog/styles";
import HomeButtonLink from "./HomeButtonLink";
import type { HomeText } from "./homeData";
import { actionsClass, homeH2, homeIcon, homeSection } from "./styles";

/**
 * The romantic dinner: photo beside its text, then the price and policy
 * notes as one block above the button.
 */
export default function DinnerSection({
  locale,
  prefix,
  settings,
  t,
  photo,
}: {
  locale: Locale;
  prefix: string;
  settings: Settings;
  t: HomeText;
  photo?: Image;
}) {
  return (
    <section
      className={`${homeSection} grid grid-cols-[1fr_1fr] items-center gap-12 border-t border-t-line upto700:grid-cols-[1fr]`}
    >
      <div className="relative aspect-[4/5] upto700:aspect-[4/3]">
        <SanityPhoto photo={photo} locale={locale} className="object-cover" />
      </div>
      <div>
        <p className={eyebrowClass({ size: "text-[16px]" })}>
          {t("dinnerPlace")}
        </p>
        <h2 className={homeH2}>{t("dinnerTitle")}</h2>
        <p className="text-[16px]">{t("dinnerText")}</p>
        <p className="text-[16px]">{t("dinnerCelebrations")}</p>
        <div className="mt-8 border-t border-t-line pt-6">
          <p className="m-0 font-display text-[1.4rem] leading-[1.3] text-(--ec-ink)">
            {t("dinnerPrice")}
          </p>
          <ul className="mt-4 mb-0 grid list-none gap-2 text-[14px] text-(--ec-muted)">
            {[
              label(settings, locale, "dinnerExclusivity"),
              t("deposit"),
              label(settings, locale, "dinnerPaymentNote"),
            ].map((note) => (
              <li key={note} className="flex items-baseline gap-3">
                <FiCheck aria-hidden="true" className={homeIcon} />
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div className={actionsClass}>
          <HomeButtonLink href={`${prefix}/romantic-dinners`}>
            {t("exploreDinners")}
          </HomeButtonLink>
        </div>
      </div>
    </section>
  );
}
