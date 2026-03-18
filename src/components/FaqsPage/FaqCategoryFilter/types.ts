export interface FaqCategoryItem {
  value: string;
  labelEn: string;
  labelEs: string;
}

export const FAQ_CATEGORIES: FaqCategoryItem[] = [
  { value: "all", labelEn: "All", labelEs: "Todas" },
  { value: "booking", labelEn: "Booking & Reservations", labelEs: "Reservas" },
  { value: "packages", labelEn: "Packages & Inclusions", labelEs: "Paquetes" },
  { value: "logistics", labelEn: "Logistics & Location", labelEs: "Logística" },
  {
    value: "payment",
    labelEn: "Payment & Pricing",
    labelEs: "Pagos y Precios",
  },
  {
    value: "customization",
    labelEn: "Customization",
    labelEs: "Personalización",
  },
  { value: "photos", labelEn: "Photos & Media", labelEs: "Fotos y Medios" },
];
