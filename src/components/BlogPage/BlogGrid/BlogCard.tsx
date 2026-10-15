import Image from "next/image";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { eyebrowClass } from "@/components/ExperienceCatalog/styles";
import { tallPhotoClass } from "@/components/ui/asymmetricGrid";
import { BlogPost } from "@/sanity/queries/BlogPage/BlogPosts";
import { formatSanityDate } from "@/lib/formatDate";

/** What the card reads; also fed by the "more posts" list on a post page. */
export type BlogCardPost = Pick<
  BlogPost,
  "slug" | "title" | "categoryTag" | "excerpt" | "publishedAt" | "readingTime"
> & {
  heroPhoto: Omit<BlogPost["heroPhoto"], "alt"> & { alt?: string };
};

interface BlogCardProps {
  post: BlogCardPost;
  readMoreLabel: string;
  readTimeSuffix: string;
  dateLocale: string;
  /** Spans two grid rows on desktop; the photo grows to fill them. */
  tall?: boolean;
}

/**
 * One post in the grid: a photo with its text below. The link's ::after
 * covers the card, so the whole card opens the post.
 */
export default function BlogCard({
  post,
  readMoreLabel,
  readTimeSuffix,
  dateLocale,
  tall = false,
}: BlogCardProps) {
  const date = formatSanityDate(post.publishedAt, dateLocale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group relative flex h-full flex-col">
      <div
        className={`relative aspect-[4/3] shrink-0 overflow-hidden bg-black ${tall ? tallPhotoClass : ""}`}
      >
        <Image
          src={post.heroPhoto.asset.url}
          alt={post.heroPhoto.alt ?? `${post.title ?? ""} hero photo`}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-3 pt-6">
        {post.categoryTag && (
          <p className={eyebrowClass({ size: "text-[13px]" })}>
            {post.categoryTag}
          </p>
        )}
        <h3
          className={`font-display text-[1.5rem] leading-[1.25] font-normal text-balance text-ink ${tall ? "lg:text-[1.9rem]" : ""}`}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="line-clamp-3 text-[16px] leading-[1.7] text-pretty text-body">
            {post.excerpt}
          </p>
        )}
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-2 text-[14px] text-body">
          <span>{date}</span>
          {post.readingTime > 0 && (
            <span className="inline-flex items-center gap-2">
              <FiClock
                aria-hidden="true"
                className="size-4 shrink-0 text-accent"
              />
              {post.readingTime} {readTimeSuffix}
            </span>
          )}
        </p>
        <Link
          href={`/blog/${post.slug.current}`}
          className="inline-flex items-center gap-3 self-start border-b border-gold pb-1 text-[14px] font-semibold tracking-[0.07em] text-ink uppercase after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-gold"
        >
          {readMoreLabel}
          <FiArrowRight
            aria-hidden="true"
            className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </div>
    </article>
  );
}
