import StoryHero from "@/components/IndividualStoryPage/HeroComponent/StoryHero";
import StoryMetaBar from "@/components/IndividualStoryPage/StoryMetaBar/StoryMetaBar";
import { getIndividualStory } from "@/sanity/queries/StoriesPage.ts/IndividualStory";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const localeTyped = locale as "en" | "es";
  const [story] = await Promise.all([getIndividualStory(slug)]);
  console.log(story);
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
    </main>
  );
}
