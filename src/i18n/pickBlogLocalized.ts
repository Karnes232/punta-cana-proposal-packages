import type { AppLocale } from "@/i18n/blogLocales";

/** Fields stored from Sanity `blogLocalizedString` / `blogLocalizedText`. */
export type BlogLocalizedValue = Partial<Record<AppLocale, string | undefined>>;

/**
 * Picks copy for the requested locale, then English, then Spanish.
 */
export function pickBlogLocalized(
  field: BlogLocalizedValue | null | undefined,
  locale: string,
): string {
  if (!field) return "";
  const direct = field[locale as AppLocale];
  if (typeof direct === "string" && direct.trim() !== "") return direct;
  if (field.en?.trim()) return field.en;
  if (field.es?.trim()) return field.es;
  return "";
}

/** BCP 47-ish locale for `Date.prototype.toLocaleDateString`. */
export function blogDateFormatLocale(locale: string): string {
  const map: Record<string, string> = {
    en: "en-US",
    es: "es",
    fr: "fr",
    de: "de",
    it: "it",
    pt: "pt",
  };
  return map[locale] ?? "en-US";
}
