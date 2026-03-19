import ContactHero from "@/components/ContactPage/HeroComponent/ContactHero";
import ContactBody from "@/components/ContactPage/MainContent/ContactBody";
import ContactTrustBar from "@/components/ContactPage/TrustBar/ContactTrustBar";

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main>
      <ContactHero locale={locale as "en" | "es"} />
      <ContactBody locale={locale as "en" | "es"} />
      <ContactTrustBar locale={locale as "en" | "es"} />
    </main>
  );
}
