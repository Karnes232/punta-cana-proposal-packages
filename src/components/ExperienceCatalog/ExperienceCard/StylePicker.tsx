import NextImage from "next/image";

import { id, local } from "@/lib/experience/normalize";

import type { CardSectionProps } from "./types";

/**
 * Style choice: a compact select in the proposals grid, or radio buttons with
 * thumbnails on a detail page.
 */
export default function StylePicker({
  experience,
  locale,
  t,
  state,
  compact,
  contactOnly,
}: Omit<CardSectionProps, "money"> & {
  compact: boolean;
  contactOnly: boolean;
}) {
  const { styles } = experience;
  const { style, selectedStyleId, setSelectedStyleId } = state;
  if (!styles.length) return null;

  if (compact)
    return (
      <label className="mt-6">
        {t("selectStyleLabel")}
        <select
          className="in-[.ec-proposal-card]:border-[#cfae7066] in-[.ec-proposal-card]:bg-[#1c1c20] in-[.ec-proposal-card]:text-ivory"
          value={selectedStyleId}
          onChange={(event) => setSelectedStyleId(event.target.value)}
        >
          {styles.map((option) => (
            <option key={id(option)} value={id(option)}>
              {local(option.name, locale)}
            </option>
          ))}
        </select>
      </label>
    );

  return (
    <fieldset>
      <legend>{t("selectStyleLabel")}</legend>
      <div className="flex flex-wrap gap-2.5 upto800:gap-2">
        {styles.map((option) => (
          <label
            key={id(option)}
            className={`min-w-[120px] flex-1 cursor-pointer flex-row flex-wrap [align-content:start] items-center rounded-none border px-3.5 py-2.5 upto800:min-w-[100px] ${id(option) === selectedStyleId ? "border-[#9b773d] bg-[#f3ecde]" : "border-(--ec-border)"}`}
          >
            {option.mainImage?.url && (
              <NextImage
                className="mb-1.5 aspect-[3/2] h-auto w-full basis-full object-cover"
                src={option.mainImage.url}
                alt=""
                width={240}
                height={160}
                sizes="(max-width: 800px) 40vw, 280px"
                quality={75}
                loading="lazy"
              />
            )}
            <input
              type="radio"
              name={`style-${experience._id}`}
              value={id(option)}
              checked={id(option) === selectedStyleId}
              onChange={() => setSelectedStyleId(id(option))}
            />
            {local(option.name, locale)}
          </label>
        ))}
      </div>
      {style && !contactOnly && <p>{local(style.description, locale)}</p>}
    </fieldset>
  );
}
