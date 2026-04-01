import WhatsIncludedIcon from "@/components/CategoryPage/WhatsIncluded/WhatsIncludedIcon";

interface PackageInclusionItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function PackageInclusionItem({
  icon,
  title,
  description,
}: PackageInclusionItemProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 px-4">
      {/* Icon with gold ring */}
      <div className="w-14 h-14 flex items-center justify-center border border-gold/25 rounded-full">
        <WhatsIncludedIcon name={icon} />
      </div>

      <h3 className="font-display italic font-normal text-black text-[15px] leading-tight">
        {title}
      </h3>

      <p className="text-[13px] font-light text-gray leading-[1.7] max-w-[220px]">
        {description}
      </p>
    </div>
  );
}
