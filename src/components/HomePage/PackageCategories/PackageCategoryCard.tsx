// Server Component

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface PackageCategoryCardProps {
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  href: string;
  image: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  };
  ctaButtonLabel: {
    en: string;
    es: string;
  };
  locale?: string;
  index?: number; // for staggered reveal delay
}

export default function PackageCategoryCard({
  title,
  description,
  href,
  image,
  ctaButtonLabel,
  locale,
}: PackageCategoryCardProps) {
  const t = useTranslations("PackageCategoryCard");
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden border border-gold/20 bg-white/[0.03] hover:border-gold/50 transition-all duration-500"
      aria-label={`View ${title}`}
    >
      {/* Image container */}
      <div className="relative w-full overflow-hidden aspect-[4/3]">
        {image ? (
          <Image
            src={image.asset.url}
            alt={image.alt}
            fill
            className="opacity-50 object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          /* Placeholder when no image is provided */
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold/30"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        )}

        {/* Gradient overlay on image — darkens bottom for text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          aria-hidden="true"
        />

        {/* Gold shimmer line on hover — slides in from left */}
        <div
          className="absolute bottom-0 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-500"
          aria-hidden="true"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-8">
        {/* Title */}
        <h3 className="font-display italic font-normal text-white text-[clamp(20px,2vw,26px)] leading-tight tracking-[-0.01em] group-hover:text-gold transition-colors duration-300">
          {title[locale as "en" | "es"]}
        </h3>

        {/* Description */}
        <p className="font-light text-white/50 text-[13.5px] leading-[1.8] group-hover:text-white/70 transition-colors duration-300">
          {description[locale as "en" | "es"]}
        </p>

        {/* CTA row */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-gold">
            {ctaButtonLabel[locale as "en" | "es"]}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>

      {/* Corner accent — top right */}
      <div
        className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/0 group-hover:border-gold/40 transition-all duration-500"
        aria-hidden="true"
      />
    </Link>
  );
}
