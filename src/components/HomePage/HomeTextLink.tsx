import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import { homeIcon, homeTextLink } from "./styles";

/** An underlined link with a gold arrow, closing a home page section. */
export default function HomeTextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className={homeTextLink} href={href}>
      {children}
      <FiArrowRight aria-hidden="true" className={homeIcon} />
    </Link>
  );
}
