import { depositText } from "@/lib/experience/dinnerPolicy";
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
    <header id="experience-guide" className="ec-catalog-intro">
      <Heading>
        {standalone
          ? t("Title")
          : locale === "es"
            ? "Tu experiencia, paso a paso"
            : "Your experience, step by step"}
      </Heading>
      <div className="ec-intro-box">
        <p className="ec-intro-lead">{t("Description")}</p>
        {dinner && (
          <aside className="ec-privacy-note">
            <strong>{label(settings, locale, "dinnerPrivacyTagline")}</strong>
            <p>{label(settings, locale, "dinnerExclusivity")}</p>
            <p>
              {label(settings, locale, "dinnerRequestNote").replaceAll(
                "{deposit}",
                depositText(settings, locale),
              )}
            </p>
            <p>{label(settings, locale, "dinnerPaymentNote")}</p>
          </aside>
        )}
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
