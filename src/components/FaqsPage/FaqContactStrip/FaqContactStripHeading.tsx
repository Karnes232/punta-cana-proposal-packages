interface FaqContactStripHeadingProps {
  line1: string;
  line2: string;
}

export default function FaqContactStripHeading({
  line1,
  line2,
}: FaqContactStripHeadingProps) {
  return (
    <h2 className="font-display font-normal text-[clamp(36px,5vw,64px)] leading-[1.08] tracking-tight text-center">
      <span className="block text-black">{line1}</span>
      <span className="block italic text-gold">{line2}</span>
    </h2>
  );
}
