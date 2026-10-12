import {
  FiCamera,
  FiClock,
  FiMapPin,
  FiShield,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import type { HomeText } from "./homeData";
import { homeIcon } from "./styles";

// [copy key, icon]
const TRUST = [
  ["trustPrivate", FiMapPin],
  ["trustLocal", FiShield],
  ["trustTransport", FiTruck],
  ["trustService", FiUsers],
  ["trustPhoto", FiCamera],
  ["trustDelivery", FiClock],
] as const;

/**
 * The black strip of reassurances in one row, with the media and deposit
 * notes as one line under it.
 */
export default function TrustStrip({ t }: { t: HomeText }) {
  return (
    <section
      className="bg-black px-[max(24px,calc((100vw_-_1200px)/2))] py-12 text-ivory"
      aria-label={t("trustLabel")}
    >
      <ul className="grid list-none grid-cols-6 divide-x divide-[#cfae7026] upto800:grid-cols-3 upto800:gap-y-8 upto800:divide-x-0 upto600:grid-cols-2">
        {TRUST.map(([key, Icon]) => (
          <li
            key={key}
            className="flex flex-col gap-3 px-5 text-[15px] leading-[1.45] first:pl-0 last:pr-0 upto800:px-0 upto800:pr-4"
          >
            <Icon aria-hidden="true" className={`h-6 w-6 ${homeIcon}`} />
            {t(key)}
          </li>
        ))}
      </ul>
      <p className="mt-10 mb-0 border-t border-t-[#cfae7026] pt-6 text-[14px] text-[#c7c2b9]">
        {t("mediaNote")} {t("deposit")}
      </p>
    </section>
  );
}
