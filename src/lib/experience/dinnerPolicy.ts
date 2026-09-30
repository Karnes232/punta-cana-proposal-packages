import type { Locale, Settings } from "./types";

export const dinnerPolicyLabels: Record<string, [string, string]> = {
  dinnerExclusivity: [
    "Available seven nights a week. To keep every experience completely private, we host only one couple or group each evening. Send us your preferred date and our team will personally confirm availability.",
    "Disponible todas las noches de la semana. Para mantener cada experiencia completamente privada, solamente recibimos una pareja o grupo por noche. Envíanos tu fecha preferida y nuestro equipo confirmará personalmente la disponibilidad.",
  ],
  dinnerPrivacyTagline: [
    "One table. One celebration. Your night.",
    "Una mesa. Una celebración. Tu noche.",
  ],
  preferredDate: ["Preferred date", "Fecha preferida"],
  alternativeDate: [
    "Alternative date — optional",
    "Fecha alternativa — opcional",
  ],
  datesFlexible: ["My dates are flexible", "Mis fechas son flexibles"],
  datePreferenceNote: [
    "Your selected date is a preference and is subject to confirmation by our team.",
    "La fecha seleccionada representa tu preferencia y está sujeta a confirmación por parte de nuestro equipo.",
  ],
  dinnerRequestNote: [
    "Submitting this request does not reserve your date. Your dinner is officially confirmed after our team verifies availability and receives the {deposit} deposit.",
    "Enviar esta solicitud no reserva la fecha. La cena queda oficialmente confirmada después de que nuestro equipo verifique la disponibilidad y reciba el depósito de {deposit}.",
  ],
  dinnerPaymentNote: [
    "We request the deposit only after confirming availability. The remaining balance is paid on the day of your dinner.",
    "Solicitamos el depósito solamente después de confirmar la disponibilidad. El balance restante se paga el día de la cena.",
  ],
  dinnerRequestSuccess: [
    "Your request has been received. Our team will review your preferred date, selected experience and guest details. We will contact you to confirm availability and provide the next step for the {deposit} deposit.",
    "Hemos recibido tu solicitud. Nuestro equipo revisará tu fecha preferida, la experiencia seleccionada y los detalles de los invitados. Nos comunicaremos contigo para confirmar la disponibilidad e indicarte el siguiente paso para realizar el depósito de {deposit}.",
  ],
  requestComments: [
    "Comments or date flexibility",
    "Comentarios o flexibilidad de fechas",
  ],
  hotelAccommodation: ["Hotel or accommodation", "Hotel o alojamiento"],
  requestDinnerDate: [
    "Request your preferred date",
    "Solicita tu fecha preferida",
  ],
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
