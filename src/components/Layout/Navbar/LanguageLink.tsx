import { FiCheck } from "react-icons/fi";
import { LANGUAGE_NAMES, type AppLocale } from "@/i18n/locales";

/** One language, in its own name; the current one is gold and checked. */
export default function LanguageLink({
  language,
  current,
  href,
  inline = false,
  onPick,
}: {
  language: AppLocale;
  current: AppLocale;
  href: string;
  /** In the phone menu's list rather than the desktop dropdown. */
  inline?: boolean;
  onPick: () => void;
}) {
  return (
    <li>
      <a
        href={href}
        lang={language}
        hrefLang={language}
        aria-current={language === current ? "true" : undefined}
        className={`flex min-h-11 items-center gap-4 text-[14px] normal-case tracking-normal transition-colors duration-200 [&:hover]:text-gold ${inline ? "" : "justify-between px-4"} ${language === current ? "text-gold" : inline ? "text-ivory/80" : "text-ivory"}`}
        onClick={onPick}
      >
        <span dir={language === "ar" ? "rtl" : undefined}>
          {LANGUAGE_NAMES[language]}
        </span>
        {language === current && <FiCheck aria-hidden />}
      </a>
    </li>
  );
}
