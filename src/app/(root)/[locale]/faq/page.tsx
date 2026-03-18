import FaqContactStrip from "@/components/FaqsPage/FaqContactStrip/FaqContactStrip";
import FaqsContent from "@/components/FaqsPage/FaqsContent";
import FaqHero from "@/components/FaqsPage/HeroComponents/FaqHero";

export default async function FAQ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <FaqHero locale={locale as "en" | "es"} />
      <FaqsContent locale={locale as "en" | "es"} />
      <FaqContactStrip locale={locale as "en" | "es"} />
    </main>
  );
}
