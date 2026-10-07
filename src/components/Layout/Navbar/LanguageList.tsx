import LanguageLink from "./LanguageLink";
import { splitLanguages } from "./navigation";
import type { LanguageOptions } from "./types";

/**
 * The languages in the phone menu, listed directly under a "Language"
 * heading (the desktop bar has the LanguageMenu dropdown instead).
 */
export default function LanguageList({
  current,
  languages,
  hrefFor,
  label,
  onPick,
}: LanguageOptions & {
  /** Choosing a language also closes the menu. */
  onPick: () => void;
}) {
  const { site, blog } = splitLanguages(languages);
  const link = (language: (typeof languages)[number]) => (
    <LanguageLink
      key={language}
      language={language}
      current={current}
      href={hrefFor(language)}
      inline
      onPick={onPick}
    />
  );

  return (
    <div>
      <p className="mb-1 text-[11px] tracking-[0.2em] text-ivory/50 uppercase">
        {label}
      </p>
      <ul className="flex flex-wrap gap-x-6">{site.map(link)}</ul>
      {blog.length > 0 && (
        <>
          <p className="mt-2 border-t border-t-gold/15 pt-3 pb-1 text-[11px] tracking-[0.2em] text-ivory/50 uppercase">
            Blog
          </p>
          <ul className="flex flex-wrap gap-x-6">{blog.map(link)}</ul>
        </>
      )}
    </div>
  );
}
