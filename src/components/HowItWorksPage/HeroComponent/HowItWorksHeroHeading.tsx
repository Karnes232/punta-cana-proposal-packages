interface HowItWorksHeroHeadingProps {
  line1: string;
  line2: string;
}

export default function HowItWorksHeroHeading({
  line1,
  line2,
}: HowItWorksHeroHeadingProps) {
  return (
    <h1
      className="
          font-display font-normal text-white leading-[1.1] tracking-tight text-center
          text-[clamp(36px,5vw,72px)]
          animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 [animation-delay:400ms]
        "
    >
      {line1} <em className="not-italic text-gold">{line2}</em>
    </h1>
  );
}
