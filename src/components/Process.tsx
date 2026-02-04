"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Custom Ring Icon SVG Component
const RingsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    style={{ width: "1.5rem", height: "1.5rem" }}
  >
    <circle cx="9" cy="12" r="5" />
    <circle cx="15" cy="12" r="5" />
  </svg>
);

const steps = [
  {
    number: "01",
    icon: "mail",
    title: "Anfrage",
    description: "Prüfen Sie, ob Ihr Wunschtermin noch verfügbar ist.",
  },
  {
    number: "02",
    icon: "handshake",
    title: "Bestätigung & Kennenlernen",
    description: "Persönliches Kennenlernen und Besichtigung vor Ort.",
  },
  {
    number: "03",
    icon: "description",
    title: "Maßgeschneidertes Angebot",
    description: "Wir erstellen Ihr individuelles Paket nach Ihren Wünschen.",
  },
  {
    number: "04",
    icon: "rings", // Custom icon
    title: "Das Jawort",
    description: "Feiern Sie ohne Stress. Wir kümmern uns um alles.",
  },
];

export default function Process() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrollActiveIndex, setScrollActiveIndex] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-based activation for mobile - only when fully visible above the CTA button
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const buttonHeight = 120; // Height reserved for the CTA button at bottom
      const viewportBottom = window.innerHeight - buttonHeight;

      let highestVisibleIndex = -1;

      stepRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        // Step is fully visible above the button
        if (rect.top >= 0 && rect.bottom <= viewportBottom) {
          highestVisibleIndex = index;
        }
      });

      setScrollActiveIndex(highestVisibleIndex);
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const handleTouch = (index: number) => {
    if (!isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <section className="py-24 bg-white" id="leistungen">
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
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900">
            In 4 Schritten zur Hochzeit
          </h2>
          <p className="text-gray-600">
            Wir machen es Ihnen einfach. Der Weg zu Ihrer Traumfeier ist klar definiert.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line - nur zwischen den Kreisen */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hidden md:block absolute top-12 left-[12.5%] w-[75%] h-0.5 bg-gray-300 z-0 origin-left"
          />

          {steps.map((step, index) => {
            // On mobile: active if scrolled to, on desktop: active on hover/click
            const isActive = isMobile ? scrollActiveIndex >= index : activeIndex === index;

            return (
              <motion.div
                key={step.number}
                ref={(el) => { stepRefs.current[index] = el; }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className="relative z-10 text-center"
              >
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05 } : undefined}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleTouch(index)}
                  className={`w-24 h-24 mx-auto bg-white rounded-full border-4
                    ${isMobile ? "" : "cursor-pointer"}
                    ${isActive ? "border-[#A68A75]" : "border-gray-300"}
                    ${!isMobile && !isActive ? "hover:border-[#A68A75]" : ""}
                    flex flex-col items-center justify-center shadow-lg mb-6 transition-all duration-300 group`}
                >
                  {step.icon === "rings" ? (
                    <RingsIcon
                      className={`transition-colors duration-300 ${
                        isActive ? "text-[#A68A75]" : "text-gray-400"
                      } ${!isMobile && !isActive ? "group-hover:text-[#A68A75]" : ""}`}
                    />
                  ) : (
                    <span
                      className={`material-icons text-2xl transition-colors duration-300 ${
                        isActive ? "text-[#A68A75]" : "text-gray-400"
                      } ${!isMobile && !isActive ? "group-hover:text-[#A68A75]" : ""}`}
                    >
                      {step.icon}
                    </span>
                  )}
                  <span
                    className={`font-display text-sm font-bold transition-colors duration-300 ${
                      isActive ? "text-[#A68A75]" : "text-gray-400"
                    } ${!isMobile && !isActive ? "group-hover:text-[#A68A75]" : ""}`}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
