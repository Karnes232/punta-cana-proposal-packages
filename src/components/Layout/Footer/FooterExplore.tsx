import { columnHeading, link } from "./styles";

// [path under the language prefix, Catalog text key]
const PAGES = [
  ["proposals", "proposalSectionTitle"],
  ["romantic-dinners", "dinnerSectionTitle"],
  ["blog", "blog"],
  ["faq", "faq"],
  ["contact", "contactUsLabel"],
];

/** The Explore column: the main pages. */
export default function FooterExplore({
  prefix,
  t,
}: {
  prefix: string;
  t: (key: string) => string;
}) {
  return (
    <nav aria-label={t("siteLinks")}>
      <p className={columnHeading}>{t("footerExplore")}</p>
      <ul>
        {PAGES.map(([path, key]) => (
          <li key={path}>
            <a href={`${prefix}/${path}`} className={link}>
              {t(key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
