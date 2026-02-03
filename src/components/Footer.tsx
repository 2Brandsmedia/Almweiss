"use client";

import { useState } from "react";
import LegalModals from "./LegalModals";

type ModalType = "impressum" | "datenschutz" | "agb" | "barrierefreiheit" | "faq" | "cookies" | null;

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <>
      <footer className="bg-[#292524] text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Logo & Description */}
            <div>
              <span className="font-display text-2xl font-bold tracking-widest uppercase mb-4 block">
                Almweiß
              </span>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Exklusive Hochzeits- & Eventlocation in Leverkusen. Wo Träume wahr werden und Erinnerungen für die
                Ewigkeit geschaffen werden.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/_almweiss_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-[#A68A75]">
                Kontakt
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="material-icons text-[#A68A75] text-base">location_on</span>
                  <span>
                    Hermann Seul<br />
                    Robert-Blum-Straße 62<br />
                    51373 Leverkusen
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-[#A68A75] text-base">phone</span>
                  <a href="tel:+4917328146200" className="hover:text-white transition">
                    0173 2814620
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-[#A68A75] text-base">email</span>
                  <a href="mailto:info@almweiss.de" className="hover:text-white transition">
                    info@almweiss.de
                  </a>
                </li>
              </ul>
            </div>

            {/* Google Maps */}
            <div>
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
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-[#A68A75]">
                Rechtliches
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
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
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
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
