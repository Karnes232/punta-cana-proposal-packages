import type { ReactNode } from "react";
import { eyebrowClass } from "@/components/ExperienceCatalog/styles";

/**
 * The black band at the top of a text page (legal, contact): an optional
 * gold label, the page title and a short line under it.
 */
export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  /** The line under the title, e.g. the last edit or an intro. */
  children?: ReactNode;
}) {
  return (
    <header className="bg-black text-ivory">
      <div className="mx-auto max-w-[1100px] px-6 py-14 lg:px-12 lg:py-16">
        {eyebrow && (
          <p className={`${eyebrowClass({ color: "text-gold" })} mb-3`}>
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.15] font-normal text-balance text-ivory">
          {title}
        </h1>
        {children}
      </div>
    </header>
  );
}
