import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { homeIcon, homeTextLink } from "@/components/HomePage/styles";
import MoreSection from "@/components/ui/MoreSection";
import BlogCard, {
  type BlogCardPost,
} from "@/components/BlogPage/BlogGrid/BlogCard";

interface MoreBlogsProps {
  blogs: BlogCardPost[];
  /** Locale string for the card dates. */
  dateLocale: string;
}

/** The newest other posts, as on the Blog page, then a link to all. */
export default function MoreBlogs({ blogs, dateLocale }: MoreBlogsProps) {
  const t = useTranslations("BlogPost");
  const tList = useTranslations("BlogPage");

  if (!blogs || blogs.length === 0) return null;

  return (
    <MoreSection
      label={t("more")}
      heading={t("moreHeading")}
      headingAccent={t("moreAccent")}
    >
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.slug.current}
            post={blog}
            readMoreLabel={tList("readArticle")}
            readTimeSuffix={tList("minRead")}
            dateLocale={dateLocale}
          />
        ))}
      </div>
      <Link href="/blog" className={homeTextLink}>
        {t("allPosts")}
        <FiArrowRight aria-hidden="true" className={homeIcon} />
      </Link>
    </MoreSection>
  );
}
