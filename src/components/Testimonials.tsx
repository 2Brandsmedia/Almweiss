import Image from "next/image";

const testimonials = [
  {
    image: "/images/review-gesa.webp",
    name: "Gesa & Ben",
    date: "Hochzeit 2023",
    text: "Unsere Hochzeit bei Almweiß war einfach perfekt! Das Team hat sich um alles gekümmert und wir konnten unseren Tag in vollen Zügen genießen.",
  },
  {
    image: "/images/review-luisa.webp",
    name: "Luisa & Björn",
    date: "Hochzeit 2023",
    text: "Eine wunderschöne Location mit einem fantastischen Service. Die Fotobox war das Highlight und die Gäste waren begeistert!",
  },
  {
    image: "/images/review-alex.webp",
    name: "Alex & Diana",
    date: "Hochzeit 2023",
    text: "Von Anfang bis Ende top betreut. Die Location ist wunderschön und das Catering war erstklassig. Absolut empfehlenswert!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#A68A75] font-bold uppercase tracking-widest text-xs">
            Kundenstimmen
          </span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-4 text-gray-900">
            Was unsere Paare sagen
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-[#F5F0EB] p-8 rounded-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label="5 von 5 Sternen">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-icons text-[#A68A75]" aria-hidden="true">
                    star
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-6 italic leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
