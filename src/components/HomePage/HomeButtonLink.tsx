import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import { buttonClass } from "../ExperienceCatalog/styles";
import { homeButtonIcon, homeButtonParts } from "./styles";

/** The home page's gold button, with an arrow after its text. */
export default function HomeButtonLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className={buttonClass(homeButtonParts)} href={href}>
      {children}
      <FiArrowRight aria-hidden="true" className={homeButtonIcon} />
    </Link>
  );
}
