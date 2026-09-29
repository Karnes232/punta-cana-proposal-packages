import { label } from "@/lib/experience/labels";
import type { Locale, Settings } from "@/lib/experience/types";

export default function CatalogIntroduction({
  dinner,
  standalone,
  locale,
  settings,
}: {
  dinner: boolean;
  standalone: boolean;
  locale: Locale;
  settings: Settings;
}) {
  const Heading = standalone ? "h1" : "h2";
  const prefix = dinner ? "dinnerIntro" : "proposalIntro";
  const t = (suffix: string) => label(settings, locale, prefix + suffix);
  return (
    <header className="ec-catalog-intro">
      <Heading>{t("Title")}</Heading>
      <div className="ec-intro-box">
        <p className="ec-intro-lead">{t("Description")}</p>
        <ol>
          {[1, 2, 3, 4].map((step) => (
            <li key={step}>
              <strong>{t(`Step${step}Title`)}</strong>
              <p>{t(`Step${step}`)}</p>
            </li>
          ))}
        </ol>
        <p className="ec-intro-note">{t("Note")}</p>
      </div>
    </header>
  );
}
