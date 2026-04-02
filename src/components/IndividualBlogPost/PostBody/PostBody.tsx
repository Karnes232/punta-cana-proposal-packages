import PostPullQuote from "./PostPullQuote";
import PostPortableText from "./PostPortableText";
import PostSidebar from "./PostSidebar";
import { type PostBodyData } from "./types";

interface PostBodyProps {
  data: PostBodyData;
  locale: "en" | "es";
}

export default function PostBody({ data, locale = "en" }: PostBodyProps) {
  return (
    <section className="bg-ivory">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-20">
          {/* ── Left: post content ── */}
          {data.excerpt && data.body && (
            <div className="min-w-0">
              <PostPullQuote excerpt={data.excerpt} />
              <PostPortableText body={data.body} />
            </div>
          )}
          {/* ── Right: sticky sidebar ── */}
          {data.title &&
            data.publishedAt &&
            data.categoryTag &&
            data.readingTime && <PostSidebar data={data} locale={locale} />}
        </div>
      </div>
    </section>
  );
}
