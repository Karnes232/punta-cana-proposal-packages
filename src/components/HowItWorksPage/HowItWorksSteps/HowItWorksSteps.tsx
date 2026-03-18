import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HowItWorksStepsSectionHeader from "./HowItWorksStepsSectionHeader";
import HowItWorksStepCard from "./HowItWorksStepCard";
import HowItWorksStepConnector from "./HowItWorksStepConnector";
import { stepsContent } from "./types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksStepsProps {
  locale: "en" | "es";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksSteps({ locale }: HowItWorksStepsProps) {
  const t = stepsContent[locale];

  return (
    <section
      className="relative w-full bg-[#F7F5F1] py-24 md:py-32"
      aria-labelledby="steps-heading"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <RevealOnScroll>
          <HowItWorksStepsSectionHeader
            eyebrow={t.eyebrow}
            heading={t.heading}
            headingAccent={t.headingAccent}
            subheading={t.subheading}
          />
        </RevealOnScroll>

        {/* Steps list */}
        <div className="flex flex-col">
          {t.steps.map((step, index) => {
            const isLast = index === t.steps.length - 1;
            return (
              <div key={step.number}>
                <RevealOnScroll delay={index * 80}>
                  <HowItWorksStepCard
                    step={step}
                    index={index}
                    isLast={isLast}
                  />
                </RevealOnScroll>

                {/* Connector between steps — not after the last */}
                {!isLast && (
                  <div className="flex justify-center">
                    <HowItWorksStepConnector />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
