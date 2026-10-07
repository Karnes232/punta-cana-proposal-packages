import LanguageMenu from "./LanguageMenu";
import { inSection, isPage, NAV_LINKS } from "./navigation";
import type { CallToAction, LanguageOptions, Translate } from "./types";

/** The desktop bar: page links, the language menu and the call to action. */
export default function DesktopNav({
  path,
  prefix,
  t,
  languages,
  cta,
}: {
  path: string;
  prefix: string;
  t: Translate;
  languages: LanguageOptions;
  cta: CallToAction;
}) {
  return (
    <nav
      className="flex items-center gap-4 text-[13px] tracking-[0.1em] uppercase upto1280:hidden"
      aria-label={t("menu")}
    >
      {/* The logo links home, which leaves room for longer labels
          (French only fits without Home). */}
      {NAV_LINKS.slice(1).map(({ href, label }) => (
        <a
          key={href}
          href={`${prefix}/${href}`}
          aria-current={isPage(path, href) ? "page" : undefined}
          className={`relative py-2 whitespace-nowrap transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:bg-gold after:transition-transform after:duration-200 after:ease-out motion-reduce:transition-none motion-reduce:after:transition-none ${
            inSection(path, href)
              ? "text-gold after:scale-x-100"
              : "text-ivory/80 after:scale-x-0 focus-visible:after:scale-x-100 [&:hover]:text-ivory [&:hover]:after:scale-x-100"
          }`}
        >
          {t(label)}
        </a>
      ))}
      <span aria-hidden className="h-5 w-px bg-ivory/20" />
      <LanguageMenu {...languages} />
      <a
        href={cta.href}
        className="border border-gold px-5 py-2.5 whitespace-nowrap text-gold transition-[color,background-color,transform] duration-200 focus-visible:bg-gold focus-visible:text-black active:scale-[0.98] motion-reduce:transition-none [&:hover]:bg-gold [&:hover]:text-black"
      >
        {cta.label}
      </a>
    </nav>
  );
}
