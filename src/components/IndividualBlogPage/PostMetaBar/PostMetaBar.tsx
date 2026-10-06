import { useTranslations } from "next-intl";
import type { PostMetaBarData } from "./types";
import { MetaDivider, MetaItem } from "@/components/ui/MetaItem";
import { formatSanityDate } from "@/lib/formatDate";

interface PostMetaBarProps {
  data: PostMetaBarData;
  locale: string;
}

export default function PostMetaBar({ data, locale }: PostMetaBarProps) {
  const t = useTranslations("BlogPost");
  const categoryLabel = t("category");
  const publishedLabel = t("published");
  const readTimeLabel = t("readingTime");
  const readTimeSuffix = t("minRead");

  const capitalizedDate = formatSanityDate(data.publishedAt, locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full bg-white border-b border-gold/20">
      <div className="flex items-stretch mx-auto overflow-x-auto">
        <MetaItem label={categoryLabel} value={data.categoryTag} />
        <MetaDivider />
        <MetaItem label={publishedLabel} value={capitalizedDate} />
        <MetaDivider />
        <MetaItem
          label={readTimeLabel}
          value={`${data.readingTime} ${readTimeSuffix}`}
        />
      </div>
    </div>
  );
}
