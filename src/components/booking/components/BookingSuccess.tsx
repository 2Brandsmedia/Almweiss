"use client";

import { motion } from "framer-motion";
import type { BookingSuccessProps } from "../types";

export default function BookingSuccess({
  formData,
  wunschtermin,
  alternativDatum,
  onClose
}: BookingSuccessProps) {

  const getAnredeText = () => {
    switch (formData.anrede) {
      case "herr": return "Herr";
      case "frau": return "Frau";
      case "firma": return "";
      default: return "";
    }
  };

  const getDisplayName = () => {
    if (formData.anrede === "firma") {
      return formData.ansprechpartnerNachname;
    }
    return formData.nachname;
  };

  const getEventTypeLabel = () => {
    switch (formData.eventType) {
      case "hochzeit": return "Hochzeit";
      case "geburtstag": return "Geburtstag";
      case "firmenevent": return "Firmenevent";
      case "sonstiges": return "Sonstiges";
      default: return formData.eventType;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] backdrop-blur-md flex items-center justify-center md:p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className="bg-white w-full h-full md:h-auto md:max-w-lg md:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-[#A68A75] rounded-full flex items-center justify-center mb-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="material-icons text-white text-4xl"
              aria-hidden="true"
            >
              check
            </motion.span>
          </motion.div>

          {/* Thank You Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 id="success-title" className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vielen Dank{getAnredeText() ? `, ${getAnredeText()}` : ""} {getDisplayName()}!
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
              Ihre Anfrage ist bei uns eingegangen. Wir melden uns schnellstmöglich bei Ihnen, um alle Details zu besprechen.
            </p>

            {/* Booking Summary */}
            <div className="bg-[#F5F0EB] rounded-lg p-4 mb-6 text-left w-full max-w-sm">
              {wunschtermin && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold text-[#A68A75]">Wunschtermin:</span>{" "}
                  {new Date(wunschtermin).toLocaleDateString("de-DE", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
              )}
              {alternativDatum && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold text-[#A68A75]">Alternativtermin:</span>{" "}
                  {new Date(alternativDatum).toLocaleDateString("de-DE", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-[#A68A75]">Veranstaltung:</span>{" "}
                {getEventTypeLabel()}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-[#A68A75]">Gäste:</span>{" "}
                {formData.erwachsene} Erwachsene{formData.kinder > 0 && `, ${formData.kinder} Kinder`}
              </p>
            </div>

            <p className="text-gray-500 text-sm mb-8">
              Eine Bestätigung wurde an <span className="font-semibold">{formData.email}</span> gesendet.
            </p>
          </motion.div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onClose}
            className="bg-[#A68A75] text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wider hover:bg-[#8B7362] transition-colors"
          >
            Schließen
          </motion.button>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-gray-600 italic text-sm">Wir freuen uns auf Sie!</p>
            <p className="text-[#A68A75] font-semibold text-sm mt-1">Ihr Hermann Seul</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
