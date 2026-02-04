"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { DatePickerInput } from "@mantine/dates";
import { motion, AnimatePresence } from "framer-motion";

// Berechnet Ostersonntag für ein gegebenes Jahr (Gaußsche Osterformel)
function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// Hilfsfunktion: Datum + Tage
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Feiertage für NRW (Nordrhein-Westfalen) + Karneval
function getHolidaysNRW(year: number): { date: Date; name: string }[] {
  const easter = getEasterSunday(year);
  const holidays: { date: Date; name: string }[] = [];

  // Feste Feiertage
  holidays.push({ date: new Date(year, 0, 1), name: "Neujahr" });
  holidays.push({ date: new Date(year, 4, 1), name: "Tag der Arbeit" });
  holidays.push({ date: new Date(year, 9, 3), name: "Tag der Deutschen Einheit" });
  holidays.push({ date: new Date(year, 10, 1), name: "Allerheiligen" }); // NRW
  holidays.push({ date: new Date(year, 11, 25), name: "1. Weihnachtstag" });
  holidays.push({ date: new Date(year, 11, 26), name: "2. Weihnachtstag" });

  // Karneval (basierend auf Ostern)
  // Rosenmontag = Ostersonntag - 48 Tage
  // Weiberfastnacht = Rosenmontag - 4 Tage (Donnerstag)
  // Karnevalssamstag = Rosenmontag - 2 Tage
  holidays.push({ date: addDays(easter, -52), name: "Weiberfastnacht" });
  holidays.push({ date: addDays(easter, -50), name: "Karnevalssamstag" });
  holidays.push({ date: addDays(easter, -48), name: "Rosenmontag" });

  // Gesetzliche Feiertage (basierend auf Ostern)
  holidays.push({ date: addDays(easter, -2), name: "Karfreitag" });
  holidays.push({ date: addDays(easter, 1), name: "Ostermontag" });
  holidays.push({ date: addDays(easter, 39), name: "Christi Himmelfahrt" });
  holidays.push({ date: addDays(easter, 50), name: "Pfingstmontag" });
  holidays.push({ date: addDays(easter, 60), name: "Fronleichnam" }); // NRW

  return holidays;
}

// Alle Feiertage für die nächsten 5 Jahre
function getAllHolidays(): Map<string, string> {
  const holidayMap = new Map<string, string>();
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year <= currentYear + 5; year++) {
    const holidays = getHolidaysNRW(year);
    for (const holiday of holidays) {
      const key = `${holiday.date.getFullYear()}-${holiday.date.getMonth()}-${holiday.date.getDate()}`;
      holidayMap.set(key, holiday.name);
    }
  }

  return holidayMap;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    eventType: "",
    erwachsene: 40,
    kinder: 0,
    anrede: "",
    firmenname: "",
    ansprechpartnerVorname: "",
    ansprechpartnerNachname: "",
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    nachricht: "",
  });

  const [wunschtermin, setWunschtermin] = useState<Date | null>(null);
  const [alternativDatum, setAlternativDatum] = useState<Date | null>(null);

  const [fullServiceConfirmed, setFullServiceConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const prevIsOpenRef = useRef(false);
  const prevFieldsCompleteRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate date constraints - heute bis 31.12. in 5 Jahren
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date(new Date().getFullYear() + 5, 11, 31); // 31. Dezember in 5 Jahren

  // NRW Feiertage
  const holidays = useMemo(() => getAllHolidays(), []);

  // getDayProps für Feiertage-Markierung (dezente blaue Schraffur)
  const getDayProps = useCallback((dateStr: string) => {
    const date = new Date(dateStr);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const holidayName = holidays.get(key);

    if (holidayName) {
      return {
        style: {
          background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(59, 130, 246, 0.1) 4px, rgba(59, 130, 246, 0.1) 6px)",
          borderRadius: "4px",
        },
        title: holidayName,
      };
    }
    return {};
  }, [holidays]);

  // Prüfen ob ausgewähltes Datum ein Feiertag ist
  const getHolidayName = useCallback((date: Date | null) => {
    if (!date) return null;
    // Sicherstellen, dass wir ein Date-Objekt haben
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return null;
    const key = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
    return holidays.get(key) || null;
  }, [holidays]);

  const wunschterminHoliday = wunschtermin ? getHolidayName(wunschtermin) : null;
  const alternativHoliday = alternativDatum ? getHolidayName(alternativDatum) : null;

  // Wörter zählen in der Nachricht
  const wordCount = useMemo(() => {
    const trimmed = formData.nachricht.trim();
    if (trimmed === "") return 0;
    return trimmed.split(/\s+/).length;
  }, [formData.nachricht]);

  const minWords = 10;
  const wordsRemaining = Math.max(0, minWords - wordCount);

  // Check if all required fields are filled (without checkbox)
  const areFieldsComplete = useMemo(() => {
    const baseFieldsValid =
      formData.eventType !== "" &&
      wunschtermin !== null &&
      formData.erwachsene >= 40 &&
      formData.anrede !== "" &&
      formData.email !== "" &&
      formData.telefon !== "" &&
      wordCount >= minWords;

    if (formData.anrede === "firma") {
      return (
        baseFieldsValid &&
        formData.firmenname !== "" &&
        formData.ansprechpartnerVorname !== "" &&
        formData.ansprechpartnerNachname !== ""
      );
    } else {
      return (
        baseFieldsValid &&
        formData.vorname !== "" &&
        formData.nachname !== ""
      );
    }
  }, [formData, wunschtermin, wordCount]);

  // Form is valid when all fields are complete AND checkbox is confirmed
  const isFormValid = areFieldsComplete && fullServiceConfirmed;

  // Reset state when modal opens/closes
  // This is a legitimate use case: resetting state when modal opens
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      // Modal just opened - reset confirmation and countdown
      setFullServiceConfirmed(false);
      setCountdown(10);
    }
    if (!isOpen && prevIsOpenRef.current) {
      // Modal closed - reset
      setFullServiceConfirmed(false);
      setCountdown(10);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  // Reset and start countdown when fields become complete
  useEffect(() => {
    if (areFieldsComplete && !prevFieldsCompleteRef.current) {
      // Fields just became complete - start countdown
      setCountdown(10);
      setFullServiceConfirmed(false);
      // Single smooth scroll after animation completes
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 500);
    }
    prevFieldsCompleteRef.current = areFieldsComplete;
  }, [areFieldsComplete]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Countdown timer - only runs when fields are complete
  useEffect(() => {
    if (!isOpen || !areFieldsComplete || countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, areFieldsComplete, countdown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Reset anrede to empty if switching to hochzeit while firma was selected
    if (name === "eventType" && value === "hochzeit" && formData.anrede === "firma") {
      setFormData((prev) => ({ ...prev, [name]: value, anrede: "" }));
      return;
    }

    // Allow typing for erwachsene field (validation on blur)
    if (name === "erwachsene") {
      const numValue = value === "" ? 0 : parseInt(value, 10);
      setFormData((prev) => ({ ...prev, [name]: isNaN(numValue) ? prev.erwachsene : numValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Clamp guest numbers on blur
  const handleGuestBlur = () => {
    const clamped = Math.min(80, Math.max(40, formData.erwachsene || 40));
    setFormData((prev) => ({ ...prev, erwachsene: clamped }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log("Form submitted:", formData);
    // TODO: Send to backend
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] backdrop-blur-md bg-black/20 flex items-center justify-center md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side - Image & Text (hidden on mobile) */}
        <div className="hidden md:flex md:w-2/5 bg-[#F5F0EB] flex-col relative">
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h3 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Stellen Sie noch heute eine Anfrage
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Sind Sie bereit für Ihr Event? Kontaktieren Sie uns.
            </p>
            <div className="relative w-full h-56 rounded-lg overflow-hidden mb-6">
              <Image
                src="/images/IMG_5166.jpg"
                alt="Almweiß Tischdekoration"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-gray-700 italic">
              Ich freue mich auf Ihre Anfrage.
            </p>
            <p className="text-[#A68A75] font-semibold mt-2">
              Ihr Hermann Seul
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              Wunschtermin sichern
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
            >
              <span className="material-icons text-gray-500">close</span>
            </button>
          </div>

          {/* Form - scrollable content */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div ref={scrollContainerRef} className="p-6 space-y-6 flex-1 overflow-y-auto scroll-smooth">
          {/* Art der Feier */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bitte wählen Sie die Art Ihrer Feier aus *
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
            >
              <option value="">Bitte auswählen...</option>
              <option value="hochzeit">Hochzeit</option>
              <option value="geburtstag">Geburtstag</option>
              <option value="firmenevent">Firmenevent</option>
              <option value="sonstiges">Sonstiges</option>
            </select>
          </div>

          {/* Termine */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <DatePickerInput
                label="Wunschtermin *"
                placeholder="Datum wählen"
                value={wunschtermin}
                onChange={(value) => setWunschtermin(value as Date | null)}
                minDate={minDate}
                maxDate={maxDate}
                valueFormat="DD.MM.YYYY"
                required
                getDayProps={getDayProps}
                popoverProps={{ withinPortal: false, width: "target" }}
                styles={{
                  label: { fontWeight: 600, fontSize: "0.875rem", color: "#374151", marginBottom: "0.5rem" },
                  input: { borderRadius: "0.5rem", padding: "0.75rem 1rem", borderColor: "#D1D5DB", fontSize: "1rem" },
                }}
              />
              {wunschterminHoliday && (
                <p className="text-xs text-blue-600 mt-1">Feiertag: {wunschterminHoliday}</p>
              )}
            </div>
            <div>
              <DatePickerInput
                label="Alternativ Datum"
                placeholder="Datum wählen"
                value={alternativDatum}
                onChange={(value) => setAlternativDatum(value as Date | null)}
                minDate={minDate}
                maxDate={maxDate}
                valueFormat="DD.MM.YYYY"
                getDayProps={getDayProps}
                popoverProps={{ withinPortal: false, width: "target" }}
                styles={{
                  label: { fontWeight: 600, fontSize: "0.875rem", color: "#374151", marginBottom: "0.5rem" },
                  input: { borderRadius: "0.5rem", padding: "0.75rem 1rem", borderColor: "#D1D5DB", fontSize: "1rem" },
                }}
              />
              {alternativHoliday && (
                <p className="text-xs text-blue-600 mt-1">Feiertag: {alternativHoliday}</p>
              )}
            </div>
          </div>

          {/* Gästeanzahl */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Wieviele Gäste ab 14 Jahren sind geplant? *
              </label>
              <input
                type="number"
                name="erwachsene"
                value={formData.erwachsene || ""}
                onChange={handleChange}
                onBlur={handleGuestBlur}
                min={40}
                max={80}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">Mindestens 40, maximal 80 Gäste</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Anzahl Kinder
              </label>
              <input
                type="number"
                name="kinder"
                value={formData.kinder}
                onChange={handleChange}
                min={0}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Anrede */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Anrede *
            </label>
            <select
              name="anrede"
              value={formData.anrede}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
            >
              <option value="">Bitte auswählen...</option>
              <option value="herr">Herr</option>
              <option value="frau">Frau</option>
              {formData.eventType !== "hochzeit" && (
                <option value="firma">Firma</option>
              )}
              <option value="divers">Divers</option>
            </select>
          </div>

          {/* Firmenfelder - nur wenn Firma ausgewählt */}
          {formData.anrede === "firma" && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Firmenname *
                </label>
                <input
                  type="text"
                  name="firmenname"
                  value={formData.firmenname}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ansprechpartner Vorname *
                  </label>
                  <input
                    type="text"
                    name="ansprechpartnerVorname"
                    value={formData.ansprechpartnerVorname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ansprechpartner Nachname *
                  </label>
                  <input
                    type="text"
                    name="ansprechpartnerNachname"
                    value={formData.ansprechpartnerNachname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
                  />
                </div>
              </div>
            </>
          )}

          {/* Name - nur wenn NICHT Firma */}
          {formData.anrede !== "firma" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vorname *
                </label>
                <input
                  type="text"
                  name="vorname"
                  value={formData.vorname}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nachname *
                </label>
                <input
                  type="text"
                  name="nachname"
                  value={formData.nachname}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
                />
              </div>
            </div>
          )}

          {/* Kontakt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefonnummer *
              </label>
              <input
                type="tel"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Nachricht */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ihre Nachricht *
            </label>
            <textarea
              name="nachricht"
              value={formData.nachricht}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Teilen Sie uns gerne weitere Details zu Ihrer Feier mit..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition resize-none"
            />
            <div className="flex justify-between items-center mt-1">
              <p className={`text-xs ${wordCount >= minWords ? "text-green-600" : "text-gray-500"}`}>
                {wordCount} / {minWords} Wörter {wordCount >= minWords && "✓"}
              </p>
              {wordsRemaining > 0 && (
                <p className="text-xs text-gray-400">
                  Noch {wordsRemaining} {wordsRemaining === 1 ? "Wort" : "Wörter"} erforderlich
                </p>
              )}
            </div>
          </div>

          {/* Full Service Confirmation - appears in scrollable area, pushes content up */}
          <AnimatePresence mode="sync">
            {areFieldsComplete && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
                    opacity: { duration: 0.4, delay: 0.1 }
                  }
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
                    opacity: { duration: 0.2 }
                  }
                }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.4,
                      ease: [0.33, 1, 0.68, 1],
                      delay: 0.05
                    }
                  }}
                  className="bg-[#F5F0EB] rounded-lg p-4 mt-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center relative">
                        {/* Countdown background */}
                        <div
                          className={`absolute inset-0 rounded-lg transition-colors duration-500 ${
                            countdown > 0 ? "bg-gray-300" : fullServiceConfirmed ? "bg-[#A68A75]" : "bg-white border-2 border-gray-300"
                          }`}
                        />
                        {/* Countdown number or checkbox */}
                        {countdown > 0 ? (
                          <motion.span
                            key={countdown}
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative text-lg font-bold text-gray-600"
                          >
                            {countdown}
                          </motion.span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setFullServiceConfirmed(!fullServiceConfirmed)}
                            className="absolute inset-0 rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
                          >
                            <AnimatePresence>
                              {fullServiceConfirmed && (
                                <motion.span
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                                  className="material-icons text-white text-2xl"
                                >
                                  check
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>Wichtiger Hinweis:</strong> Almweiß bietet ausschließlich ein Full-Service-Paket an.
                        Die Location wird <strong>nicht</strong> ohne Service vermietet. Im Paket enthalten sind: Personal
                        und Catering (Essen & Getränke). Mit dem Anklicken dieser Checkbox bestätige ich,
                        dass ich dies zur Kenntnis genommen habe und damit einverstanden bin.
                      </p>
                      {/* Fixed height container for countdown text to prevent layout shift */}
                      <div className="h-5 mt-2">
                        <p
                          className={`text-xs text-gray-500 transition-opacity duration-300 ${
                            countdown > 0 ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          Bitte lesen Sie den Hinweis. Bestätigung möglich in {countdown} Sekunden...
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Submit - sticky at bottom */}
          <div className="bg-white border-t border-gray-100 px-6 py-4 flex-shrink-0">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 rounded-full font-semibold uppercase tracking-wider transition shadow-lg ${
                isFormValid
                  ? "bg-[#A68A75] text-white hover:bg-opacity-90 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Anfrage absenden
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
            </p>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
