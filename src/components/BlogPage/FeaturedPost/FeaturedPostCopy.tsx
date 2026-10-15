import { useTranslations } from "next-intl";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import {
  buttonClass,
  eyebrowClass,
} from "@/components/ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts } from "@/components/HomePage/styles";
import type { FeaturedPost as FeaturedPostType } from "@/sanity/queries/BlogPage/BlogPage";
import { formatSanityDate } from "@/lib/formatDate";

interface FeaturedPostCopyProps {
  post: FeaturedPostType;
  dateLocale: string;
}

export default function FeaturedPostCopy({
  post,
  dateLocale,
}: FeaturedPostCopyProps) {
  const t = useTranslations("BlogPage");

  const date = formatSanityDate(post.publishedAt, dateLocale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-6">
      <p className={eyebrowClass()}>
        {t("featuredPost")}
        {post.categoryTag && ` · ${post.categoryTag}`}
      </p>
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.15] font-normal text-balance text-ink">
          {post.title}
        </h2>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[15px] text-body">
          <span>{date}</span>
          {post.readingTime > 0 && (
            <span className="inline-flex items-center gap-2">
              <FiClock
                aria-hidden="true"
                className="size-4 shrink-0 text-accent"
              />
              {post.readingTime} {t("minRead")}
            </span>
          )}
        </p>
      </div>
      {post.excerpt && (
        <p className="max-w-[60ch] text-[17px] leading-[1.7] text-pretty text-body">
          {post.excerpt}
        </p>
      )}
      <Link
        href={`/blog/${post.slug.current}`}
        className={`${buttonClass({ ...homeButtonParts, secondary: true })} self-start`}
      >
        {t("readArticle")}
        <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
      </Link>
    </div>
  );
}
