interface HowItWorksHeroSubheadingProps {
    text: string;
  }
  
  export default function HowItWorksHeroSubheading({ text }: HowItWorksHeroSubheadingProps) {
    return (
      <p
        className="
          font-body font-light text-white/55 text-center leading-[1.85]
          text-[clamp(15px,1.5vw,17px)]
          max-w-xl mx-auto
          animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 [animation-delay:600ms]
        "
      >
        {text}
      </p>
    );
  }