const steps = [
  {
    number: "01",
    title: "Anfrage",
    description: "Prüfen Sie, ob Ihr Wunschtermin noch verfügbar ist.",
    active: true,
  },
  {
    number: "02",
    title: "Bestätigung & Kennenlernen",
    description: "Persönliches Kennenlernen und Besichtigung vor Ort.",
    active: false,
  },
  {
    number: "03",
    title: "Maßgeschneidertes Angebot",
    description: "Wir erstellen Ihr individuelles Paket nach Ihren Wünschen.",
    active: false,
  },
  {
    number: "04",
    title: "Das Jawort",
    description: "Feiern Sie ohne Stress. Wir kümmern uns um alles.",
    active: false,
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-[#F5F0EB]" id="leistungen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#A68A75] font-bold uppercase tracking-widest text-xs">
            Ihr Weg zum Traum
          </span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-4 text-gray-900">
            In 4 Schritten zur Hochzeit
          </h2>
          <p className="text-gray-600">
            Wir machen es Ihnen einfach. Der Weg zu Ihrer Traumfeier ist klar definiert.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-300 z-0" />

          {steps.map((step) => (
            <div key={step.number} className="relative z-10 text-center">
              <div
                className={`w-24 h-24 mx-auto bg-white rounded-full border-4 ${
                  step.active
                    ? "border-[#A68A75]"
                    : "border-gray-200 hover:border-[#A68A75]"
                } flex items-center justify-center shadow-lg mb-6 transition duration-300 group`}
              >
                <span
                  className={`font-display text-3xl font-bold ${
                    step.active
                      ? "text-[#A68A75]"
                      : "text-gray-400 group-hover:text-[#A68A75]"
                  } transition duration-300`}
                >
                  {step.number}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
