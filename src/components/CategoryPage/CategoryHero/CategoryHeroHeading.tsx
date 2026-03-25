interface CategoryHeroHeadingProps {
  line1: string;
  line2: string;
}

export default function CategoryHeroHeading({
  line1,
  line2,
}: CategoryHeroHeadingProps) {
  return (
    <h1
      className="
        font-display font-normal text-center leading-[1.1] tracking-tight
        text-[clamp(36px,5.5vw,72px)]
        animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:400ms]
      "
    >
      {/* Plain line */}
      <span className="block text-white">{line1}</span>

      {/* Gold italic accent line */}
      <span className="block italic text-gold">{line2}</span>
    </h1>
  );
}
