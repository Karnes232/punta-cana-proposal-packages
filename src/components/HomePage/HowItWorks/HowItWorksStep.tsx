// Server Component

import HowItWorksStepIcon from "./HowItWorksStepIcon";

export type StepIconType = "package" | "customize" | "setup" | "propose";

export interface HowItWorksStepProps {
  step: number;
  icon: StepIconType;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function HowItWorksStep({
  step,
  icon,
  title,
  description,
  isLast = false,
}: HowItWorksStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center gap-6 group">
      {/* Connector line — horizontal on desktop, hidden on last item */}
      {!isLast && (
        <div
          className="
            hidden md:block
            absolute top-[52px] left-[calc(50%+52px)]
            w-[calc(100%-104px)] h-px
            bg-gradient-to-r from-gold/40 via-gold/20 to-gold/40
          "
          aria-hidden="true"
        />
      )}

      {/* Icon circle */}
      <div
        className="
        relative z-10
        w-[104px] h-[104px] rounded-full
        border border-gold/30
        bg-ivory
        flex items-center justify-center
        transition-all duration-500
        group-hover:border-gold/70
        group-hover:shadow-[0_0_28px_rgba(207,174,112,0.12)]
      "
      >
        {/* Step number — top right of circle */}
        <span
          className="
            absolute -top-1 -right-1
            w-6 h-6 rounded-full
            bg-black border border-gold/40
            flex items-center justify-center
            font-body text-[10px] font-light tracking-wider text-gold
          "
          aria-label={`Step ${step}`}
        >
          {step}
        </span>

        <HowItWorksStepIcon icon={icon} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 max-w-[200px]">
        <h3 className="font-display italic font-normal text-black text-[18px] leading-tight">
          {title}
        </h3>
        <p className="font-light text-gray text-[13px] leading-[1.8]">
          {description}
        </p>
      </div>
    </div>
  );
}
