"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden grayscale">
          <iframe
            id="bg-video"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] md:w-[177.77vh] md:h-[100vh] md:min-w-full md:min-h-[56.25vw] pointer-events-none"
            src="https://www.youtube.com/embed/dLiXD3dJNLg?autoplay=1&mute=1&loop=1&playlist=dLiXD3dJNLg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=0&disablekb=1"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Almweiß Video"
          />
        </div>
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <div className="mb-8">
          <Image
            src="/images/logo-transparent.png"
            alt="Almweiß Logo"
            width={200}
            height={80}
            className="mx-auto brightness-0 invert drop-shadow-lg"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Die Hochzeits- &amp; <br />
          <span className="italic font-light text-[#A68A75]">Eventlocation</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Feiern Sie Ihre Liebe an einem Ort, der so einzigartig ist wie Ihre Geschichte. Ein Tag, der bleibt. Ein Ort, der verzaubert.
        </p>

        {/* CTA Button - in hero */}
        <button
          onClick={openModal}
          className="inline-block bg-[#A68A75] text-white px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-opacity-90 shadow-lg rounded-full animate-pulse-soft"
        >
          Jetzt Wunschtermin sichern
        </button>
      </div>

      {/* CTA Button - fixed, fades in bottom right when scrolled */}
      <button
        onClick={openModal}
        className={`fixed bottom-8 right-8 z-30 bg-[#A68A75] text-white px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-opacity-90 shadow-lg rounded-full animate-pulse-soft transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Jetzt Wunschtermin sichern
      </button>

      {/* Video Button - Bottom Right */}
      <button
        onClick={() => setShowVideo(!showVideo)}
        className="absolute bottom-8 right-8 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 py-3 rounded-full hover:bg-white/20 transition group"
      >
        <span className="material-icons text-2xl group-hover:scale-110 transition">
          {showVideo ? 'close' : 'play_circle'}
        </span>
        <span className="text-sm font-semibold uppercase tracking-wider">
          {showVideo ? 'Video schließen' : 'Video ansehen'}
        </span>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 scroll-indicator">
        <span className="material-icons text-white text-4xl opacity-70">keyboard_arrow_down</span>
      </div>

      {/* Video Modal - Small Player */}
      {showVideo && (
        <div className="fixed bottom-24 right-8 z-50 w-[600px] aspect-video rounded-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-2 right-2 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
          >
            <span className="material-icons text-lg">close</span>
          </button>
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dLiXD3dJNLg?autoplay=1&rel=0&modestbranding=1"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title="Almweiß Video"
          />
        </div>
      )}
    </header>
  );
}
