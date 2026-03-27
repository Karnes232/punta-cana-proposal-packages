"use client";

import { useCustomization } from "@/components/CategoryPage/CustomizationSelector/CustomizationContext";
import PackageCardImage from "./PackageCardImage";
import PackageCardInclusions from "./PackageCardInclusions";

export interface PackageCardProps {
  /** Package name */
  name: string;
  /** Unique slug */
  slug: string;
  /** Sanity image */
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
  /** Starting price */
  price: number;
  /** Short description */
  description?: string;
  /** Key inclusions (4–6 items) */
  inclusions?: string[];
  /** Optional badge (e.g. "Dinner Included") */
  badge?: string;
  /** CTA label */
  selectLabel?: string;
  selectedLabel?: string;
  /** Category slug — not used for routing anymore, kept for Sanity compat */
  categorySlug?: string;
  /** Color customization options */
  colorCustomizationOptions: {
    label: {
      en: string;
      es: string;
    };
    tier: string;
  }[];
  floralCustomizationOptions: {
    label: {
      en: string;
      es: string;
    };
    tier: string;
  }[];
  toneCustomizationOptions: {
    label: {
      en: string;
      es: string;
    };
    tier: string;
  }[];
}

export default function PackageCard({
  name,
  slug,
  image,
  price,
  description,
  colorCustomizationOptions = [],
  floralCustomizationOptions = [],
  toneCustomizationOptions = [],
  inclusions = [],
  badge,
  selectLabel = "Select Package",
  selectedLabel = "Selected",
}: PackageCardProps) {
  const { state, setSelectedPackage } = useCustomization();
  const isSelected = state.selectedPackage?.slug === slug;

  const handleSelect = () => {
    setSelectedPackage({
      name,
      slug,
      price,
      colorCustomizationOptions,
      floralCustomizationOptions,
      toneCustomizationOptions,
    });
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={`
        group relative flex h-full flex-col overflow-hidden text-left
        border transition-all duration-500 cursor-pointer w-full
        ${
          isSelected
            ? "border-gold/70 bg-gold/[0.06] ring-1 ring-gold/30"
            : "border-gold/20 bg-white/[0.03] hover:border-gold/50"
        }
      `}
      aria-pressed={isSelected}
      aria-label={`Select ${name}`}
    >
      {/* Image */}
      <PackageCardImage image={image} title={name} badge={badge} />

      {/* Card body */}
      <div className="flex flex-col gap-4 p-7 lg:p-8">
        {/* Name + Price row */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className={`
              font-display italic font-normal leading-tight tracking-[-0.01em]
              text-[clamp(20px,2vw,26px)] transition-colors duration-300 truncate
              ${isSelected ? "text-gold" : "text-white group-hover:text-gold"}
            `}
          >
            {name}
          </h3>
          <div className="shrink-0 text-right">
            <p className="text-[10px] font-light tracking-[0.12em] uppercase text-white/40">
              Starting at
            </p>
            <p className="text-[18px] font-medium text-gold leading-tight tabular-nums">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="min-h-[72px]">
          {description && (
            <p className="font-light text-white/50 text-[13.5px] leading-[1.8] group-hover:text-white/70 transition-colors duration-300 line-clamp-3">
              {description}
            </p>
          )}
        </div>

        {/* Inclusions */}
        <PackageCardInclusions items={inclusions} />

        {/* CTA row */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          {isSelected ? (
            <>
              {/* Checkmark */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-gold">
                {selectedLabel}
              </span>
            </>
          ) : (
            <>
              <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-gold">
                {selectLabel}
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
            </>
          )}
        </div>
      </div>

      {/* Corner accent — top right */}
      <div
        className={`
          absolute top-0 right-0 w-8 h-8 border-t border-r transition-all duration-500
          ${isSelected ? "border-gold/60" : "border-gold/0 group-hover:border-gold/40"}
        `}
        aria-hidden="true"
      />

      {/* Selected indicator — bottom-left corner */}
      {isSelected && (
        <div
          className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/60"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
