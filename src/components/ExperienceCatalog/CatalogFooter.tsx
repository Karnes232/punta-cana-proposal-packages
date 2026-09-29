import type { Locale, Settings } from "@/lib/experience/types";
import type { GeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { label } from "@/lib/experience/labels";
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
    <footer className="ec-footer">
      <div>
        <div>
          <p>{company?.companyName}</p>
          <nav>
            {[
              ["proposals", "proposalSectionTitle"],
              ["romantic-dinners", "dinnerSectionTitle"],
              ["contact", "contactUsLabel"],
              ["privacy-policy", "privacy"],
              ["terms-of-service", "terms"],
            ].map(([path, key]) => (
              <a key={path} href={`${prefix}/${path}`}>
                {label(settings, locale, key)}
              </a>
            ))}
          </nav>
        </div>
        <div>
          {company?.telephone && (
            <a href={`tel:${company.telephone}`}>{company.telephone}</a>
          )}
          {company?.email && (
            <a href={`mailto:${company.email}`}>{company.email}</a>
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
                <a key={name} href={url} rel="noopener noreferrer">
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
