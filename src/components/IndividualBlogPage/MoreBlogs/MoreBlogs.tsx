import { useTranslations } from "next-intl";
import CardCarousel from "@/components/ui/CardCarousel";
import MoreSection from "@/components/ui/MoreSection";
import MoreBlogsCard from "./MoreBlogsCard";
import type { MoreBlogsPost } from "./types";

export default function MoreBlogs({ blogs }: { blogs: MoreBlogsPost[] }) {
  const t = useTranslations("BlogPost");
  const tc = useTranslations("Carousel");

  if (!blogs || blogs.length === 0) return null;

  return (
    <MoreSection
      label={t("more")}
      heading={t("more")}
      headingAccent={t("moreAccent")}
    >
      <CardCarousel prevLabel={tc("previous")} nextLabel={tc("next")}>
        {blogs.map((blog) => (
          <MoreBlogsCard
            key={blog.slug}
            blog={blog}
            readMoreLabel={t("readMore")}
          />
        ))}
      </CardCarousel>
    </MoreSection>
  );
}
