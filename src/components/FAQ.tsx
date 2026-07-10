"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { faqCategories } from "@/data/faq";

const allQuestions = faqCategories.flatMap((cat) => cat.questions);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#F5F0EB]" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQPage Structured Data für Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": allQuestions.map((item) => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": { "@type": "Answer", "text": item.a },
              })),
            }),
          }}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#A68A75] font-bold uppercase tracking-widest text-xs">
            Gut zu wissen
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900">
            Häufige Fragen
          </h2>
          <p className="text-gray-600">
            Die wichtigsten Antworten rund um Ihre Feier bei Almweiß.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {allQuestions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <span
                    className={`material-icons text-[#A68A75] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 md:px-6 md:pb-5 text-gray-600 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
