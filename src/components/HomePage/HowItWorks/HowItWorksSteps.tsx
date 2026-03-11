// Server Component

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import HowItWorksStep, { HowItWorksStepProps } from "./HowItWorksStep";

interface HowItWorksStepsProps {
  steps: HowItWorksStepProps[];
}

export default function HowItWorksSteps({ steps }: HowItWorksStepsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
      {steps.map((step, i) => (
        <RevealOnScroll key={step.step} delay={i * 130}>
          <HowItWorksStep {...step} isLast={i === steps.length - 1} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
