interface FaqContactStripBodyProps {
  text: string;
}

export default function FaqContactStripBody({
  text,
}: FaqContactStripBodyProps) {
  return (
    <p className="font-body font-light text-white/55 leading-[1.85] text-[clamp(14px,1.5vw,17px)] max-w-[460px] text-center">
      {text}
    </p>
  );
}
