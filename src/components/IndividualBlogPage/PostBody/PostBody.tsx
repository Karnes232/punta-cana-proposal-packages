import ArticlePortableText from "@/components/ui/ArticlePortableText";
import PostPullQuote from "./PostPullQuote";
import PostSidebar from "./PostSidebar";
import { type PostBodyData } from "./types";

interface PostBodyProps {
  data: PostBodyData;
  locale: string;
}

/** The article beside its sticky sidebar (details and the planning button). */
export default function PostBody({ data, locale = "en" }: PostBodyProps) {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-site gap-12 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-16">
        {/* The article shows whenever it has text; the lead only when
            there's an excerpt. */}
        {data.body?.length ? (
          <div className="min-w-0">
            {data.excerpt && <PostPullQuote excerpt={data.excerpt} />}
            <ArticlePortableText body={data.body} />
          </div>
        ) : null}
        {data.title &&
          data.publishedAt &&
          data.categoryTag &&
          data.readingTime && <PostSidebar data={data} locale={locale} />}
      </div>
    </section>
  );
}
