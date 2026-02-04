"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamic imports to avoid SSR issues
const PannellumViewer = dynamic(() => import("@/components/test/PannellumViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">Lädt Pannellum...</div>
});

const PhotoSphereViewer = dynamic(() => import("@/components/test/PhotoSphereViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">Lädt Photo Sphere Viewer...</div>
});

export default function Test360Page() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-display text-4xl font-bold text-center mb-4">
          360° Viewer Vergleich
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Teste beide Viewer und entscheide, welcher besser für Almweiß geeignet ist.
        </p>

        <div className="grid gap-12">
          {/* Pannellum */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-display text-2xl font-bold text-gray-900">
                1. Pannellum
              </h2>
              <p className="text-gray-500 mt-1">
                Leichtgewichtig (21KB), einfach, bewährt
              </p>
            </div>
            <div className="h-[500px]">
              <PannellumViewer />
            </div>
            <div className="p-6 bg-gray-50">
              <h3 className="font-semibold mb-2">Steuerung:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Maus ziehen = Umsehen</li>
                <li>• Scrollen = Zoom</li>
                <li>• Klick auf Hotspots = Zum nächsten Raum</li>
              </ul>
            </div>
          </section>

          {/* Photo Sphere Viewer */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-display text-2xl font-bold text-gray-900">
                2. Photo Sphere Viewer
              </h2>
              <p className="text-gray-500 mt-1">
                Modern, viele Plugins, bessere Touch-Unterstützung
              </p>
            </div>
            <div className="h-[500px]">
              <PhotoSphereViewer />
            </div>
            <div className="p-6 bg-gray-50">
              <h3 className="font-semibold mb-2">Steuerung:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Maus ziehen = Umsehen</li>
                <li>• Scrollen = Zoom</li>
                <li>• Klick auf Pfeile = Zum nächsten Raum</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Vergleichstabelle */}
        <section className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-display text-2xl font-bold mb-6">Vergleich</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">Pannellum</th>
                  <th className="text-center py-3 px-4">Photo Sphere Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-4">Dateigröße</td>
                  <td className="text-center py-3 px-4 text-green-600">~21 KB</td>
                  <td className="text-center py-3 px-4 text-yellow-600">~150 KB</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Virtual Tours</td>
                  <td className="text-center py-3 px-4">✓ Basis</td>
                  <td className="text-center py-3 px-4 text-green-600">✓ Erweitert</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Hotspots / Marker</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4 text-green-600">✓ Mehr Optionen</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Touch / Mobile</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4 text-green-600">✓ Besser</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Gyroscope</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Autorotation</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">TypeScript</td>
                  <td className="text-center py-3 px-4 text-red-500">✗</td>
                  <td className="text-center py-3 px-4 text-green-600">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Plugins (Map, Compass)</td>
                  <td className="text-center py-3 px-4 text-red-500">✗</td>
                  <td className="text-center py-3 px-4 text-green-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#A68A75] font-semibold hover:text-gray-900 transition"
          >
            <span className="material-icons">arrow_back</span>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
