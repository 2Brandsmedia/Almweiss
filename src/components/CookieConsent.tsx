"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/context/CookieContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export default function CookieConsent() {
  const {
    hasConsent,
    showConsentModal,
    acceptAll,
    acceptEssential,
    openConsentModal,
    closeConsentModal
  } = useCookieConsent();

  // Focus Trap für Cookie-Modal (WCAG 2.1)
  const focusTrapRef = useFocusTrap(showConsentModal);

  // Scroll-Sperre bis Cookie-Entscheidung getroffen wurde
  useEffect(() => {
    if (!hasConsent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [hasConsent]);

  return (
    <>
      {/* Dunkler Overlay - Website sichtbar aber abgedunkelt */}
      {!hasConsent && (
        <div
          className="fixed inset-0 z-[199] bg-black/60 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Cookie Banner - mittig unten, pulsierend für Aufmerksamkeit */}
      {!hasConsent && (
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Cookie-Einstellungen erforderlich"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] max-w-md w-[calc(100%-2rem)] bg-white rounded-2xl border-2 border-[#A68A75] p-6 animate-in slide-in-from-bottom-4 duration-500 animate-cookie-glow"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="material-icons text-[#A68A75] text-3xl flex-shrink-0" aria-hidden="true">cookie</span>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Bitte wählen Sie Ihre Cookie-Einstellungen</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                <strong>Ohne Ihre Zustimmung</strong> können wir Videos, Karten und Instagram-Beiträge nicht anzeigen.
                Die Website ist dann nur <strong>eingeschränkt nutzbar</strong>.
              </p>
              <p className="text-xs text-gray-500">
                Sie können Ihre Einstellungen jederzeit im Footer unter &bdquo;Cookie-Einstellungen&ldquo; ändern.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={acceptEssential}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
            >
              Nur notwendige
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-[#7D6B5D] hover:bg-[#6B5A4D] rounded-full transition-all shadow-sm"
            >
              Alle akzeptieren
            </button>
          </div>

          <button
            onClick={openConsentModal}
            className="w-full text-xs text-[#A68A75] hover:text-[#6B5A4D] font-medium py-1"
          >
            Mehr erfahren & Details anpassen
          </button>
        </aside>
      )}

      {/* Cookie Details Modal - öffnet sich bei Klick auf "Mehr erfahren" oder "Cookies aktivieren" */}
      {showConsentModal && (
        <div
          className="fixed inset-0 z-[400] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeConsentModal}
        >
          <div
            ref={focusTrapRef}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F5F0EB] rounded-full flex items-center justify-center">
                  <span className="material-icons text-[#A68A75]" aria-hidden="true">cookie</span>
                </div>
                <h2 id="cookie-modal-title" className="font-bold text-gray-900 text-lg">Cookie-Einstellungen</h2>
              </div>
              <button
                onClick={closeConsentModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                aria-label="Dialog schließen"
              >
                <span className="material-icons text-gray-500" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
              {/* Wichtiger Hinweis */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="material-icons text-amber-600 text-xl" aria-hidden="true">info</span>
                  <div>
                    <h3 className="font-semibold text-amber-800 text-sm mb-1">Wichtiger Hinweis</h3>
                    <p className="text-xs text-amber-700">
                      Ohne Zustimmung zu externen Diensten können YouTube-Videos, Google Maps und Instagram-Beiträge
                      nicht angezeigt werden. Die Website funktioniert nur mit eingeschränkter Funktionalität.
                    </p>
                  </div>
                </div>
              </div>

              {/* Notwendige Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-green-600 text-lg" aria-hidden="true">check_circle</span>
                    <h3 className="font-semibold text-gray-900 text-sm">Notwendige Cookies</h3>
                  </div>
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Immer aktiv</span>
                </div>
                <p className="text-xs text-gray-600">
                  Erforderlich für grundlegende Funktionen wie Navigation und Speicherung Ihrer Cookie-Präferenzen.
                </p>
              </div>

              {/* Externe Medien */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-icons text-[#A68A75] text-lg" aria-hidden="true">videocam</span>
                  <h3 className="font-semibold text-gray-900 text-sm">Externe Medien & Dienste</h3>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Für ein vollständiges Erlebnis laden wir Inhalte von externen Anbietern:
                </p>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="material-icons text-red-500 text-sm" aria-hidden="true">play_circle</span>
                    <span><strong>YouTube</strong> – Video-Präsentation unserer Location</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-icons text-blue-500 text-sm" aria-hidden="true">map</span>
                    <span><strong>Google Maps</strong> – Interaktive Anfahrtskarte</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-icons text-pink-500 text-sm" aria-hidden="true">camera_alt</span>
                    <span><strong>Instagram</strong> – Aktuelle Beiträge aus unserem Feed</span>
                  </li>
                </ul>
              </div>

              {/* Datenschutz Hinweis */}
              <p className="text-xs text-gray-500">
                Alle Datenverarbeitungen erfolgen DSGVO-konform. Sie können Ihre Einstellungen jederzeit ändern.
                Bei Fragen: <a href="mailto:info@almweiss.de" className="text-[#A68A75] hover:underline">info@almweiss.de</a>
              </p>
            </div>

            {/* Footer */}
            <div className="p-5 border-t flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={acceptEssential}
                className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
              >
                Nur notwendige
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-6 py-3 text-sm font-medium text-white bg-[#7D6B5D] hover:bg-[#6B5A4D] rounded-full transition-all shadow-lg"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
