import { depositText } from "@/lib/experience/dinnerPolicy";
import { label } from "@/lib/experience/labels";
import type { Locale, Settings } from "@/lib/experience/types";

/**
 * How a catalog page works: a lead paragraph, the dinner privacy promise
 * (dinners only), the four numbered steps and the small print. Colours come
 * from the --ec-* variables, so it works on the light and the dark page.
 */
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
    <header id="experience-guide" className="mb-14 scroll-mt-[120px]">
      <Heading className="mb-6 max-w-[980px] text-balance">
        {standalone ? t("Title") : label(settings, locale, "introStepsHeading")}
      </Heading>
      <p className="mt-0 mb-12 max-w-[65ch] text-[18px] leading-[1.7] text-(--ec-ink) upto600:text-[17px]">
        {t("Description")}
      </p>
      {dinner && (
        <section className="mb-12 grid gap-x-12 gap-y-4 border-y border-(--ec-border) py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <h3 className="m-0 max-w-[14ch] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] font-normal text-balance">
            {label(settings, locale, "dinnerPrivacyTagline")}
          </h3>
          <div className="text-[16px] [&>p]:my-0 [&>p+p]:mt-4">
            <p>{label(settings, locale, "dinnerExclusivity")}</p>
            <p>
              {label(settings, locale, "dinnerRequestNote").replaceAll(
                "{deposit}",
                depositText(settings, locale),
              )}
            </p>
            <p>{label(settings, locale, "dinnerPaymentNote")}</p>
          </div>
        </section>
      )}
      <ol className="m-0 grid list-none gap-x-10 gap-y-10 p-0 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((step) => (
          <li key={step} className="border-t border-(--ec-border) pt-5">
            <span
              aria-hidden="true"
              className={`block font-display text-[2rem] leading-none ${dinner ? "text-[#9b773d]" : "text-gold"}`}
            >
              {String(step).padStart(2, "0")}
            </span>
            <h3 className="mt-4 mb-0 font-body! text-[17px] leading-[1.4] font-semibold">
              {t(`Step${step}Title`)}
            </h3>
            <p className="mt-2 mb-0 text-[15px] leading-[1.65]">
              {t(`Step${step}`)}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-10 mb-0 max-w-[85ch] text-[14px] leading-[1.6]">
        {t("Note")}
      </p>
    </header>
  );
}
