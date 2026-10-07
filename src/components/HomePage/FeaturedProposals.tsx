import type { Experience, Locale, Settings } from "@/lib/experience/types";
import FeaturedProposalCard from "./FeaturedProposalCard";
import HomeTextLink from "./HomeTextLink";
import type { HomeText } from "./homeData";
import { homeH2, homeSection } from "./styles";

/** The featured packages (chosen in the Studio), and a link to them all. */
export default function FeaturedProposals({
  proposals,
  locale,
  prefix,
  settings,
  t,
}: {
  proposals: Experience[];
  locale: Locale;
  prefix: string;
  settings: Settings;
  t: HomeText;
}) {
  return (
    <section className={homeSection}>
      <h2 className={homeH2}>{t("featured")}</h2>
      <div className="grid grid-cols-3 gap-6 upto1280:gap-4 upto700:grid-cols-[1fr] upto700:gap-6">
        {proposals.map((experience) => (
          <FeaturedProposalCard
            key={experience._id}
            experience={experience}
            locale={locale}
            prefix={prefix}
            settings={settings}
            t={t}
          />
        ))}
      </div>
      <HomeTextLink href={`${prefix}/proposals`}>
        {t("allProposals")}{" "}
      </HomeTextLink>
    </section>
  );
}
