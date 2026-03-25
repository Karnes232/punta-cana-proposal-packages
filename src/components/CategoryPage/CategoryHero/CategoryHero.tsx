import CategoryHeroBackground from "./CategoryHeroBackground";
import CategoryHeroBreadcrumb from "./CategoryHeroBreadcrumb";
import CategoryHeroEyebrow from "./CategoryHeroEyebrow";
import CategoryHeroHeading from "./CategoryHeroHeading";
import CategoryHeroDivider from "./CategoryHeroDivider";
import CategoryHeroSubheading from "./CategoryHeroSubheading";

type CategorySlug = "classic" | "modern" | "dining";

interface CategoryHeroProps {
  category: CategorySlug;
  locale?: string;
  /** Hero image from Sanity — same shape as homepage Hero */
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
}

const content: Record<
  CategorySlug,
  Record<
    string,
    {
      eyebrow: string;
      line1: string;
      line2: string;
      subheading: string;
      breadcrumb: string;
    }
  >
> = {
  classic: {
    en: {
      eyebrow: "Timeless & Romantic",
      line1: "Classic",
      line2: "Proposals",
      subheading:
        "Timeless romance on the shores of Punta Cana — roses, candles, and the warm glow of the Caribbean sunset.",
      breadcrumb: "Classic Proposals",
    },
    es: {
      eyebrow: "Atemporal y Romántica",
      line1: "Propuestas",
      line2: "Clásicas",
      subheading:
        "Romance atemporal en las costas de Punta Cana — rosas, velas y el cálido resplandor del atardecer caribeño.",
      breadcrumb: "Propuestas Clásicas",
    },
  },
  modern: {
    en: {
      eyebrow: "Bold & Contemporary",
      line1: "Modern",
      line2: "Proposals",
      subheading:
        "Contemporary design for unforgettable moments — creative setups as unique as your love story.",
      breadcrumb: "Modern Proposals",
    },
    es: {
      eyebrow: "Audaz y Contemporánea",
      line1: "Propuestas",
      line2: "Modernas",
      subheading:
        "Diseño contemporáneo para momentos inolvidables — montajes creativos tan únicos como tu historia de amor.",
      breadcrumb: "Propuestas Modernas",
    },
  },
  dining: {
    en: {
      eyebrow: "Dinner & Romance",
      line1: "Dining",
      line2: "Proposals",
      subheading:
        "An exquisite dinner, a breathtaking setting, and the most important question of your life.",
      breadcrumb: "Dining Proposals",
    },
    es: {
      eyebrow: "Cena y Romance",
      line1: "Propuestas",
      line2: "con Cena",
      subheading:
        "Una cena exquisita, un escenario impresionante y la pregunta más importante de tu vida.",
      breadcrumb: "Propuestas con Cena",
    },
  },
};

const homeLabel: Record<string, string> = {
  en: "Home",
  es: "Inicio",
};

export default function CategoryHero({
  category,
  locale = "en",
  image = {
    asset: {
      url: "https://picsum.photos/1920/1080?random=1",
      metadata: {
        dimensions: {
          width: 1920,
          height: 1080,
        },
      },
    },
    alt: "Proposal setup in Punta Cana",
  },
}: CategoryHeroProps) {
  const t = content[category][locale] ?? content[category].en;

  return (
    <section className="relative w-full min-h-[70svh] flex items-end justify-center overflow-hidden bg-black">
      {/* ── Background layer ── */}
      <CategoryHeroBackground image={image} />

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
        {/* <CategoryHeroBreadcrumb items={breadcrumbItems} /> */}

        <CategoryHeroEyebrow text={t.eyebrow} />

        <CategoryHeroHeading line1={t.line1} line2={t.line2} />

        <CategoryHeroDivider />

        <CategoryHeroSubheading text={t.subheading} />
      </div>
    </section>
  );
}
