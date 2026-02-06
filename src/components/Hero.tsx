"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useBooking } from "@/context/BookingContext";
import { useCookieConsent } from "@/context/CookieContext";

const navLinks = [
  { href: "#location", label: "Location" },
  { href: "#extras", label: "Extras" },
  { href: "#galerie", label: "Galerie" },
  { href: "#bewertungen", label: "Bewertungen" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useBooking();
  const { hasFullConsent, openConsentModal } = useCookieConsent();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track scroll position for sticky CTA button - triggers when hero section ends
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="hero-section relative flex items-center justify-center overflow-hidden bg-black">
      {/* Navigation - Burgermenü oben rechts */}
      <nav className="absolute top-6 right-4 md:top-8 md:right-8 z-20" aria-label="Hauptnavigation">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center w-12 h-12 bg-black/40 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-black/60 transition shadow-lg"
          aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isMenuOpen}
          aria-controls="hero-menu"
        >
          <span className="material-icons text-2xl" aria-hidden="true">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>

        {isMenuOpen && (
          <div
            id="hero-menu"
            className="absolute top-14 right-0 w-56 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col py-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-6 py-3 text-white/90 hover:text-white hover:bg-white/10 text-sm uppercase tracking-wider font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-white/15 mt-1 pt-1">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openModal();
                  }}
                  className="w-full px-6 py-3 text-[#A68A75] hover:text-white hover:bg-white/10 text-sm uppercase tracking-wider font-semibold transition-colors text-left"
                >
                  Termin anfragen
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Background - YouTube wenn Consent, sonst statisches Bild */}
      <div className="hero-video-container absolute z-0 overflow-hidden bg-black">
        {hasFullConsent ? (
          // YouTube Video Background - direkter iframe für sofortiges Autoplay
          <div className="absolute inset-0 overflow-hidden grayscale">
            <div className="hero-video-bg pointer-events-none">
              <iframe
                src="https://www.youtube.com/embed/dLiXD3dJNLg?autoplay=1&mute=1&loop=1&playlist=dLiXD3dJNLg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
                title="Almweiß Hintergrund-Video"
                loading="eager"
              />
            </div>
          </div>
        ) : (
          // Statisches Hintergrundbild (ohne Consent)
          <div className="absolute inset-0 grayscale">
            <Image
              src="/images/hero-fallback.webp"
              alt=""
              fill
              priority
              className="object-cover"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 -mt-[150px] md:-mt-[50px]"
        >
          <Image
            src="/images/logo-white.webp"
            alt="Almweiß Logo"
            width={360}
            height={154}
            className="mx-auto drop-shadow-lg"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Die Hochzeits- &amp; <br />
          <span className="italic font-light text-[#A68A75]">Eventlocation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Feiern Sie Ihre Liebe an einem Ort, der so einzigartig ist wie Ihre Geschichte. Ein Tag, der bleibt. Ein Ort, der verzaubert.
        </motion.p>

        {/* CTA Button - in hero */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={openModal}
          className="inline-block bg-[#7D6B5D] text-white px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-[#6B5A4D] shadow-lg rounded-full"
        >
          Jetzt Wunschtermin sichern
        </motion.button>
      </div>

      {/* CTA Button - fixed, fades in bottom right when scrolled */}
      <button
        onClick={openModal}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-30 bg-[#7D6B5D] text-white px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-[#6B5A4D] shadow-lg rounded-full animate-pulse-soft transition-opacity duration-500 whitespace-nowrap ${
          isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Jetzt Wunschtermin sichern
      </button>

      {/* Video Button - nur anzeigen wenn Consent */}
      {hasFullConsent ? (
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="absolute bottom-6 right-4 md:bottom-8 md:right-8 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/30 text-white px-4 py-3 rounded-full hover:bg-black/60 transition group shadow-lg"
          aria-label={showVideo ? 'Video schließen' : 'Video öffnen'}
          aria-expanded={showVideo}
        >
          <span className="material-icons text-xl group-hover:scale-110 transition" aria-hidden="true">
            {showVideo ? 'close' : 'play_circle'}
          </span>
          <span className="text-sm font-medium uppercase tracking-wider">
            {showVideo ? 'Schließen' : 'Video'}
          </span>
        </button>
      ) : (
        <button
          onClick={openConsentModal}
          className="absolute bottom-6 right-4 md:bottom-8 md:right-8 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/30 text-white px-4 py-3 rounded-full hover:bg-black/60 transition group shadow-lg"
          aria-label="Cookies aktivieren für Video-Wiedergabe"
        >
          <span className="material-icons text-xl group-hover:scale-110 transition" aria-hidden="true">
            videocam_off
          </span>
          <span className="text-sm font-medium uppercase tracking-wider">
            Video aktivieren
          </span>
        </button>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator" aria-hidden="true">
        <span className="material-icons text-white text-4xl opacity-70" aria-hidden="true">keyboard_arrow_down</span>
      </div>

      {/* Video Modal - Small Player (nur mit Consent) */}
      {showVideo && hasFullConsent && (
        <div
          className="absolute bottom-20 left-4 right-4 md:bottom-24 md:left-auto md:right-8 md:w-[600px] z-50 aspect-video rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4"
          role="dialog"
          aria-label="Video Player"
        >
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-2 right-2 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
            aria-label="Video schließen"
          >
            <span className="material-icons text-lg" aria-hidden="true">close</span>
          </button>
          <YouTubeEmbed
            videoid="dLiXD3dJNLg"
            params="autoplay=1&rel=0&modestbranding=1"
            style="width: 100%; height: 100%;"
          />
        </div>
      )}
    </header>
  );
}
