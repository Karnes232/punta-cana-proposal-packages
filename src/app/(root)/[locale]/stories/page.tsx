import StoriesHero from "@/components/StoriesPage/HeroComponent/StoriesHero";
import StoriesFilterBar from "@/components/StoriesPage/StoriesFilterBar/StoriesFilterBar";
import { storiesPageHero } from "@/sanity/queries/StoriesPage.ts/Hero";
import { getProposalTypes } from "@/sanity/queries/StoriesPage.ts/ProposalTypes";

const storiesFilterContent: {
  tabs: {
    value: string;
    labelEn: string;
    labelEs: string;
  }[];
} = {
  tabs: [
    { value: "classic", labelEn: "Classic",       labelEs: "Clásico"        },
    { value: "modern",  labelEn: "Modern",        labelEs: "Moderno"        },
    { value: "dining",  labelEn: "Dining",        labelEs: "Cena Romántica" },
    { value: "beach",   labelEn: "Beach",         labelEs: "Playa"          },
  ],
};

export default async function Stories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero, proposalTypes] = await Promise.all([storiesPageHero(), getProposalTypes()]);

  console.log(proposalTypes);

  return (
    <main>
      <StoriesHero
        image={hero?.image}
        eyebrow={hero?.eyebrow?.[locale as "en" | "es"]}
        headingLine1={hero?.headingLine1?.[locale as "en" | "es"]}
        headingLine2={hero?.headingLine2?.[locale as "en" | "es"]}
        subheading={hero?.subheading?.[locale as "en" | "es"]}
      />
      <StoriesFilterBar content={proposalTypes} locale={locale as "en" | "es"} />
    </main>
  );
}
