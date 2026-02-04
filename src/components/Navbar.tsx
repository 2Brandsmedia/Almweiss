"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";

const navLinks = [
  { href: "#location", label: "Location" },
  { href: "#extras", label: "Extras" },
  { href: "#galerie", label: "Galerie" },
  { href: "#bewertungen", label: "Bewertungen" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useBooking();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/images/logo.webp"
                alt="Almweiß Logo"
                width={180}
                height={180}
                className="h-[135px] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-700 hover:text-[#A68A75] font-medium text-sm uppercase tracking-wider transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={openModal}
              className="bg-[#A68A75] text-white px-6 py-2.5 text-sm uppercase tracking-wider font-semibold hover:bg-opacity-90 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Termin anfragen
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#A68A75] transition-colors"
            aria-label="Menü öffnen"
          >
            <span className="material-icons text-3xl">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        style={{ top: "80px" }}
      />

      {/* Mobile Menu Slide-Out */}
      <div
        className={`lg:hidden fixed top-20 right-0 h-[calc(100vh-80px)] w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="py-4 text-gray-700 hover:text-[#A68A75] font-medium text-lg uppercase tracking-wider transition-colors border-b border-gray-100"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              openModal();
            }}
            className="mt-6 bg-[#A68A75] text-white px-6 py-3 text-sm uppercase tracking-wider font-semibold hover:bg-opacity-90 rounded-full transition-all shadow-md"
          >
            Termin anfragen
          </button>
        </div>
      </div>
    </nav>
  );
}
