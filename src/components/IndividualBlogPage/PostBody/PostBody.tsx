import PostPullQuote from "./PostPullQuote";
import PostPortableText from "./PostPortableText";
import PostSidebar from "./PostSidebar";
import { type PostBodyData } from "./types";

interface PostBodyProps {
  data: PostBodyData;
  locale: string;
}

export default function PostBody({ data, locale = "en" }: PostBodyProps) {
  return (
    <section className="bg-ivory">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-20">
          {/* ── Left: post content ── */}
          {/* The article shows whenever it has text; the pull quote only
              when there's an excerpt. */}
          {data.body?.length ? (
            <div className="min-w-0">
              {data.excerpt && <PostPullQuote excerpt={data.excerpt} />}
              <PostPortableText body={data.body} />
            </div>
          ) : null}
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
