import Link from "next/link";
import { FiArrowRight, FiCheck, FiClock, FiMapPin } from "react-icons/fi";
import SanityPhoto from "@/components/ui/SanityPhoto";
import { label } from "@/lib/experience/labels";
import { local } from "@/lib/experience/normalize";
import type { Experience, Locale, Settings } from "@/lib/experience/types";
import { startingPrice, type HomeText } from "./homeData";
import { featuredText, homeH3, homeIcon } from "./styles";

/**
 * A featured package: photo and badge, name, starting price, description,
 * duration, place, the first four inclusions and a link to customize it.
 */
export default function FeaturedProposalCard({
  experience: e,
  locale,
  prefix,
  settings,
  t,
}: {
  experience: Experience;
  locale: Locale;
  prefix: string;
  settings: Settings;
  t: HomeText;
}) {
  const price = startingPrice(e);
  return (
    <article className="flex flex-col border border-[#cfae7033] bg-[#141416] text-ivory">
      <div className="relative aspect-[4/3]">
        <SanityPhoto
          photo={e.styles[0]?.mainImage || e.gallery[0]?.image}
          locale={locale}
          className="object-cover"
        />
        {local(e.badge, locale) && (
          <span className="absolute bottom-4 left-4 bg-[#0b0b0ce6] px-4 py-2 text-[14px] text-gold">
            {local(e.badge, locale)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 upto1280:p-5">
        <h3 className={`${homeH3} italic`}>{local(e.name, locale)}</h3>
        {typeof price === "number" && (
          <p className="text-[16px] font-semibold text-gold">
            {label(settings, locale, "startingAtLabel")}{" "}
            {new Intl.NumberFormat(locale, {
              style: "currency",
              currency: e.currency || "USD",
              maximumFractionDigits: 0,
            }).format(price)}
          </p>
        )}
        <p className={featuredText}>
          {local(e.shortDescription, locale) || t("proposalDescription")}
        </p>
        {e.includedDurationMinutes && (
          <p className={featuredText}>
            <FiClock aria-hidden="true" className={homeIcon} />{" "}
            {e.includedDurationMinutes} {label(settings, locale, "minutes")}
          </p>
        )}
        {local(e.location, locale) && (
          <p className={featuredText}>
            <FiMapPin aria-hidden="true" className={homeIcon} />{" "}
            {local(e.location, locale)}
          </p>
        )}
        <ul className="mx-0 mt-2 mb-6">
          {e.inclusions.slice(0, 4).map((item, i) => (
            <li
              key={item._key || i}
              className="mb-2 flex items-baseline gap-2 text-[14px] text-[#d3cec6]"
            >
              <FiCheck aria-hidden="true" className={homeIcon} />
              {local(item.name, locale)}
            </li>
          ))}
        </ul>
        <Link
          href={`${prefix}/proposals#${encodeURIComponent(e.slug?.current || e._id)}`}
          className="mt-auto flex items-center gap-2 border-t border-t-[#cfae7033] pt-6 text-[14px] text-gold"
        >
          {t("customize")}{" "}
          <FiArrowRight aria-hidden="true" className={homeIcon} />
        </Link>
      </div>
    </article>
  );
}
