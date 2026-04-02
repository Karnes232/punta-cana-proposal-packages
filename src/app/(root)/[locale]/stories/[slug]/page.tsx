import StoryHero from "@/components/IndividualStoryPage/HeroComponent/StoryHero";
import MoreStories from "@/components/IndividualStoryPage/MoreStories/MoreStories";
import StoryBody from "@/components/IndividualStoryPage/StoryBody/StoryBody";
import StoryGallery from "@/components/IndividualStoryPage/StoryGallery/StoryGallery";
import StoryMetaBar from "@/components/IndividualStoryPage/StoryMetaBar/StoryMetaBar";
import { generateHreflangAlternates } from "@/i18n/hreflang";
import {
  getIndividualStory,
  getMoreStories,
  individualStorySEOQuery,
} from "@/sanity/queries/StoriesPage/IndividualStory";
import Script from "next/script";

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
      {story?.seo?.structuredData[localeTyped] && (
        <Script
          id="structured-data-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(story?.seo?.structuredData[localeTyped]),
          }}
        />
      )}
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: "en" | "es" }>;
}) {
  const { slug, locale } = await params;
  const individualStory = await individualStorySEOQuery(slug);

  let canonicalUrl;
  if (locale === "en") {
    canonicalUrl = `https://puntacanaproposalpackages.com/stories/${slug}`;
  } else {
    canonicalUrl = `https://puntacanaproposalpackages.com/es/stories/${slug}`;
  }

  return {
    title: individualStory.seo.meta[locale].title,
    description: individualStory.seo.meta[locale].description,
    keywords: individualStory.seo.meta[locale].keywords.join(", "),
    url: canonicalUrl,
    openGraph: {
      title: individualStory.seo.openGraph[locale].title,
      description: individualStory.seo.openGraph[locale].description,
      images: individualStory.seo.openGraph.image.url,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      index: !individualStory.seo.noIndex,
      follow: !individualStory.seo.noFollow,
    },
    ...(canonicalUrl && { canonical: canonicalUrl }),
    alternates: {
      canonical: canonicalUrl,
      ...generateHreflangAlternates(locale, `/stories/${slug}`),
    },
  };
}
