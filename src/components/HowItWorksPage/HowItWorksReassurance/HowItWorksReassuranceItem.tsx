import type { IconType } from "react-icons";
import { FiCamera, FiCheckCircle, FiLock, FiUsers } from "react-icons/fi";
import type { ReassuranceItem } from "@/sanity/queries/HowItWorksPage/HowItWorksPage";

// Keyed by the item's id in the Studio.
const iconMap: Record<string, IconType> = {
  private: FiLock,
  team: FiUsers,
  inclusive: FiCheckCircle,
  memories: FiCamera,
};

/** One reason to book: an icon, a short title and a caption. */
export default function HowItWorksReassuranceItem({
  item,
}: {
  item: ReassuranceItem;
}) {
  const Icon = iconMap[item.id];

  return (
    <li className="flex flex-col gap-3 border-t border-gold/25 pt-6">
      {Icon && <Icon aria-hidden="true" className="size-6 text-gold" />}
      <h3 className="font-display text-[1.25rem] leading-tight font-normal text-ivory">
        {item.title}
      </h3>
      <p className="text-[15px] leading-[1.7] text-pretty text-ivory/75">
        {item.caption}
      </p>
    </li>
  );
}
