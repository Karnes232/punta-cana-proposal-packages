import Image from "next/image";
import type { Locale } from "@/lib/experience/types";
import { smallLink } from "./styles";

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

/** The bottom bar's last row: DR Web Studio's credit and tagline. */
export default function FooterCredit({ locale }: { locale: Locale }) {
  return (
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
  );
}
