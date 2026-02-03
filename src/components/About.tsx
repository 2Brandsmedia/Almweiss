import Image from "next/image";

export default function About() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <span className="text-[#A68A75] font-bold uppercase tracking-widest text-sm mb-2 block">
              Warum Almweiß?
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ihre Reise zum <br />
              <span className="italic text-[#A68A75]">schönsten Tag.</span>
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Bei Almweiß beginnt Ihre Hochzeitsreise lange vor dem großen Tag. Wir begleiten Sie
              von der ersten Idee bis zum letzten Tanz – persönlich, liebevoll und mit einem
              Auge für jedes Detail, das Ihren Tag einzigartig macht.
            </p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Starten Sie jetzt Ihre Reise und sichern Sie sich Ihren Wunschtermin für 2026.
              Oder planen Sie bereits für 2027 und 2028. Wir sind bereit, Ihre Träume
              Wirklichkeit werden zu lassen.
            </p>

            {/* Feature Box */}
            <div className="flex items-center gap-4 p-4 bg-[#FAF9F6] rounded border-l-4 border-[#A68A75]">
              <span className="material-icons text-[#A68A75] text-3xl">verified</span>
              <div>
                <h4 className="font-bold text-gray-900">All Inclusive Service</h4>
                <p className="text-sm text-gray-500">
                  Von Essen bis DJ erhalten Sie alles aus einer Hand.
                </p>
              </div>
            </div>

            {/* CTA Link */}
            <div className="mt-10">
              <a
                href="#kontakt"
                className="inline-flex items-center text-[#A68A75] font-bold uppercase tracking-widest hover:text-gray-900 transition group"
              >
                Ihre Reise beginnt hier
                <span className="material-icons ml-2 transform group-hover:translate-x-1 transition">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          {/* Images */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/images/annechris-3570-1.jpg"
                alt="Brautpaar bei der Hochzeit"
                width={400}
                height={320}
                className="rounded-lg shadow-xl w-full h-80 object-cover transform translate-y-8"
              />
              <Image
                src="/images/brautpaar-rauch.jpg"
                alt="Brautpaar vor Rauch"
                width={400}
                height={320}
                className="rounded-lg shadow-xl w-full h-80 object-cover"
              />
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#A68A75]/20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
