"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guests: "20 - 50 Gäste",
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
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
          Sichern Sie sich Ihren Traumtermin
        </h2>
        <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
          Die Nachfrage ist hoch und unsere Kapazitäten sind streng limitiert. Füllen Sie das
          Formular aus, um sofort zu erfahren, ob Ihr Datum noch verfügbar ist.
        </p>

        {submitted ? (
          <div className="bg-white p-8 rounded-lg shadow-2xl">
            <span className="material-icons text-green-500 text-6xl mb-4">check_circle</span>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
              Vielen Dank!
            </h3>
            <p className="text-gray-600">
              Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl text-left">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold"
                  htmlFor="name"
                >
                  Name des Paares
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Anna & Max"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold"
                  htmlFor="email"
                >
                  Email Adresse
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="ihre@email.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold"
                  htmlFor="date"
                >
                  Wunschtermin
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold"
                  htmlFor="guests"
                >
                  Gästeanzahl (ca.)
                </label>
                <select
                  id="guests"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-gray-900 focus:ring-2 focus:ring-[#A68A75] focus:border-transparent outline-none transition"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                >
                  <option>20 - 50 Gäste</option>
                  <option>50 - 80 Gäste</option>
                  <option>80 - 120 Gäste</option>
                  <option>Über 120 Gäste</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#A68A75] text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-opacity-90 transition shadow-lg text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="material-icons animate-spin">refresh</span>
                  Wird gesendet...
                </>
              ) : (
                <>
                  Jetzt Verfügbarkeit anfragen
                  <span className="material-icons text-sm">send</span>
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
