import SanityPhoto from "@/components/ui/SanityPhoto";
import type { Image, Locale } from "@/lib/experience/types";
import type { HomeText } from "./homeData";
import { homeH2, homeSection } from "./styles";

/** "The transformation": three editorial photos, the middle one larger. */
export default function TransformationSection({
  locale,
  t,
  photos,
}: {
  locale: Locale;
  t: HomeText;
  photos: Image[];
}) {
  return (
    <section className={homeSection}>
      <h2 className={homeH2}>{t("transformation")}</h2>
      <p className="mb-8 max-w-[800px] text-[16px]">
        {t("transformationText")}
      </p>
      <div className="grid grid-cols-[1fr_1.4fr_1fr] items-center gap-4 upto700:gap-2">
        {photos.map((photo, i) => (
          <figure
            key={photo.url || i}
            className="relative aspect-[3/4] nth-2:aspect-[4/5]"
          >
            <SanityPhoto
              photo={photo}
              locale={locale}
              className="object-cover"
            />
          </figure>
        ))}
      </div>
      <p className="max-w-[780px] text-[14px]">{t("editorialNote")}</p>
    </section>
  );
}
