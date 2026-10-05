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
      <p className="py-16 text-center font-body font-light text-[14px] text-gray/60 tracking-wide">
        {t("emptyLabel")}
      </p>
    );
  }

  return (
    <div className="divide-y-0 border-t border-gold/15" role="list">
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
