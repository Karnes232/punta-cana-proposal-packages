import { useTranslations } from "next-intl";
import {
    type StoryMetaBarData,
    type StoryMetaBarContent,
  } from "./types";
  
  interface StoryMetaBarProps {
    data: StoryMetaBarData;
    locale: "en" | "es";
    content?: StoryMetaBarContent;
  }
  
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
  
  export default function StoryMetaBar({
    data,
    locale,
  }: StoryMetaBarProps) {
    const t = useTranslations("IndividualStoryPage");

    const dateStr = new Date(data.date).toLocaleDateString(locale, {
      month: "long",
      year: "numeric",
    });
    const capitalizedDate =
      dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    return (
      <div className="w-full bg-white border-b border-gold/20">
        <div className="flex items-stretch max-w-site mx-auto overflow-x-auto">
          <MetaItem label={t("package") as string} value={data.packageTag} />
          <Divider />
          <MetaItem label={t("date") as string} value={capitalizedDate} />
          <Divider />
          <MetaItem label={t("location") as string} value={data.location} />
        </div>
      </div>
    );
  }