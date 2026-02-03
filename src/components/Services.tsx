"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const reviews = [
  // Neueste Bewertungen (2026)
  {
    name: "Melanie",
    date: "Januar 2026",
    rating: 5,
    text: "Mit großer Freude möchte ich jedem diese tolle Eventlocation ans Herz legen! Wir haben uns vom ersten Termin bis zu unserer Hochzeitsfeier sehr wohl und immer gut aufgehoben gefühlt. Alle Mitarbeiter waren herzlich und empathisch. Top Empfehlung von ganzem Herzen!",
    initial: "M",
    color: "bg-purple-600",
    images: ["/images/annechris-3570-1.jpg"],
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
    images: ["/images/gesa-und-ben-Bewertung-2-scaled.jpg"],
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
    images: ["/images/luisa-und-bjoern-bewertung-1.jpg", "/images/IMG_1242.jpg"],
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
    images: ["/images/Alex-und-Diana-bewertung-3-e1695970694642.jpg", "/images/candybar.jpg", "/images/Fotobox.jpg"],
  },
  {
    name: "Daniel",
    date: "Februar 2025",
    rating: 5,
    text: "Es war alles Perfekt! Wir haben unsere Hochzeit hier mit 40 Personen gefeiert. Das Personal, der DJ und auch der Besitzer waren unglaublich freundlich. Die Abrechnung war fair und hat unser Budget nicht überschritten!",
    initial: "D",
    color: "bg-cyan-700",
    images: ["/images/IMG_0558-1.jpg"],
  },
  // 2024
  {
    name: "Sarah",
    date: "Februar 2024",
    rating: 5,
    text: "Wir sind sooo unendlich happy darüber dass wir unsere Hochzeit in der Almweiss gefeiert haben - es gab nichts was hätte besser sein können. Die Location ist unglaublich schön und Hermann hat es einfach drauf!",
    initial: "S",
    color: "bg-teal-600",
    images: ["/images/Fotogalerie.jpg", "/images/annechris-2061-1.jpg"],
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
  reviewText: string;
  reviewDate: string;
  reviewRating: number;
}

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    images: [],
    currentImageIndex: 0,
    reviewName: "",
    reviewText: "",
    reviewDate: "",
    reviewRating: 5,
  });

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
      reviewText: review.text,
      reviewDate: review.date,
      reviewRating: review.rating,
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
      <section className="py-24 bg-[#F5F0EB]">
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
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`material-icons text-2xl ${
                      i < Math.floor(averageRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
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
              className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-[#A68A75] hover:shadow-xl transition-all z-20"
              aria-label="Vorherige Bewertung"
            >
              <span className="material-icons text-2xl">chevron_left</span>
            </button>
            <button
              onClick={nextReview}
              className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-[#A68A75] hover:shadow-xl transition-all z-20"
              aria-label="Nächste Bewertung"
            >
              <span className="material-icons text-2xl">chevron_right</span>
            </button>

            {/* Card - Feste Höhe für einheitliches Layout */}
            <div className="bg-[#FAF9F6] rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[520px] flex flex-col">
              {/* Quote Icon */}
              <div className="text-[#A68A75]/20 mb-4">
                <span className="material-icons text-5xl">format_quote</span>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`material-icons text-2xl ${
                      i < currentReview.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    star
                  </span>
                ))}
              </div>

              {/* Review Text - Feste Höhe mit Scroll bei Bedarf */}
              <blockquote className="text-gray-700 text-lg md:text-xl text-center leading-relaxed mb-8 max-w-3xl mx-auto min-h-[120px] line-clamp-5">
                &ldquo;{currentReview.text}&rdquo;
              </blockquote>

              {/* Images Thumbnails - Fester Platzhalter für einheitliche Höhe */}
              <div className="flex justify-center gap-3 mb-8 flex-wrap min-h-[96px] items-center">
                {currentReview.images && currentReview.images.length > 0 &&
                  currentReview.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => openModal(currentReview, idx)}
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A68A75] group"
                    >
                      <Image
                        src={img}
                        alt={`Foto ${idx + 1} von ${currentReview.name}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <span className="material-icons text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl drop-shadow-lg">
                          zoom_in
                        </span>
                      </div>
                    </button>
                  ))
                }
              </div>

              {/* Author - Am unteren Rand fixiert */}
              <div className="flex items-center justify-center gap-4 mt-auto">
                <div
                  className={`w-14 h-14 rounded-full ${currentReview.color} flex items-center justify-center text-white text-xl font-bold shadow-md`}
                >
                  {currentReview.initial}
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-lg">
                    {currentReview.name}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    {currentReview.date}
                  </p>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-1.5 mt-10 flex-wrap max-w-md mx-auto">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(i);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-[#A68A75] w-6"
                        : "bg-gray-300 w-2 hover:bg-gray-400"
                    }`}
                    aria-label={`Bewertung ${i + 1}`}
                  />
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
              className="inline-flex items-center gap-2 text-[#A68A75] font-semibold hover:text-gray-900 transition group"
            >
              Alle Bewertungen auf Google ansehen
              <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {modal.isOpen && (
        <div
          className="fixed inset-0 z-[100] backdrop-blur-md bg-black/20 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`material-icons text-lg ${
                        i < modal.reviewRating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {modal.reviewName}
                </span>
                <span className="text-gray-400 text-sm">{modal.reviewDate}</span>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                <span className="material-icons text-gray-500">close</span>
              </button>
            </div>

            {/* Image Area */}
            <div className="relative bg-gray-100">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={modal.images[modal.currentImageIndex]}
                  alt={`Foto ${modal.currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Image Navigation */}
              {modal.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-white transition"
                  >
                    <span className="material-icons">chevron_left</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-white transition"
                  >
                    <span className="material-icons">chevron_right</span>
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {modal.currentImageIndex + 1} / {modal.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {modal.images.length > 1 && (
              <div className="flex gap-2 p-4 border-t bg-gray-50 overflow-x-auto">
                {modal.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setModal((prev) => ({ ...prev, currentImageIndex: idx }))
                    }
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      idx === modal.currentImageIndex
                        ? "ring-2 ring-[#A68A75] ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Review Text */}
            <div className="p-4 border-t">
              <p className="text-gray-700 text-sm leading-relaxed">
                &ldquo;{modal.reviewText}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
