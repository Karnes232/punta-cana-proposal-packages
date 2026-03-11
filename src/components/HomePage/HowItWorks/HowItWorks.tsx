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

const DEFAULT_STEPS: HowItWorksStepProps[] = [
  {
    step: 1,
    icon: "package",
    title: "Choose a Package",
    description:
      "Browse our curated proposal experiences and select the one that feels right for your relationship.",
  },
  {
    step: 2,
    icon: "customize",
    title: "Customize the Details",
    description:
      "Tell us your vision — flowers, music, timing, location. We tailor every element to your story.",
  },
  {
    step: 3,
    icon: "setup",
    title: "We Set Everything Up",
    description:
      "Our team handles every detail on the day, so all you need to do is show up and be present.",
  },
  {
    step: 4,
    icon: "propose",
    title: "You Propose",
    description:
      "The moment is yours. We stay in the background while you create a memory that lasts forever.",
  },
];

export default function HowItWorks({
  eyebrow,
  headingLine1,
  headingLine2,
  ctaLabel,
  ctaHref,
  steps = DEFAULT_STEPS,
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
        <HowItWorksSteps steps={steps} />

        {/* CTA */}
        <RevealOnScroll delay={0}>
          <HowItWorksCTA label={ctaLabel} href={ctaHref} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
