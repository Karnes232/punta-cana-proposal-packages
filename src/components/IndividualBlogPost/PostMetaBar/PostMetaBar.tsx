import {
    defaultPostMetaBarContent,
    type PostMetaBarData,
    type PostMetaBarContent,
  } from "./types";
  
  interface MetaItemProps {
    label: string;
    value: string;
  }
  
  function MetaItem({ label, value }: MetaItemProps) {
    return (
      <div className="flex flex-col gap-1 px-8 py-4 md:px-10">
        <span className="text-[9.5px] font-body font-medium tracking-[0.2em] uppercase text-gray">
          {label}
        </span>
        <span className="text-[13px] font-body font-light tracking-[0.04em] text-black">
          {value}
        </span>
      </div>
    );
  }
  
  function Divider() {
    return (
      <span
        className="self-stretch w-px bg-gold/20 my-3 shrink-0"
        aria-hidden="true"
      />
    );
  }
  
  interface PostMetaBarProps {
    data: PostMetaBarData;
    locale: "en" | "es";
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
          <Divider />
          <MetaItem label={publishedLabel} value={capitalizedDate} />
          <Divider />
          <MetaItem
            label={readTimeLabel}
            value={`${data.readingTime} ${readTimeSuffix}`}
          />
        </div>
      </div>
    );
  }