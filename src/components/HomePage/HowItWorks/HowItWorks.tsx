// Server Component
// Ivory background section — gold is decorative only (connector lines, icon borders).
// All readable text is black or gray.

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HowItWorksEyebrow from "./HowItWorksEyebrow";
import HowItWorksHeading from "./HowItWorksHeading";
import HowItWorksCTA from "./HowItWorksCTA";
import HowItWorksSteps from "./HowItWorksSteps";

type StepIconType = "package" | "customize" | "setup" | "propose";
interface HowItWorksStepProps {
  step: number;
  icon: StepIconType;
  title: string;
  description: string;
  isLast?: boolean;
}

interface HowItWorksProps {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  ctaLabel?: string;
  ctaHref?: string;
  steps?: HowItWorksStepProps[];
}

export default function HowItWorks({
  eyebrow,
  headingLine1,
  headingLine2,
  ctaLabel,
  ctaHref,
  steps,
}: HowItWorksProps) {
  return (
    <section
      className="relative bg-ivory overflow-hidden"
      aria-label="How our proposal packages work"
    >
      {/* Faint diagonal texture — matches BrandStatement for consistency */}
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

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-28 lg:py-36 flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-5">
          <RevealOnScroll delay={0}>
            <HowItWorksEyebrow text={eyebrow} />
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <HowItWorksHeading line1={headingLine1} line2={headingLine2} />
          </RevealOnScroll>
        </div>

        {/* Steps */}
        <HowItWorksSteps steps={steps || []} />

        {/* CTA */}
        <RevealOnScroll delay={0}>
          <HowItWorksCTA label={ctaLabel} href={ctaHref} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
