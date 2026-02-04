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
  title: "Almweiß - Exklusive Hochzeits- & Eventlocation in Leverkusen",
  description: "Einzigartige Hochzeits- & Eventlocation in Leverkusen. Wo Eleganz auf Herzlichkeit trifft. Feiern Sie Ihren besonderen Tag bei Almweiß.",
  keywords: ["Hochzeitslocation", "Eventlocation", "Leverkusen", "Hochzeit", "Feier", "Almweiß"],
  authors: [{ name: "2Brands Media GmbH" }],
  openGraph: {
    title: "Almweiß - Exklusive Hochzeits- & Eventlocation",
    description: "Einzigartige Hochzeits- & Eventlocation in Leverkusen",
    type: "website",
    locale: "de_DE",
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={`${cormorant.variable} ${lato.variable} antialiased`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
