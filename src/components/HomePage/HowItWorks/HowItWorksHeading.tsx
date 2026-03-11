// Server Component

interface HowItWorksHeadingProps {
  line1?: string;
  line2?: string;
}

export default function HowItWorksHeading({
  line1 = "Simple Steps to Your",
  line2 = "Perfect Moment",
}: HowItWorksHeadingProps) {
  return (
    <h2 className="font-display font-normal text-center leading-[1.15] text-[clamp(30px,4vw,52px)]">
      <span className="block text-black">{line1}</span>
      <span className="block italic text-black/60">{line2}</span>
    </h2>
  );
}
