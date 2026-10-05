import type { DefaultText, Locale, Settings } from "./types";

export const dinnerPolicyLabels: Record<string, DefaultText> = {
  dinnerExclusivity: {
    en: "Available seven nights a week. To keep every experience completely private, we host only one couple or group each evening. Send us your preferred date and our team will personally confirm availability.",
    es: "Disponible todas las noches de la semana. Para mantener cada experiencia completamente privada, solamente recibimos una pareja o grupo por noche. Envíanos tu fecha preferida y nuestro equipo confirmará personalmente la disponibilidad.",
    fr: "Disponible sept soirs sur sept. Pour que chaque expérience reste entièrement privée, nous n’accueillons qu’un seul couple ou groupe par soirée. Envoyez-nous votre date préférée et notre équipe confirmera personnellement la disponibilité.",
    pt: "Disponível todas as noites da semana. Para manter cada experiência totalmente privada, recebemos apenas um casal ou grupo por noite. Envie sua data preferida e nossa equipe confirmará pessoalmente a disponibilidade.",
  },
  dinnerPrivacyTagline: {
    en: "One table. One celebration. Your night.",
    es: "Una mesa. Una celebración. Tu noche.",
    fr: "Une table. Une célébration. Votre soirée.",
    pt: "Uma mesa. Uma celebração. A sua noite.",
  },
  preferredDate: {
    en: "Preferred date",
    es: "Fecha preferida",
    fr: "Date préférée",
    pt: "Data preferida",
  },
  alternativeDate: {
    en: "Alternative date — optional",
    es: "Fecha alternativa — opcional",
    fr: "Date alternative — facultative",
    pt: "Data alternativa — opcional",
  },
  datesFlexible: {
    en: "My dates are flexible",
    es: "Mis fechas son flexibles",
    fr: "Mes dates sont flexibles",
    pt: "Minhas datas são flexíveis",
  },
  datePreferenceNote: {
    en: "Your selected date is a preference and is subject to confirmation by our team.",
    es: "La fecha seleccionada representa tu preferencia y está sujeta a confirmación por parte de nuestro equipo.",
    fr: "La date sélectionnée est une préférence et reste soumise à la confirmation de notre équipe.",
    pt: "A data selecionada é uma preferência e está sujeita à confirmação da nossa equipe.",
  },
  dinnerRequestNote: {
    en: "Submitting this request does not reserve your date. Your dinner is officially confirmed after our team verifies availability and receives the {deposit} deposit.",
    es: "Enviar esta solicitud no reserva la fecha. La cena queda oficialmente confirmada después de que nuestro equipo verifique la disponibilidad y reciba el depósito de {deposit}.",
    fr: "L’envoi de cette demande ne réserve pas votre date. Votre dîner est officiellement confirmé une fois que notre équipe a vérifié la disponibilité et reçu l’acompte de {deposit}.",
    pt: "Enviar esta solicitação não reserva a sua data. Seu jantar é oficialmente confirmado depois que nossa equipe verifica a disponibilidade e recebe o sinal de {deposit}.",
  },
  dinnerPaymentNote: {
    en: "We request the deposit only after confirming availability. The remaining balance is paid on the day of your dinner.",
    es: "Solicitamos el depósito solamente después de confirmar la disponibilidad. El balance restante se paga el día de la cena.",
    fr: "Nous demandons l’acompte uniquement après avoir confirmé la disponibilité. Le solde est réglé le jour de votre dîner.",
    pt: "Solicitamos o sinal somente depois de confirmar a disponibilidade. O saldo restante é pago no dia do seu jantar.",
  },
  dinnerRequestSuccess: {
    en: "Your request has been received. Our team will review your preferred date, selected experience and guest details. We will contact you to confirm availability and provide the next step for the {deposit} deposit.",
    es: "Hemos recibido tu solicitud. Nuestro equipo revisará tu fecha preferida, la experiencia seleccionada y los detalles de los invitados. Nos comunicaremos contigo para confirmar la disponibilidad e indicarte el siguiente paso para realizar el depósito de {deposit}.",
    fr: "Votre demande a bien été reçue. Notre équipe examinera votre date préférée, l’expérience choisie et les informations sur vos convives. Nous vous contacterons pour confirmer la disponibilité et vous indiquer la marche à suivre pour l’acompte de {deposit}.",
    pt: "Recebemos sua solicitação. Nossa equipe vai analisar sua data preferida, a experiência selecionada e os detalhes dos convidados. Entraremos em contato para confirmar a disponibilidade e informar o próximo passo para o sinal de {deposit}.",
  },
  requestComments: {
    en: "Comments or date flexibility",
    es: "Comentarios o flexibilidad de fechas",
    fr: "Commentaires ou flexibilité des dates",
    pt: "Comentários ou flexibilidade de datas",
  },
  hotelAccommodation: {
    en: "Hotel or accommodation",
    es: "Hotel o alojamiento",
    fr: "Hôtel ou hébergement",
    pt: "Hotel ou hospedagem",
  },
  requestDinnerDate: {
    en: "Request your preferred date",
    es: "Solicita tu fecha preferida",
    fr: "Demandez votre date préférée",
    pt: "Solicite sua data preferida",
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
