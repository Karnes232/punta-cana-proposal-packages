import type { Locale, Settings } from "@/lib/experience/types";
import type { GeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { label } from "@/lib/experience/labels";

const footerLink =
  "my-[5px] mr-3 ml-0 inline-block text-[0.85rem] [&:hover]:text-gold";
export default function CatalogFooter({
  locale,
  settings,
  company,
}: {
  locale: Locale;
  settings: Settings;
  company: GeneralLayout | null;
}) {
  const prefix = locale === "es" ? "/es" : "";
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
    </footer>
  );
}
