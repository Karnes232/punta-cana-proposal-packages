import WhatsIncludedIcon from "./WhatsIncludedIcon";

export interface WhatsIncludedItemProps {
  icon: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  locale: "en" | "es";
}

export default function WhatsIncludedItem({
  icon,
  title,
  description,
  locale = "en",
}: WhatsIncludedItemProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 px-4">
      {/* Icon with subtle gold ring */}
      <div className="w-14 h-14 flex items-center justify-center border border-gold/25 rounded-full">
        <WhatsIncludedIcon name={icon} />
      </div>

      <h3 className="font-display italic font-normal text-black text-[15px] leading-tight">
        {title[locale as "en" | "es"]}
      </h3>

      <p className="text-[13px] font-light text-gray leading-[1.7] max-w-[220px]">
        {description[locale as "en" | "es"]}
      </p>
    </div>
  );
}
