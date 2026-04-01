import { useTranslations } from "next-intl";
import PackageHeroBackground from "./PackageHeroBackground";
import PackageHeroBreadcrumb from "./PackageHeroBreadcrumb";
import PackageHeroPrice from "./PackageHeroPrice";

interface PackageHeroProps {
  /** Package name (already locale-resolved) */
  name: string;
  /** Base price */
  price: number;
  /** Hero image from Sanity */
  image?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  /** Breadcrumb data — resolved in page.tsx */
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
  /** "Starting at" label — locale-resolved */

}

export default function PackageHero({
  name,
  price,
  image,
  breadcrumbs,

}: PackageHeroProps) {
  const t = useTranslations("PackagePage.PackageHero");
  return (
    <section className="relative w-full min-h-[70svh] flex items-end justify-center overflow-hidden bg-black">
      {/* ── Background layer ── */}
      <PackageHeroBackground image={image} />

      {/* ── Gold corner accents ── */}
      <div
        className="absolute top-8 left-8 w-10 h-10 border-t border-l border-gold/30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-10 h-10 border-t border-r border-gold/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 pb-20 md:pb-24 text-center max-w-[860px] mx-auto">
        {/* Breadcrumb */}
        <PackageHeroBreadcrumb items={breadcrumbs} />

        {/* Eyebrow — package name doubles as the eyebrow context isn't needed here */}

        {/* Package name */}
        <h1
          className="
            font-display font-normal text-center leading-[1.1] tracking-tight
            text-[clamp(36px,5.5vw,72px)]
            animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:400ms]
          "
        >
          <span className="block italic text-gold">{name}</span>
        </h1>

        {/* Divider */}
        <div
          className="
            flex items-center justify-center gap-3
            animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 [animation-delay:500ms]
          "
          aria-hidden="true"
        >
          <span className="block w-12 h-px bg-gold/30" />
          <span className="block w-1 h-1 rotate-45 bg-gold/50" />
          <span className="block w-12 h-px bg-gold/30" />
        </div>

        {/* Price */}
        <PackageHeroPrice price={price} label={t("startingAtLabel")} />
      </div>
    </section>
  );
}