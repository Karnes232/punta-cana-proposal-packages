import HomeButtonLink from "./HomeButtonLink";
import type { HomeText } from "./homeData";
import { homeH2, homeSection } from "./styles";

/** The closing call to action. */
export default function StartSection({
  prefix,
  t,
}: {
  prefix: string;
  t: HomeText;
}) {
  return (
    <section
      className={`${homeSection} border-t border-t-[#ded5c4] text-center`}
    >
      <h2 className={`${homeH2} mx-auto`}>{t("startTitle")}</h2>
      <p className="text-[16px]">{t("deposit")}</p>
      <HomeButtonLink href={`${prefix}/proposals`}>
        {t("exploreProposals")}
      </HomeButtonLink>
    </section>
  );
}
