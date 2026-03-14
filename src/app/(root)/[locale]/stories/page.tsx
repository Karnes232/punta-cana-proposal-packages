import StoriesHero from "@/components/StoriesPage/StoriesHero";
import { storiesPageHero } from "@/sanity/queries/StoriesPage.ts/Hero";

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero] = await Promise.all([storiesPageHero()]);

  return (
    <main>
      <StoriesHero
        image={hero?.image}
        eyebrow={hero?.eyebrow?.[locale as "en" | "es"]}
        headingLine1={hero?.headingLine1?.[locale as "en" | "es"]}
        headingLine2={hero?.headingLine2?.[locale as "en" | "es"]}
        subheading={hero?.subheading?.[locale as "en" | "es"]}
      />
    </main>
  );
}
