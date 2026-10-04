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
    <header id="experience-guide" className="mb-10 scroll-mt-[120px]">
      <Heading className="mb-7 max-w-[980px]">
        {standalone
          ? t("Title")
          : locale === "es"
            ? "Tu experiencia, paso a paso"
            : "Your experience, step by step"}
      </Heading>
      <div
        className={`border border-t-2 border-(--ec-border) border-t-gold p-[clamp(20px,3vw,36px)] ${dinner ? "bg-[#ffffff60]" : "bg-[#141416]"}`}
      >
        <p className="mx-0 mt-0 mb-7 max-w-[85ch] text-[1.05rem] text-(--ec-ink)">
          {t("Description")}
        </p>
        {dinner && (
          <aside className="mx-0 mt-6 mb-8 border-l-2 border-l-gold bg-[#cfae700d] p-6">
            <strong className="font-display text-[1.5rem]">
              {label(settings, locale, "dinnerPrivacyTagline")}
            </strong>
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
        <ol className="grid list-decimal grid-cols-2 gap-x-10 gap-y-6 pl-6 upto700:grid-cols-[1fr]">
          {[1, 2, 3, 4].map((step) => (
            <li
              key={step}
              className={`marker:font-semibold ${dinner ? "marker:text-[#9b773d]" : "marker:text-gold"}`}
            >
              <strong>{t(`Step${step}Title`)}</strong>
              <p className="mx-0 mt-2 mb-0 text-[0.9rem]">{t(`Step${step}`)}</p>
            </li>
          ))}
        </ol>
        <p className="mx-0 mt-7 mb-0 border-t border-t-(--ec-border) pt-5 text-[14px]">
          {t("Note")}
        </p>
      </div>
    </header>
  );
}
