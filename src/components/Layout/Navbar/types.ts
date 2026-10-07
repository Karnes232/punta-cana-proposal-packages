import type { AppLocale } from "@/i18n/locales";

/** A Catalog text in the visitor's language. */
export type Translate = (key: string) => string;

/** What both language switchers need: the desktop menu and the phone list. */
export type LanguageOptions = {
  current: AppLocale;
  languages: readonly AppLocale[];
  hrefFor: (language: AppLocale) => string;
  /** "Language" in the visitor's language. */
  label: string;
};

/** The header's call to action ("Plan your proposal" or celebration). */
export type CallToAction = { href: string; label: string };
