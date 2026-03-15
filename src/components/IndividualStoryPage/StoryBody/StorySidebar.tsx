import { Link } from "@/i18n/navigation";
import type { StoryBodyData, StorySidebarContent } from "./types";
import { useTranslations } from "next-intl";
interface StorySidebarProps {
  data: StoryBodyData;
}

interface SidebarDetailRowProps {
  label: string;
  value: string;
}

function SidebarDetailRow({ label, value }: SidebarDetailRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9.5px] font-body font-medium tracking-[0.18em] uppercase text-gray">
        {label}
      </span>
      <span className="text-[13px] font-body font-light text-black tracking-[0.02em]">
        {value}
      </span>
    </div>
  );
}

export default function StorySidebar({ data }: StorySidebarProps) {
  const t = useTranslations("IndividualStoryPage");

  return (
    <aside className="lg:sticky lg:top-8 self-start">
      <div className="bg-white border border-gold/20 p-7 flex flex-col gap-6">
        {/* Package tag */}
        <span className="text-[10px] font-body font-medium tracking-[0.18em] uppercase text-gold">
          {data.packageTag}
        </span>

        {/* Couple names */}
        <div className="flex flex-col gap-1">
          <h2 className="font-display font-normal text-fluid-h4 text-black leading-tight">
            {data.names}
          </h2>
        </div>

        {/* Gold rule */}
        <span className="block w-10 h-px bg-gold/30" aria-hidden="true" />

        {/* Detail rows */}
        <div className="flex flex-col gap-4">
          <SidebarDetailRow
            label={t("package") as string}
            value={data.packageTag}
          />
          <SidebarDetailRow label={t("proposed") as string} value={data.date} />
          <SidebarDetailRow
            label={t("location") as string}
            value={data.location}
          />
        </div>

        {/* Gold rule */}
        <span className="block w-full h-px bg-gold/20" aria-hidden="true" />

        {/* CTA */}
        <Link
          href={"/contact"}
          className="
            inline-flex items-center justify-center gap-3
            bg-black text-gold
            text-[11px] font-body font-medium tracking-[0.18em] uppercase
            px-6 py-4
            transition-all duration-300
            hover:bg-gold hover:text-black
            group
          "
        >
          {t("bookThisExperience") as string}
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
