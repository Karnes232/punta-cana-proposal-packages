import type { SiteLocale } from "@/i18n/locales";
import { useTranslations } from "next-intl";
import { FiMapPin } from "react-icons/fi";
import { eyebrowClass } from "@/components/ExperienceCatalog/styles";
import { formatSanityDate } from "@/lib/formatDate";

interface StoryHeroCopyProps {
  names: string;
  packageTag: string;
  date: string;
  location: string;
  locale: SiteLocale;
}

/** The package, the couple's names, and where and when they got engaged. */
export default function StoryHeroCopy({
  names,
  packageTag,
  date,
  location,
  locale,
}: StoryHeroCopyProps) {
  const t = useTranslations("IndividualStoryPage");
  const formattedDate = formatSanityDate(date, locale, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-4">
      {packageTag && (
        <p className={eyebrowClass({ color: "text-gold" })}>{packageTag}</p>
      )}
      <h1 className="font-display text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.08] font-normal text-balance text-ivory">
        {names}
      </h1>
      <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-ivory/85">
        {location && (
          <span className="inline-flex items-center gap-2">
            <FiMapPin
              aria-hidden="true"
              className="size-4 shrink-0 text-gold"
            />
            {location}
          </span>
        )}
        {formattedDate && (
          <span>
            {t("proposed")} · {formattedDate}
          </span>
        )}
      </p>
    </div>
  );
}
