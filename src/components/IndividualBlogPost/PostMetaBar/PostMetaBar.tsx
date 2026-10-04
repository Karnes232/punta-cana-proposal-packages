import {
  defaultPostMetaBarContent,
  type PostMetaBarData,
  type PostMetaBarContent,
} from "./types";
import { MetaDivider, MetaItem } from "@/components/ui/MetaItem";

interface PostMetaBarProps {
  data: PostMetaBarData;
  locale: string;
  content?: PostMetaBarContent;
}

export default function PostMetaBar({
  data,
  locale,
  content = defaultPostMetaBarContent,
}: PostMetaBarProps) {
  const categoryLabel =
    locale === "es" ? content.categoryLabelEs : content.categoryLabelEn;
  const publishedLabel =
    locale === "es" ? content.publishedLabelEs : content.publishedLabelEn;
  const readTimeLabel =
    locale === "es" ? content.readTimeLabelEs : content.readTimeLabelEn;
  const readTimeSuffix =
    locale === "es" ? content.readTimeSuffixEs : content.readTimeSuffixEn;

  const dateStr = new Date(data.publishedAt).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

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
