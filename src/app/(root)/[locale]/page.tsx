import Hero from "@/components/HomePage/HeroComponents/Hero";
import { homePageHero } from "@/sanity/queries/HomePage/Hero";
import BrandStatement from "@/components/HomePage/BrandStatement/BrandStatement";
import { homePageBrandStatement } from "@/sanity/queries/HomePage/BrandStatement";
import PackageCategories from "@/components/HomePage/PackageCategories/PackageCategories";
import { homePagePackageCategories } from "@/sanity/queries/HomePage/PackageCategories";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [hero, brandStatement, packageCategories] = await Promise.all([
    homePageHero(),
    homePageBrandStatement(),
    homePagePackageCategories(),
  ]);

  return (
    <main>
      <Hero
        image={hero?.image}
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
      <BrandStatement
        quote={brandStatement.quote[locale as "en" | "es"]}
        body={brandStatement.body[locale as "en" | "es"]}
        signature={brandStatement.signature}
      />
      <PackageCategories
        eyebrow={packageCategories.eyebrow[locale as "en" | "es"]}
        headingLine1={packageCategories.headingLine1[locale as "en" | "es"]}
        headingLine2={packageCategories.headingLine2[locale as "en" | "es"]}
        categories={packageCategories.categories}
        locale={locale}
      />
    </main>
  );
}
