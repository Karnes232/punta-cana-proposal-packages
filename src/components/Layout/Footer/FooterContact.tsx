import type { GeneralLayout } from "@/sanity/queries/GeneralLayout/GeneralLayout";
import CompanyContactList from "./CompanyContactList";
import { columnHeading, link } from "./styles";

/** The Contact column: phone, email and the social profiles that are set. */
export default function FooterContact({
  heading,
  company,
}: {
  heading: string;
  company: GeneralLayout | null;
}) {
  return (
    <div>
      <p className={columnHeading}>{heading}</p>
      <CompanyContactList company={company} linkClass={link} />
    </div>
  );
}
