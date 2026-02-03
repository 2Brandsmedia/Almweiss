"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Anfrage",
    description: "Prüfen Sie, ob Ihr Wunschtermin noch verfügbar ist.",
    active: true,
  },
  {
    number: "02",
    title: "Bestätigung & Kennenlernen",
    description: "Persönliches Kennenlernen und Besichtigung vor Ort.",
    active: false,
  },
  {
    number: "03",
    title: "Maßgeschneidertes Angebot",
    description: "Wir erstellen Ihr individuelles Paket nach Ihren Wünschen.",
    active: false,
  },
  {
    number: "04",
    title: "Das Jawort",
    description: "Feiern Sie ohne Stress. Wir kümmern uns um alles.",
    active: false,
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-[#F5F0EB]" id="leistungen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#A68A75] font-bold uppercase tracking-widest text-xs">
            Ihr Weg zum Traum
          </span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-4 text-gray-900">
            In 4 Schritten zur Hochzeit
          </h2>
          <p className="text-gray-600">
            Wir machen es Ihnen einfach. Der Weg zu Ihrer Traumfeier ist klar definiert.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-300 z-0 origin-left"
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              className="relative z-10 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-24 h-24 mx-auto bg-white rounded-full border-4 ${
                  step.active
                    ? "border-[#A68A75]"
                    : "border-gray-200 hover:border-[#A68A75]"
                } flex items-center justify-center shadow-lg mb-6 transition duration-300 group`}
              >
                <span
                  className={`font-display text-3xl font-bold ${
                    step.active
                      ? "text-[#A68A75]"
                      : "text-gray-400 group-hover:text-[#A68A75]"
                  } transition duration-300`}
                >
                  {step.number}
                </span>
              </motion.div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
