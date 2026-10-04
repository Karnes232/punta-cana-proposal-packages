import type { Image, Locale, Settings } from "@/lib/experience/types";
import { label } from "@/lib/experience/labels";
import { HomePhoto } from "./HomeWidgets";
import { buttonClass, eyebrowClass } from "./styles";

const heroButtonParts = {
  height: "min-h-[52px]",
  motion:
    "[transition:background_0.2s,transform_0.2s] motion-reduce:[transition:none] [&:hover]:[transform:translateY(-2px)]",
};

export default function CatalogHero({
  dinner,
  image,
  locale,
  settings,
}: {
  dinner: boolean;
  image?: Image;
  locale: Locale;
  settings: Settings;
}) {
  const es = locale === "es";
  return (
    <section className="relative isolate flex min-h-[min(800px,88svh)] items-center overflow-hidden bg-[#161719] text-ivory upto600:min-h-[85svh]">
      <HomePhoto
        photo={image}
        locale={locale}
        priority
        className="-z-2 object-cover object-center"
      />
      <div className="absolute inset-0 -z-1 bg-[linear-gradient(90deg,rgba(7,9,12,0.8),rgba(7,9,12,0.36)),linear-gradient(0deg,rgba(7,9,12,0.5),transparent_65%)]" />
      <div className="m-auto w-full max-w-[1280px] px-7 py-[90px] upto800:px-5 upto600:py-[65px] upto390:px-3.5">
        <p className={eyebrowClass()}>
          Punta Cana ·{" "}
          {es ? "Momentos extraordinarios" : "Extraordinary moments"}
        </p>
        <h1 className="my-6 max-w-[1000px] text-[clamp(2.5rem,5.2vw,5.3rem)] leading-[1.08] tracking-[-0.025em] text-balance text-inherit">
          {label(
            settings,
            locale,
            dinner ? "dinnerIntroTitle" : "proposalIntroTitle",
          )}
        </h1>
        <p className="max-w-[600px] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.7] text-[#eee8dd]">
          {dinner
            ? es
              ? "A la luz de las velas, frente al mar. Una mesa para celebrar a tu manera."
              : "By candlelight, beside the sea. A table to celebrate your way."
            : es
              ? "Un escenario inolvidable para el comienzo de su historia. Cada detalle, elegido por ti."
              : "An unforgettable setting for the beginning of your story. Every detail, chosen by you."}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 upto600:flex-col upto600:items-stretch">
          <a className={buttonClass(heroButtonParts)} href="#packages">
            {dinner
              ? es
                ? "Elige tu montaje"
                : "Choose your setting"
              : es
                ? "Descubre los paquetes"
                : "Explore the packages"}{" "}
            <span aria-hidden="true">↗</span>
          </a>
          <a
            className={buttonClass({
              ...heroButtonParts,
              colors:
                "border-[#d3bd90] bg-[rgba(0,0,0,0.15)] [background-position:initial] text-white [backdrop-filter:blur(8px)]",
            })}
            href="#experience-guide"
          >
            {es ? "Cómo funciona" : "How it works"}
          </a>
        </div>
      </div>
    </section>
  );
}
