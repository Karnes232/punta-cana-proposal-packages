import PostHeroBackground from "./PostHeroBackground";
import PostHeroBackLink from "./PostHeroBackLink";
import PostHeroCopy from "./PostHeroCopy";
import { defaultPostHeroContent, type PostHeroData, type PostHeroContent } from "./types";

interface PostHeroProps {
  post: PostHeroData;
  locale: "en" | "es";
  content?: PostHeroContent;
}

export default function PostHero({
  post,
  locale,
  content = defaultPostHeroContent,
}: PostHeroProps) {
  const backLabel =
    locale === "es" ? content.backLabelEs : content.backLabelEn;
  const readTimeSuffix =
    locale === "es" ? content.readTimeSuffixEs : content.readTimeSuffixEn;

  return (
    <section className="relative w-full min-h-[70svh] md:min-h-[80svh] flex flex-col justify-between overflow-hidden bg-black">
      {/* ── Background photo + scrim ── */}
      <PostHeroBackground photo={post.photo} title={post.title} />

      {/* ── Gold corner accents ── */}
      <div
        className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold/20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-8 right-8 w-8 h-8 border-t border-r border-gold/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Top: back link ── */}
      <div className="relative z-10 px-8 pt-8 md:px-12 md:pt-10">
        <PostHeroBackLink label={backLabel} />
      </div>

      {/* ── Bottom: title + meta ── */}
      <div className="relative z-10 px-8 pb-10 md:px-12 md:pb-14">
        <PostHeroCopy
          title={post.title}
          categoryTag={post.categoryTag}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          readTimeSuffix={readTimeSuffix}
          locale={locale}
        />
      </div>
    </section>
  );
}