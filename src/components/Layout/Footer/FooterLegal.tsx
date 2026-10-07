import { smallLink } from "./styles";

/** The bottom bar's first row: copyright, then the legal pages. */
export default function FooterLegal({
  name,
  prefix,
  t,
}: {
  name: string;
  prefix: string;
  t: (key: string) => string;
}) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-x-6">
      <p>
        © {new Date().getFullYear()} {name}. {t("rightsReserved")}
      </p>
      <div className="flex gap-6">
        <a href={`${prefix}/privacy-policy`} className={smallLink}>
          {t("privacy")}
        </a>
        <a href={`${prefix}/terms-of-service`} className={smallLink}>
          {t("terms")}
        </a>
      </div>
    </div>
  );
}
