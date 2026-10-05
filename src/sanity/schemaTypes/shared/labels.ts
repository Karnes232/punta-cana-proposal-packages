/**
 * Studio labels are bilingual so both the client (Spanish) and developers
 * (English) can read them: "Español / English".
 */
export const bi = (es: string, en: string) =>
  es === en ? es : `${es} / ${en}`;
