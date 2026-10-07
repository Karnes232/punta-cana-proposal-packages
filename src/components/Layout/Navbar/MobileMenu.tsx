import LanguageList from "./LanguageList";
import { inSection, isPage, NAV_LINKS } from "./navigation";
import type { CallToAction, LanguageOptions, Translate } from "./types";

/**
 * The phone and tablet menu: a full-screen sheet under the header bar with
 * the page links, the languages and the call to action. Anything chosen in
 * it closes it.
 */
export default function MobileMenu({
  id,
  path,
  prefix,
  t,
  languages,
  cta,
  onClose,
}: {
  id: string;
  path: string;
  prefix: string;
  t: Translate;
  languages: LanguageOptions;
  cta: CallToAction;
  onClose: () => void;
}) {
  return (
    <div
      id={id}
      className="fixed inset-x-0 top-(--header-h) bottom-0 hidden overflow-y-auto bg-black motion-safe:animate-[ec-sheet-in_200ms_ease-out] upto1280:block"
    >
      <nav
        aria-label={t("menu")}
        className="m-auto flex min-h-full max-w-[640px] flex-col px-6 pt-4 pb-[max(24px,env(safe-area-inset-bottom))]"
      >
        <ul>
          {NAV_LINKS.map(({ href, label }, index) => (
            <li
              key={href}
              className="border-b border-gold/15 motion-safe:animate-[ec-rise_300ms_ease-out_both]"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <a
                href={`${prefix}/${href}`}
                aria-current={isPage(path, href) ? "page" : undefined}
                onClick={onClose}
                className={`flex min-h-14 items-center gap-3 font-display text-[26px] transition-colors duration-200 ${inSection(path, href) ? "text-gold" : "text-ivory [&:hover]:text-gold"}`}
              >
                {inSection(path, href) && (
                  <span aria-hidden className="h-px w-5 bg-gold" />
                )}
                {t(label)}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <LanguageList {...languages} onPick={onClose} />
        </div>
        <div className="mt-auto pt-8">
          <a
            href={cta.href}
            onClick={onClose}
            className="block bg-gold px-5 py-4 text-center text-[13px] tracking-[0.12em] text-black uppercase transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none"
          >
            {cta.label}
          </a>
        </div>
      </nav>
    </div>
  );
}
