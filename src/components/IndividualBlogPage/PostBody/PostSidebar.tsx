import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import {
  buttonClass,
  eyebrowClass,
} from "@/components/ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts } from "@/components/HomePage/styles";
import type { PostBodyData } from "./types";
import { formatSanityDate } from "@/lib/formatDate";

interface SidebarDetailRowProps {
  label: string;
  value: string;
}

function SidebarDetailRow({ label, value }: SidebarDetailRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className={eyebrowClass({
          size: "text-[12px]",
          color: "text-[#6e6e73]",
        })}
      >
        {label}
      </span>
      <span className="text-[15px] text-black">{value}</span>
    </div>
  );
}

interface PostSidebarProps {
  data: PostBodyData;
  locale: string;
}

/** The post's details and the planning button; sticks below the navbar. */
export default function PostSidebar({ data, locale }: PostSidebarProps) {
  const t = useTranslations("BlogPost");

  const date = formatSanityDate(data.publishedAt, locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <aside className="self-start lg:sticky lg:top-[112px]">
      <div className="flex flex-col gap-6 border border-black/10 bg-white p-7">
        <p className={eyebrowClass({ size: "text-[13px]" })}>
          {data.categoryTag}
        </p>
        <p className="font-display text-[1.4rem] leading-[1.3] text-balance text-black">
          {data.title}
        </p>
        <span aria-hidden="true" className="block h-px w-full bg-black/10" />
        <div className="flex flex-col gap-4">
          <SidebarDetailRow label={t("category")} value={data.categoryTag} />
          <SidebarDetailRow label={t("published")} value={date} />
          <SidebarDetailRow
            label={t("readingTime")}
            value={`${data.readingTime} ${t("minRead")}`}
          />
        </div>
        <span aria-hidden="true" className="block h-px w-full bg-black/10" />
        <Link
          href="/contact"
          className={`${buttonClass(homeButtonParts)} w-full`}
        >
          {t("planCta")}
          <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
        </Link>
      </div>
    </aside>
  );
}
