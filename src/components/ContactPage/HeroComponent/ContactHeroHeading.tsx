interface ContactHeroHeadingProps {
  line1: string;
  line2: string;
}

export default function ContactHeroHeading({
  line1,
  line2,
}: ContactHeroHeadingProps) {
  return (
    <h1
      id="contact-heading"
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
