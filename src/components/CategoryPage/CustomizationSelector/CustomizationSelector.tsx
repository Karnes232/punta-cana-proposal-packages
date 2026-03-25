import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CustomizationSelectorClient from "./CustomizationSelectorClient";
import { OptionItem } from "./OptionGroup";
import { CUSTOMIZATION_OPTIONS } from "./customizationData";

type CategorySlug = "classic" | "modern" | "dining";

interface CustomizationSelectorProps {
  category: CategorySlug;
  locale?: string;
  /** Override options from Sanity */
  colors?: OptionItem[];
  florals?: OptionItem[];
  tones?: OptionItem[];
}

const content: Record<
  string,
  {
    eyebrow: string;
    line1: string;
    line2: string;
    description: string;
    tierStandard: string;
    tierPremium: string;
    colorTitle: string;
    floralTitle: string;
    toneTitle: string;
  }
> = {
  en: {
    eyebrow: "Make It Yours",
    line1: "Personalize",
    line2: "Your Experience",
    description:
      "Choose from our curated palettes, florals, and styling to make your proposal uniquely yours.",
    tierStandard: "Standard",
    tierPremium: "Premium",
    colorTitle: "Color Palette",
    floralTitle: "Floral Style",
    toneTitle: "Overall Tone",
  },
  es: {
    eyebrow: "Hazlo Tuyo",
    line1: "Personaliza",
    line2: "Tu Experiencia",
    description:
      "Elige entre nuestras paletas, florales y estilos curados para hacer tu propuesta única.",
    tierStandard: "Estándar",
    tierPremium: "Premium",
    colorTitle: "Paleta de Color",
    floralTitle: "Estilo Floral",
    toneTitle: "Tono General",
  },
};

export default function CustomizationSelector({
  category,
  locale = "en",
  colors,
  florals,
  tones,
}: CustomizationSelectorProps) {
  const t = content[locale] ?? content.en;
  const defaults = CUSTOMIZATION_OPTIONS[category];

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(207,174,112,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        {/* Section header */}
        <div className="flex flex-col items-center gap-5 mb-14 lg:mb-16">
          <RevealOnScroll delay={0}>
            <div className="flex items-center justify-center gap-3">
              <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
              <p className="text-[10.5px] font-light tracking-[0.28em] uppercase text-gold/80">
                {t.eyebrow}
              </p>
              <span className="block w-8 h-px bg-gold/60" aria-hidden="true" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h2 className="font-display font-normal text-center leading-[1.1] tracking-tight text-[clamp(28px,3.5vw,48px)]">
              <span className="block text-white">{t.line1}</span>
              <span className="block italic text-gold">{t.line2}</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div
              className="flex items-center justify-center gap-3"
              aria-hidden="true"
            >
              <span className="block w-12 h-px bg-gold/30" />
              <span className="block w-1 h-1 rotate-45 bg-gold/50" />
              <span className="block w-12 h-px bg-gold/30" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={250}>
            <p className="text-center font-light text-white/55 leading-[1.85] text-[clamp(14px,1.5vw,17px)] max-w-[520px] mx-auto">
              {t.description}
            </p>
          </RevealOnScroll>
        </div>

        {/* Interactive client component */}
        <RevealOnScroll delay={350}>
          <CustomizationSelectorClient
            colors={colors ?? defaults.colors}
            florals={florals ?? defaults.florals}
            tones={tones ?? defaults.tones}
            labels={{
              tierStandard: t.tierStandard,
              tierPremium: t.tierPremium,
              colorTitle: t.colorTitle,
              floralTitle: t.floralTitle,
              toneTitle: t.toneTitle,
            }}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
