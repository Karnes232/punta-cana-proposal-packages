// Server Component — pure markup, no interactivity

interface BrandStatementSignatureProps {
  text?: string;
}

export default function BrandStatementSignature({
  text = "Punta Cana Proposal Packages",
}: BrandStatementSignatureProps) {
  return (
    <p className="font-display italic text-[15px] text-[#8B6914] tracking-wide text-center">
      — {text}
    </p>
  );
}
