"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Focus Trap Hook - Hält den Fokus innerhalb eines Modals
 * WCAG 2.1 Best Practice für modale Dialoge
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];

    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    ).filter(el => el.offsetParent !== null); // Nur sichtbare Elemente
  }, []);

  useEffect(() => {
    if (!isActive) {
      // Modal geschlossen - Fokus zurücksetzen
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
      return;
    }

    // Modal geöffnet - vorheriges Element speichern
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Fokus auf erstes Element im Modal setzen
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      // Kleines Delay für Animation
      setTimeout(() => {
        focusableElements[0]?.focus();
      }, 50);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift+Tab auf erstem Element -> zum letzten
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab auf letztem Element -> zum ersten
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, getFocusableElements]);

  return containerRef;
}
