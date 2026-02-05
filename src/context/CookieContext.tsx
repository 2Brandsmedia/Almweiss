"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type ConsentType = "all" | "essential" | null;

interface CookieContextType {
  consent: ConsentType;
  hasConsent: boolean;
  hasFullConsent: boolean;
  acceptAll: () => void;
  acceptEssential: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentType>(null);
  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cookie-consent") as ConsentType;
    if (stored) {
      setConsent(stored);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Scroll blockieren wenn kein Consent
  useEffect(() => {
    if (!mounted) return;

    if (!consent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [consent, mounted]);

  const acceptAll = useCallback(() => {
    localStorage.setItem("cookie-consent", "all");
    setConsent("all");
  }, []);

  const acceptEssential = useCallback(() => {
    localStorage.setItem("cookie-consent", "essential");
    setConsent("essential");
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
        acceptAll,
        acceptEssential,
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
