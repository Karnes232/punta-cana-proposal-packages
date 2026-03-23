import HowItWorksHero from "@/components/HowItWorksPage/HeroComponent/HowItWorksHero";
import HowItWorksCTA from "@/components/HowItWorksPage/HowItWorksCTA/HowItWorksCTA";
import HowItWorksFAQ from "@/components/HowItWorksPage/HowItWorksFAQ/HowItWorksFAQ";
import HowItWorksReassurance from "@/components/HowItWorksPage/HowItWorksReassurance/HowItWorksReassurance";
import HowItWorksSteps from "@/components/HowItWorksPage/HowItWorksSteps/HowItWorksSteps";
import { howItWorksPageHero } from "@/sanity/queries/HowItWorksPage/Hero";
import {
  howItWorksFaqsCategories,
  howItWorksFaqsPage,
} from "@/sanity/queries/HowItWorksPage/HowItWorksFaqs";
import { howItWorksPageHowItWorksSteps } from "@/sanity/queries/HowItWorksPage/HowItWorksSteps";

export default async function HowItWorks({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero, steps, faqsCategories, faqsPage] = await Promise.all([
    howItWorksPageHero(),
    howItWorksPageHowItWorksSteps(),
    howItWorksFaqsCategories(),
    howItWorksFaqsPage(),
  ]);
  console.log(faqsPage);
  return (
    <main>
      {/* NEED TO ADD SANITY DATA */}
      <HowItWorksHero
        heroImage={hero?.image}
        eyebrow={hero?.eyebrow[locale as "en" | "es"]}
        headingLine1={hero?.headingLine1[locale as "en" | "es"]}
        headingLine2={hero?.headingLine2[locale as "en" | "es"]}
        subheading={hero?.subheading[locale as "en" | "es"]}
      />
      <HowItWorksSteps
        eyebrow={steps?.eyebrow[locale as "en" | "es"]}
        heading={steps?.heading[locale as "en" | "es"]}
        headingAccent={steps?.headingAccent[locale as "en" | "es"]}
        subheading={steps?.subheading[locale as "en" | "es"]}
        steps={steps?.steps}
        locale={locale as "en" | "es"}
      />
      <HowItWorksReassurance
        items={steps?.reassurance}
        locale={locale as "en" | "es"}
      />
      <HowItWorksFAQ
        locale={locale as "en" | "es"}
        faqsCategories={faqsCategories}
        eyebrow={faqsPage?.eyebrow[locale as "en" | "es"]}
        heading={faqsPage?.heading[locale as "en" | "es"]}
        headingAccent={faqsPage?.headingAccent[locale as "en" | "es"]}
        subheading={faqsPage?.subheading[locale as "en" | "es"]}
        faqs={faqsPage?.faqs}
      />
      <HowItWorksCTA locale={locale as "en" | "es"} />
    </main>
  );
}
