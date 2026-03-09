import Hero from "@/components/HomePage/HeroComponents/Hero";
import { homePageHero } from "@/sanity/queries/HomePage/Hero";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero] = await Promise.all([homePageHero()]);

  console.log(hero);
  return (
    <main>
      <Hero
        image={hero.image}
        eyebrow={hero.eyebrow[locale as "en" | "es"]}
        headingLine1={hero.headingLine1[locale as "en" | "es"]}
        headingLine2={hero.headingLine2[locale as "en" | "es"]}
        headingLine3={hero.headingLine3[locale as "en" | "es"]}
        subheading={hero.subheading[locale as "en" | "es"]}
        primaryLabel={hero.primaryLabel[locale as "en" | "es"]}
        primaryHref={hero.primaryHref}
        secondaryLabel={hero.secondaryLabel[locale as "en" | "es"]}
        secondaryHref={hero.secondaryHref}
      />
    </main>
  );
}
