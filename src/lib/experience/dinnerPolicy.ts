import type { DefaultText, Locale, Settings } from "./types";

export const dinnerPolicyLabels: Record<string, DefaultText> = {
  dinnerExclusivity: {
    en: "Available seven nights a week. To keep every experience completely private, we host only one couple or group each evening. Send us your preferred date and our team will personally confirm availability.",
    es: "Disponible todas las noches de la semana. Para mantener cada experiencia completamente privada, solamente recibimos una pareja o grupo por noche. Envíanos tu fecha preferida y nuestro equipo confirmará personalmente la disponibilidad.",
  },
  dinnerPrivacyTagline: {
    en: "One table. One celebration. Your night.",
    es: "Una mesa. Una celebración. Tu noche.",
  },
  preferredDate: { en: "Preferred date", es: "Fecha preferida" },
  alternativeDate: {
    en: "Alternative date — optional",
    es: "Fecha alternativa — opcional",
  },
  datesFlexible: {
    en: "My dates are flexible",
    es: "Mis fechas son flexibles",
  },
  datePreferenceNote: {
    en: "Your selected date is a preference and is subject to confirmation by our team.",
    es: "La fecha seleccionada representa tu preferencia y está sujeta a confirmación por parte de nuestro equipo.",
  },
  dinnerRequestNote: {
    en: "Submitting this request does not reserve your date. Your dinner is officially confirmed after our team verifies availability and receives the {deposit} deposit.",
    es: "Enviar esta solicitud no reserva la fecha. La cena queda oficialmente confirmada después de que nuestro equipo verifique la disponibilidad y reciba el depósito de {deposit}.",
  },
  dinnerPaymentNote: {
    en: "We request the deposit only after confirming availability. The remaining balance is paid on the day of your dinner.",
    es: "Solicitamos el depósito solamente después de confirmar la disponibilidad. El balance restante se paga el día de la cena.",
  },
  dinnerRequestSuccess: {
    en: "Your request has been received. Our team will review your preferred date, selected experience and guest details. We will contact you to confirm availability and provide the next step for the {deposit} deposit.",
    es: "Hemos recibido tu solicitud. Nuestro equipo revisará tu fecha preferida, la experiencia seleccionada y los detalles de los invitados. Nos comunicaremos contigo para confirmar la disponibilidad e indicarte el siguiente paso para realizar el depósito de {deposit}.",
  },
  requestComments: {
    en: "Comments or date flexibility",
    es: "Comentarios o flexibilidad de fechas",
  },
  hotelAccommodation: {
    en: "Hotel or accommodation",
    es: "Hotel o alojamiento",
  },
  requestDinnerDate: {
    en: "Request your preferred date",
    es: "Solicita tu fecha preferida",
  },
};

export function dinnerDeposit(settings?: Settings | null) {
  const value = settings?.dinnerDepositAmount;
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : 200;
}

export function depositText(settings: Settings, locale: Locale) {
  return (
    "US$" +
    new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(
      dinnerDeposit(settings),
    )
  );
}
