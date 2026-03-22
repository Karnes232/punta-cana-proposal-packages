import ContactHeroEyebrow from "./ContactHeroEyebrow";
import ContactHeroHeading from "./ContactHeroHeading";
import ContactHeroDivider from "./ContactHeroDivider";
import ContactHeroSubheading from "./ContactHeroSubheading";

interface ContactHeroProps {
  heroEyebrow: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroSubheading: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactHero({
  heroEyebrow,
  heroHeadingLine1,
  heroHeadingLine2,
  heroSubheading,
}: ContactHeroProps) {
  return (
    <section
      className="
        relative w-full bg-[#0B0B0C]
        pt-40 pb-28
        flex flex-col items-center justify-center gap-6 text-center overflow-hidden
      "
      aria-labelledby="contact-heading"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(207,174,112,0.06) 0%, transparent 70%)",
        }}
      />

      <ContactHeroEyebrow label={heroEyebrow} />
      <ContactHeroHeading line1={heroHeadingLine1} line2={heroHeadingLine2} />
      <ContactHeroDivider />
      <ContactHeroSubheading text={heroSubheading} />

      {/* Bottom fade into ivory content area */}
      {/* <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent, #F7F5F1)" }}
      /> */}
    </section>
  );
}
