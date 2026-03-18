import { FaqItem } from "./types";
import FaqAccordionItem from "./FaqAccordionItem";

interface FaqAccordionListProps {
  items: FaqItem[];
  locale: "en" | "es";
  openId: string | null;
  onToggle: (id: string) => void;
}

const emptyLabel = {
  en: "No questions in this category yet.",
  es: "No hay preguntas en esta categoría todavía.",
};

export default function FaqAccordionList({
  items,
  locale,
  openId,
  onToggle,
}: FaqAccordionListProps) {
  if (items.length === 0) {
    return (
      <p className="py-16 text-center font-body font-light text-[14px] text-gray/60 tracking-wide">
        {emptyLabel[locale]}
      </p>
    );
  }

  return (
    <div className="divide-y-0 border-t border-gold/15" role="list">
      {items.map((item) => (
        <FaqAccordionItem
          key={item.id}
          item={item}
          locale={locale}
          isOpen={openId === item.id}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}
