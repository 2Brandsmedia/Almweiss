"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Galerie-Bilder aus dem images Ordner
const galleryImages = [
  "/images/wedding-1.webp",
  "/images/wedding-2.webp",
  "/images/wedding-3.webp",
  "/images/venue-1.webp",
  "/images/venue-2.webp",
  "/images/venue-3.webp",
  "/images/venue-4.webp",
  "/images/venue-5.webp",
  "/images/venue-6.webp",
  "/images/table.webp",
  "/images/couple-smoke.webp",
  "/images/candybar.webp",
];

// ============================================
// PARALLAX GRID SCROLL
// ============================================
function ParallaxGridScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different speeds for each column
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);
  const y3Spring = useSpring(y3, springConfig);
  const y4Spring = useSpring(y4, springConfig);

  const columns = [
    { images: galleryImages.slice(0, 3), y: y1Spring },
    { images: galleryImages.slice(3, 6), y: y2Spring },
    { images: galleryImages.slice(6, 9), y: y3Spring },
    { images: galleryImages.slice(9, 12), y: y4Spring },
  ];

  return (
    <section className="py-20 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Parallax Grid Scroll
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Scrollen Sie und beobachten Sie, wie sich die Spalten mit unterschiedlichen Geschwindigkeiten bewegen.
        </p>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {columns.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              style={{ y: column.y }}
              className="flex flex-col gap-4"
            >
              {column.images.map((src, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${colIndex * 3 + imgIndex + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CIRCULAR GALLERY
// ============================================
function CircularGallery() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const startRotation = useRef(0);

  const images = galleryImages.slice(0, 8);
  const angleStep = 360 / images.length;
  const radius = 300; // Distance from center

  // Auto rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3);
    }, 30);

    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStartX.current = e.clientX;
    startRotation.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    setRotation(startRotation.current + deltaX * 0.5);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-rotation after 3 seconds
    setTimeout(() => setAutoRotate(true), 3000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStartX.current = e.touches[0].clientX;
    startRotation.current = rotation;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    setRotation(startRotation.current + deltaX * 0.5);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 3000);
  };

  return (
    <section className="py-20 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          Circular Gallery
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Ziehen Sie die Galerie mit der Maus oder wischen Sie auf Touch-Geräten.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: "1000px" }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          {images.map((src, index) => {
            const angle = (index * angleStep * Math.PI) / 180;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            const rotateY = -index * angleStep;

            return (
              <div
                key={index}
                className="absolute w-48 h-64 md:w-56 md:h-72 rounded-xl overflow-hidden shadow-2xl"
                style={{
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg)`,
                  transformStyle: "preserve-3d",
                  left: "-96px",
                  top: "-128px",
                }}
              >
                <Image
                  src={src}
                  alt={`Circular gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Center reflection */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-32 w-64 h-32 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-2xl" />
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        {autoRotate ? "Auto-Rotation aktiv" : "Manuelle Steuerung"}
      </p>
    </section>
  );
}

// ============================================
// PARALLAX DEPTH IMAGE COMPONENT
// ============================================
function ParallaxDepthImage({
  src,
  index,
  scrollYProgress,
}: {
  src: string;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const depth = (index % 3) + 1;
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * depth, -100 * depth]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const positions = [
    { left: "5%", top: "10%" },
    { left: "60%", top: "5%" },
    { left: "25%", top: "35%" },
    { left: "70%", top: "40%" },
    { left: "10%", top: "60%" },
    { left: "55%", top: "65%" },
  ];

  return (
    <motion.div
      className="absolute w-48 h-64 md:w-64 md:h-80 rounded-xl overflow-hidden shadow-2xl"
      style={{
        ...positions[index],
        y: yOffset,
        scale,
        opacity,
        zIndex: depth,
      }}
    >
      <Image
        src={src}
        alt={`Depth image ${index + 1}`}
        fill
        className="object-cover"
      />
    </motion.div>
  );
}

// ============================================
// PARALLAX SCROLL WITH DEPTH
// ============================================
function ParallaxDepthScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const images = galleryImages.slice(0, 6);

  return (
    <section ref={containerRef} className="py-20 bg-[#1C1917] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          Parallax Depth Scroll
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Bilder bewegen sich mit unterschiedlicher Tiefe beim Scrollen.
        </p>

        <div className="relative h-[800px]">
          {images.map((src, index) => (
            <ParallaxDepthImage
              key={index}
              src={src}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function TestGalleryPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 py-20 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
          Galerie Test
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto px-4">
          Verschiedene Galerie-Effekte zum Testen. Scrollen Sie durch die Seite um alle Effekte zu sehen.
        </p>
      </div>

      {/* Gallery Sections */}
      <ParallaxGridScroll />
      <CircularGallery />
      <ParallaxDepthScroll />

      {/* Back Link */}
      <div className="py-12 text-center bg-[#FAF9F6]">
        <Link
          href="/"
          className="inline-block bg-[#A68A75] text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wider hover:bg-[#8B7362] transition-colors"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
