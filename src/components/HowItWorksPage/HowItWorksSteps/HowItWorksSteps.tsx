import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HowItWorksStepsSectionHeader from "./HowItWorksStepsSectionHeader";
import HowItWorksStepCard from "./HowItWorksStepCard";
import HowItWorksStepConnector from "./HowItWorksStepConnector";
import { HowItWorksStepsStep } from "@/sanity/queries/HowItWorksPage/HowItWorksSteps";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksStepsProps {
  locale: "en" | "es";
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  steps: HowItWorksStepsStep[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorksSteps({
  eyebrow,
  heading,
  headingAccent,
  subheading,
  steps,
  locale,
}: HowItWorksStepsProps) {
  return (
    <section
      className="relative w-full bg-[#F7F5F1] py-24 md:py-32"
      aria-labelledby="steps-heading"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <RevealOnScroll>
          <HowItWorksStepsSectionHeader
            eyebrow={eyebrow}
            heading={heading}
            headingAccent={headingAccent}
            subheading={subheading}
          />
        </RevealOnScroll>

        {/* Steps list */}
        <div className="flex flex-col">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <div key={step.label[locale]}>
                <RevealOnScroll delay={index * 80}>
                  <HowItWorksStepCard
                    step={{
                      number: (index + 1).toString().padStart(2, "0"),
                      label: step.label[locale],
                      title: step.title[locale],
                      description: step.description[locale],
                    }}
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
