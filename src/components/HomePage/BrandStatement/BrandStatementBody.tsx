// Server Component — pure markup, no interactivity

interface BrandStatementBodyProps {
  text?: string;
}

export default function BrandStatementBody({
  text = "From the first rose petal to the final photograph, every detail is thoughtfully arranged so you can be fully present for the moment that matters most. We've helped over 150 couples say yes in Punta Cana — and we'd love to make yours unforgettable.",
}: BrandStatementBodyProps) {
  return (
    <p className="text-center font-light text-gray leading-[1.9] max-w-[560px] mx-auto text-[clamp(14px,1.4vw,16px)]">
      {text}
    </p>
  );
}
