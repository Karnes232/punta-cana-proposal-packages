// Server Component

import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PackageCategoryCard, {
  PackageCategoryCardProps,
} from "./PackageCategoryCard";

interface PackageCategoriesGridProps {
  categories: PackageCategoryCardProps[];
  locale?: string;
}

export default function PackageCategoriesGrid({
  categories,
  locale,
}: PackageCategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {categories.map((category, i) => (
        <RevealOnScroll key={category.href} delay={i * 120}>
          <PackageCategoryCard {...category} index={i} locale={locale} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
