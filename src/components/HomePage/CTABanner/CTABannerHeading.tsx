// Server Component

interface CTABannerHeadingProps {
    line1?: string;
    line2?: string;
  }
  
  export default function CTABannerHeading({
    line1 = "Ready to Plan",
    line2 = "the Perfect Proposal?",
  }: CTABannerHeadingProps) {
    return (
      <h2 className="font-display font-normal text-center leading-[1.15] text-[clamp(32px,4.5vw,62px)]">
        <span className="block text-white">{line1}</span>
        <span className="block italic text-gold">{line2}</span>
      </h2>
    );
  }