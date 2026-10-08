// The business as schema.org structured data, built from Business info so
// it is always complete. Relative imports: the tests compile this file.
import { dialNumber, isProfileLink } from "../Layout/Footer/contact";

/** The Business info fields it uses (GeneralLayout has them all). */
type BusinessInfo = {
  companyName?: string;
  companyDescription?: Partial<Record<string, string>>;
  companyLogo?: { asset?: { url?: string } };
  telephone?: string;
  email?: string;
  socialLinks?: Partial<Record<string, string>>;
};

/**
 * One Organization: name, description in the page's language, home page,
 * logo, contact details and the social profiles that are set. Empty fields
 * are left out rather than printed as "".
 */
export function organizationSchema(
  company: BusinessInfo | null,
  {
    locale,
    siteUrl,
    homeUrl,
    languages,
  }: {
    locale: string;
    /** The site's address, the same in every language (for @id). */
    siteUrl: string;
    /** The home page in this language. */
    homeUrl: string;
    languages: readonly string[];
  },
) {
  const telephone = company?.telephone
    ? dialNumber(company.telephone)
    : undefined;
  const email = company?.email || undefined;
  const sameAs = Object.values(company?.socialLinks ?? {}).filter(
    (url): url is string => typeof url === "string" && isProfileLink(url),
  );
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company?.companyName || "Punta Cana Proposal Packages",
    description: company?.companyDescription?.[locale] || undefined,
    url: homeUrl,
    logo: company?.companyLogo?.asset?.url || undefined,
    email,
    telephone,
    contactPoint:
      telephone || email
        ? {
            "@type": "ContactPoint",
            telephone,
            email,
            contactType: "customer service",
            availableLanguage: [...languages],
          }
        : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Punta Cana",
      addressCountry: "DO",
    },
    sameAs: sameAs.length ? sameAs : undefined,
  };
}
