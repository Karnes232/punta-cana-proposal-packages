import { eyebrowClass } from "@/components/ExperienceCatalog/styles";

interface SectionLabelDividerProps {
  label: string;
}

/** A small heading followed by a hairline, above a listing grid. */
export default function SectionLabelDivider({
  label,
}: SectionLabelDividerProps) {
  return (
    <div className="mb-10 flex items-center gap-5">
      {/* font-body! beats the global serif rule for h1-h6. */}
      <h2 className={`${eyebrowClass()} shrink-0 font-body!`}>{label}</h2>
      <span aria-hidden="true" className="block h-px flex-1 bg-black/10" />
    </div>
  );
}
