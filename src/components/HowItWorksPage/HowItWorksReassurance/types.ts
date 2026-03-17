// ─── Item data type ───────────────────────────────────────────────────────────

export interface ReassuranceItem {
    id: string;
    title: string;
    caption: string;
  }
  
  // ─── Bilingual content ────────────────────────────────────────────────────────
  
  export const reassuranceContent = {
    en: {
      items: [
        {
          id: "private",
          title: "100% Private",
          caption: "Your moment is yours alone — no other guests, no interruptions.",
        },
        {
          id: "team",
          title: "Professional Team",
          caption: "Experienced coordinators on the ground every step of the way.",
        },
        {
          id: "inclusive",
          title: "All-Inclusive Setup",
          caption: "Décor, photography, and logistics fully handled for you.",
        },
        {
          id: "memories",
          title: "Memories Forever",
          caption: "Professional photos and video delivered within days.",
        },
      ] as ReassuranceItem[],
    },
    es: {
      items: [
        {
          id: "private",
          title: "100% Privado",
          caption: "Tu momento es solo tuyo — sin otros huéspedes ni interrupciones.",
        },
        {
          id: "team",
          title: "Equipo Profesional",
          caption: "Coordinadores con experiencia presentes en cada paso.",
        },
        {
          id: "inclusive",
          title: "Todo Incluido",
          caption: "Decoración, fotografía y logística completamente a tu cargo.",
        },
        {
          id: "memories",
          title: "Recuerdos para Siempre",
          caption: "Fotos y video profesionales entregados en pocos días.",
        },
      ] as ReassuranceItem[],
    },
  } as const;