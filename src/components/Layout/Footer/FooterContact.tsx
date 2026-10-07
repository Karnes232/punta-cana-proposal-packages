import type { IconType } from "react-icons";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import type { GeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import { dialNumber, formatPhone, isProfileLink } from "./contact";
import { columnHeading, link } from "./styles";

// The social links the footer shows, by their Business info field.
const socialNetworks: Record<string, { name: string; icon?: IconType }> = {
  instagram: { name: "Instagram", icon: FiInstagram },
  facebook: { name: "Facebook", icon: FiFacebook },
  MessengerURL: { name: "Messenger", icon: FiMessageCircle },
  xURL: { name: "X" },
};

/** The Contact column: phone, email and the social profiles that are set. */
export default function FooterContact({
  heading,
  company,
}: {
  heading: string;
  company: GeneralLayout | null;
}) {
  const socials = Object.entries(company?.socialLinks || {}).filter(
    ([network, url]) => socialNetworks[network] && isProfileLink(url),
  );

  return (
    <div>
      <p className={columnHeading}>{heading}</p>
      <ul>
        {company?.telephone && (
          <li>
            <a href={`tel:${dialNumber(company.telephone)}`} className={link}>
              <FiPhone aria-hidden className="shrink-0 text-gold" />
              {formatPhone(company.telephone)}
            </a>
          </li>
        )}
        {company?.email && (
          <li>
            <a
              href={`mailto:${company.email}`}
              className={`${link} break-words`}
            >
              <FiMail aria-hidden className="shrink-0 text-gold" />
              {company.email}
            </a>
          </li>
        )}
        {socials.map(([network, url]) => {
          const { name, icon: Icon } = socialNetworks[network];
          return (
            <li key={network}>
              <a
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                className={link}
              >
                {Icon && <Icon aria-hidden className="shrink-0 text-gold" />}
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
