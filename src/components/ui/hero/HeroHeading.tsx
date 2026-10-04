interface HeroHeadingProps {
  line1: string;
  line2: string;
  id?: string;
}

export default function HeroHeading({ line1, line2, id }: HeroHeadingProps) {
  return (
    <h1
      id={id}
      className="
          font-display font-normal text-center leading-[1.08] tracking-tight
          text-[clamp(44px,6.5vw,88px)]
          animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:400ms]
        "
    >
      <span className="block text-white">{line1}</span>
      <span className="block italic text-gold">{line2}</span>
    </h1>
  );
}
