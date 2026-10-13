import StoryPullQuote from "./StoryPullQuote";
import StoryPortableText from "./StoryPortableText";
import { type StoryBodyData } from "./types";

interface StoryBodyProps {
  data: StoryBodyData;
}

/** The couple's quote and the story, in one reading column. */
export default function StoryBody({ data }: StoryBodyProps) {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[38rem] px-6 py-16 md:py-24">
        {data.quote && <StoryPullQuote quote={data.quote} />}
        <StoryPortableText body={data.body} />
      </div>
    </section>
  );
}
