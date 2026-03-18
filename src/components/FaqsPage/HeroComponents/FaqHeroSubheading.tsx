interface FaqHeroSubheadingProps {
  text: string;
}

export default function FaqHeroSubheading({ text }: FaqHeroSubheadingProps) {
  return (
    <p
      className="
          text-center font-light text-white/55 leading-[1.85]
          text-[clamp(14px,1.5vw,17px)]
          max-w-[500px] mx-auto
          animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:600ms]
        "
    >
      {text}
    </p>
  );
}
