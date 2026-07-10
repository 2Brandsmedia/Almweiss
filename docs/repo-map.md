# Repo-Map — Almweiß Website

Stand: 2026-07-10. One-Page-Marketing-Site, alle Sektionen werden in `src/app/page.tsx` in fester Reihenfolge gerendert.

## Seitenaufbau (Reihenfolge = page.tsx)

| Sektion | Komponente | Anker | Hintergrund |
|---|---|---|---|
| Hero (Video/Bild + CTA + Burgermenü) | `Hero.tsx` | — | schwarz |
| Zahlen (Feiern, Paare, 4,8★) | `Stats.tsx` | — | beige |
| Location / Warum Almweiß | `About.tsx` | `#location` | weiß |
| Extras (Service, Fotobox, DJ, Candybar) | `Extras.tsx` | `#extras` | beige |
| 4-Schritte-Prozess | `Process.tsx` | `#leistungen` | weiß |
| Galerie (12 Bilder, Parallax, Lightbox) | `Gallery.tsx` | `#galerie` | beige |
| 360°-Rundgang (Click-to-load) | `VirtualTour.tsx` | `#rundgang` | dunkel |
| Bewertungen (Google-Review-Karussell) | `Services.tsx` (!) | `#bewertungen` | weiß |
| FAQ (Accordion + FAQPage-Schema) | `FAQ.tsx` | `#faq` | beige |
| Instagram-Karussell | `Instagram.tsx` | `#instagram` | beige |
| Footer (Kontakt, Rechtliches, A11y-Widget) | `Footer.tsx` | `#kontakt` | dunkel |

**Achtung Namensfallen:**
- `Services.tsx` enthält die **Bewertungen**, nicht die Leistungen.
- `Testimonials.tsx` und `Contact.tsx` existieren, werden aber **nicht gerendert** (toter Code, bewusst belassen).
- Der Anker `#kontakt` liegt auf dem **Footer** (Contact.tsx ist ungenutzt).

## Wichtige Komponenten & Datenflüsse

### Anfrage-Modal (`BookingModal.tsx`, ~780 Zeilen)
- Öffnet über `BookingContext` (alle „Wunschtermin sichern"-Buttons).
- Validierung: Eventart, Wunschtermin (Mantine DatePicker, NRW-Feiertage aus `booking/utils/holidays.ts`), **30-80 Gäste** (Clamp bei Blur), Anrede/Name bzw. Firma, E-Mail, Telefon, Nachricht **min. 10 Wörter**.
- Full-Service-Checkbox mit **5-Sekunden-Countdown**, erscheint erst wenn alle Felder komplett sind.
- 🔴 **`handleSubmit` sendet nichts** (nur console.log + Erfolgs-Screen) — bewusste Entscheidung vom 2026-07-10, siehe docs/betrieb.md → Offene Punkte.
- Typen/Initialwerte: `booking/types.ts`. Erfolgs-Screen: `booking/components/BookingSuccess.tsx`.

### 360°-Rundgang (`VirtualTour.tsx` + `tour/TourViewer.tsx`)
- Click-to-load: Vorschaubild mit Start-Button; Viewer + Panoramen laden erst nach Klick (Datenvolumen mobil).
- `TourViewer.tsx`: Photo Sphere Viewer + Virtual-Tour-Plugin, 5 verlinkte Demo-Räume (Eingangshalle → Festsaal → Salon → Lounge → Terrasse), `preload: false`, `touchmoveTwoFingers` (kein Scroll-Trap mobil).
- Panoramen: `public/images/tour/tour-*.webp` — **Demo-Material von Poly Haven (CC0)**, bis echte Almweiß-Aufnahmen existieren. Austausch: Dateien ersetzen, `tourNodes` (Namen + Yaw-Positionen der Pfeile) anpassen, Demo-Hinweis in `VirtualTour.tsx` entfernen.
- Geplant: Ablösung durch Matterport-Embed (siehe docs/betrieb.md).

### Galerie (`Gallery.tsx`)
- 4 Parallax-Spalten (Framer Motion), Kacheln sind `<button>` (Touch/A11y).
- Lightbox mit Lade-Spinner bis `onLoad` — ohne den wirkte das Modal auf langsamen Verbindungen leer („öffnet nicht"-Bug vom 2026-07-10).

### Bewertungen (`Services.tsx`)
- Reviews hartkodiert im Array + `totalReviews`/`averageRating` als Konstanten (Stand Juli 2026: Google zeigt real schon 206 statt 191 — Live-Integration geplant, siehe Betriebs-Doku).

### FAQ (`FAQ.tsx` + `src/data/faq.ts`)
- **Eine Datenquelle** für beide Darstellungen: Startseiten-Accordion (mit FAQPage-JSON-LD) und Footer-FAQ-Modal (`LegalModals.tsx`). Inhaltliche Änderungen (Kapazität, USPs) immer in `faq.ts`.

### Cookie-Consent (`CookieConsent.tsx` + `CookieContext`)
- Gate für YouTube-Hero-Video und Instagram-Embeds. Ohne Consent: statisches Fallback-Bild bzw. Aktivierungs-Button. Neue Dritt-Embeds (z.B. Matterport) müssen hinter dasselbe Gate.

### Instagram (`Instagram.tsx` + `src/data/instagram-posts.json`)
- Rendert Instagram-Embeds aus statischer JSON (Build-Zeit-Import!).
- 🔴 `src/app/api/instagram/update/route.ts` ist **funktionslos**: nutzt einen von Instagram blockierten Scraping-Endpoint und schreibt ins Container-Dateisystem (flüchtig, wird von der statisch gebauten Seite nie gelesen). Ablösung durch Instagram Graph API geplant.

## SEO / Strukturierte Daten

- `layout.tsx`: Metadata (Title/Description/OG mit Klima- und Ortsbezug), JSON-LD `LocalBusiness`+`EventVenue` mit `aggregateRating` (4,8/191), `amenityFeature` (Klimaanlage, Parkplatz, Barrierefreiheit, Catering), `maximumAttendeeCapacity: 80`. **Kein `telephone`** (bewusst, siehe Invarianten).
- `FAQ.tsx`: FAQPage-Schema.
- `sitemap.ts` / `robots.ts` vorhanden. `metadataBase`: https://almweiss.de.

## Invarianten (bewusste Entscheidungen, nicht „reparieren")

1. **Telefonnummer so gut wie unsichtbar**: nur in Impressum + Datenschutz (Pflichtangaben). NICHT in Footer, FAQ, JSON-LD oder sonstwo ergänzen — die Website soll telefonische Anfragen abfangen, nicht fördern (User-Entscheidung 2026-07-10).
2. **30-80 Gäste** überall konsistent: BookingModal (min/max/Clamp/Validierung), About-Text, FAQ.
3. **Klimatisierung ist Kern-USP** (Blockhütte + Sommerhochzeit): About-Feature-Box, Fließtext, FAQ, JSON-LD, Meta-Description.
4. **Formular-Versand bewusst tot** (siehe oben).
5. Deutsch mit echten Umlauten, keine Gedankenstriche in Texten.

## Tests & Qualität

- Vitest: `booking/utils/holidays.test.ts` (14 Tests). `pnpm test:run`.
- Vor jedem Push: `npx tsc --noEmit && pnpm lint && pnpm test:run && pnpm build`.
- Testseiten `/360-test` und `/test-gallery` sind Entwicklungs-Spielwiesen (indexierbar? robots prüfen bei Go-Live).
