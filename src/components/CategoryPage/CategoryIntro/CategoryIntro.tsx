import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CategoryIntroOrnament from "./CategoryIntroOrnament";
import CategoryIntroEyebrow from "./CategoryIntroEyebrow";
import CategoryIntroHeading from "./CategoryIntroHeading";
import CategoryIntroDescription from "./CategoryIntroDescription";

type CategorySlug = "classic" | "modern" | "dining";

interface CategoryIntroProps {
  category: CategorySlug;
  locale?: string;
}

const content: Record<
  CategorySlug,
  Record<
    string,
    { eyebrow: string; line1: string; line2: string; description: string }
  >
> = {
  classic: {
    en: {
      eyebrow: "Timeless & Romantic",
      line1: "The Romance",
      line2: "You've Always Imagined",
      description:
        'Giant "Marry Me" letters, heart arches draped in roses, candlelit pathways to the shore — our classic setups bring the most romantic traditions to life against the Caribbean sunset.',
    },
    es: {
      eyebrow: "Atemporal y Romántica",
      line1: "El Romance",
      line2: "Que Siempre Imaginaste",
      description:
        'Letras gigantes de "Marry Me", arcos de corazón cubiertos de rosas, caminos de velas hacia la orilla — nuestras propuestas clásicas traen a la vida las tradiciones más románticas bajo el atardecer caribeño.',
    },
  },
  modern: {
    en: {
      eyebrow: "Bold & Contemporary",
      line1: "A Proposal",
      line2: "As Unique As Your Love",
      description:
        "Clean lines, unexpected florals, and creative details that break the mold. Our modern setups are designed for couples who want their proposal to feel as fresh and original as their story.",
    },
    es: {
      eyebrow: "Audaz y Contemporánea",
      line1: "Una Propuesta",
      line2: "Tan Única Como Tu Amor",
      description:
        "Líneas limpias, florales inesperados y detalles creativos que rompen esquemas. Nuestras propuestas modernas están diseñadas para parejas que quieren que su momento sea tan original como su historia.",
    },
  },
  dining: {
    en: {
      eyebrow: "Dinner & Romance",
      line1: "Where Fine Dining",
      line2: "Meets Forever",
      description:
        "A private table, a curated menu, and the Caribbean as your backdrop. Our dining proposals combine an exceptional culinary experience with a beautifully designed proposal moment — all in one unforgettable evening.",
    },
    es: {
      eyebrow: "Cena y Romance",
      line1: "Donde la Alta Cocina",
      line2: "Se Encuentra con el Para Siempre",
      description:
        "Una mesa privada, un menú curado y el Caribe como escenario. Nuestras propuestas con cena combinan una experiencia culinaria excepcional con un momento de propuesta diseñado con esmero — todo en una velada inolvidable.",
    },
  },
};

export default function CategoryIntro({
  category,
  locale = "en",
}: CategoryIntroProps) {
  const t = content[category][locale] ?? content[category].en;

  return (
    <section
      className="relative bg-ivory overflow-hidden"
      aria-label={t.line1 + " " + t.line2}
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

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-6 lg:px-12 py-24 lg:py-32 flex flex-col items-center gap-8">
        <RevealOnScroll delay={0}>
          <CategoryIntroOrnament />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <CategoryIntroEyebrow text={t.eyebrow} />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <CategoryIntroHeading line1={t.line1} line2={t.line2} />
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <CategoryIntroDescription text={t.description} />
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <CategoryIntroOrnament />
        </RevealOnScroll>
      </div>
    </section>
  );
}
