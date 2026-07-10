import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://almweiss.de'),
  title: "Almweiß - Exklusive Hochzeits- & Eventlocation in Leverkusen",
  description: "Einzigartige, vollklimatisierte Hochzeits- & Eventlocation in Leverkusen zwischen Köln und Düsseldorf. Für Feiern von 30 bis 80 Gästen. Feiern Sie Ihren besonderen Tag bei Almweiß.",
  keywords: ["Hochzeitslocation", "Eventlocation", "Leverkusen", "Hochzeit", "Feier", "Almweiß", "klimatisierte Hochzeitslocation", "Hochzeitslocation Köln", "Hochzeitslocation Düsseldorf"],
  authors: [{ name: "2Brands Media GmbH" }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Almweiß - Exklusive Hochzeits- & Eventlocation",
    description: "Einzigartige Hochzeits- & Eventlocation in Leverkusen",
    type: "website",
    locale: "de_DE",
    url: 'https://almweiss.de',
    siteName: 'Almweiß',
    images: [
      {
        url: '/images/hero-fallback.webp',
        width: 1920,
        height: 1080,
        alt: 'Almweiß - Exklusive Eventlocation',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Material Icons werden lokal gehostet - siehe globals.css */}

        {/* JSON-LD Structured Data für SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "EventVenue"],
              "name": "Almweiß",
              "description": "Exklusive Hochzeits- & Eventlocation in Leverkusen. Wo Eleganz auf Herzlichkeit trifft.",
              "url": "https://almweiss.de",
              "email": "info@almweiss.de",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Robert-Blum-Straße 62",
                "addressLocality": "Leverkusen",
                "postalCode": "51373",
                "addressCountry": "DE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 51.052236,
                "longitude": 7.004653
              },
              "priceRange": "€€€",
              "image": "https://almweiss.de/images/hero-fallback.webp",
              "sameAs": [],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "22:00"
              },
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Klimaanlage", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Parkplatz", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Barrierefreiheit", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Catering", "value": true }
              ],
              "maximumAttendeeCapacity": 80,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 4.8,
                "reviewCount": 191,
                "bestRating": 5
              }
            })
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${lato.variable} antialiased`}>
        {/* Skip-Link für Keyboard-Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#A68A75] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
        >
          Zum Hauptinhalt springen
        </a>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
