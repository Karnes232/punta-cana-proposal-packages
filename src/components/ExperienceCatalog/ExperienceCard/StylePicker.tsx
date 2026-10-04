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
      <label className="ec-compact-style">
        {t("selectStyleLabel")}
        <select
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
      <div className="ec-style-options">
        {styles.map((option) => (
          <label
            key={id(option)}
            className={id(option) === selectedStyleId ? "selected" : ""}
          >
            {option.mainImage?.url && (
              <NextImage
                className="ec-style-thumb"
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
