# Almweiß — Hochzeits- & Eventlocation Leverkusen

Marketing-Website der Eventlocation Almweiß (Robert-Blum-Straße 62, 51373 Leverkusen).
One-Page-Design mit Anfrage-Modal, Galerie, 360°-Rundgang, Google-Bewertungen, FAQ und Instagram-Feed.

**Live (Vorschau):** https://almweiss.2brandsmedia.com
**Ziel-Domain:** almweiss.de (liegt aktuell noch bei IONOS, alte Site)

Entwickelt von **2Brands Media GmbH**.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, Framer Motion, Mantine (DatePicker)
- Photo Sphere Viewer (360°-Rundgang)
- pnpm 10 (gepinnt via `packageManager` in package.json — nicht entfernen, der Build braucht das)

## Entwicklung

```bash
pnpm install
pnpm dev          # Dev-Server auf localhost:3000
pnpm lint         # ESLint
npx tsc --noEmit  # TypeScript-Check
pnpm test:run     # Unit-Tests (Vitest)
pnpm build        # Production-Build
```

## Dokumentation

- **[docs/repo-map.md](docs/repo-map.md)** — Codebase-Struktur, Komponenten, Datenflüsse, Invarianten
- **[docs/betrieb.md](docs/betrieb.md)** — Deployment (Coolify), Domains/DNS, Stolperfallen, offene Punkte / Roadmap
