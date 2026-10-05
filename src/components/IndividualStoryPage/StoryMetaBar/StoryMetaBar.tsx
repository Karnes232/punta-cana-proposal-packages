import type { SiteLocale } from "@/i18n/locales";
import { useTranslations } from "next-intl";
import { type StoryMetaBarData } from "./types";
import { MetaDivider, MetaItem } from "@/components/ui/MetaItem";

interface StoryMetaBarProps {
  data: StoryMetaBarData;
  locale: SiteLocale;
}

export default function StoryMetaBar({ data, locale }: StoryMetaBarProps) {
  const t = useTranslations("IndividualStoryPage");

  const dateStr = new Date(data.date).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
  const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

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
