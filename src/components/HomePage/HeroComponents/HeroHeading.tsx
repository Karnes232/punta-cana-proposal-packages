interface HeroHeadingProps {
  line1?: string;
  line2?: string;
  line3?: string;
}

export default function HeroHeading({
  line1 = "Your Perfect",
  line2 = "Proposal",
  line3 = "Awaits",
}: HeroHeadingProps) {
  return (
    <h1
      className="
          font-display font-normal text-center leading-[1.1] tracking-tight
          text-[clamp(48px,7vw,96px)]
          animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:400ms]
        "
    >
      {/* Plain line */}
      <span className="block text-white">{line1}</span>

      {/* Gold italic accent line */}
      <span className="block italic text-gold">{line2}</span>

      {/* Plain line */}
      <span className="block text-white">{line3}</span>
    </h1>
  );
}
