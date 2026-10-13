interface HowItWorksHeroSubheadingProps {
  text: string;
}

export default function HowItWorksHeroSubheading({
  text,
}: HowItWorksHeroSubheadingProps) {
  return (
    <p className="mx-auto max-w-xl text-[clamp(15px,1.5vw,17px)] leading-[1.85] font-light text-pretty text-white/70 opacity-0 animate-[fadeSlideUp_0.6s_ease_forwards] [animation-delay:600ms]">
      {text}
    </p>
  );
}
