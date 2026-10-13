interface HowItWorksHeroHeadingProps {
  id: string;
  line1: string;
  line2: string;
}

export default function HowItWorksHeroHeading({
  id,
  line1,
  line2,
}: HowItWorksHeroHeadingProps) {
  return (
    <h1
      id={id}
      className="font-display text-[clamp(36px,5vw,72px)] leading-[1.1] font-normal tracking-tight text-balance text-white opacity-0 animate-[fadeSlideUp_0.6s_ease_forwards] [animation-delay:400ms]"
    >
      {line1} <span className="text-gold">{line2}</span>
    </h1>
  );
}
