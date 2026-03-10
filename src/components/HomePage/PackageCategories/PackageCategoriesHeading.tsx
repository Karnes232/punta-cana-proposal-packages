// Server Component

interface PackageCategoriesHeadingProps {
  line1?: string;
  line2?: string;
}

export default function PackageCategoriesHeading({
  line1 = "Choose Your",
  line2 = "Perfect Proposal",
}: PackageCategoriesHeadingProps) {
  return (
    <h2 className="font-display font-normal text-center leading-[1.15] text-[clamp(32px,4vw,56px)]">
      <span className="block text-white">{line1}</span>
      <span className="block italic text-gold">{line2}</span>
    </h2>
  );
}
