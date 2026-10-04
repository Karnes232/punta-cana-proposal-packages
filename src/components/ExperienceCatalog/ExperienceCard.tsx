"use client";
import { id, local } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";
import { proposalDinnerId } from "@/lib/experience/proposalExtras";
import type { Experience, Locale, Settings } from "@/lib/experience/types";

import Accordion from "./Accordion";
import AddonsSection from "./ExperienceCard/AddonsSection";
import DinnerDrinksSection from "./ExperienceCard/DinnerDrinksSection";
import DinnerGuestsSection from "./ExperienceCard/DinnerGuestsSection";
import DinnerMenuSection from "./ExperienceCard/DinnerMenuSection";
import { moneyFormatter } from "./ExperienceCard/money";
import PurchaseSummary from "./ExperienceCard/PurchaseSummary";
import StylePicker from "./ExperienceCard/StylePicker";
import { useExperienceSelection } from "./ExperienceCard/useExperienceSelection";
import ExperienceGallery from "./ExperienceGallery";
import ProposalDinnerMenu from "./ProposalDinnerMenu";

/**
 * A proposal or romantic dinner a visitor can configure and request.
 *
 * - `selectable`: compact card in the /proposals grid; its configuration
 *   opens when the card is selected, and the request form opens in a dialog.
 * - otherwise: the full card used on detail pages and for dinners.
 * - `demo`: example content (preview hosts); requests are not sent.
 * - `contactOnly`: the dinner example that only takes inquiries.
 */
export default function ExperienceCard({
  experience,
  locale,
  settings,
  demo = false,
  contactOnly = false,
  selectable = false,
  selected = false,
  onSelect,
}: {
  experience: Experience;
  locale: Locale;
  settings: Settings;
  demo?: boolean;
  contactOnly?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const state = useExperienceSelection(experience, locale, demo);
  const { dinner, style, selectedStyleId, selectedAddons, guestMenus } = state;
  const t = (key: string) => label(settings, locale, key);
  const money = moneyFormatter(locale, settings, experience.currency || "USD");
  const section = { experience, locale, t, money, state };

  const price =
    demo &&
    !dinner &&
    style?.price === undefined &&
    experience.basePrice === undefined
      ? t("priceToBeDefined")
      : money(
          dinner
            ? experience.basePrice || 0
            : (style?.price ?? experience.basePrice ?? 0),
        );

  return (
    <article
      className={
        selectable
          ? // ec-proposal-card is a marker for the dark-card variants of the sections inside.
            `ec-proposal-card min-w-0 scroll-mt-[120px] cursor-pointer border bg-[#141416] text-ivory [transition:border-color_180ms] ${selected ? "border-gold" : "border-[#cfae7033] [&:hover]:border-gold"}`
          : "scroll-mt-[100px] border-none bg-white"
      }
      id={experience.slug?.current || experience._id}
      onClick={
        selectable
          ? (event) => {
              // Clicking the card selects it, except on its own controls.
              if (
                !(event.target as HTMLElement).closest(
                  "button, input, select, textarea, label, a",
                )
              )
                onSelect?.();
            }
          : undefined
      }
    >
      {demo && !style?.mainImage?.url && (
        <div
          data-testid="template-media"
          className="grid min-h-[260px] place-content-center gap-3.5 border-b border-b-gold bg-[#151515] p-8 text-center text-ivory"
        >
          <span className="text-[0.7rem] tracking-[0.18em] text-gold uppercase">
            {t("setupTemplate")}
          </span>
          <strong className="font-display text-[2.4rem] font-normal">
            {local(style?.name, locale)}
          </strong>
          <small className="text-[#b7b1a6]">{t("photoPending")}</small>
        </div>
      )}
      <ExperienceGallery
        key={selectedStyleId}
        selectedStyleImage={style?.mainImage}
        gallery={experience.gallery}
        locale={locale}
        settings={settings}
      />
      <div className="min-w-0 p-7 upto800:p-[22px] upto390:px-3.5 upto390:py-[18px]">
        <div
          data-testid="card-heading"
          className={`flex [align-items:start] justify-between gap-5 ${selectable ? "" : "upto800:block"}`}
        >
          <h2
            className={
              selectable
                ? "text-[clamp(1.5rem,2.2vw,2rem)] italic"
                : "text-[1.8rem]"
            }
          >
            {local(experience.name, locale)}
          </h2>
          <span
            className={`text-[0.9rem] font-medium ${selectable ? "max-w-[40%] shrink-0 text-right whitespace-normal text-gold" : "whitespace-nowrap text-[#8b672e]"}`}
          >
            {selectable
              ? t("startingAtLabel")
              : local(experience.priceLabel, locale)}{" "}
            {price}
          </span>
        </div>
        {!selectable && <p>{local(experience.shortDescription, locale)}</p>}
        {selectable && (
          <ul className="my-[22px] list-disc pl-[18px] text-[14px] text-[#cfcdca]">
            {experience.inclusions.map((inclusion) => (
              <li key={id(inclusion)} className="py-0.5">
                {local(inclusion.name, locale)}
              </li>
            ))}
          </ul>
        )}
        <StylePicker
          {...section}
          compact={selectable}
          contactOnly={contactOnly}
        />
        {!selectable && experience.inclusions.length > 0 && (
          <Accordion title={t("includedLabel")}>
            <ul className="flex list-none flex-wrap gap-x-7 gap-y-3.5 py-2">
              {experience.inclusions.map((inclusion) => (
                <li
                  key={id(inclusion)}
                  className="before:mr-2 before:text-[#9b773d] before:content-['✓']"
                >
                  {local(inclusion.name, locale)}{" "}
                  {local(inclusion.description, locale)}
                </li>
              ))}
            </ul>
          </Accordion>
        )}
        {dinner && (
          <>
            <DinnerGuestsSection {...section} />
            <DinnerMenuSection {...section} />
            {experience.beverages.length > 0 && (
              <DinnerDrinksSection {...section} />
            )}
          </>
        )}
        {selectable && (
          <button
            type="button"
            className="flex min-h-12 w-full cursor-pointer justify-between pt-6 pb-2 text-left text-[14px] font-semibold tracking-[0.1em] text-gold uppercase"
            aria-pressed={selected}
            aria-controls={`configure-${experience._id}`}
            onClick={onSelect}
          >
            {t(selected ? "selectedPackage" : "selectPackage")}{" "}
            <span aria-hidden="true">{selected ? "✓" : "→"}</span>
          </button>
        )}
        <div
          id={`configure-${experience._id}`}
          hidden={selectable && !selected}
        >
          {experience.availableAddons.length > 0 && (
            <AddonsSection {...section} />
          )}
          {!dinner && !!selectedAddons[proposalDinnerId] && (
            <ProposalDinnerMenu
              experience={experience}
              locale={locale}
              settings={settings}
              menus={guestMenus}
              onChange={state.setGuestMenus}
            />
          )}
          <PurchaseSummary
            {...section}
            settings={settings}
            demo={demo}
            inDialog={selectable}
          />
        </div>
        {!selectable && local(experience.longDescription, locale) && (
          <p>{local(experience.longDescription, locale)}</p>
        )}
      </div>
    </article>
  );
}
