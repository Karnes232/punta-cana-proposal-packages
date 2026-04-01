interface BlogHeroHeadingProps {
    line1: string;
    line2: string;
  }
  
  export default function BlogHeroHeading({ line1, line2 }: BlogHeroHeadingProps) {
    return (
      <h1
        className="
          font-display font-normal text-[clamp(36px,5.5vw,72px)] leading-[1.08] tracking-tight text-center
          animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:400ms]
        "
      >
        <span className="block text-white">{line1}</span>
        <span className="block italic text-gold">{line2}</span>
      </h1>
    );
  }