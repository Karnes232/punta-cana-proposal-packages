interface BlogHeroSubheadingProps {
    text: string;
  }
  
  export default function BlogHeroSubheading({ text }: BlogHeroSubheadingProps) {
    return (
      <p
        className="
          font-body font-light text-white/55 leading-[1.85] text-[clamp(14px,1.5vw,17px)]
          max-w-[520px] text-center
          animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 [animation-delay:600ms]
        "
      >
        {text}
      </p>
    );
  }