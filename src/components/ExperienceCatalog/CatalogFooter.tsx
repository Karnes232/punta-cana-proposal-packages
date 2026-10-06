import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import type { Locale, Settings } from "@/lib/experience/types";
import type { GeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { label } from "@/lib/experience/labels";
import { localePrefix } from "@/i18n/locales";

const link =
  "inline-flex min-h-11 items-center gap-2.5 text-[0.9rem] text-ivory/80 transition-colors duration-200 [&:hover]:text-gold";
const smallLink =
  "inline-flex min-h-11 items-center transition-colors duration-200 [&:hover]:text-gold";
const columnHeading =
  "mb-3 text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase";
const rule = "border-t-[rgba(207,174,112,0.2)]";

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

const socialNetworks: Record<string, { name: string; icon?: IconType }> = {
  instagram: { name: "Instagram", icon: FiInstagram },
  facebook: { name: "Facebook", icon: FiFacebook },
  MessengerURL: { name: "Messenger", icon: FiMessageCircle },
  xURL: { name: "X" },
};

// A real profile link: http(s) with a path (an empty "https://x.com/"
// placeholder is skipped).
const isProfileLink = (url: string) => {
  try {
    const parsed = new URL(url);
    return (
      ["http:", "https:"].includes(parsed.protocol) && parsed.pathname !== "/"
    );
  } catch {
    return false;
  }
};

/** "18094929868" → "+1 (809) 492-9868"; other numbers are shown as stored. */
const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1")
    ? `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    : phone;
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
  const t = (key: string) => label(settings, locale, key);
  const name = company?.companyName || "Punta Cana Proposal Packages";
  const description = company?.companyDescription?.[locale];
  const logo = company?.companyLogo?.asset?.url;
  const phoneDigits = company?.telephone?.replace(/[^\d+]/g, "");
  const socials = Object.entries(company?.socialLinks || {}).filter(
    ([network, url]) => socialNetworks[network] && isProfileLink(url),
  );

  return (
    <footer className="border-t border-t-[rgba(207,174,112,0.25)] bg-black px-6 pt-16 pb-8 text-ivory md:px-7 md:pt-20 [&_:focus-visible]:rounded-sm [&_:focus-visible]:[outline:2px_solid_#cfae70] [&_:focus-visible]:[outline-offset:4px]">
      <div className="m-auto grid max-w-[1180px] grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <a
            href={prefix || "/"}
            className="inline-flex items-center gap-4"
            aria-label={`${name}, ${t("navHome")}`}
          >
            {logo && (
              <Image
                src={logo}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            )}
            <span className="font-display text-xl leading-tight">{name}</span>
          </a>
          {description && (
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ivory/70">
              {description}
            </p>
          )}
        </div>

        <nav aria-label={t("siteLinks")}>
          <p className={columnHeading}>{t("footerExplore")}</p>
          <ul>
            {[
              ["proposals", "proposalSectionTitle"],
              ["romantic-dinners", "dinnerSectionTitle"],
              ["blog", "blog"],
              ["faq", "faq"],
              ["contact", "contactUsLabel"],
            ].map(([path, key]) => (
              <li key={path}>
                <a href={`${prefix}/${path}`} className={link}>
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={columnHeading}>{t("footerContact")}</p>
          <ul>
            {company?.telephone && (
              <li>
                <a href={`tel:${phoneDigits}`} className={link}>
                  <FiPhone aria-hidden className="shrink-0 text-gold" />
                  {formatPhone(company.telephone)}
                </a>
              </li>
            )}
            {company?.email && (
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className={`${link} break-words`}
                >
                  <FiMail aria-hidden className="shrink-0 text-gold" />
                  {company.email}
                </a>
              </li>
            )}
            {socials.map(([network, url]) => {
              const { name: networkName, icon: Icon } = socialNetworks[network];
              return (
                <li key={network}>
                  <a
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={link}
                  >
                    {Icon && (
                      <Icon aria-hidden className="shrink-0 text-gold" />
                    )}
                    {networkName}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={`m-auto mt-14 flex max-w-[1180px] flex-col gap-4 border-t ${rule} pt-6 text-[0.8rem] text-ivory/60 lg:flex-row lg:items-center lg:justify-between`}
      >
        <div className="flex flex-col gap-1 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
          <p>
            © {new Date().getFullYear()} {name}. {t("rightsReserved")}
          </p>
          <div className="flex gap-6">
            <a href={`${prefix}/privacy-policy`} className={smallLink}>
              {t("privacy")}
            </a>
            <a href={`${prefix}/terms-of-service`} className={smallLink}>
              {t("terms")}
            </a>
          </div>
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            {credit[locale].builtBy}
            {/* DR Web Studio's site has only English and Spanish. */}
            <a
              href={`https://www.dr-webstudio.com/${locale === "es" ? "es" : "en"}`}
              className={`${smallLink} gap-1.5 text-ivory/80`}
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
          </span>
          <span className="basis-full md:basis-auto md:border-l md:border-l-[rgba(207,174,112,0.2)] md:pl-3">
            {credit[locale].tagline}
          </span>
        </p>
      </div>
    </footer>
  );
}
