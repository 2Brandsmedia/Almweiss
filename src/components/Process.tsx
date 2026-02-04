"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

// Progress Circle Component
const ProgressCircle = ({
  isActive,
  delay,
  children
}: {
  isActive: boolean;
  delay: number;
  children: React.ReactNode;
}) => {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      {/* Background circle */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="4"
        />
        {/* Animated progress circle */}
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          fill="transparent"
          stroke="#A68A75"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={isActive ? { strokeDashoffset: 0 } : { strokeDashoffset: circumference }}
          transition={{ duration: 2, delay, ease: "easeInOut" }}
        />
      </svg>
      {/* Content inside circle */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// Animated connecting line - auf Container-Ebene positioniert
// Bei 4-Spalten-Grid mit gap-8 (2rem):
// Kreismitten: 12.5% - 0.75rem, 37.5% - 0.25rem, 62.5% + 0.25rem, 87.5% + 0.75rem
// Kreisradius: 3rem, Abstand: 0.5rem
// Start = Kreismitte + 3rem + 0.5rem, Ende = nächste Kreismitte - 3rem - 0.5rem
const linePositions = [
  { left: "calc(12.5% + 2.75rem)", width: "calc(25% - 6.5rem)" },  // Linie 1
  { left: "calc(37.5% + 3.25rem)", width: "calc(25% - 6.5rem)" },  // Linie 2
  { left: "calc(62.5% + 3.75rem)", width: "calc(25% - 6.5rem)" },  // Linie 3
];

const ConnectingLineContainer = ({
  index,
  isActive,
  delay
}: {
  index: number;
  isActive: boolean;
  delay: number;
}) => {
  const pos = linePositions[index];

  return (
    <motion.div
      className="hidden md:block absolute top-12 h-0.5 bg-[#A68A75] z-[5] origin-left"
      style={{
        left: pos.left,
        width: pos.width
      }}
      initial={{ scaleX: 0 }}
      animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 2, delay, ease: "easeInOut" }}
    />
  );
};

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
    icon: "rings",
    title: "Das Jawort",
    description: "Feiern Sie ohne Stress. Wir kümmern uns um alles.",
  },
];

export default function Process() {
  const [scrollActiveIndex, setScrollActiveIndex] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [iconActiveIndices, setIconActiveIndices] = useState<number[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Start animation when section comes into view
  // This is a legitimate use case: trigger animation once when element enters viewport
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isInView && !animationStarted) {
      setAnimationStarted(true);
    }
  }, [isInView, animationStarted]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Activate icons after their respective circles finish filling
  useEffect(() => {
    if (animationStarted && !isMobile) {
      const timeouts: NodeJS.Timeout[] = [];
      steps.forEach((_, index) => {
        // Icon wird farbig nachdem der Kreis gefüllt ist (delay + 2s Dauer)
        const delay = (index * 4 + 2) * 1000; // in Millisekunden
        const timeout = setTimeout(() => {
          setIconActiveIndices(prev => [...prev, index]);
        }, delay);
        timeouts.push(timeout);
      });
      return () => timeouts.forEach(t => clearTimeout(t));
    }
  }, [animationStarted, isMobile]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-based activation for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const threshold = 450;
      const viewportBottom = window.innerHeight - threshold;

      let highestVisibleIndex = -1;

      stepRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= viewportBottom) {
          highestVisibleIndex = index;
        }
      });

      setScrollActiveIndex(highestVisibleIndex);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Animation timing: Circle (2s) -> Line (2s) -> Circle (2s) -> Line (2s) -> ...
  // Step 0: delay 0 (circle), line delay 2
  // Step 1: delay 4 (circle), line delay 6
  // Step 2: delay 8 (circle), line delay 10
  // Step 3: delay 12 (circle)
  const getCircleDelay = (index: number) => index * 4;
  const getLineDelay = (index: number) => index * 4 + 2;

  return (
    <section ref={sectionRef} className="py-24 bg-white" id="leistungen">
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
          {/* Background connecting lines (gray) - 3 Segmente mit gleichen Abständen wie braun */}
          {linePositions.map((pos, i) => (
            <div
              key={`gray-line-${i}`}
              className="hidden md:block absolute top-12 h-0.5 bg-gray-300 z-0"
              style={{ left: pos.left, width: pos.width }}
            />
          ))}

          {/* Animated connecting lines (brown) - auf Container-Ebene */}
          {[0, 1, 2].map((lineIndex) => (
            <ConnectingLineContainer
              key={`line-${lineIndex}`}
              index={lineIndex}
              isActive={isMobile ? scrollActiveIndex > lineIndex : animationStarted}
              delay={isMobile ? 0 : getLineDelay(lineIndex)}
            />
          ))}

          {steps.map((step, index) => {
            // On mobile: active based on scroll, on desktop: based on animation
            const isCircleActive = isMobile
              ? scrollActiveIndex >= index
              : animationStarted;

            // Icon wird erst farbig nachdem der Kreis gefüllt ist
            const isIconActive = isMobile
              ? scrollActiveIndex >= index
              : iconActiveIndices.includes(index);

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

                <ProgressCircle
                  isActive={isCircleActive}
                  delay={isMobile ? 0 : getCircleDelay(index)}
                >
                  {step.icon === "rings" ? (
                    <RingsIcon
                      className={`transition-colors duration-500 ${isIconActive ? "text-[#A68A75]" : "text-gray-400"}`}
                    />
                  ) : (
                    <span
                      className={`material-icons text-2xl transition-colors duration-500 ${isIconActive ? "text-[#A68A75]" : "text-gray-400"}`}
                    >
                      {step.icon}
                    </span>
                  )}
                  <span
                    className={`font-display text-sm font-bold transition-colors duration-500 ${isIconActive ? "text-[#A68A75]" : "text-gray-400"}`}
                  >
                    {step.number}
                  </span>
                </ProgressCircle>

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
