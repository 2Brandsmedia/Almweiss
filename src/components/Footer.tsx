"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LegalModals from "./LegalModals";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useCookieConsent } from "@/context/CookieContext";

type ModalType = "impressum" | "datenschutz" | "agb" | "barrierefreiheit" | "faq" | "cookies" | null;

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showDevModal, setShowDevModal] = useState(false);
  const { hasFullConsent } = useCookieConsent();

  // Focus Trap für Developer-Modal (WCAG 2.1)
  const devModalFocusTrapRef = useFocusTrap(showDevModal);

  return (
    <>
      <footer className="bg-[#292524] text-white py-16 pb-32 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid md:grid-cols-4 gap-12"
        >
            {/* Logo & Description */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <span className="font-display text-2xl font-bold tracking-widest uppercase mb-4 block">
                Almweiß
              </span>
              <p className="text-white/90 text-sm leading-relaxed">
                Exklusive Hochzeits- & Eventlocation in Leverkusen. Wo Träume wahr werden und Erinnerungen für die
                Ewigkeit geschaffen werden.
              </p>
            </motion.div>

            {/* Kontakt & Rechtliches - 2 Spalten auf Mobile */}
            <div className="grid grid-cols-2 md:contents gap-8">
              {/* Contact Info */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <h3 className="font-bold uppercase tracking-widest text-sm mb-6 text-[#A68A75]">
                  Kontakt
                </h3>
                <ul className="space-y-3 text-xs md:text-sm text-white/90">
                  <li>
                    Robert-Blum-Straße 62<br />
                    51373 Leverkusen
                  </li>
                  <li>
                    <a href="tel:+4917328146200" className="hover:text-white transition">
                      0173 2814620
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@almweiss.de" className="hover:text-white transition">
                      info@almweiss.de
                    </a>
                  </li>
                </ul>
              </motion.div>

              {/* Legal */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <h3 className="font-bold uppercase tracking-widest text-sm mb-6 text-[#A68A75]">
                  Rechtliches
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-white/90">
                  <li>
                    <button
                      onClick={() => setActiveModal("impressum")}
                      className="hover:text-white transition"
                    >
                      Impressum
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal("datenschutz")}
                      className="hover:text-white transition"
                    >
                      Datenschutz
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal("agb")}
                      className="hover:text-white transition"
                    >
                      AGB
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal("barrierefreiheit")}
                      className="hover:text-white transition"
                    >
                      Barrierefreiheit
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal("faq")}
                      className="hover:text-white transition"
                    >
                      FAQ
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal("cookies")}
                      className="hover:text-white transition"
                    >
                      Cookies
                    </button>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Google Maps */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <h3 className="font-bold uppercase tracking-widest text-sm mb-6 text-[#A68A75]">
                Anfahrt
              </h3>
              <div className="rounded-lg overflow-hidden h-[180px]">
                {hasFullConsent ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.8574073648677!2d7.004653!3d51.052236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf2ea7404f50b5%3A0xc783cbb69125dad8!2sAlmwei%C3%9F!5e0!3m2!1sde!2sde!4v1706990000000!5m2!1sde!2sde"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Karte: Almweiß Location, Robert-Blum-Straße 62, Leverkusen"
                    aria-label="Google Maps Karte: Almweiß Location, Robert-Blum-Straße 62, Leverkusen"
                  />
                ) : (
                  <a
                    href="https://www.google.com/maps/place/Almwei%C3%9F/@51.0522363,7.0068428,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-full bg-gray-700 hover:bg-gray-600 transition"
                  >
                    <div className="text-center">
                      <span className="material-icons text-4xl text-white/70 mb-2" aria-hidden="true">location_on</span>
                      <p className="text-white/70 text-sm">Karte in Google Maps öffnen</p>
                    </div>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs text-gray-400">
            <p className="uppercase tracking-widest mb-2">
              © {new Date().getFullYear()} Almweiß. Alle Rechte vorbehalten.
            </p>
            <p>
              Website entwickelt von{" "}
              <button
                onClick={() => setShowDevModal(true)}
                className="text-[#C9A88E] hover:text-white transition"
              >
                2Brands Media GmbH
              </button>
            </p>
          </div>
        </div>
      </footer>

      <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />

      {/* Developer Modal - wie bei Streamheaven */}
      <AnimatePresence>
        {showDevModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDevModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dev-modal-title"
          >
            <motion.div
              ref={devModalFocusTrapRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#1c1c1e] border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDevModal(false)}
                className="absolute top-4 right-4 w-8 h-8 hover:bg-white/10 rounded-full flex items-center justify-center text-white/90 hover:text-white transition z-10"
                aria-label="Dialog schließen"
              >
                <span className="material-icons text-xl" aria-hidden="true">close</span>
              </button>

              {/* Content */}
              <div className="flex flex-col items-center justify-center py-8 px-6 space-y-6">
                {/* Titel */}
                <h3 id="dev-modal-title" className="text-lg text-white/90 font-medium">Entwickelt von</h3>

                {/* Logo */}
                <div className="w-64 h-32 flex items-center justify-center bg-white rounded-xl p-4 overflow-hidden">
                  <Image
                    src="/images/2brands-logo.webp"
                    alt="2Brands Media GmbH"
                    width={240}
                    height={120}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>

                {/* Slogan */}
                <p className="text-base text-white/90 text-center">
                  Digitale Lösungen für die Welt
                </p>

                {/* Link zur Website */}
                <a
                  href="https://2brandsmedia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-[#A68A75] text-white rounded-lg hover:bg-[#8a7261] transition font-medium text-base"
                >
                  Website besuchen
                </a>

                {/* In Gedenken */}
                <p className="text-gray-500/50 text-xs pt-2">
                  Für T ♥ – Der Mann, die Legende
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
