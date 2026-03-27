// Client Component (Context Provider)
// Manages the proposal customization state for an entire category page.
// Tracks which package the user selected, their tier choice (standard/premium),
// and their aesthetic preferences (color palette, floral style, mood tone).
// The computed `totalPrice` adds the premium uplift on top of the base package price.
//
// Usage: wrap PackageGrid, CustomizationSelector, WhatsIncluded, BookingForm,
// and StickyBookingBar in a single <CustomizationProvider> so they all share state.
// Access state anywhere inside with `useCustomization()`.

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface SelectedPackage {
  name: string;
  slug: string;
  price: number;
  colorCustomizationOptions: {
    label: {
      en: string;
      es: string;
    };
    tier: string;
  }[];
  floralCustomizationOptions: {
    label: {
      en: string;
      es: string;
    };
    tier: string;
  }[];
  toneCustomizationOptions: {
    label: {
      en: string;
      es: string;
    };
    tier: string;
  }[];
  inclusions: {
    icon: string;
    title: {
      en: string;
      es: string;
    };
    description: {
      en: string;
      es: string;
    };
  }[];
}

export interface CustomizationState {
  /** Selected package */
  selectedPackage: SelectedPackage | null;
  /** Selected tier */
  tier: "standard" | "premium";
  /** Selected color palette label */
  color: string | null;
  /** Selected floral style label */
  floral: string | null;
  /** Selected overall tone/mood label */
  tone: string | null;
  /** Premium uplift amount */
  premiumUplift: number;
}

interface CustomizationContextValue {
  state: CustomizationState;
  setSelectedPackage: (pkg: SelectedPackage) => void;
  setTier: (tier: "standard" | "premium") => void;
  setColor: (color: string) => void;
  setFloral: (floral: string) => void;
  setTone: (tone: string) => void;
  /** Computed total: base price + premium uplift if applicable */
  totalPrice: number | null;
}

const CustomizationContext = createContext<CustomizationContextValue | null>(
  null,
);

export function useCustomization() {
  const ctx = useContext(CustomizationContext);
  if (!ctx) {
    throw new Error(
      "useCustomization must be used within a CustomizationProvider",
    );
  }
  return ctx;
}

interface CustomizationProviderProps {
  children: ReactNode;
  /** Flat uplift for premium tier (e.g. 300) */
  premiumUplift?: number;
}

export function CustomizationProvider({
  children,
  premiumUplift = 300,
}: CustomizationProviderProps) {
  const [state, setState] = useState<CustomizationState>({
    selectedPackage: null,
    tier: "standard",
    color: null,
    floral: null,
    tone: null,
    premiumUplift,
  });

  const setSelectedPackage = (pkg: SelectedPackage) =>
    setState((prev) => ({ ...prev, selectedPackage: pkg }));

  const setTier = (tier: "standard" | "premium") =>
    setState((prev) => ({ ...prev, tier }));

  const setColor = (color: string) => setState((prev) => ({ ...prev, color }));

  const setFloral = (floral: string) =>
    setState((prev) => ({ ...prev, floral }));

  const setTone = (tone: string) => setState((prev) => ({ ...prev, tone }));

  const totalPrice = state.selectedPackage
    ? state.selectedPackage.price +
      (state.tier === "premium" ? state.premiumUplift : 0)
    : null;

  return (
    <CustomizationContext.Provider
      value={{
        state,
        setSelectedPackage,
        setTier,
        setColor,
        setFloral,
        setTone,
        totalPrice,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}
