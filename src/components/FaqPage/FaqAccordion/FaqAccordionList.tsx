import FaqAccordionItem from "./FaqAccordionItem";
import { Faqs } from "@/sanity/queries/FaqPage/FaqPage";
import { useTranslations } from "next-intl";

interface FaqAccordionListProps {
  items: Faqs[];
  openId: string | null;
  onToggle: (id: string) => void;
}

export default function FaqAccordionList({
  items,
  openId,
  onToggle,
}: FaqAccordionListProps) {
  const t = useTranslations("FaqPage");
  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-[16px] text-[#5c5c61]">
        {t("emptyLabel")}
      </p>
    );
  }

  return (
    <div className="border-t border-black/10">
      {items.map((item) => (
        <FaqAccordionItem
          key={item._id}
          item={item}
          isOpen={openId === item._id}
          onToggle={() => onToggle(item._id)}
        />
      ))}
    </div>
  );
}
