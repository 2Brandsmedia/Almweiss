"use client";

import { useState, useEffect } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type ModalType = "impressum" | "datenschutz" | "agb" | "barrierefreiheit" | "faq" | "cookies" | null;

// FAQ Accordion Component
const faqCategories = [
  {
    category: "Location & Kapazität",
    icon: "location_on",
    questions: [
      {
        q: "Wie viele Gäste können bei Almweiß feiern?",
        a: "Unsere Location bietet Platz für 40 bis 80 Gäste. Die Mindestanzahl von 40 Gästen ermöglicht eine optimale Nutzung unserer Räumlichkeiten."
      },
      {
        q: "Welche Veranstaltungen können bei Almweiß gefeiert werden?",
        a: "Wir richten Hochzeiten, Geburtstage, Firmenevents und weitere besondere Anlässe aus. Jede Feier wird individuell auf Ihre Wünsche abgestimmt."
      },
      {
        q: "Kann ich die Location vorher besichtigen?",
        a: "Selbstverständlich! Wir bieten nach Terminvereinbarung Besichtigungen an, damit Sie sich persönlich von unserer Location überzeugen können."
      },
      {
        q: "Gibt es Parkmöglichkeiten?",
        a: "Ja, ausreichend Parkplätze stehen in unmittelbarer Nähe zur Verfügung. Details teilen wir Ihnen gerne bei der Buchung mit."
      },
      {
        q: "Ist die Location barrierefrei?",
        a: "Ja, unsere Location ist vollständig barrierefrei. Der Eingang ist ebenerdig und 100% barrierefrei zugänglich. Wir verfügen über behindertengerechte Toiletten sowie einen Wickeltisch in der Damentoilette."
      },
    ]
  },
  {
    category: "Buchung & Preise",
    icon: "calendar_today",
    questions: [
      {
        q: "Wie weit im Voraus sollte ich buchen?",
        a: "Wir empfehlen, Ihren Wunschtermin so früh wie möglich anzufragen. Besonders für Hochzeiten in der Hauptsaison (Mai bis September) raten wir zu einer Buchung mindestens 6-12 Monate im Voraus."
      },
      {
        q: "Wie sind die Stornierungsbedingungen?",
        a: "Unsere Stornierungsbedingungen finden Sie in unseren AGB. Je nach Zeitpunkt der Stornierung fallen unterschiedliche Gebühren an."
      },
    ]
  },
  {
    category: "Service & Ausstattung",
    icon: "room_service",
    questions: [
      {
        q: "Ist Catering inbegriffen?",
        a: "Wir bieten verschiedene Catering-Optionen an. Details besprechen wir gerne bei einem persönlichen Beratungsgespräch, um das perfekte Angebot für Ihre Feier zu erstellen."
      },
    ]
  },
  {
    category: "Kontakt",
    icon: "contact_support",
    questions: [
      {
        q: "Haben Sie noch weitere Fragen?",
        a: "Kontaktieren Sie uns gerne telefonisch unter 0173 2814620 oder per E-Mail an info@almweiss.de. Wir helfen Ihnen gerne weiter!"
      },
    ]
  },
];

type A11ySettings = {
  fontSize: "normal" | "large" | "xlarge";
  contrast: "normal" | "high";
  invert: boolean;
  grayscale: boolean;
};

const defaultA11ySettings: A11ySettings = {
  fontSize: "normal",
  contrast: "normal",
  invert: false,
  grayscale: false,
};

function AccessibilitySettings() {
  const [settings, setSettings] = useState<A11ySettings>(defaultA11ySettings);
  const [mounted, setMounted] = useState(false);

  // Load settings from localStorage on mount
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("a11y-settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {
        // Invalid JSON, use defaults
      }
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Apply settings to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    root.classList.remove("a11y-font-large", "a11y-font-xlarge");
    if (settings.fontSize === "large") {
      root.classList.add("a11y-font-large");
    } else if (settings.fontSize === "xlarge") {
      root.classList.add("a11y-font-xlarge");
    }

    root.classList.toggle("a11y-high-contrast", settings.contrast === "high");
    root.classList.toggle("a11y-invert", settings.invert);
    root.classList.toggle("a11y-grayscale", settings.grayscale);

    localStorage.setItem("a11y-settings", JSON.stringify(settings));
  }, [settings, mounted]);

  const resetSettings = () => {
    setSettings(defaultA11ySettings);
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(defaultA11ySettings);

  if (!mounted) return <div className="h-48" />;

  return (
    <div className="space-y-4">
      {/* Font Size */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
          Schriftgröße
        </label>
        <div className="flex gap-2">
          {[
            { value: "normal", label: "A", title: "Normal" },
            { value: "large", label: "A", title: "Groß", className: "text-lg" },
            { value: "xlarge", label: "A", title: "Sehr groß", className: "text-xl" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSettings({ ...settings, fontSize: option.value as A11ySettings["fontSize"] })}
              className={`flex-1 py-2 rounded-lg border-2 transition font-bold ${option.className || ""} ${
                settings.fontSize === option.value
                  ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
              title={option.title}
              aria-pressed={settings.fontSize === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contrast */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
          Kontrast
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setSettings({ ...settings, contrast: "normal" })}
            className={`flex-1 py-2 rounded-lg border-2 transition text-sm font-medium ${
              settings.contrast === "normal"
                ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            }`}
            aria-pressed={settings.contrast === "normal"}
          >
            Normal
          </button>
          <button
            onClick={() => setSettings({ ...settings, contrast: "high" })}
            className={`flex-1 py-2 rounded-lg border-2 transition text-sm font-medium ${
              settings.contrast === "high"
                ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            }`}
            aria-pressed={settings.contrast === "high"}
          >
            Hoch
          </button>
        </div>
      </div>

      {/* Toggle Options */}
      <div className="space-y-2">
        <button
          onClick={() => setSettings({ ...settings, invert: !settings.invert })}
          className={`w-full py-2 px-3 rounded-lg border-2 transition text-sm font-medium flex items-center justify-between ${
            settings.invert
              ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
              : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}
          aria-pressed={settings.invert}
        >
          <span>Farben invertieren</span>
          <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
            settings.invert ? "bg-[#A68A75] border-[#A68A75]" : "border-gray-300"
          }`}>
            {settings.invert && <span className="material-icons text-white text-xs" aria-hidden="true">check</span>}
          </span>
        </button>

        <button
          onClick={() => setSettings({ ...settings, grayscale: !settings.grayscale })}
          className={`w-full py-2 px-3 rounded-lg border-2 transition text-sm font-medium flex items-center justify-between ${
            settings.grayscale
              ? "border-[#A68A75] bg-[#F5F0EB] text-[#A68A75]"
              : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}
          aria-pressed={settings.grayscale}
        >
          <span>Graustufen (Farbenblindheit)</span>
          <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
            settings.grayscale ? "bg-[#A68A75] border-[#A68A75]" : "border-gray-300"
          }`}>
            {settings.grayscale && <span className="material-icons text-white text-xs" aria-hidden="true">check</span>}
          </span>
        </button>
      </div>

      {/* Reset Button - immer sichtbar für konstante Höhe */}
      <button
        onClick={resetSettings}
        disabled={!hasChanges}
        className={`w-full py-2 text-sm transition flex items-center justify-center gap-1 ${
          hasChanges
            ? "text-gray-500 hover:text-gray-700"
            : "text-transparent pointer-events-none"
        }`}
      >
        <span className="material-icons text-sm" aria-hidden="true">refresh</span>
        Zurücksetzen
      </button>
    </div>
  );
}

function FAQAccordion() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {faqCategories.map((cat, catIndex) => (
        <div key={catIndex}>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-icons text-[#A68A75]" aria-hidden="true">{cat.icon}</span>
            <h3 className="font-semibold text-lg text-gray-900">{cat.category}</h3>
          </div>
          <div className="space-y-2">
            {cat.questions.map((item, qIndex) => {
              const itemId = `${catIndex}-${qIndex}`;
              const isOpen = openItems.includes(itemId);
              return (
                <div key={qIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(itemId)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-gray-800 pr-4">{item.q}</span>
                    <span className={`material-icons text-[#A68A75] transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true">
                      expand_more
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                    <p className="px-4 pb-4 text-gray-600">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function useLegalModals() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  return { activeModal, setActiveModal };
}

interface LegalModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export default function LegalModals({ activeModal, onClose }: LegalModalsProps) {
  // Focus Trap für Barrierefreiheit (WCAG 2.1)
  const focusTrapRef = useFocusTrap(activeModal !== null);

  if (!activeModal) return null;

  const content = {
    impressum: {
      title: "Impressum",
      content: (
        <>
          <h3 className="font-semibold text-lg mb-2">Angaben gemäß § 5 TMG</h3>
          <p className="mb-4">
            Hermann Seul<br />
            Robert-Blum-Straße 62<br />
            51373 Leverkusen
          </p>

          <h3 className="font-semibold text-lg mb-2">Kontakt</h3>
          <p className="mb-4">
            Telefon: 0173 2814620<br />
            E-Mail: info@almweiss.de
          </p>

          <h3 className="font-semibold text-lg mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p className="mb-4">
            Hermann Seul<br />
            Robert-Blum-Straße 62<br />
            51373 Leverkusen
          </p>

          <h3 className="font-semibold text-lg mb-2">Streitschlichtung</h3>
          <p className="mb-4">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            https://ec.europa.eu/consumers/odr/.<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p className="mb-4">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h3 className="font-semibold text-lg mb-2">Haftung für Inhalte</h3>
          <p className="mb-4">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="mb-4">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
            der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h3 className="font-semibold text-lg mb-2">Haftung für Links</h3>
          <p className="mb-4">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
            verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          </p>

          <h3 className="font-semibold text-lg mb-2">Urheberrecht</h3>
          <p className="mb-4">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
        </>
      ),
    },
    datenschutz: {
      title: "Datenschutzerklärung",
      content: (
        <>
          <h3 className="font-semibold text-lg mb-2">1. Datenschutz auf einen Blick</h3>
          <h4 className="font-semibold mb-2">Allgemeine Hinweise</h4>
          <p className="mb-4">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
            passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können. Die gesamte Datenverarbeitung erfolgt DSGVO-konform.
          </p>

          <h4 className="font-semibold mb-2">Datenerfassung auf dieser Website</h4>
          <p className="mb-4">
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
            können Sie dem Impressum dieser Website entnehmen.
          </p>

          <p className="mb-4">
            <strong>Wie erfassen wir Ihre Daten?</strong><br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B.
            um Daten handeln, die Sie in ein Kontaktformular eingeben.
          </p>

          <p className="mb-4">
            <strong>Wofür nutzen wir Ihre Daten?</strong><br />
            Die über das Kontaktformular eingegebenen Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage
            verwendet und per E-Mail an uns übermittelt. Eine darüber hinausgehende Speicherung oder Weitergabe
            an Dritte findet nicht statt.
          </p>

          <h3 className="font-semibold text-lg mb-2">2. Allgemeine Hinweise und Pflichtinformationen</h3>
          <h4 className="font-semibold mb-2">Datenschutz</h4>
          <p className="mb-4">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
            personenbezogenen Daten vertraulich und entsprechend der Datenschutz-Grundverordnung (DSGVO) sowie
            dieser Datenschutzerklärung.
          </p>

          <h4 className="font-semibold mb-2">Hinweis zur verantwortlichen Stelle</h4>
          <p className="mb-4">
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
            Hermann Seul<br />
            Robert-Blum-Straße 62<br />
            51373 Leverkusen<br /><br />
            Telefon: 0173 2814620<br />
            E-Mail: info@almweiss.de
          </p>

          <h3 className="font-semibold text-lg mb-2">3. Datenerfassung auf dieser Website</h3>
          <h4 className="font-semibold mb-2">Kontaktformular</h4>
          <p className="mb-4">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
            inklusive der von Ihnen dort angegebenen Kontaktdaten per E-Mail an uns übermittelt. Die Daten werden
            ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Eine Weitergabe an Dritte erfolgt nicht.
          </p>

          <h4 className="font-semibold mb-2">E-Mail-Versand</h4>
          <p className="mb-4">
            Der Versand von E-Mails über das Kontaktformular erfolgt DSGVO-konform. Ihre Daten werden
            verschlüsselt übertragen und nicht an unbefugte Dritte weitergegeben.
          </p>

          <h3 className="font-semibold text-lg mb-2">4. Ihre Rechte</h3>
          <p className="mb-4">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
            gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
            oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz
            können Sie sich jederzeit an uns wenden.
          </p>

          <h3 className="font-semibold text-lg mb-2">5. Widerspruchsrecht</h3>
          <p className="mb-4">
            Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen
            die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen. Wenden Sie sich
            hierzu bitte an die im Impressum genannte Kontaktadresse.
          </p>
        </>
      ),
    },
    agb: {
      title: "Allgemeine Geschäftsbedingungen",
      content: (
        <>
          <h3 className="font-semibold text-lg mb-2">§ 1 Geltungsbereich</h3>
          <p className="mb-4">
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über die Vermietung und Nutzung der
            Eventlocation &quot;Almweiß&quot; zwischen Hermann Seul (nachfolgend &quot;Vermieter&quot;) und dem Kunden
            (nachfolgend &quot;Mieter&quot;).
          </p>

          <h3 className="font-semibold text-lg mb-2">§ 2 Vertragsschluss</h3>
          <p className="mb-4">
            (1) Die Präsentation der Räumlichkeiten auf unserer Website stellt kein rechtlich bindendes Angebot dar.<br />
            (2) Durch das Absenden einer Buchungsanfrage gibt der Mieter ein verbindliches Angebot ab.<br />
            (3) Der Vertrag kommt erst durch schriftliche Bestätigung des Vermieters zustande.
          </p>

          <h3 className="font-semibold text-lg mb-2">§ 3 Preise und Zahlungsbedingungen</h3>
          <p className="mb-4">
            (1) Die Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.<br />
            (2) Eine Anzahlung in Höhe von 30% des Gesamtbetrags ist bei Vertragsschluss fällig.<br />
            (3) Der Restbetrag ist spätestens 14 Tage vor der Veranstaltung zu begleichen.
          </p>

          <h3 className="font-semibold text-lg mb-2">§ 4 Stornierung</h3>
          <p className="mb-4">
            (1) Bei Stornierung bis 90 Tage vor dem Veranstaltungstermin: 30% des Gesamtpreises.<br />
            (2) Bei Stornierung bis 60 Tage vor dem Veranstaltungstermin: 50% des Gesamtpreises.<br />
            (3) Bei Stornierung bis 30 Tage vor dem Veranstaltungstermin: 80% des Gesamtpreises.<br />
            (4) Bei späterer Stornierung oder Nichterscheinen: 100% des Gesamtpreises.
          </p>

          <h3 className="font-semibold text-lg mb-2">§ 5 Pflichten des Mieters</h3>
          <p className="mb-4">
            (1) Der Mieter verpflichtet sich, die Räumlichkeiten pfleglich zu behandeln.<br />
            (2) Für Schäden, die durch den Mieter oder seine Gäste verursacht werden, haftet der Mieter.<br />
            (3) Die Einhaltung der geltenden Lärmschutzvorschriften obliegt dem Mieter.
          </p>

          <h3 className="font-semibold text-lg mb-2">§ 6 Haftung</h3>
          <p className="mb-4">
            (1) Der Vermieter haftet nicht für Schäden an eingebrachten Gegenständen der Gäste.<br />
            (2) Die Haftung des Vermieters für leichte Fahrlässigkeit ist ausgeschlossen, soweit nicht
            wesentliche Vertragspflichten oder Schäden aus der Verletzung des Lebens, des Körpers oder
            der Gesundheit betroffen sind.
          </p>

          <h3 className="font-semibold text-lg mb-2">§ 7 Mindestteilnehmerzahl</h3>
          <p className="mb-4">
            Die Mindestanzahl an Gästen beträgt 40 Personen. Die maximale Kapazität liegt bei 80 Personen.
          </p>

          <h3 className="font-semibold text-lg mb-2">§ 8 Schlussbestimmungen</h3>
          <p className="mb-4">
            (1) Es gilt das Recht der Bundesrepublik Deutschland.<br />
            (2) Gerichtsstand ist Leverkusen.<br />
            (3) Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen
            unberührt.
          </p>

          <p className="mt-6 text-sm text-gray-500">
            Stand: Februar 2026
          </p>
        </>
      ),
    },
    barrierefreiheit: {
      title: "Barrierefreiheit",
      content: (
        <>
          <p className="mb-4 text-gray-600">
            Diese Website wurde nach den Richtlinien der <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong> entwickelt.
            Wir setzen auf semantisches HTML, ausreichende Farbkontraste, Tastaturnavigation und Screenreader-Kompatibilität.
          </p>
          <p className="mb-6 text-gray-600">
            Zusätzlich können Sie unten die Darstellung der Website an Ihre Bedürfnisse anpassen.
          </p>

          <h3 className="font-semibold text-lg mb-4">Ansicht anpassen</h3>
          <AccessibilitySettings />
        </>
      ),
    },
    faq: {
      title: "Häufig gestellte Fragen (FAQ)",
      content: "faq-accordion",
    },
    cookies: {
      title: "Cookie-Richtlinie",
      content: (
        <>
          <h3 className="font-semibold text-lg mb-2">Was sind Cookies?</h3>
          <p className="mb-4">
            Cookies sind kleine Textdateien, die von Websites auf Ihrem Gerät gespeichert werden.
            Sie helfen dabei, die Website funktionsfähig zu halten und Informationen über Ihre
            Nutzung zu sammeln.
          </p>

          <h3 className="font-semibold text-lg mb-2">Welche Cookies verwenden wir?</h3>
          <h4 className="font-semibold mb-2">Technisch notwendige Cookies</h4>
          <p className="mb-4">
            Diese Cookies sind für den Betrieb der Website unbedingt erforderlich. Sie ermöglichen
            grundlegende Funktionen wie die Navigation und den Zugang zu gesicherten Bereichen.
            Die Website kann ohne diese Cookies nicht richtig funktionieren.
          </p>

          <h4 className="font-semibold mb-2">Analyse-Cookies</h4>
          <p className="mb-4">
            Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.
            Die Informationen werden anonymisiert gesammelt und dienen der Verbesserung unserer Website.
          </p>

          <h3 className="font-semibold text-lg mb-2">Eingebettete Karten</h3>
          <p className="mb-4">
            Unsere Website nutzt eingebettete Karten zur Darstellung unseres Standorts. Bei der Nutzung
            dieser Funktion können Informationen über Ihre Nutzung der Website erfasst werden.
            Sie können die Kartenfunktion in Ihren Browsereinstellungen einschränken.
          </p>

          <h3 className="font-semibold text-lg mb-2">Ihre Wahlmöglichkeiten</h3>
          <p className="mb-4">
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert
            werden und einzeln über deren Annahme entscheiden oder die Annahme von Cookies für
            bestimmte Fälle oder generell ausschließen. Bei der Deaktivierung von Cookies kann
            die Funktionalität unserer Website eingeschränkt sein.
          </p>

          <h3 className="font-semibold text-lg mb-2">Wie Sie Cookies verwalten können</h3>
          <p className="mb-4">
            Die meisten Webbrowser ermöglichen eine Kontrolle der Cookies über die Browsereinstellungen.
            Weitere Informationen finden Sie in der Hilfe-Funktion Ihres Browsers:<br /><br />
            • Chrome: Einstellungen → Datenschutz und Sicherheit → Cookies<br />
            • Firefox: Einstellungen → Datenschutz & Sicherheit<br />
            • Safari: Einstellungen → Datenschutz<br />
            • Edge: Einstellungen → Cookies und Websiteberechtigungen
          </p>

          <h3 className="font-semibold text-lg mb-2">Kontakt</h3>
          <p className="mb-4">
            Bei Fragen zu unserer Cookie-Richtlinie können Sie uns kontaktieren:<br /><br />
            E-Mail: info@almweiss.de<br />
            Telefon: 0173 2814620
          </p>

          <p className="mt-6 text-sm text-gray-500">
            Stand: Februar 2026
          </p>
        </>
      ),
    },
  };

  const current = content[activeModal];

  return (
    <div
      className="fixed inset-0 z-[100] backdrop-blur-md bg-black/20 flex items-center justify-center md:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        ref={focusTrapRef}
        className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl md:rounded-2xl overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between md:rounded-t-2xl">
          <h2 id="legal-modal-title" className="font-display text-2xl font-bold text-gray-900">
            {current.title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
            aria-label="Dialog schließen"
          >
            <span className="material-icons text-gray-500" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-gray-700 leading-relaxed">
          {current.content === "faq-accordion" ? <FAQAccordion /> : current.content}
        </div>
      </div>
    </div>
  );
}
