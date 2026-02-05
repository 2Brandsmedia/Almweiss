"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type A11ySettings = {
  fontSize: "normal" | "large" | "xlarge";
  contrast: "normal" | "high";
  invert: boolean;
  grayscale: boolean;
};

const defaultSettings: A11ySettings = {
  fontSize: "normal",
  contrast: "normal",
  invert: false,
  grayscale: false,
};

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  // Load settings from localStorage on mount
  // This is a valid use case: initializing client-side state after hydration
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("a11y-settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {
        // Invalid JSON, use defaults
      }
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Apply settings to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Font size
    root.classList.remove("a11y-font-large", "a11y-font-xlarge");
    if (settings.fontSize === "large") {
      root.classList.add("a11y-font-large");
    } else if (settings.fontSize === "xlarge") {
      root.classList.add("a11y-font-xlarge");
    }

    // High contrast
    root.classList.toggle("a11y-high-contrast", settings.contrast === "high");

    // Invert colors
    root.classList.toggle("a11y-invert", settings.invert);

    // Grayscale (for color blindness)
    root.classList.toggle("a11y-grayscale", settings.grayscale);

    // Save to localStorage
    localStorage.setItem("a11y-settings", JSON.stringify(settings));
  }, [settings, mounted]);

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(defaultSettings);

  if (!mounted) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-4 z-50 w-12 h-12 bg-[#A68A75] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#8B7362] transition-colors"
        aria-label="Barrierefreiheit-Einstellungen öffnen"
        aria-expanded={isOpen}
      >
        <span className="material-icons" aria-hidden="true">accessibility_new</span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setIsOpen(false)}
            />

            {/* Widget Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 left-4 z-50 w-72 bg-white rounded-xl shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="a11y-title"
            >
              {/* Header */}
              <div className="bg-[#A68A75] text-white px-4 py-3 flex items-center justify-between">
                <h3 id="a11y-title" className="font-bold text-sm flex items-center gap-2">
                  <span className="material-icons text-lg" aria-hidden="true">accessibility_new</span>
                  Barrierefreiheit
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition"
                  aria-label="Schließen"
                >
                  <span className="material-icons text-sm" aria-hidden="true">close</span>
                </button>
              </div>

              {/* Options */}
              <div className="p-4 space-y-4">
                {/* Font Size */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                    Schriftgröße
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: "normal", label: "A", title: "Normal" },
                      { value: "large", label: "A", title: "Groß", className: "text-lg" },
                      { value: "xlarge", label: "A", title: "Sehr groß", className: "text-xl" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSettings({ ...settings, fontSize: option.value as A11ySettings["fontSize"] })}
                        className={`flex-1 py-2 rounded-lg border-2 transition font-bold ${option.className || ""} ${
                          settings.fontSize === option.value
                            ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                        title={option.title}
                        aria-pressed={settings.fontSize === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contrast */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                    Kontrast
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSettings({ ...settings, contrast: "normal" })}
                      className={`flex-1 py-2 rounded-lg border-2 transition text-sm font-medium ${
                        settings.contrast === "normal"
                          ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                      aria-pressed={settings.contrast === "normal"}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setSettings({ ...settings, contrast: "high" })}
                      className={`flex-1 py-2 rounded-lg border-2 transition text-sm font-medium ${
                        settings.contrast === "high"
                          ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                      aria-pressed={settings.contrast === "high"}
                    >
                      Hoch
                    </button>
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="space-y-2">
                  {/* Invert */}
                  <button
                    onClick={() => setSettings({ ...settings, invert: !settings.invert })}
                    className={`w-full py-2 px-3 rounded-lg border-2 transition text-sm font-medium flex items-center justify-between ${
                      settings.invert
                        ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                    aria-pressed={settings.invert}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-icons text-lg" aria-hidden="true">invert_colors</span>
                      Farben invertieren
                    </span>
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      settings.invert ? "bg-[#A68A75] border-[#A68A75]" : "border-gray-300"
                    }`}>
                      {settings.invert && <span className="material-icons text-white text-xs" aria-hidden="true">check</span>}
                    </span>
                  </button>

                  {/* Grayscale */}
                  <button
                    onClick={() => setSettings({ ...settings, grayscale: !settings.grayscale })}
                    className={`w-full py-2 px-3 rounded-lg border-2 transition text-sm font-medium flex items-center justify-between ${
                      settings.grayscale
                        ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                    aria-pressed={settings.grayscale}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-icons text-lg" aria-hidden="true">filter_b_and_w</span>
                      Graustufen
                    </span>
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      settings.grayscale ? "bg-[#A68A75] border-[#A68A75]" : "border-gray-300"
                    }`}>
                      {settings.grayscale && <span className="material-icons text-white text-xs" aria-hidden="true">check</span>}
                    </span>
                  </button>
                </div>

                {/* Reset Button */}
                {hasChanges && (
                  <button
                    onClick={resetSettings}
                    className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition flex items-center justify-center gap-1"
                  >
                    <span className="material-icons text-sm" aria-hidden="true">refresh</span>
                    Zurücksetzen
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
