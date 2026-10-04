/**
 * Tailwind class lists shared by several experience-catalog components.
 * Breakpoints use the inclusive upto* variants defined in globals.css.
 */

/** Centered page column used by the catalog, detail and contact pages. */
export const wrapClass =
  "m-auto max-w-[1280px] px-7 py-12 upto800:px-5 upto800:py-7 upto390:px-3.5";

/** Home page building blocks. */
export const homeSection =
  "m-auto max-w-[1280px] scroll-mt-[120px] px-10 py-[88px] upto700:px-6 upto700:py-14";
export const homeDarkSection =
  "m-auto max-w-none scroll-mt-[120px] bg-black px-10 py-[88px] text-ivory upto700:px-6 upto700:py-14";
export const homeH2 =
  "mb-8 max-w-[960px] text-[clamp(2.3rem,4vw,4rem)] upto700:text-[2.3rem]";
export const homeH3 = "text-[1.8rem] leading-[1.25]";
/** Icons are gold, except inside buttons where they take the text colour. */
export const homeIcon = "shrink-0 text-gold";
export const homeButtonIcon = "shrink-0 text-inherit";
export const homeButton =
  "inline-flex items-center justify-center gap-4 text-[14px] tracking-[0.07em]";
export const homeTextLink =
  "mt-8 inline-flex items-center gap-4 border-b border-b-gold pb-2";
