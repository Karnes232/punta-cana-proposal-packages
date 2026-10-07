import type { Image, Locale } from "@/lib/experience/types";
import { eyebrowClass } from "../ExperienceCatalog/styles";
import ExperienceSelector from "./ExperienceSelector";
import type { HomeText } from "./homeData";
import { homeH2, homeSection } from "./styles";

/** "Plan your…": choose a proposal or a romantic dinner. */
export default function PlanningSection({
  locale,
  t,
  copy,
  proposalPhoto,
  dinnerPhoto,
}: {
  locale: Locale;
  t: HomeText;
  /** The same texts as t, for the selector (a client component). */
  copy: Record<string, string>;
  proposalPhoto?: Image;
  dinnerPhoto?: Image;
}) {
  return (
    <section id="planning" className={homeSection}>
      <p className={eyebrowClass({ size: "text-[16px]" })}>
        {t("planningEyebrow")}
      </p>
      <h2 className={homeH2}>{t("planning")}</h2>
      <ExperienceSelector
        locale={locale}
        copy={copy}
        images={[proposalPhoto, dinnerPhoto]}
      />
    </section>
  );
}
