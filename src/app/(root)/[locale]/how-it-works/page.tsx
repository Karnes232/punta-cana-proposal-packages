import HowItWorksHero from "@/components/HowItWorksPage/HeroComponent/HowItWorksHero";
import HowItWorksCTA from "@/components/HowItWorksPage/HowItWorksCTA/HowItWorksCTA";
import HowItWorksFAQ from "@/components/HowItWorksPage/HowItWorksFAQ/HowItWorksFAQ";
import HowItWorksReassurance from "@/components/HowItWorksPage/HowItWorksReassurance/HowItWorksReassurance";
import HowItWorksSteps from "@/components/HowItWorksPage/HowItWorksSteps/HowItWorksSteps";

export default async function HowItWorks({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main>

      {/* NEED TO ADD SANITY DATA */}
      <HowItWorksHero locale={locale as "en" | "es"} />
      <HowItWorksSteps locale={locale as "en" | "es"} />
      <HowItWorksReassurance locale={locale as "en" | "es"} />
      <HowItWorksFAQ locale={locale as "en" | "es"} />
      <HowItWorksCTA locale={locale as "en" | "es"} />
    </main>
  );
}
