import StoryPullQuote from "./StoryPullQuote";
import StoryPortableText from "./StoryPortableText";
import StorySidebar from "./StorySidebar";
import { type StoryBodyData } from "./types";

interface StoryBodyProps {
  data: StoryBodyData;
}

export default function StoryBody({ data }: StoryBodyProps) {
  return (
    <section className="bg-ivory">
      <div className="max-w-site mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-20">
          {/* ── Left: story content ── */}
          <div className="min-w-0">
            <StoryPullQuote quote={data.quote} />
            <StoryPortableText body={data.body} />
          </div>

          {/* ── Right: sticky sidebar ── */}
          <StorySidebar data={data} />
        </div>
      </div>
    </section>
  );
}
