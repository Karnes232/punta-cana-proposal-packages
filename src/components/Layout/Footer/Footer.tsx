import { localePrefix } from "@/i18n/locales";
import { label } from "@/lib/experience/labels";
import type { Locale, Settings } from "@/lib/experience/types";
import type { GeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterCredit from "./FooterCredit";
import FooterExplore from "./FooterExplore";
import FooterLegal from "./FooterLegal";
import { rule } from "./styles";

/**
 * The site footer: brand, Explore and Contact columns, then a bottom bar
 * with the copyright, legal links and the studio credit.
 */
export default function Footer({
  locale,
  settings,
  company,
}: {
  locale: Locale;
  settings: Settings;
  company: GeneralLayout | null;
}) {
  const prefix = localePrefix(locale);
  const t = (key: string) => label(settings, locale, key);
  const name = company?.companyName || "Punta Cana Proposal Packages";

  return (
    <footer className="border-t border-t-[rgba(207,174,112,0.25)] bg-black px-6 pt-16 pb-8 text-ivory md:px-7 md:pt-20 [&_:focus-visible]:rounded-sm [&_:focus-visible]:[outline:2px_solid_#cfae70] [&_:focus-visible]:[outline-offset:4px]">
      <div className="m-auto grid max-w-[1180px] grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <FooterBrand
          href={prefix || "/"}
          name={name}
          homeLabel={t("navHome")}
          logo={company?.companyLogo?.asset?.url}
          description={company?.companyDescription?.[locale]}
        />
        <FooterExplore prefix={prefix} t={t} />
        <FooterContact heading={t("footerContact")} company={company} />
      </div>

      <div
        className={`m-auto mt-14 flex max-w-[1180px] flex-col gap-3 border-t ${rule} pt-6 text-[0.8rem] text-ivory/60`}
      >
        {/* Copyright and legal links, then the studio credit on its own row. */}
        <FooterLegal name={name} prefix={prefix} t={t} />
        <FooterCredit locale={locale} />
      </div>
    </footer>
  );
}
