"use client";

import { useEffect, useState, useCallback } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { useCookieConsent } from "@/context/CookieContext";

// Instagram Posts werden aus JSON geladen (aktualisiert via Cron Job)
import instagramData from "@/data/instagram-posts.json";

const instagramPosts = instagramData.posts;

interface InstagramWindow extends Window {
  instgrm?: {
    Embeds?: {
      process?: () => void;
    };
  };
}

export default function Instagram() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const { hasFullConsent } = useCookieConsent();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % instagramPosts.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + instagramPosts.length) % instagramPosts.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % instagramPosts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
      setIsAutoPlaying(false);
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
      setIsAutoPlaying(false);
    }
  };

  // Berechne Position relativ zum aktuellen Index
  const getPosition = (index: number) => {
    const diff = index - currentIndex;
    // Handle wrap-around
    if (diff > instagramPosts.length / 2) return diff - instagramPosts.length;
    if (diff < -instagramPosts.length / 2) return diff + instagramPosts.length;
    return diff;
  };

  return (
    <section className="py-24 bg-[#F5F0EB] overflow-hidden" id="instagram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-8 h-8 text-[#A68A75]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
            <a
              href="https://www.instagram.com/_almweiss_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7D6B5D] font-bold uppercase tracking-widest text-sm hover:text-gray-900 transition"
            >
              @_almweiss_
            </a>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-gray-900">
            Folgen Sie uns auf Instagram
          </h2>
        </motion.div>

        {/* 3D Karussell */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
            }}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-[#A68A75] hover:text-white transition"
            aria-label="Vorheriger Beitrag"
          >
            <span className="material-icons" aria-hidden="true">chevron_left</span>
          </button>

          <button
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
            }}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-[#A68A75] hover:text-white transition"
            aria-label="Nächster Beitrag"
          >
            <span className="material-icons" aria-hidden="true">chevron_right</span>
          </button>

          {/* Cards Container - Alle Embeds werden vorgerendert */}
          <div className="relative flex items-center justify-center min-h-[720px] md:min-h-[780px] py-8">
            {instagramPosts.map((post, index) => {
              const position = getPosition(index);
              const isCenter = position === 0;
              const isLeft = position === -1;
              const isRight = position === 1;
              const isVisible = isCenter || isLeft || isRight;

              // Smooth animation mit cubic-bezier für flüssige Übergänge
              const baseClasses = "absolute transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ";

              let containerClasses = baseClasses;
              let isClickable = false;

              if (isCenter) {
                // Mittlere Karte - volle Größe
                containerClasses += "z-20 w-[328px] md:w-[400px] opacity-100 scale-100 translate-x-0";
              } else if (isLeft) {
                // Linke Karte - vollständig sichtbar, leicht kleiner
                containerClasses += "z-10 w-[328px] md:w-[400px] opacity-70 scale-[0.9] -translate-x-[340px] md:-translate-x-[420px] cursor-pointer hover:opacity-90 hidden md:block";
                isClickable = true;
              } else if (isRight) {
                // Rechte Karte - vollständig sichtbar, leicht kleiner
                containerClasses += "z-10 w-[328px] md:w-[400px] opacity-70 scale-[0.9] translate-x-[340px] md:translate-x-[420px] cursor-pointer hover:opacity-90 hidden md:block";
                isClickable = true;
              } else {
                // Nicht sichtbare Elemente
                containerClasses += "z-0 w-[328px] opacity-0 scale-75 pointer-events-none";
              }

              return (
                <div
                  key={post}
                  className={containerClasses}
                  style={{ visibility: isVisible ? "visible" : "hidden" }}
                  onClick={() => {
                    if (isClickable) {
                      if (isLeft) prevSlide();
                      else if (isRight) nextSlide();
                      setIsAutoPlaying(false);
                    }
                  }}
                >
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    {hasFullConsent ? (
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={post}
                        data-instgrm-version="14"
                        style={{
                          background: "#FFF",
                          border: 0,
                          borderRadius: "12px",
                          boxShadow: isCenter
                            ? "0 8px 30px rgba(0,0,0,0.2)"
                            : "0 4px 15px rgba(0,0,0,0.1)",
                          margin: 0,
                          maxWidth: "540px",
                          minWidth: "300px",
                          padding: 0,
                          width: "100%",
                        }}
                      />
                    ) : (
                      <a
                        href={post}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white rounded-xl p-8 text-center h-[500px] flex flex-col items-center justify-center"
                        style={{
                          boxShadow: isCenter
                            ? "0 8px 30px rgba(0,0,0,0.2)"
                            : "0 4px 15px rgba(0,0,0,0.1)",
                        }}
                      >
                        <svg className="w-16 h-16 text-[#A68A75] mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-600 mb-2">Instagram-Beitrag</p>
                        <p className="text-sm text-[#A68A75]">Auf Instagram ansehen →</p>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {instagramPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#A68A75] w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Gehe zu Beitrag ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/_almweiss_/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#7D6B5D] text-white px-10 py-4 font-bold uppercase tracking-[0.2em] text-sm hover:bg-gray-900 hover:shadow-xl transition-all duration-300 border-2 border-[#7D6B5D] hover:border-gray-900 rounded-full"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
            @_almweiss_
          </a>
        </div>
      </div>

      {/* Offizielles Instagram Embed Script - nur bei Consent laden */}
      {hasFullConsent && (
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => {
            const win = window as InstagramWindow;
            if (win.instgrm?.Embeds?.process) {
              win.instgrm.Embeds.process();
            }
          }}
        />
      )}
    </section>
  );
}
