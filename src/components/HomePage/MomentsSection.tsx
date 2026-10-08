import type { Image, Locale } from "@/lib/experience/types";
import HomeTextLink from "./HomeTextLink";
import MomentsGallery from "./MomentsGallery";
import type { HomeText } from "./homeData";
import { homeH2, homeSection } from "./styles";

/** "Real moments": the photo gallery, and a link to the stories. */
export default function MomentsSection({
  locale,
  prefix,
  t,
  copy,
  photos,
}: {
  locale: Locale;
  prefix: string;
  t: HomeText;
  /** The same texts as t, for the gallery (a client component). */
  copy: Record<string, string>;
  photos: Image[];
}) {
  return (
    <section className={homeSection}>
      <h2 className={homeH2}>{t("realMoments")}</h2>
      <MomentsGallery photos={photos} locale={locale} copy={copy} />
      <HomeTextLink href={`${prefix}/stories`}>{t("viewStories")}</HomeTextLink>
    </section>
  );
}
