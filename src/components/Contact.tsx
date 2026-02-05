"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    date: "",
    altDate: "",
    adults: "",
    children: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 bg-[#A68A75] relative overflow-hidden" id="kontakt">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        {/* Mobile: Text außerhalb */}
        <div className="md:hidden">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Sichern Sie sich Ihren Traumtermin
          </h2>
          <p className="text-white/90 text-base mb-6">
            Füllen Sie das Formular aus, um zu erfahren, ob Ihr Datum noch verfügbar ist.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white p-8 rounded-lg shadow-2xl" role="status" aria-live="polite">
            <span className="material-icons text-green-500 text-6xl mb-4" aria-hidden="true">check_circle</span>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
              Vielen Dank!
            </h3>
            <p className="text-gray-600">
              Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-2xl text-left">
            {/* Desktop: Text innerhalb des Formulars */}
            <div className="hidden md:block text-center mb-8">
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
                Sichern Sie sich Ihren Traumtermin
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Die Nachfrage ist hoch und unsere Kapazitäten sind streng limitiert. Füllen Sie das
                Formular aus, um sofort zu erfahren, ob Ihr Datum noch verfügbar ist.
              </p>
            </div>
            {/* Wunschtermin & Alternativ Datum */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
              <div>
                <label
                  className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1 md:mb-2 font-bold"
                  htmlFor="date"
                >
                  Wunschtermin
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 md:p-3 text-base text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label
                  className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1 md:mb-2 font-bold"
                  htmlFor="altDate"
                >
                  Alternativ Datum
                </label>
                <input
                  type="date"
                  id="altDate"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 md:p-3 text-base text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.altDate}
                  onChange={(e) => setFormData({ ...formData, altDate: e.target.value })}
                />
              </div>
            </div>

            {/* Gäste ab 14 & Anzahl Kinder */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
              <div>
                <label
                  className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1 md:mb-2 font-bold"
                  htmlFor="adults"
                >
                  Gäste ab 14 J.
                </label>
                <input
                  type="number"
                  id="adults"
                  min="1"
                  placeholder="z.B. 60"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 md:p-3 text-base text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.adults}
                  onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                />
              </div>
              <div>
                <label
                  className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1 md:mb-2 font-bold"
                  htmlFor="children"
                >
                  Anzahl Kinder
                </label>
                <input
                  type="number"
                  id="children"
                  min="0"
                  placeholder="z.B. 5"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 md:p-3 text-base text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                />
              </div>
            </div>

            {/* Vorname & Nachname */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
              <div>
                <label
                  className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1 md:mb-2 font-bold"
                  htmlFor="firstName"
                >
                  Vorname
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  placeholder="Anna"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 md:p-3 text-base text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label
                  className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1 md:mb-2 font-bold"
                  htmlFor="lastName"
                >
                  Nachname
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  placeholder="Müller"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 md:p-3 text-base text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            {/* Email & Telefon */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
              <div>
                <label
                  className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1 md:mb-2 font-bold"
                  htmlFor="email"
                >
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="ihre@email.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 md:p-3 text-base text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label
                  className="block text-[10px] md:text-xs uppercase tracking-widest text-gray-500 mb-1 md:mb-2 font-bold"
                  htmlFor="phone"
                >
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="0123 456789"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 md:p-3 text-base text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#A68A75] text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-opacity-90 transition shadow-lg text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="material-icons animate-spin" aria-hidden="true">refresh</span>
                  Wird gesendet...
                </>
              ) : (
                <>
                  Jetzt Verfügbarkeit anfragen
                  <span className="material-icons text-sm" aria-hidden="true">send</span>
                </>
              )}
            </button>
            <p className="text-center mt-4 text-xs text-gray-400">
              Unverbindliche Anfrage. Wir melden uns innerhalb von 24h.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
