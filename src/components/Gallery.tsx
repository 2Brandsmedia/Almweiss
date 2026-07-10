"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const galleryImages = [
  { src: "/images/wedding-1.webp", alt: "Brautpaar" },
  { src: "/images/wedding-3.webp", alt: "Trauung" },
  { src: "/images/venue-2.webp", alt: "Hochzeitsgesellschaft" },
  { src: "/images/venue-3.webp", alt: "Dekoration" },
  { src: "/images/table.webp", alt: "Tischdekoration" },
  { src: "/images/candybar.webp", alt: "Candybar" },
  { src: "/images/venue-5.webp", alt: "Location Details" },
  { src: "/images/venue-4.webp", alt: "Ambiente" },
  { src: "/images/fotobox.webp", alt: "Fotobox" },
  { src: "/images/venue-6.webp", alt: "Feier" },
  { src: "/images/gallery.webp", alt: "Galerie" },
  { src: "/images/tech.webp", alt: "Technik" },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus Trap für Lightbox-Modal (WCAG 2.1)
  const focusTrapRef = useFocusTrap(selectedIndex !== null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different speeds for each column (reduced values to prevent overlap)
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y4 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);
  const y3Spring = useSpring(y3, springConfig);
  const y4Spring = useSpring(y4, springConfig);

  // Split images into 4 columns
  const columns = [
    { images: galleryImages.slice(0, 3), y: y1Spring },
    { images: galleryImages.slice(3, 6), y: y2Spring },
    { images: galleryImages.slice(6, 9), y: y3Spring },
    { images: galleryImages.slice(9, 12), y: y4Spring },
  ];

  const openModal = (globalIndex: number) => {
    setSelectedIndex(globalIndex);
  };

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex(prev => {
      if (prev === null) return null;
      return prev === 0 ? galleryImages.length - 1 : prev - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setSelectedIndex(prev => {
      if (prev === null) return null;
      return prev === galleryImages.length - 1 ? 0 : prev + 1;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, goToPrevious, goToNext, closeModal]);

  return (
    <>
      <section className="py-24 bg-[#F5F0EB] overflow-hidden" id="galerie">
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
              Impressionen
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900">
              Galerie
            </h2>
            <p className="text-gray-600">
              Eindrücke von unvergesslichen Momenten bei Almweiß.
            </p>
          </motion.div>

          {/* Parallax Grid */}
          <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 py-16">
            {columns.map((column, colIndex) => (
              <motion.div
                key={colIndex}
                style={{ y: column.y }}
                className="flex flex-col gap-6"
              >
                {column.images.map((image, imgIndex) => {
                  const globalIndex = colIndex * 3 + imgIndex;
                  return (
                    <div
                      key={imgIndex}
                      className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                      onClick={() => openModal(globalIndex)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <span className="material-icons text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                          zoom_in
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          ref={focusTrapRef}
          className="fixed inset-0 z-[100] backdrop-blur-md bg-black/70 flex items-center justify-center"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Bild ${selectedIndex + 1} von ${galleryImages.length}: ${galleryImages[selectedIndex].alt}`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-[#A68A75] transition z-10"
            onClick={closeModal}
            aria-label="Galerie schließen"
          >
            <span className="material-icons text-4xl" aria-hidden="true">close</span>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 md:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-[#A68A75] hover:text-white transition"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Vorheriges Bild"
          >
            <span className="material-icons" aria-hidden="true">chevron_left</span>
          </button>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-[85vw] max-w-4xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedIndex].src}
              alt={galleryImages[selectedIndex].alt}
              fill
              sizes="85vw"
              className="object-contain"
            />
          </motion.div>

          {/* Next Button */}
          <button
            className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-[#A68A75] hover:text-white transition"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Nächstes Bild"
          >
            <span className="material-icons" aria-hidden="true">chevron_right</span>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}
