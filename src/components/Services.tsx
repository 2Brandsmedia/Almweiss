"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const reviews = [
  // Neueste Bewertungen (2026)
  {
    name: "Melanie",
    date: "Januar 2026",
    rating: 5,
    text: "Mit großer Freude möchte ich jedem diese tolle Eventlocation ans Herz legen! Wir haben uns vom ersten Termin bis zu unserer Hochzeitsfeier sehr wohl und immer gut aufgehoben gefühlt. Alle Mitarbeiter waren herzlich und empathisch. Top Empfehlung von ganzem Herzen!",
    initial: "M",
    color: "bg-purple-600",
    images: ["/images/wedding-2.webp"],
  },
  {
    name: "Mo",
    date: "Januar 2026",
    rating: 5,
    text: "Es war durch und durch ein schöner Tag, vielen Dank dafür! Das Essen war super, ebenso wie der Service und DJ. In der Zeit davor war das Team immer gut zu erreichen und hat stets all unsere Fragen beantwortet. Klare Weiterempfehlung!",
    initial: "M",
    color: "bg-green-600",
  },
  // Dezember 2025
  {
    name: "Sonja",
    date: "Dezember 2025",
    rating: 5,
    text: "Wir haben unsere Hochzeit im Almweiß gefeiert. Es war eine wunderschöne Feier und unsere Gäste waren begeistert von der Location! Hermann und das Team waren die ganze Zeit über sehr herzlich und haben uns super unterstützt. Eine herzliche Empfehlung für alle!",
    initial: "S",
    color: "bg-blue-600",
    images: ["/images/review-gesa.webp"],
  },
  {
    name: "T.",
    date: "Dezember 2025",
    rating: 5,
    text: "Wir sind rundum zufrieden mit der professionellen Beratung und Ausführung unserer Hochzeitsfeier. Hermann ist ein Vollprofi und weiß genau, was er tut. Die Vorbereitung und die Feier selbst waren für uns unglaublich stressfrei. Das Team hat mehr als einen tollen Job gemacht!",
    initial: "T",
    color: "bg-red-600",
  },
  {
    name: "Friederike",
    date: "Dezember 2025",
    rating: 5,
    text: "Wunderschöne Location mit einem tollen Team! Unsere Hochzeit war unvergesslich. Von der Planung bis zur Durchführung hat alles perfekt geklappt. Vielen Dank an das gesamte Team für diesen wunderbaren Tag!",
    initial: "F",
    color: "bg-indigo-600",
  },
  // November 2025
  {
    name: "Jenny",
    date: "November 2025",
    rating: 5,
    text: "Unsere Hochzeit war einfach nur perfekt! Der Service war spitze, die Getränke wurden wahnsinnig schnell gebracht und alle waren super nett. Das Essen war sehr lecker und alles hat gut geklappt! Hermann hat sogar mit unserer Floristin die Lieferung abgesprochen. Sehr zu empfehlen!",
    initial: "J",
    color: "bg-pink-600",
  },
  {
    name: "Hans",
    date: "November 2025",
    rating: 5,
    text: "Top Location für unsere Hochzeitsfeier! Das Essen war ausgezeichnet, der Service hervorragend und die Atmosphäre einfach wunderbar. Wir haben uns rundum wohl gefühlt und können Almweiß nur empfehlen!",
    initial: "H",
    color: "bg-emerald-600",
  },
  // Oktober 2025
  {
    name: "Y.",
    date: "Oktober 2025",
    rating: 5,
    text: "Wir haben unsere absolute Traumhochzeit im Almweiß gefeiert. Von A - Z hat alles gestimmt! Das Personal war bezaubernd, der DJ hervorragend und das Essen war ein Traum! Die Location war einmalig und alle Gäste waren begeistert!",
    initial: "Y",
    color: "bg-yellow-600",
    images: ["/images/review-luisa.webp", "/images/venue-3.webp"],
  },
  {
    name: "Egbert",
    date: "Oktober 2025",
    rating: 4,
    text: "Schöne Location mit guter Ausstattung. Die Räumlichkeiten sind sehr gepflegt und das Team ist freundlich und hilfsbereit. Insgesamt eine gute Erfahrung.",
    initial: "E",
    color: "bg-amber-600",
  },
  // Februar 2025
  {
    name: "Steffi",
    date: "Februar 2025",
    rating: 5,
    text: "Wie auch beim letzten Mal Klasseservice. Freundlich, immer präsent, aber nicht aufdringlich. Hoffentlich bei der nächsten Betriebsfeier wieder bei Euch!",
    initial: "S",
    color: "bg-rose-600",
  },
  {
    name: "Dragan",
    date: "Februar 2025",
    rating: 5,
    text: "Wir hatten einen großartigen Abend in einer gemütlichen, rustikalen Umgebung verbracht! Das hilfsbereite und schnelle Personal hat den Abend perfekt abgerundet. Solche positiven Erfahrungen hat man selten. Wir werden sicherlich wiederkommen.",
    initial: "D",
    color: "bg-violet-600",
  },
  {
    name: "Marie",
    date: "Februar 2025",
    rating: 5,
    text: "Wir haben am Samstag unsere Hochzeit im Almweiss gefeiert und es war einfach perfekt! Alle unsere Wünsche wurden erfüllt, und das Essen war fantastisch – selbst unsere Sonderwünsche wurden ohne Probleme umgesetzt.",
    initial: "M",
    color: "bg-fuchsia-600",
  },
  {
    name: "Ulrich",
    date: "Februar 2025",
    rating: 5,
    text: "Sehr schönes Ambiente. Hatten eine sehr schöne Hochzeitsfeier. Sehr freundliches Personal. Können wir nur weiterempfehlen!",
    initial: "U",
    color: "bg-sky-600",
  },
  {
    name: "Johanna",
    date: "Februar 2025",
    rating: 5,
    text: "Wir haben letzte Woche Freitag im Almweiß unsere Hochzeit gefeiert und es war alles perfekt. Der Service war super, die Kellnerinnen sehr freundlich und kompetent. Auch DJ Cristiano hat uns super durch den Abend geleitet. Hermann hat uns bei all unseren Fragen super beraten. Wir können das Almweiß wirklich nur empfehlen.",
    initial: "J",
    color: "bg-lime-600",
  },
  {
    name: "Mathis",
    date: "Februar 2025",
    rating: 5,
    text: "Wir haben am vergangenen Wochenende unsere Hochzeit im Almweiß gefeiert und es war wirklich sehr gut! Die Location, das Essen, der Service – alles hat gestimmt!",
    initial: "M",
    color: "bg-orange-500",
  },
  {
    name: "Adelheid",
    date: "Februar 2025",
    rating: 5,
    text: "Nachdem wir im vergangen Jahr als Hochzeitsgäste im Almweiß waren, haben wir uns dafür entschieden unsere Hochzeit auch dort zu feiern. Das war die perfekte Entscheidung. Alles war wunderbar organisiert!",
    initial: "A",
    color: "bg-cyan-600",
  },
  {
    name: "David",
    date: "Februar 2025",
    rating: 5,
    text: "Wir haben unsere Hochzeit im Almweiß gefeiert. Kurzfassung: Alles top! Von Location bis Personal - wir waren wunschlos glücklich und die Feier ein voller Erfolg. Absolut empfehlenswert!",
    initial: "D",
    color: "bg-teal-500",
  },
  {
    name: "Marylin",
    date: "Februar 2025",
    rating: 5,
    text: "Wir haben am 07.09. unsere Hochzeit im Almweiß gefeiert. Mit rund 65 Gästen war das Almweiß die perfekte Location für uns. Das Essen war hervorragend und der Service erstklassig. Wir können es nur weiterempfehlen!",
    initial: "M",
    color: "bg-orange-600",
    images: ["/images/review-alex.webp", "/images/candybar.webp", "/images/fotobox.webp"],
  },
  {
    name: "Daniel",
    date: "Februar 2025",
    rating: 5,
    text: "Es war alles Perfekt! Wir haben unsere Hochzeit hier mit 40 Personen gefeiert. Das Personal, der DJ und auch der Besitzer waren unglaublich freundlich. Die Abrechnung war fair und hat unser Budget nicht überschritten!",
    initial: "D",
    color: "bg-cyan-700",
    images: ["/images/venue-1.webp"],
  },
  // 2024
  {
    name: "Sarah",
    date: "Februar 2024",
    rating: 5,
    text: "Wir sind sooo unendlich happy darüber dass wir unsere Hochzeit in der Almweiss gefeiert haben - es gab nichts was hätte besser sein können. Die Location ist unglaublich schön und Hermann hat es einfach drauf!",
    initial: "S",
    color: "bg-teal-600",
    images: ["/images/gallery.webp", "/images/wedding-1.webp"],
  },
];

// Statistiken
const totalReviews = 191;
const averageRating = 4.8;
const googleMapsUrl =
  "https://www.google.com/maps/place/Almwei%C3%9F/@51.0522363,7.0068428,17z/data=!4m8!3m7!1s0x47bf2ea7404f50b5:0xc783cbb69125dad8!8m2!3d51.0522363!4d7.0068428!9m1!1b1!16s%2Fg%2F11b6_49xzb";

interface ModalState {
  isOpen: boolean;
  images: string[];
  currentImageIndex: number;
  reviewName: string;
  reviewDate: string;
}


export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    images: [],
    currentImageIndex: 0,
    reviewName: "",
    reviewDate: "",
  });

  // Focus Trap für Bild-Modal (WCAG 2.1)
  const focusTrapRef = useFocusTrap(modal.isOpen);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextReview = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const openModal = (review: typeof reviews[0], imageIndex: number = 0) => {
    if (!review.images) return;
    setModal({
      isOpen: true,
      images: review.images,
      currentImageIndex: imageIndex,
      reviewName: review.name,
      reviewDate: review.date,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const nextImage = () => {
    setModal((prev) => ({
      ...prev,
      currentImageIndex: (prev.currentImageIndex + 1) % prev.images.length,
    }));
  };

  const prevImage = () => {
    setModal((prev) => ({
      ...prev,
      currentImageIndex:
        (prev.currentImageIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  const currentReview = reviews[currentIndex];

  return (
    <>
      <section className="py-24 bg-white" id="bewertungen">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[#A68A75] font-bold uppercase tracking-widest text-xs mb-2 block">
              Das sagen unsere Paare
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Bewertungen
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex" role="img" aria-label={`${averageRating} von 5 Sternen`}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`material-icons text-2xl ${
                      i < Math.floor(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="text-xl font-bold text-gray-900">
                {averageRating}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Basierend auf {totalReviews} Google Bewertungen
            </p>
          </motion.div>

          {/* Review Card */}
          <div className="relative">
            {/* Navigation Arrows - Outside */}
            <button
              onClick={prevReview}
              className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#A68A75] hover:shadow-xl transition-all z-20"
              aria-label="Vorherige Bewertung"
            >
              <span className="material-icons text-2xl" aria-hidden="true">chevron_left</span>
            </button>
            <button
              onClick={nextReview}
              className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#A68A75] hover:shadow-xl transition-all z-20"
              aria-label="Nächste Bewertung"
            >
              <span className="material-icons text-2xl" aria-hidden="true">chevron_right</span>
            </button>

            {/* Card - Kompaktes Layout */}
            <div className="bg-[#FAF9F6] rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 h-[320px] flex flex-col">
              {/* Review Text */}
              <blockquote className="text-gray-700 text-base md:text-lg text-center leading-relaxed flex-1 flex items-center justify-center px-4">
                <span className="line-clamp-4">&ldquo;{currentReview.text}&rdquo;</span>
              </blockquote>

              {/* Images - Klein und kompakt */}
              {currentReview.images && currentReview.images.length > 0 && (
                <div className="flex justify-center gap-2 mb-4">
                  {currentReview.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => openModal(currentReview, idx)}
                      className="relative w-14 h-14 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-105 group"
                    >
                      <Image
                        src={img}
                        alt={`Foto ${idx + 1} von ${currentReview.name}`}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <span className="material-icons text-white opacity-0 group-hover:opacity-100 text-lg" aria-hidden="true">zoom_in</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Author + Stars */}
              <div className="flex items-center justify-center gap-3 pt-3 border-t border-gray-200">
                <div
                  className={`w-10 h-10 rounded-full ${currentReview.color} flex items-center justify-center text-white text-sm font-bold shadow-sm`}
                >
                  {currentReview.initial}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900">{currentReview.name}</p>
                    <div className="flex" role="img" aria-label={`${currentReview.rating} von 5 Sternen`}>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-icons text-sm ${
                            i < currentReview.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          aria-hidden="true"
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {currentReview.date}
                  </p>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-1 mt-4 flex-wrap">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(i);
                    }}
                    className="py-2 px-0.5 flex items-center"
                    aria-label={`Bewertung ${i + 1}`}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "bg-[#A68A75] w-4"
                          : "bg-gray-300 w-1.5 hover:bg-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#7D6B5D] text-white px-6 py-3 md:px-8 md:py-4 text-[11px] md:text-sm uppercase tracking-wider font-semibold hover:bg-[#6B5A4D] shadow-lg rounded-full transition whitespace-nowrap"
            >
              Alle Bewertungen auf Google ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Einfaches Bild-Modal */}
      {modal.isOpen && modal.images.length > 0 && (
        <div
          ref={focusTrapRef}
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto von ${modal.reviewName}`}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
            aria-label="Bildansicht schließen"
          >
            <span className="material-icons text-white" aria-hidden="true">close</span>
          </button>

          {/* Bild */}
          <div className="relative max-w-4xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={modal.images[modal.currentImageIndex]}
              alt={`Hochzeitsfoto von ${modal.reviewName}, ${modal.reviewDate}`}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />

            {/* Bild-Navigation */}
            {modal.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-white transition"
                  aria-label="Vorheriges Bild"
                >
                  <span className="material-icons" aria-hidden="true">chevron_left</span>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-white transition"
                  aria-label="Nächstes Bild"
                >
                  <span className="material-icons" aria-hidden="true">chevron_right</span>
                </button>
              </>
            )}

            {/* Text unten */}
            <div className="mt-4 text-center text-white">
              <p className="text-sm opacity-80">{modal.reviewName} · {modal.reviewDate}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
