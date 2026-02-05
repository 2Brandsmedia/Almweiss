"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 1012, suffix: "", label: "Exklusive Feiern", duration: 3500 },
  { value: 607, suffix: "", label: "Glückliche Brautpaare", duration: 3500 },
  { value: 4.8, suffix: "★", label: "Google Bewertung", duration: 1500 },
  { value: 100, suffix: "%", label: "Alles aus eigener Hand", duration: 2500 },
];

// Easing function for smooth animation
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

function Counter({ value, suffix, duration }: { value: number; suffix: string; duration: number }) {
  const startPercent = 0.90; // Start at 90% of the value
  const [count, setCount] = useState(Math.floor(value * startPercent));
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const isDecimal = value % 1 !== 0;
    const startValue = value * startPercent;
    const remainingValue = value - startValue;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const linearProgress = Math.min((timestamp - startTime) / duration, 1);
      // Apply easing for smoother animation
      const easedProgress = easeOutCubic(linearProgress);
      const currentValue = startValue + (easedProgress * remainingValue);
      setCount(isDecimal ? Math.round(currentValue * 10) / 10 : Math.floor(currentValue));

      if (linearProgress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure we end exactly on the target value
        setCount(value);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="font-display text-3xl md:text-6xl text-[#6B5A4D] font-bold mb-1 md:mb-2 flex items-baseline justify-center gap-1">
      {value % 1 !== 0 ? (
        <>
          {Math.floor(count)}
          <span className="text-xl md:text-4xl">,{(count % 1).toFixed(1).split('.')[1]}</span>
        </>
      ) : (
        count
      )}
      {suffix === "★" ? (
        <span className="material-icons text-[#6B5A4D] text-2xl md:text-5xl" aria-hidden="true">star</span>
      ) : (
        suffix
      )}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#F5F0EB] py-8 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-x divide-gray-200"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="p-2 md:p-4"
            >
              <Counter value={stat.value} suffix={stat.suffix} duration={stat.duration} />
              <p className="text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-gray-700">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
