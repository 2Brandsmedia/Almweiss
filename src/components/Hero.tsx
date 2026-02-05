"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          events: {
            onReady: (event: { target: YouTubePlayer }) => void;
          };
        }
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
}

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const { openModal } = useBooking();

  // Track scroll position for sticky CTA button - triggers when hero section ends
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('bg-video', {
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    };
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      if (showVideo) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  }, [showVideo]);

  return (
    <header className="hero-section relative flex items-center justify-center overflow-hidden bg-black">
      {/* YouTube Video Background */}
      <div className="hero-video-container absolute z-0 overflow-hidden bg-black">
        <div className="absolute inset-0 overflow-hidden grayscale">
          <iframe
            id="bg-video"
            className="hero-video-bg pointer-events-none"
            src="https://www.youtube.com/embed/dLiXD3dJNLg?autoplay=1&mute=1&loop=1&playlist=dLiXD3dJNLg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=0&disablekb=1"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
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
          className="inline-block bg-[#A68A75] text-white px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-opacity-90 shadow-lg rounded-full"
        >
          Jetzt Wunschtermin sichern
        </motion.button>
      </div>

      {/* CTA Button - fixed, fades in bottom right when scrolled */}
      <button
        onClick={openModal}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-30 bg-[#A68A75] text-white px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-opacity-90 shadow-lg rounded-full animate-pulse-soft transition-opacity duration-500 whitespace-nowrap ${
          isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Jetzt Wunschtermin sichern
      </button>

      {/* Video Button - Bottom Right im Hero */}
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator" aria-hidden="true">
        <span className="material-icons text-white text-4xl opacity-70" aria-hidden="true">keyboard_arrow_down</span>
      </div>

      {/* Video Modal - Small Player */}
      {showVideo && (
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
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dLiXD3dJNLg?autoplay=1&rel=0&modestbranding=1"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title="YouTube Video: Almweiß Hochzeitslocation Präsentation"
            aria-label="YouTube Video: Almweiß Hochzeitslocation Präsentation"
          />
        </div>
      )}
    </header>
  );
}
