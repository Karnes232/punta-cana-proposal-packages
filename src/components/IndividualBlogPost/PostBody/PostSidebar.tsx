import { Link } from "@/i18n/navigation";
import type { PostBodyData } from "./types";

interface SidebarDetailRowProps {
  label: string;
  value: string;
}

function SidebarDetailRow({ label, value }: SidebarDetailRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-body font-medium tracking-[0.16em] uppercase text-gray">
        {label}
      </span>
      <span className="text-[13px] font-body font-light text-black">
        {value}
      </span>
    </div>
  );
}

interface PostSidebarProps {
  data: PostBodyData;
  locale: "en" | "es";
}

export default function PostSidebar({
  data,
  locale,
}: PostSidebarProps) {
  const categoryLabel =
    locale === "es" ? "Categoría" : "Category";
  const publishedLabel =
    locale === "es" ? "Publicado" : "Published";
  const readTimeLabel =
    locale === "es" ? "Tiempo de Lectura" : "Reading Time";
  const readTimeSuffix =
    locale === "es" ? "min de lectura" : "min read";
  const ctaLabel = locale === "es" ? "Comienza a Planificar Tu Propuesta" : "Start Planning Your Proposal";

  const dateStr = new Date(data.publishedAt).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  return (
    <aside className="lg:sticky lg:top-8 self-start">
      <div className="bg-white border border-gold/20 p-7 flex flex-col gap-6">
        {/* Category tag */}
        <span className="text-[10px] font-body font-medium tracking-[0.18em] uppercase text-gold">
          {data.categoryTag}
        </span>

        {/* Post title */}
        <h2 className="font-display font-normal text-fluid-h5 text-black leading-tight">
          {data.title}
        </h2>

        {/* Gold rule */}
        <span className="block w-10 h-px bg-gold/30" aria-hidden="true" />

        {/* Detail rows */}
        <div className="flex flex-col gap-4">
          <SidebarDetailRow label={categoryLabel} value={data.categoryTag} />
          <SidebarDetailRow label={publishedLabel} value={capitalizedDate} />
          <SidebarDetailRow
            label={readTimeLabel}
            value={`${data.readingTime} ${readTimeSuffix}`}
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
          {ctaLabel}
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
