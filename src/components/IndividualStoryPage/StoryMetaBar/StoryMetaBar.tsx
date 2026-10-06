import type { SiteLocale } from "@/i18n/locales";
import { useTranslations } from "next-intl";
import { type StoryMetaBarData } from "./types";
import { MetaDivider, MetaItem } from "@/components/ui/MetaItem";
import { formatSanityDate } from "@/lib/formatDate";

interface StoryMetaBarProps {
  data: StoryMetaBarData;
  locale: SiteLocale;
}

export default function StoryMetaBar({ data, locale }: StoryMetaBarProps) {
  const t = useTranslations("IndividualStoryPage");

  const capitalizedDate = formatSanityDate(data.date, locale, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full bg-white border-b border-gold/20">
      <div className="flex items-stretch max-w-site mx-auto overflow-x-auto">
        <MetaItem label={t("package") as string} value={data.packageTag} />
        <MetaDivider />
        <MetaItem label={t("date") as string} value={capitalizedDate} />
        <MetaDivider />
        <MetaItem label={t("location") as string} value={data.location} />
      </div>
    </div>
  );
}
