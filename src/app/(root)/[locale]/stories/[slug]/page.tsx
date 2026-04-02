import StoryHero from "@/components/IndividualStoryPage/HeroComponent/StoryHero";
import MoreStories from "@/components/IndividualStoryPage/MoreStories/MoreStories";
import StoryBody from "@/components/IndividualStoryPage/StoryBody/StoryBody";
import StoryGallery from "@/components/IndividualStoryPage/StoryGallery/StoryGallery";
import StoryMetaBar from "@/components/IndividualStoryPage/StoryMetaBar/StoryMetaBar";
import {
  getIndividualStory,
  getMoreStories,
} from "@/sanity/queries/StoriesPage/IndividualStory";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const localeTyped = locale as "en" | "es";
  const [story] = await Promise.all([getIndividualStory(slug)]);
  let moreStories = await getMoreStories(
    story?.proposalType?.value ?? "",
    story?.slug?.current ?? "",
  );

  return (
    <main>
      <StoryHero
        heroImage={story?.heroPhoto || null}
        names={story?.names ?? ""}
        packageTag={story?.packageTag[localeTyped] ?? ""}
        date={story?.date ?? ""}
        location={story?.location[localeTyped] ?? ""}
        locale={localeTyped}
      />
      <StoryMetaBar
        data={{
          packageTag: story?.packageTag[localeTyped] ?? "",
          date: story?.date ?? "",
          location: story?.location[localeTyped] ?? "",
        }}
        locale={localeTyped}
      />
      <StoryBody
        data={{
          names: story?.names ?? "",
          date: story?.date ?? "",
          location: story?.location[localeTyped] ?? "",
          packageTag: story?.packageTag[localeTyped] ?? "",
          quote: story?.quote[localeTyped] ?? "",
          body: story?.body[localeTyped] ?? [],
        }}
      />
      <StoryGallery
        photos={
          story?.gallery.map((photo) => ({
            asset: photo.asset,
            alt: photo.alt,
            caption: photo.caption[localeTyped] ?? "",
          })) ?? []
        }
        locale={localeTyped}
      />
      <MoreStories
        stories={moreStories.map((story) => ({
          slug: story.slug.current,
          names: story.names,
          date: story.date,
          location: story.location[localeTyped] ?? "",
          packageTag: story.packageTag[localeTyped] ?? "",
          quote: story.quote[localeTyped] ?? "",
          heroPhoto: story.heroPhoto,
        }))}
        locale={localeTyped}
      />
    </main>
  );
}
