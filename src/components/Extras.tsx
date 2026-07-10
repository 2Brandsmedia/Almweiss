"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const extras = [
  {
    title: "Service",
    description:
      "Dank unserem freundlichen Serviceteam können Sie den wichtigen Tag unbeschwert genießen. Wir kümmern uns!",
    image: "/images/wedding-2.webp",
    objectPosition: "50% center",
  },
  {
    title: "Fotobox",
    description:
      "Buchen Sie unsere hauseigene Fotobox als weiteres Highlight für Ihre Feier.",
    image: "/images/fotobox.webp",
    objectPosition: "center",
  },
  {
    title: "DJ & Technik",
    description:
      "Dank unserer erfahrenen DJs und der professionellen Ton & Lichttechnik sorgen wir für die perfekte Party.",
    image: "/images/tech.webp",
    objectPosition: "center",
  },
  {
    title: "Candybar",
    description:
      "Bieten Sie Ihren Gästen mit unserer Candybar eine süße Verführung.",
    image: "/images/candybar.webp",
    objectPosition: "center",
  },
];

export default function Extras() {
  return (
    <section className="py-24 bg-[#F5F0EB]" id="extras">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#A68A75] font-bold uppercase tracking-widest text-xs mb-2 block">
            Alles aus einer Hand
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unsere Extras
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Neben unserer einzigartigen Location bieten wir Ihnen zusätzliche
            Services für einen rundum sorglosen Tag.
          </p>
        </motion.div>

        {/* Extras Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {extras.map((extra, index) => (
            <motion.div
              key={extra.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-lg">
                <Image
                  src={extra.image}
                  alt={extra.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: extra.objectPosition }}
                />
              </div>

              {/* Content */}
              <div className="text-center px-2">
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  {extra.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {extra.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
