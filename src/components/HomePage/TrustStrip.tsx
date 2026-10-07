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

/** The black strip of reassurances, with the media and deposit notes. */
export default function TrustStrip({ t }: { t: HomeText }) {
  return (
    <section
      className="bg-black px-[max(24px,calc((100vw_-_1200px)/2))] py-12 text-ivory"
      aria-label={t("trustLabel")}
    >
      <div className="grid grid-cols-[repeat(3,1fr)] gap-6 upto700:grid-cols-[1fr_1fr] upto700:gap-4">
        {TRUST.map(([key, Icon]) => (
          <p
            key={key}
            className="flex items-center gap-4 text-[16px] text-inherit upto700:items-start upto700:text-[14px]"
          >
            <Icon aria-hidden="true" className={`h-6 w-6 ${homeIcon}`} />
            {t(key)}
          </p>
        ))}
      </div>
      <p className="text-[14px] text-[#c7c2b9]">{t("mediaNote")}</p>
      <p className="text-[14px] text-[#c7c2b9]">{t("deposit")}</p>
    </section>
  );
}
