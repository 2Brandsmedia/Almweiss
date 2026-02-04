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
        <link rel="icon" href="/images/logoinvert.png" />
        <link rel="apple-touch-icon" href="/images/logoinvert.png" />
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
