import HowItWorksHeroEyebrow from "./HowItWorksHeroEyebrow";
import HowItWorksHeroHeading from "./HowItWorksHeroHeading";
import HowItWorksHeroDivider from "./HowItWorksHeroDivider";
import HowItWorksHeroSubheading from "./HowItWorksHeroSubheading";

// ─── Content ──────────────────────────────────────────────────────────────────

const content = {
  en: {
    eyebrow: "The Process",
    line1: "How We Make",
    line2: "It Happen",
    subheading:
      "From your first message to the moment she says yes — every detail is handled with care, so you can focus on what truly matters.",
  },
  es: {
    eyebrow: "El Proceso",
    line1: "Así Lo",
    line2: "Hacemos Realidad",
    subheading:
      "Desde tu primer mensaje hasta el momento en que ella dice que sí — cada detalle está cuidado para que tú solo tengas que vivir el momento.",
  },
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksHeroProps {
  locale: "en" | "es";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksHero({ locale }: HowItWorksHeroProps) {
  const t = content[locale];

  return (
    <section
      className="
        relative w-full bg-[#0B0B0C]
        pt-40 pb-28
        flex flex-col items-center justify-center gap-6 text-center overflow-hidden
      "
      aria-labelledby="how-it-works-heading"
    >
      {/* Subtle radial glow behind heading */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(207,174,112,0.06) 0%, transparent 70%)",
        }}
      />

      <HowItWorksHeroEyebrow label={t.eyebrow} />
      <HowItWorksHeroHeading line1={t.line1} line2={t.line2} />
      <HowItWorksHeroDivider />
      <HowItWorksHeroSubheading text={t.subheading} />

      {/* Bottom fade into next section (ivory bg) */}
      {/* <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent, #F7F5F1)",
        }}
      /> */}
    </section>
  );
}