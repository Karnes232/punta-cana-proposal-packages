// Server Component

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TrustIndicatorItem, {
  TrustIndicatorItemProps,
} from "./TrustIndicatorItem";

interface TrustIndicatorsGridProps {
  items: TrustIndicatorItemProps[];
}

export default function TrustIndicatorsGrid({
  items,
}: TrustIndicatorsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gold/15">
      {items.map((item, i) => (
        <RevealOnScroll key={item.label} delay={i * 100}>
          <TrustIndicatorItem {...item} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
