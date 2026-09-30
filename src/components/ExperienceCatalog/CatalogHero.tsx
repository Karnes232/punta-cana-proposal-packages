import type { Image, Locale, Settings } from "@/lib/experience/types";
import { label } from "@/lib/experience/labels";
import { HomePhoto } from "./HomeWidgets";

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
    <section className="ec-photo-hero">
      <HomePhoto photo={image} locale={locale} priority />
      <div className="ec-photo-hero-shade" />
      <div className="ec-wrap ec-photo-hero-copy">
        <p className="ec-eyebrow">
          Punta Cana ·{" "}
          {es ? "Momentos extraordinarios" : "Extraordinary moments"}
        </p>
        <h1>
          {label(
            settings,
            locale,
            dinner ? "dinnerIntroTitle" : "proposalIntroTitle",
          )}
        </h1>
        <p>
          {dinner
            ? es
              ? "A la luz de las velas, frente al mar. Una mesa para celebrar a tu manera."
              : "By candlelight, beside the sea. A table to celebrate your way."
            : es
              ? "Un escenario inolvidable para el comienzo de su historia. Cada detalle, elegido por ti."
              : "An unforgettable setting for the beginning of your story. Every detail, chosen by you."}
        </p>
        <div className="ec-actions">
          <a className="ec-button" href="#packages">
            {dinner
              ? es
                ? "Elige tu montaje"
                : "Choose your setting"
              : es
                ? "Descubre los paquetes"
                : "Explore the packages"}{" "}
            <span aria-hidden="true">↗</span>
          </a>
          <a className="ec-button secondary" href="#experience-guide">
            {es ? "Cómo funciona" : "How it works"}
          </a>
        </div>
      </div>
    </section>
  );
}
