"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const galleryImages = [
  { src: "/images/annechris-2061-1.jpg", alt: "Brautpaar" },
  { src: "/images/annechris-3831-1.jpg", alt: "Trauung" },
  { src: "/images/IMG_0558.jpg", alt: "Hochzeitsgesellschaft" },
  { src: "/images/IMG_1242.jpg", alt: "Dekoration" },
  { src: "/images/IMG_5166.jpg", alt: "Tischdekoration" },
  { src: "/images/candybar.jpg", alt: "Candybar" },
  { src: "/images/IMG_7564.jpg", alt: "Location Details" },
  { src: "/images/IMG_1561.jpg", alt: "Ambiente" },
  { src: "/images/Fotobox.jpg", alt: "Fotobox" },
  { src: "/images/IMG_9345.jpg", alt: "Feier" },
  { src: "/images/Fotogalerie.jpg", alt: "Galerie" },
  { src: "/images/Foto-Technik-scaled.jpg", alt: "Technik" },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [isPaused]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") {
        setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1);
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1);
      }
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  // Double the images for seamless loop
  const doubledImages = [...galleryImages, ...galleryImages];

  return (
    <>
      <section className="py-24 bg-white" id="galerie">
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
            <h2 className="font-display text-4xl font-bold mt-2 mb-4 text-gray-900">
              Galerie
            </h2>
            <p className="text-gray-600">
              Eindrücke von unvergesslichen Momenten bei Almweiß.
            </p>
          </motion.div>
        </div>

        {/* Scrolling Gallery */}
        <div
          ref={scrollRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-4 w-max">
            {doubledImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative group overflow-hidden rounded-lg w-[280px] h-[280px] flex-shrink-0 cursor-pointer"
                onClick={() => openModal(index % galleryImages.length)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-icons text-white text-3xl">zoom_in</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal with Navigation */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] backdrop-blur-md bg-black/20 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-[#A68A75] transition z-10"
            onClick={closeModal}
            aria-label="Schließen"
          >
            <span className="material-icons text-4xl">close</span>
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
            <span className="material-icons">chevron_left</span>
          </button>

          {/* Image */}
          <div
            className="relative w-[85vw] max-w-4xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedIndex].src}
              alt={galleryImages[selectedIndex].alt}
              fill
              className="object-contain"
            />
          </div>

          {/* Next Button */}
          <button
            className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-[#A68A75] hover:text-white transition"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Nächstes Bild"
          >
            <span className="material-icons">chevron_right</span>
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {selectedIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}
