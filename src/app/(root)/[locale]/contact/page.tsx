import ContactHero from "@/components/ContactPage/HeroComponent/ContactHero";
import ContactBody from "@/components/ContactPage/MainContent/ContactBody";
import ContactTrustBar from "@/components/ContactPage/TrustBar/ContactTrustBar";
import { contactPageContent } from "@/sanity/queries/ContactPage/Content";
import { packageOptions } from "@/sanity/queries/ContactPage/PackageOptions";
import { contactInfo } from "@/sanity/queries/ContactPage/Content";

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [content, packageOptionsData, contactInfoData] = await Promise.all([
    contactPageContent(),
    packageOptions(),
    contactInfo(),
  ]);

  return (
    <main>
      <ContactHero
        heroEyebrow={content.heroEyebrow[locale as "en" | "es"]}
        heroHeadingLine1={content.heroHeadingLine1[locale as "en" | "es"]}
        heroHeadingLine2={content.heroHeadingLine2[locale as "en" | "es"]}
        heroSubheading={content.heroSubheading[locale as "en" | "es"]}
        heroImage={content.heroImage}
      />
      <ContactBody
        formEyebrow={content.formEyebrow[locale as "en" | "es"]}
        formHeadingLine1={content.formHeadingLine1[locale as "en" | "es"]}
        formHeadingLine2={content.formHeadingLine2[locale as "en" | "es"]}
        locale={locale as "en" | "es"}
        packageOptions={packageOptionsData.categories}
        email={contactInfoData.email}
        telephone={contactInfoData.telephone}
      />
      <ContactTrustBar
        trustBarStats={content.trustBarStats}
        locale={locale as "en" | "es"}
      />
    </main>
  );
}
