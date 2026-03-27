"use client";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import WhatsIncludedItem from "./WhatsIncludedItem";
// import { getInclusionsForCategory } from "./whatsIncludedData";
import { WhatsIncludedItemProps } from "./WhatsIncludedItem";
import { useCustomization } from "../CustomizationSelector/CustomizationContext";
import { useTranslations } from "next-intl";

interface WhatsIncludedProps {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  locale?: string;
  /** Override items from Sanity */
  items?: WhatsIncludedItemProps[];
}

export default function WhatsIncluded({
  eyebrow,
  headingLine1,
  headingLine2,
  description,

  locale = "en",
}: WhatsIncludedProps) {
  const { state } = useCustomization();
  const t = useTranslations("PackagePage.WhatsIncluded");
  const inclusions = state.selectedPackage?.inclusions;
  return (
    <section
      className="relative bg-ivory overflow-hidden"
      aria-label={headingLine1 + " " + headingLine2}
    >
      {/* Faint diagonal gold texture — matches BrandStatement */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #CFAE70 0px,
            #CFAE70 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Left + right edge gold hairlines */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Section header */}
        <div className="flex flex-col items-center gap-5 mb-16 lg:mb-20">
          <RevealOnScroll delay={0}>
            {/* Ornament */}
            <div
              className="flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <span className="block w-16 h-px bg-gold/40" />
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="text-gold/60"
              >
                <rect
                  x="5"
                  y="0.5"
                  width="6.36"
                  height="6.36"
                  transform="rotate(45 5 5)"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                <rect
                  x="5"
                  y="2.5"
                  width="3.54"
                  height="3.54"
                  transform="rotate(45 5 5)"
                  fill="currentColor"
                />
              </svg>
              <span className="block w-16 h-px bg-gold/40" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
              <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
                {eyebrow}
              </p>
              <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <h2 className="font-display font-normal text-center leading-[1.2] tracking-[-0.01em] text-[clamp(28px,3.5vw,48px)]">
              <span className="block text-black">{headingLine1}</span>
              <span className="block italic text-gold">{headingLine2}</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <p className="text-center font-light text-gray leading-[1.85] text-[clamp(14px,1.5vw,17px)] max-w-[520px] mx-auto">
              {description}
            </p>
          </RevealOnScroll>
        </div>

        {/* Icon grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
          {!inclusions && (
            <div className="col-span-6 text-center text-gray">
              <p className="text-[13px] font-light">{t("noPackageSelected")}</p>
            </div>
          )}
          {inclusions?.map((item, i) => {
            return (
              <RevealOnScroll
                key={item.title[locale as "en" | "es"] + i}
                delay={400 + i * 80}
              >
                <WhatsIncludedItem {...item} locale={locale as "en" | "es"} />
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Bottom ornament */}
        <RevealOnScroll delay={400 + (inclusions?.length ?? 0) * 80}>
          <div
            className="flex items-center justify-center gap-3 mt-16 lg:mt-20"
            aria-hidden="true"
          >
            <span className="block w-16 h-px bg-gold/40" />
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="text-gold/60"
            >
              <rect
                x="5"
                y="0.5"
                width="6.36"
                height="6.36"
                transform="rotate(45 5 5)"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <rect
                x="5"
                y="2.5"
                width="3.54"
                height="3.54"
                transform="rotate(45 5 5)"
                fill="currentColor"
              />
            </svg>
            <span className="block w-16 h-px bg-gold/40" />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
