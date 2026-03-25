interface CategoryIntroHeadingProps {
  line1: string;
  line2: string;
}

export default function CategoryIntroHeading({
  line1,
  line2,
}: CategoryIntroHeadingProps) {
  return (
    <h2
      className="
          font-display font-normal text-center leading-[1.2] tracking-[-0.01em]
          text-[clamp(28px,3.5vw,48px)]
        "
    >
      <span className="block text-black">{line1}</span>
      <span className="block italic text-gold">{line2}</span>
    </h2>
  );
}
