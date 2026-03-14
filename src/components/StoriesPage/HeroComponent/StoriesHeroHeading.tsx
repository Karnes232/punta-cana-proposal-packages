export default function StoriesHeroHeading({
  headingLine1 = "Their Stories,",
  headingLine2 = "Your Inspiration",
}: {
  headingLine1?: string;
  headingLine2?: string;
}) {
  return (
    <h1
      className="
          font-display font-normal text-center leading-[1.08] tracking-tight
          text-[clamp(44px,6.5vw,88px)]
          animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:400ms]
        "
    >
      <span className="block text-white">{headingLine1}</span>
      <span className="block italic text-gold">{headingLine2}</span>
    </h1>
  );
}
