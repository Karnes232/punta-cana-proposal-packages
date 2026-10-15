import HowItWorksSectionHeader from "../HowItWorksSectionHeader";
import HowItWorksStepCard from "./HowItWorksStepCard";
import { HowItWorksStepsStep } from "@/sanity/queries/HowItWorksPage/HowItWorksPage";

// ─── Props ────────────────────────────────────────────────────────────────────

interface HowItWorksStepsProps {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  subheading: string;
  steps: HowItWorksStepsStep[];
}

// ─── Component ────────────────────────────────────────────────────────────────

/** The numbered steps from choosing a package to the proposal itself. */
export default function HowItWorksSteps({
  eyebrow,
  heading,
  headingAccent,
  subheading,
  steps,
}: HowItWorksStepsProps) {
  return (
    <section
      className="w-full bg-paper px-6 py-20 md:px-10 md:py-28"
      aria-labelledby="steps-heading"
    >
      <div className="mx-auto max-w-5xl">
        <HowItWorksSectionHeader
          id="steps-heading"
          eyebrow={eyebrow}
          heading={heading}
          headingAccent={headingAccent}
          subheading={subheading}
        />
        <ol className="flex flex-col gap-14 md:gap-20">
          {steps.map((step, index) => (
            <HowItWorksStepCard key={step.label} step={step} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
