/**
 * Tailwind class lists shared by several experience-catalog components.
 * Breakpoints use the inclusive upto* variants defined in globals.css.
 */

/**
 * Page shell for catalog pages. The ec-shell class is kept as the scope for
 * the element defaults (p, small, form fields, headings) in globals.css; the
 * --ec-* variables are the colours those defaults and some components use.
 */
export function shellClass(dark = false) {
  return [
    "ec-shell min-h-[70vh] font-[family-name:var(--font-inter),sans-serif] text-[16px] leading-[1.65] text-(--ec-ink)",
    "[--ec-border:#ded5c4] [--ec-paper:#f7f5f1]",
    dark
      ? "bg-black [--ec-ink:#f7f5f1] [--ec-muted:#b9b7b5]"
      : "bg-(--ec-paper) [--ec-ink:#0b0b0c] [--ec-muted:#6e6e73]",
  ].join(" ");
}

/**
 * Gold call-to-action button. Callers that need a different display, height,
 * letter-spacing, transition or colours replace that part rather than adding
 * a second, conflicting class.
 */
export function buttonClass({
  secondary = false,
  layout = "inline-block",
  height = "min-h-[46px]",
  tracking = "tracking-[0.14em]",
  motion = "[transition:background_0.2s]",
  colors = secondary
    ? "border-[#b99a62] bg-transparent bg-[position:0_0] text-(--ec-ink)"
    : "border-gold bg-gold text-black",
}: {
  secondary?: boolean;
  layout?: string;
  height?: string;
  tracking?: string;
  motion?: string;
  colors?: string;
} = {}) {
  return [
    "cursor-pointer rounded-none border px-[22px] py-[13px] text-center text-[14px] font-semibold uppercase disabled:cursor-not-allowed disabled:opacity-50 [&:hover:not(:disabled)]:bg-[#dfc493]",
    layout,
    height,
    tracking,
    motion,
    colors,
  ].join(" ");
}

/** Small uppercase label above a heading. */
export function eyebrowClass({
  size = "text-[14px]",
  color = "text-[#9b773d]",
} = {}) {
  return `${size} tracking-[0.18em] uppercase ${color}`;
}

/** Centered page column used by the catalog, detail and contact pages. */
export const wrapClass =
  "m-auto max-w-[1280px] px-7 py-12 upto800:px-5 upto800:py-7 upto390:px-3.5";
