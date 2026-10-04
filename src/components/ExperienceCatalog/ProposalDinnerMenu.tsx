"use client";
import type {
  Experience,
  Locale,
  Settings,
  Selection,
  Course,
} from "@/lib/experience/types";
import { local, id } from "@/lib/experience/normalize";
import { label } from "@/lib/experience/labels";
import Accordion from "./Accordion";
import { eyebrowClass } from "./styles";

export default function ProposalDinnerMenu({
  experience,
  locale,
  settings,
  menus,
  onChange,
}: {
  experience: Experience;
  locale: Locale;
  settings: Settings;
  menus: Selection["guestMenus"];
  onChange: (menus: Selection["guestMenus"]) => void;
}) {
  const courses: Course[] = ["starter", "main", "dessert"];
  const t = (key: string) => label(settings, locale, key);
  return (
    <section
      data-testid="proposal-dinner"
      className="my-6 rounded-[4px_32px_4px_4px] border border-[#776443] bg-[linear-gradient(135deg,#20201f,#111214)] p-6 upto600:p-4"
    >
      <p className={`${eyebrowClass()} leading-[1.6]`}>
        {locale === "es"
          ? "Una mesa para dos · Tres tiempos"
          : "A table for two · Three courses"}
      </p>
      <h3 className="text-[1.7rem] leading-[1.2] text-[#ecd6aa]">
        {locale === "es"
          ? "El final perfecto para tu propuesta"
          : "The perfect ending to your proposal"}
      </h3>
      <p className="leading-[1.6]">
        {locale === "es"
          ? "Elige una entrada, un plato principal y un postre para cada invitado."
          : "Choose a starter, main course and dessert for each guest."}
      </p>
      {[0, 1].map((i) => (
        <Accordion
          key={i}
          title={`${t("guest")} ${i + 1}`}
          summary={`${courses.filter((c) => menus[i]?.[c]).length} / 3`}
        >
          {courses.map((course) => {
            const selected = experience.menuItems.find(
              (item) => id(item) === menus[i]?.[course],
            );
            return (
              <label key={course} className="my-3.5 grid gap-2">
                {t(course)}
                <select
                  className="w-full min-w-0"
                  value={menus[i]?.[course] || ""}
                  onChange={(event) =>
                    onChange(
                      Array.from({ length: 2 }, (_, index) =>
                        index === i
                          ? { ...menus[index], [course]: event.target.value }
                          : { ...menus[index] },
                      ),
                    )
                  }
                >
                  <option value="">{t("select")}</option>
                  {experience.menuItems
                    .filter((item) => item.active && item.courseType === course)
                    .map((item) => (
                      <option key={id(item)} value={id(item)}>
                        {local(item.name, locale)}
                        {item.dietaryType === "vegan"
                          ? " · Ve"
                          : item.dietaryType === "vegetarian"
                            ? " · V"
                            : ""}
                        {!item.included
                          ? ` · +${item.supplementPrice || 0} USD`
                          : ""}
                      </option>
                    ))}
                </select>
                {selected && (
                  <small>
                    {local(selected.description, locale)}{" "}
                    {local(selected.allergenInformation, locale)}
                  </small>
                )}
              </label>
            );
          })}
        </Accordion>
      ))}
      <small>
        {locale === "es"
          ? "V: vegetariano · Ve: vegano"
          : "V: vegetarian · Ve: vegan"}
      </small>
    </section>
  );
}
