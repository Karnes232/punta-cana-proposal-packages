import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { homeIcon, homeTextLink } from "@/components/HomePage/styles";

/** No packages or dinners published yet: a note and a contact link. */
export default function CatalogEmpty({
  message,
  contactLabel,
  prefix,
}: {
  message: string;
  contactLabel: string;
  prefix: string;
}) {
  return (
    <div className="mx-auto max-w-[1000px] border border-(--ec-border) px-6 py-8 md:px-10">
      <p className="m-0 text-[17px] text-(--ec-ink)">{message}</p>
      <Link className={`${homeTextLink} mt-6`} href={prefix + "/contact"}>
        {contactLabel}
        <FiArrowRight aria-hidden="true" className={homeIcon} />
      </Link>
    </div>
  );
}
