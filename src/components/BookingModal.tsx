"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { DatePickerInput } from "@mantine/dates";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

// Ausgelagerte Komponenten und Utils
import CustomDropdown from "./booking/components/CustomDropdown";
import BookingSuccess from "./booking/components/BookingSuccess";
import { getAllHolidays, getHolidayName, getDayPropsForHolidays } from "./booking/utils/holidays";
import { type BookingFormData, type BookingModalProps, initialFormData } from "./booking/types";

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Focus Trap für Barrierefreiheit (WCAG 2.1)
  const focusTrapRef = useFocusTrap(isOpen);

  const [formData, setFormData] = useState<BookingFormData>(initialFormData);

  const [wunschtermin, setWunschtermin] = useState<Date | null>(null);
  const [alternativDatum, setAlternativDatum] = useState<Date | null>(null);

  const [fullServiceConfirmed, setFullServiceConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prevIsOpenRef = useRef(false);
  const prevFieldsCompleteRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Body-Scroll blockieren wenn Modal offen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Calculate date constraints - heute bis 31.12. in 5 Jahren
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date(new Date().getFullYear() + 5, 11, 31); // 31. Dezember in 5 Jahren

  // NRW Feiertage
  const holidays = useMemo(() => getAllHolidays(), []);

  // getDayProps für Feiertage-Markierung (dezente blaue Schraffur)
  const getDayProps = useCallback((dateStr: string) => {
    return getDayPropsForHolidays(dateStr, holidays);
  }, [holidays]);

  const wunschterminHoliday = getHolidayName(wunschtermin, holidays);
  const alternativHoliday = getHolidayName(alternativDatum, holidays);

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
      formData.erwachsene >= 30 &&
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
      setCountdown(5);
    }
    if (!isOpen && prevIsOpenRef.current) {
      // Modal closed - reset
      setFullServiceConfirmed(false);
      setCountdown(5);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  // Reset and start countdown when fields become complete
  useEffect(() => {
    if (areFieldsComplete && !prevFieldsCompleteRef.current) {
      // Fields just became complete - start countdown
      setCountdown(5);
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
    const clamped = Math.min(80, Math.max(30, formData.erwachsene || 30));
    setFormData((prev) => ({ ...prev, erwachsene: clamped }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate API call - replace with actual email sending
    await new Promise(resolve => setTimeout(resolve, 800));

    console.log("Form submitted:", formData);
    // TODO: Send to backend/email service

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    // Reset all states when closing
    if (isSubmitted) {
      setIsSubmitted(false);
      setFormData({
        eventType: "",
        erwachsene: 30,
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
      setWunschtermin(null);
      setAlternativDatum(null);
      setFullServiceConfirmed(false);
      setCountdown(5);
    }
    onClose();
  };

  if (!isOpen) return null;

  // Success/Thank You Screen - ausgelagerte Komponente
  if (isSubmitted) {
    return (
      <BookingSuccess
        formData={formData}
        wunschtermin={wunschtermin}
        alternativDatum={alternativDatum}
        onClose={handleClose}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] backdrop-blur-md flex items-center justify-center md:p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        ref={focusTrapRef}
        className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side on Desktop - Image & Text */}
        <div className="hidden md:flex md:w-2/5 bg-[#F5F0EB] flex-col relative">
          <div className="p-8 flex-1 flex flex-col justify-center">
            <h3 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Stellen Sie noch heute eine Anfrage
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Lassen Sie uns gemeinsam Ihren besonderen Tag planen. Wir freuen uns darauf, Sie kennenzulernen und Ihre Wünsche in die Tat umzusetzen.
            </p>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              <strong>Gut zu wissen:</strong> Almweiß bietet ausschließlich Full-Service-Pakete an, immer inklusive Personal und Catering. Für Feiern von 30 bis 80 Gästen.
            </p>
            <div className="relative w-full h-56 rounded-lg overflow-hidden mb-6">
              <Image
                src="/images/table.webp"
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
            <h2 id="booking-modal-title" className="font-display text-2xl font-bold text-gray-900">
              Wunschtermin sichern
            </h2>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
              aria-label="Dialog schließen"
            >
              <span className="material-icons text-gray-500" aria-hidden="true">close</span>
            </button>
          </div>

          {/* Form - scrollable content */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div ref={scrollContainerRef} className="p-6 space-y-2 flex-1 overflow-y-auto scroll-smooth">

          {/* Mobile: Image & Text - scrollbar */}
          <div className="md:hidden bg-[#F5F0EB] rounded-lg p-5 -mt-2 mb-2">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
              Stellen Sie noch heute eine Anfrage
            </h3>
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              Lassen Sie uns gemeinsam Ihren besonderen Tag planen. Wir freuen uns darauf, Sie kennenzulernen und Ihre Wünsche in die Tat umzusetzen.
            </p>
            <p className="text-gray-600 text-xs mb-4 leading-relaxed">
              <strong>Gut zu wissen:</strong> Almweiß bietet ausschließlich Full-Service-Pakete an, immer inklusive Personal und Catering. Für Feiern von 30 bis 80 Gästen.
            </p>
            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/table.webp"
                alt="Almweiß Tischdekoration"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-gray-700 italic text-sm">
              Ich freue mich auf Ihre Anfrage.
            </p>
            <p className="text-[#A68A75] font-semibold text-sm mt-1">
              Ihr Hermann Seul
            </p>
          </div>

          {/* Art der Feier */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <CustomDropdown
              label="Art der Feier"
              placeholder="Bitte auswählen"
              required
              value={formData.eventType}
              onChange={(value) => {
                // Reset anrede to empty if switching to hochzeit while firma was selected
                if (value === "hochzeit" && formData.anrede === "firma") {
                  setFormData((prev) => ({ ...prev, eventType: value, anrede: "" }));
                } else {
                  setFormData((prev) => ({ ...prev, eventType: value }));
                }
              }}
              options={[
                { value: "hochzeit", label: "Hochzeit" },
                { value: "geburtstag", label: "Geburtstag" },
                { value: "firmenevent", label: "Firmenevent" },
                { value: "sonstiges", label: "Sonstiges" },
              ]}
            />
            <div></div>
          </div>

          {/* Termine */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <DatePickerInput
                label="Wunschtermin"
                placeholder="Datum wählen"
                value={wunschtermin}
                onChange={(value) => setWunschtermin(value as Date | null)}
                minDate={minDate}
                maxDate={maxDate}
                valueFormat="DD.MM.YYYY"
                required
                getDayProps={getDayProps}
                popoverProps={{
                  withinPortal: true,
                  zIndex: 9999,
                }}
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
                popoverProps={{
                  withinPortal: true,
                  zIndex: 9999,
                }}
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
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gäste ab 14 Jahren *
              </label>
              <input
                type="number"
                inputMode="numeric"
                name="erwachsene"
                value={formData.erwachsene || ""}
                onChange={handleChange}
                onBlur={handleGuestBlur}
                min={30}
                max={80}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition text-base"
              />
              <p className="text-xs text-gray-500 mt-1">Min. 30, max. 80</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Anzahl Kinder
              </label>
              <input
                type="number"
                inputMode="numeric"
                name="kinder"
                value={formData.kinder}
                onChange={handleChange}
                min={0}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition text-base"
              />
              <p className="text-xs text-gray-500 mt-1 invisible">Platzhalter</p>
            </div>
          </div>

          {/* Anrede */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <CustomDropdown
              label="Anrede"
              placeholder="Bitte auswählen"
              required
              value={formData.anrede}
              onChange={(value) => setFormData((prev) => ({ ...prev, anrede: value }))}
              options={[
                { value: "herr", label: "Herr" },
                { value: "frau", label: "Frau" },
                ...(formData.eventType !== "hochzeit" ? [{ value: "firma", label: "Firma" }] : []),
                { value: "divers", label: "Divers" },
              ]}
            />
            <div></div>
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
              <div className="grid grid-cols-2 gap-3 md:gap-4">
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
            <div className="grid grid-cols-2 gap-3 md:gap-4">
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
          <div className="grid grid-cols-2 gap-3 md:gap-4">
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
                inputMode="tel"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A68A75] focus:border-transparent transition text-base"
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
            <div className="mt-1 h-4">
              {wordsRemaining > 0 && (
                <p className="text-xs text-gray-500">
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
                className="overflow-hidden -mt-2"
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
                  className="bg-[#F5F0EB] rounded-lg p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center relative">
                        {/* Countdown background */}
                        <motion.div
                          className={`absolute inset-0 rounded-lg transition-colors duration-500 ${
                            countdown > 0 ? "bg-gray-300" : fullServiceConfirmed ? "bg-[#A68A75]" : "bg-white border-2 border-[#A68A75]"
                          }`}
                          animate={countdown === 0 && !fullServiceConfirmed ? {
                            scale: [1, 1.05, 1],
                          } : {}}
                          transition={countdown === 0 && !fullServiceConfirmed ? {
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          } : {}}
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
                            className="absolute inset-0 rounded-lg flex items-center justify-center hover:scale-105 transition-transform outline-none focus:outline-none"
                          >
                            <AnimatePresence>
                              {fullServiceConfirmed && (
                                <motion.span
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                                  className="material-icons text-white text-2xl"
                                  aria-hidden="true"
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
                        Im Paket enthalten sind immer mindestens: Personal und Catering (Essen & Getränke).
                        Eine reine Vermietung des Raums ohne diese Services ist nicht möglich.
                        Mit dem Anklicken dieser Checkbox bestätige ich, dass ich dies zur Kenntnis genommen habe und damit einverstanden bin.
                      </p>
                      {countdown > 0 && (
                        <p className="text-xs text-gray-500 mt-2">
                          Bitte lesen Sie den Hinweis. Bestätigung möglich in {countdown} Sekunden...
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Submit - sticky at bottom */}
          {/* Desktop: always visible */}
          {!isMobile && (
            <div className="bg-white border-t border-gray-100 px-6 py-4 flex-shrink-0">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 rounded-full font-semibold uppercase tracking-wider transition-all duration-500 flex items-center justify-center gap-2 ${
                  isFormValid && !isSubmitting
                    ? "bg-[#A68A75] text-white cursor-pointer shadow-lg shadow-[#A68A75]/40"
                    : isSubmitting
                    ? "bg-[#A68A75] text-white cursor-wait shadow-lg shadow-[#A68A75]/40"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wird gesendet...
                  </>
                ) : (
                  "Anfrage absenden"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
              </p>
            </div>
          )}

          {/* Mobile: Submit button appears only after fields complete */}
          {isMobile && (
            <AnimatePresence>
              {areFieldsComplete && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white border-t border-gray-100 px-6 py-4 flex-shrink-0"
                >
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 rounded-full font-semibold uppercase tracking-wider transition-all duration-500 flex items-center justify-center gap-2 ${
                      isFormValid && !isSubmitting
                        ? "bg-[#A68A75] text-white cursor-pointer shadow-lg shadow-[#A68A75]/40"
                        : isSubmitting
                        ? "bg-[#A68A75] text-white cursor-wait shadow-lg shadow-[#A68A75]/40"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Wird gesendet...
                      </>
                    ) : (
                      "Anfrage absenden"
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          </form>
        </div>
      </div>
    </div>
  );
}
