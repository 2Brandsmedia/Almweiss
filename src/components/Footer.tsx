"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LegalModals from "./LegalModals";

type ModalType = "impressum" | "datenschutz" | "agb" | "barrierefreiheit" | "faq" | "cookies" | null;

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

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
              <p className="text-gray-400 text-sm leading-relaxed">
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
                <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-[#A68A75]">
                  Kontakt
                </h4>
                <ul className="space-y-3 text-xs md:text-sm text-gray-400">
                  <li>
                    Hermann Seul<br />
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
                <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-[#A68A75]">
                  Rechtliches
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-gray-400">
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
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-[#A68A75]">
                Anfahrt
              </h4>
              <div className="rounded-lg overflow-hidden h-[180px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.8574073648677!2d7.004653!3d51.052236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf2ea7404f50b5%3A0xc783cbb69125dad8!2sAlmwei%C3%9F!5e0!3m2!1sde!2sde!4v1706990000000!5m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Almweiß Location"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-xs text-gray-500">
            <p className="uppercase tracking-widest mb-2">
              © {new Date().getFullYear()} Almweiß. Alle Rechte vorbehalten.
            </p>
            <p>
              Website entwickelt von{" "}
              <a
                href="https://2brands.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A68A75] hover:text-white transition"
              >
                2Brands Media GmbH
              </a>
            </p>
          </div>
        </div>
      </footer>

      <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}
