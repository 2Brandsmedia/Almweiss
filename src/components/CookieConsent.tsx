"use client";

import { useState } from "react";
import { useCookieConsent } from "@/context/CookieContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export default function CookieConsent() {
  const { hasConsent, acceptAll, acceptEssential } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);

  // Focus Trap für Cookie-Modal (WCAG 2.1)
  const focusTrapRef = useFocusTrap(!hasConsent || showDetails);

  // Nicht rendern wenn bereits Consent gegeben
  if (hasConsent) return null;

  return (
    <>
      {/* Fullscreen Overlay - blockiert Interaktion */}
      <div
        className="fixed inset-0 z-[250] bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Cookie Consent Modal - Zentral und auffällig */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
        className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      >
        <div
          ref={focusTrapRef}
          className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300"
        >
          {/* Header mit Icon */}
          <div className="p-6 pb-4 text-center border-b border-gray-100">
            <div className="w-16 h-16 bg-[#F5F0EB] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-[#A68A75] text-3xl" aria-hidden="true">cookie</span>
            </div>
            <h2 id="cookie-title" className="text-2xl font-bold text-gray-900 mb-2">
              Datenschutz ist uns wichtig
            </h2>
            <p id="cookie-desc" className="text-gray-600 text-sm leading-relaxed">
              Wir verwenden Cookies und externe Dienste, um Ihnen das beste Erlebnis auf unserer Website zu bieten.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Notwendige Cookies */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="material-icons text-green-600 text-xl mt-0.5" aria-hidden="true">check_circle</span>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Notwendige Cookies</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Erforderlich für grundlegende Funktionen wie Navigation und Sicherheit.
                </p>
              </div>
            </div>

            {/* Optionale Dienste */}
            <div className="flex items-start gap-3 p-3 bg-[#FEF3E7] rounded-lg">
              <span className="material-icons text-[#A68A75] text-xl mt-0.5" aria-hidden="true">videocam</span>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Externe Medien & Karten</h3>
                <p className="text-xs text-gray-500 mt-1">
                  YouTube-Videos, Google Maps und Instagram-Einbindungen für ein reichhaltiges Erlebnis.
                </p>
              </div>
            </div>

            {/* Mehr erfahren Link */}
            <button
              onClick={() => setShowDetails(true)}
              className="text-[#A68A75] hover:text-[#8B7362] text-sm font-medium flex items-center gap-1 mx-auto"
            >
              <span className="material-icons text-base" aria-hidden="true">info</span>
              Mehr erfahren
            </button>
          </div>

          {/* Buttons */}
          <div className="p-6 pt-2 flex flex-col sm:flex-row gap-3">
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

          {/* Hinweis */}
          <p className="text-xs text-gray-400 text-center pb-4 px-6">
            Sie können Ihre Einstellungen jederzeit in den Cookie-Einstellungen ändern.
          </p>
        </div>
      </div>

      {/* Cookie Details Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 z-[400] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white rounded-t-2xl">
              <h3 className="font-bold text-gray-900">Cookie-Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Dialog schließen"
              >
                <span className="material-icons text-gray-500" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 text-sm text-gray-600">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Notwendige Cookies</h4>
                <p>
                  Diese Cookies sind für den Betrieb der Website unerlässlich. Sie ermöglichen
                  grundlegende Funktionen wie Seitennavigation und speichern Ihre Cookie-Präferenzen.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Externe Medien</h4>
                <p className="mb-2">
                  Wenn Sie &quot;Alle akzeptieren&quot; wählen, werden folgende externe Dienste geladen:
                </p>
                <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                  <li><strong>YouTube</strong> - Eingebettete Videos zur Präsentation unserer Location</li>
                  <li><strong>Google Maps</strong> - Interaktive Karte für die Anfahrt</li>
                  <li><strong>Instagram</strong> - Aktuelle Beiträge aus unserem Instagram-Feed</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Ihre Rechte</h4>
                <p>
                  Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie die
                  Cookies in Ihrem Browser löschen. Bei Fragen wenden Sie sich an:
                  <a href="mailto:info@almweiss.de" className="text-[#A68A75] hover:underline ml-1">
                    info@almweiss.de
                  </a>
                </p>
              </div>

              <p className="text-xs text-gray-400 pt-2">
                Alle Datenverarbeitungen erfolgen DSGVO-konform.
              </p>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex gap-2 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={() => {
                  acceptEssential();
                  setShowDetails(false);
                }}
                className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => {
                  acceptAll();
                  setShowDetails(false);
                }}
                className="flex-1 px-4 py-2 text-sm text-white bg-[#7D6B5D] hover:bg-[#6B5A4D] rounded-lg transition"
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
