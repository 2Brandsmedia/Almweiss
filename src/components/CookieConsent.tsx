"use client";

import { useState, useEffect, useCallback } from "react";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    setConsent(localStorage.getItem("cookie-consent"));
  }, []);

  const acceptAll = useCallback(() => {
    localStorage.setItem("cookie-consent", "all");
    setConsent("all");
  }, []);

  const acceptEssential = useCallback(() => {
    localStorage.setItem("cookie-consent", "essential");
    setConsent("essential");
  }, []);

  // Nicht rendern bis Client gemounted ist
  if (!mounted) return null;

  // Nicht rendern wenn bereits Consent gegeben
  if (consent) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 z-[200] max-w-xs w-[calc(100%-2rem)] md:w-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-5 animate-in slide-in-from-bottom-4 duration-500">
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Wir nutzen Cookies für ein optimales Erlebnis auf unserer Seite. <button onClick={() => setShowDetails(true)} className="text-[#A68A75] hover:underline">Mehr erfahren</button>
        </p>
        <div className="flex gap-2">
          <button
            onClick={acceptEssential}
            className="flex-1 px-4 py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
          >
            Ablehnen
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 px-4 py-2.5 text-xs font-medium text-white bg-[#A68A75] hover:bg-[#8B7362] rounded-full transition-all shadow-sm"
          >
            Akzeptieren
          </button>
        </div>
      </div>

      {/* Cookie Details Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-dialog-title"
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h3 id="cookie-dialog-title" className="font-bold text-gray-900">Cookie-Richtlinie</h3>
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
                <h4 className="font-bold text-gray-900 mb-2">Was sind Cookies?</h4>
                <p>
                  Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden,
                  wenn Sie unsere Website besuchen. Sie helfen uns, die Website funktionsfähig
                  zu halten und Ihre Erfahrung zu verbessern.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Notwendige Cookies</h4>
                <p>
                  Diese Cookies sind für den Betrieb der Website unerlässlich. Sie ermöglichen
                  grundlegende Funktionen wie Seitennavigation und Zugriff auf sichere Bereiche.
                  Die Website kann ohne diese Cookies nicht ordnungsgemäß funktionieren.
                </p>
                <ul className="list-disc list-inside mt-2 text-xs text-gray-500">
                  <li>Session-Cookies für die Navigation</li>
                  <li>Cookie-Einstellungen speichern</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Optionale Cookies</h4>
                <p>
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website
                  interagieren, indem sie Informationen anonym sammeln und melden.
                </p>
                <ul className="list-disc list-inside mt-2 text-xs text-gray-500">
                  <li>Google Analytics (Besucherstatistiken)</li>
                  <li>YouTube (eingebettete Videos)</li>
                  <li>Google Maps (Kartenansicht)</li>
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

              <p className="text-xs text-gray-400">
                Stand: Februar 2026
              </p>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex gap-2 sticky bottom-0 bg-white">
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
                className="flex-1 px-4 py-2 text-sm text-white bg-[#A68A75] hover:bg-opacity-90 rounded-lg transition"
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
