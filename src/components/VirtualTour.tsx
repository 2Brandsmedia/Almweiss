"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Viewer erst bei Klick laden: spart auf Mobile Bundle und Panorama-Daten
const TourViewer = dynamic(() => import("./tour/TourViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#1C1917] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#A68A75] border-t-transparent mx-auto mb-4" />
        <p className="text-white/80">Rundgang wird geladen...</p>
      </div>
    </div>
  ),
});

export default function VirtualTour() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <section className="py-24 bg-[#292524]" id="rundgang">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-[#A68A75] font-bold uppercase tracking-widest text-xs">
            Schon vor der Besichtigung
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
            360°-Rundgang
          </h2>
          <p className="text-white/70">
            Sehen Sie sich in aller Ruhe um, ganz bequem von zu Hause aus.
            Bewegen Sie das Bild mit dem Finger oder der Maus.
          </p>
        </motion.div>

        {/* Viewer / Vorschau */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl h-[60vh] max-h-[600px] min-h-[380px]"
        >
          {isStarted ? (
            <TourViewer />
          ) : (
            <>
              <Image
                src="/images/venue-1.webp"
                alt="Vorschau auf den virtuellen Rundgang durch das Almweiß"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                <button
                  onClick={() => setIsStarted(true)}
                  className="group flex flex-col items-center gap-4"
                  aria-label="Virtuellen 360°-Rundgang starten"
                >
                  <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#A68A75] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform animate-pulse-soft">
                    <span className="material-icons text-white text-4xl md:text-5xl" aria-hidden="true">
                      360
                    </span>
                  </span>
                  <span className="bg-white text-gray-900 px-8 py-4 rounded-full text-sm uppercase tracking-wider font-semibold shadow-lg group-hover:bg-gray-100 transition">
                    Rundgang starten
                  </span>
                </button>
              </div>
            </>
          )}
        </motion.div>

        {/* Demo-Hinweis */}
        <p className="text-center text-white/50 text-sm mt-6">
          Demo-Ansicht mit Beispiel-Panoramen. Die echten 360°-Aufnahmen vom Almweiß folgen in Kürze.
        </p>
      </div>
    </section>
  );
}
