// Server Component

interface CTABannerSubheadingProps {
    text?: string;
  }
  
  export default function CTABannerSubheading({
    text = "Every great proposal starts with a single step. Let's take it together.",
  }: CTABannerSubheadingProps) {
    return (
      <p className="text-center font-light text-white/50 leading-[1.8] max-w-[480px] mx-auto text-[clamp(14px,1.4vw,16px)]">
        {text}
      </p>
    );
  }