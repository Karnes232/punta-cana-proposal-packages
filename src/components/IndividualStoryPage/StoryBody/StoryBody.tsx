import StoryPullQuote from "./StoryPullQuote";
import ArticlePortableText from "@/components/ui/ArticlePortableText";
import { type StoryBodyData } from "./types";

interface StoryBodyProps {
  data: StoryBodyData;
}

/** The couple's quote and the story, in one reading column. */
export default function StoryBody({ data }: StoryBodyProps) {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        {data.quote && <StoryPullQuote quote={data.quote} />}
        <ArticlePortableText body={data.body} />
      </div>
    </section>
  );
}
