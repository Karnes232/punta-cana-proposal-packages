import { useId } from "react";
import { FiPlus } from "react-icons/fi";
import { Faqs } from "@/sanity/queries/FaqPage/FaqPage";

interface FaqAccordionItemProps {
  /** Also used by the How It Works page's questions. */
  item: Pick<Faqs, "question" | "answer">;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * One question and its answer. The answer opens by animating its grid row
 * from 0fr to 1fr, so no height is measured; while closed it is inert.
 */
export default function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) {
  const panelId = useId();

  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <span className="font-display text-[clamp(17px,1.6vw,19px)] leading-snug font-normal text-balance text-black">
          {item.question}
        </span>
        <FiPlus
          aria-hidden="true"
          className={`size-5 shrink-0 text-gold transition-transform duration-300 motion-reduce:transition-none ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>
      <div
        id={panelId}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pr-11 pb-7 text-[16px] leading-[1.75] text-pretty text-[#3f3f44]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
