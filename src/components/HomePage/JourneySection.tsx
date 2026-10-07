import type { Image, Locale } from "@/lib/experience/types";
import PickupJourney from "./PickupJourney";
import { STEPS, type HomeText } from "./homeData";
import { homeDarkSection, homeH2 } from "./styles";

/** The day, from hotel pickup on: five steps to click through. */
export default function JourneySection({
  locale,
  t,
  photos,
}: {
  locale: Locale;
  t: HomeText;
  /** One photo (or none) per step. */
  photos: (Image | undefined)[];
}) {
  return (
    <section className={homeDarkSection}>
      <div className="m-auto max-w-[1200px]">
        <h2 className={homeH2}>{t("journeyTitle")}</h2>
        <p className="mb-8 max-w-[800px] text-[16px] text-[#c7c2b9]">
          {t("journeyIntro")}
        </p>
        <PickupJourney
          locale={locale}
          label={t("journeyLabel")}
          steps={STEPS.slice(0, 5).map((step, i) => ({
            title: t("journey" + step),
            text: t("journey" + step + "Text"),
            photo: photos[i],
          }))}
        />
      </div>
    </section>
  );
}
