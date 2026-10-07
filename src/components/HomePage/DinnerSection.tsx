import SanityPhoto from "@/components/ui/SanityPhoto";
import { label } from "@/lib/experience/labels";
import type { Image, Locale, Settings } from "@/lib/experience/types";
import { eyebrowClass } from "../ExperienceCatalog/styles";
import HomeButtonLink from "./HomeButtonLink";
import type { HomeText } from "./homeData";
import { homeH2, homeSection } from "./styles";

/** The romantic dinner: photo beside its text, price and policy notes. */
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
      className={`${homeSection} grid grid-cols-[1fr_1fr] items-center gap-12 border-t border-t-[#ded5c4] upto700:grid-cols-[1fr]`}
    >
      <div className="relative h-full min-h-[660px] upto700:min-h-[400px]">
        <SanityPhoto photo={photo} locale={locale} className="object-cover" />
      </div>
      <div>
        <p className={eyebrowClass({ size: "text-[16px]" })}>
          Cabeza de Toro · Punta Cana
        </p>
        <h2 className={homeH2}>{t("dinnerTitle")}</h2>
        <p className="text-[16px]">{t("dinnerText")}</p>
        <p className="text-[16px]">{t("dinnerCelebrations")}</p>
        <p className="text-[16px] font-semibold text-[#9b773d]">
          {t("dinnerPrice")}
        </p>
        <p className="text-[16px]">
          {label(settings, locale, "dinnerExclusivity")}
        </p>
        <p className="text-[16px]">{t("deposit")}</p>
        <p className="text-[16px]">
          {label(settings, locale, "dinnerPaymentNote")}
        </p>
        <HomeButtonLink href={`${prefix}/romantic-dinners`}>
          {t("exploreDinners")}
        </HomeButtonLink>
      </div>
    </section>
  );
}
