import Image from "next/image";
import type { Locale, Settings } from "@/lib/experience/types";
import type { GeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { label } from "@/lib/experience/labels";
import { localePrefix } from "@/i18n/locales";

const footerLink =
  "my-[5px] mr-3 ml-0 inline-block text-[0.85rem] [&:hover]:text-gold";

// The developer's credit. Kept here, not in Catalog text, so it isn't
// edited away with the site's texts.
const credit: Record<Locale, { builtBy: string; tagline: string }> = {
  en: {
    builtBy: "Built by",
    tagline: "Web Development in the Dominican Republic",
  },
  es: {
    builtBy: "Desarrollado por",
    tagline: "Desarrollo web en República Dominicana",
  },
  fr: {
    builtBy: "Site réalisé par",
    tagline: "Développement web en République dominicaine",
  },
  pt: {
    builtBy: "Desenvolvido por",
    tagline: "Desenvolvimento web na República Dominicana",
  },
};
export default function CatalogFooter({
  locale,
  settings,
  company,
}: {
  locale: Locale;
  settings: Settings;
  company: GeneralLayout | null;
}) {
  const prefix = localePrefix(locale);
  return (
    <footer className="border-t border-t-[rgba(207,174,112,0.25)] bg-black px-7 py-[60px] text-ivory">
      <div className="m-auto flex max-w-[1180px] flex-wrap justify-between gap-5">
        <div>
          <p>{company?.companyName}</p>
          <small>
            © {new Date().getFullYear()} {company?.companyName}.{" "}
            {label(settings, locale, "rightsReserved")}
          </small>
          <nav aria-label={label(settings, locale, "siteLinks")}>
            {[
              ["proposals", "proposalSectionTitle"],
              ["romantic-dinners", "dinnerSectionTitle"],
              ["contact", "contactUsLabel"],
              ["blog", "blog"],
              ["faq", "faq"],
              ["privacy-policy", "privacy"],
              ["terms-of-service", "terms"],
            ].map(([path, key]) => (
              <a key={path} href={`${prefix}/${path}`} className={footerLink}>
                {label(settings, locale, key)}
              </a>
            ))}
          </nav>
        </div>
        <div>
          {company?.telephone && (
            <a href={`tel:${company.telephone}`} className={footerLink}>
              {company.telephone}
            </a>
          )}
          {company?.email && (
            <a href={`mailto:${company.email}`} className={footerLink}>
              {company.email}
            </a>
          )}
          <div>
            {Object.entries(company?.socialLinks || {})
              .filter(([, url]) => {
                try {
                  const parsed = new URL(url);
                  return (
                    ["http:", "https:"].includes(parsed.protocol) &&
                    parsed.pathname !== "/"
                  );
                } catch {
                  return false;
                }
              })
              .map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  {{
                    facebook: "Facebook",
                    instagram: "Instagram",
                    xURL: "X",
                    MessengerURL: "Messenger",
                  }[name] || name}
                </a>
              ))}
          </div>
        </div>
      </div>
      <p className="m-auto mt-8 flex max-w-[1180px] flex-wrap items-center gap-x-2 gap-y-1 border-t border-t-[rgba(207,174,112,0.25)] pt-5 text-[0.8rem] text-ivory/60">
        {credit[locale].builtBy}
        {/* DR Web Studio's site has only English and Spanish. */}
        <a
          href={`https://www.dr-webstudio.com/${locale === "es" ? "es" : "en"}`}
          className="flex items-center gap-1 [&:hover]:text-gold"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="https://cdn.sanity.io/images/6r8ro1r9/production/81a1e4e2b8efbeb881d9ef9dd1624377bcd2f6d0-512x487.png"
            alt="DR Web Studio logo"
            className="h-4 w-auto"
            width={17}
            height={16}
          />
          DR Web Studio
        </a>
        <span className="hidden md:inline">—</span>
        {credit[locale].tagline}
      </p>
    </footer>
  );
}
