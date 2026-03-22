import ContactHeroEyebrow from "./ContactHeroEyebrow";
import ContactHeroHeading from "./ContactHeroHeading";
import ContactHeroDivider from "./ContactHeroDivider";
import ContactHeroSubheading from "./ContactHeroSubheading";
import ContactHeroBackground from "./ContactHeroBackground";

interface ContactHeroProps {
  heroEyebrow: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroSubheading: string;
  heroImage?: {
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
  } | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactHero({
  heroEyebrow,
  heroHeadingLine1,
  heroHeadingLine2,
  heroSubheading,
  heroImage,
}: ContactHeroProps) {
  const imageAltFallback =
    [heroHeadingLine1, heroHeadingLine2].filter(Boolean).join(" ") ||
    heroEyebrow ||
    "Contact";

  return (
    <section
      className="
        relative w-full bg-[#0B0B0C]
        pt-40 pb-28
        flex flex-col items-center justify-center gap-6 text-center overflow-hidden
      "
      aria-labelledby="contact-heading"
    >
      {heroImage ? (
        <ContactHeroBackground
          photo={heroImage}
          altFallback={imageAltFallback}
        />
      ) : null}

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(207,174,112,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        <ContactHeroEyebrow label={heroEyebrow} />
        <ContactHeroHeading line1={heroHeadingLine1} line2={heroHeadingLine2} />
        <ContactHeroDivider />
        <ContactHeroSubheading text={heroSubheading} />
      </div>
    </section>
  );
}
