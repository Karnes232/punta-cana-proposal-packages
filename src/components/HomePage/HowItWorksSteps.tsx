import HomeTextLink from "./HomeTextLink";
import { STEPS, type HomeText } from "./homeData";
import { homeDarkSection, homeH2 } from "./styles";

/** The eight numbered steps from choosing to the day itself. */
export default function HowItWorksSteps({
  prefix,
  t,
}: {
  prefix: string;
  t: HomeText;
}) {
  return (
    <section className={homeDarkSection}>
      <div className="m-auto max-w-[1200px]">
        <h2 className={homeH2}>{t("howTitle")}</h2>
        <ol className="grid list-none grid-cols-[repeat(4,1fr)] gap-x-6 gap-y-10 upto1280:grid-cols-[repeat(2,1fr)] upto700:grid-cols-[1fr_1fr] upto700:gap-x-4 upto700:gap-y-8">
          {STEPS.map((step, i) => (
            <li key={step} className="border-t border-t-[#cfae7044] pt-6">
              <span className="text-[14px] text-gold">0{i + 1}</span>
              <h3 className="mt-4 text-[1.4rem] leading-[1.25] upto700:text-[1.25rem]">
                {t("step" + step)}
              </h3>
              <p className="text-[16px] text-[#c7c2b9] upto700:text-[14px]">
                {t("step" + step + "Text")}
              </p>
            </li>
          ))}
        </ol>
        <HomeTextLink href={`${prefix}/how-it-works`}>
          {t("howItWorksLink")}
        </HomeTextLink>
      </div>
    </section>
  );
}
