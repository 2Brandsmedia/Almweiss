"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type ConsentType = "all" | "essential" | null;

interface CookieContextType {
  consent: ConsentType;
  hasConsent: boolean;
  hasFullConsent: boolean;
  showConsentModal: boolean;
  acceptAll: () => void;
  acceptEssential: () => void;
  openConsentModal: () => void;
  closeConsentModal: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentType>(null);
  const [mounted, setMounted] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cookie-consent") as ConsentType;
    if (stored) {
      setConsent(stored);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const acceptAll = useCallback(() => {
    localStorage.setItem("cookie-consent", "all");
    setConsent("all");
    setShowConsentModal(false);
  }, []);

  const acceptEssential = useCallback(() => {
    localStorage.setItem("cookie-consent", "essential");
    setConsent("essential");
    setShowConsentModal(false);
  }, []);

  const openConsentModal = useCallback(() => {
    setShowConsentModal(true);
  }, []);

  const closeConsentModal = useCallback(() => {
    setShowConsentModal(false);
  }, []);

  // Während SSR/Hydration: Kein Consent annehmen
  const hasConsent = mounted && consent !== null;
  const hasFullConsent = mounted && consent === "all";

  return (
    <CookieContext.Provider
      value={{
        consent,
        hasConsent,
        hasFullConsent,
        showConsentModal,
        acceptAll,
        acceptEssential,
        openConsentModal,
        closeConsentModal,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieProvider");
  }
  return context;
}
