# Betrieb & Deployment — Almweiß Website

Stand: 2026-07-10.

## Deployment (Coolify auf werkstatt)

- **Coolify-Projekt:** `websites` (UUID `nksahu2yprbhsipahq1vmpj1`) auf werkstatt (148.251.92.126) — Sammel-Projekt für 2Brands Kunden-/Firmen-Websites.
- **Application:** `almweiss` (UUID `fnt2pyv84jjk9vrnhogl5e5u`), Server localhost (werkstatt), Branch `main`, Build-Pack **nixpacks**, Port 3000.
- **Registry:** `docker_registry_image_name = registry.2brands.de/almweiss` — Pflicht, siehe Stolperfallen.
- **Deploy auslösen** (kein Auto-Deploy bei Push eingerichtet):
  ```bash
  ssh werkstatt 'TOKEN=$(cat /root/.cooltok); curl -s -H "Authorization: Bearer $TOKEN" \
    "http://localhost:8000/api/v1/deploy?uuid=fnt2pyv84jjk9vrnhogl5e5u"'
  ```
  Status: `GET /api/v1/deployments/<deployment_uuid>` (Werte: in_progress → finished/failed).

### Stolperfallen (beide beim Erst-Deploy real passiert)

1. **pnpm-Version:** `pnpm-workspace.yaml` ist settings-only (kein `packages`-Feld) — das versteht erst pnpm v10. Deshalb ist `"packageManager": "pnpm@10.17.0"` in package.json gepinnt; Nixpacks nutzt dann corepack mit der richtigen Version. Ohne das bricht der Build mit `ERR packages field missing or empty`.
2. **Registry-Pflicht:** Coolify baut Images auf dem **buildserver** (46.224.235.73), deployt aber auf werkstatt. Ohne `docker_registry_image_name` scheitert der Container-Start mit `pull access denied`. Gilt für **jede neue App** in diesem Coolify-Setup: nach dem Anlegen per PATCH `docker_registry_image_name = registry.2brands.de/<name>` setzen.
3. **Restart-Endpoint meiden:** `GET .../applications/<uuid>/restart` schlägt mit Build-Server-Setup fehl (workdir-Fehler). Stattdessen immer voll deployen (`/deploy?uuid=`) — dank Build-Cache schnell.

## Domains & DNS

| Domain | Status |
|---|---|
| `almweiss.2brandsmedia.com` | **Live-Vorschau.** Cloudflare-A-Record (Zone 2brandsmedia.com) → 148.251.92.126, DNS-only (nicht proxied, wegen Let's Encrypt via Traefik). In Coolify als Domain der App hinterlegt. |
| `almweiss.de` | Zeigt noch auf IONOS (ui-dns.de-Nameserver, A 217.160.0.113 = alte Live-Site). **Nicht im 2Brands-Cloudflare.** Umzug: A-Record beim Provider auf 148.251.92.126 stellen, DANACH almweiss.de als Domain in Coolify ergänzen (vorher scheitert Let's Encrypt). `metadataBase`/Canonical zeigen bereits auf almweiss.de. |

## Offene Punkte / Roadmap

1. **🔴 Formular-Versand** — `BookingModal.handleSubmit` ist bewusst tot (User-Entscheidung 2026-07-10 „erstmal so lassen"). Anfragen zeigen einen Erfolgs-Screen, senden aber nichts. Vor echtem Go-Live zwingend anbinden (z.B. Resend an info@almweiss.de).
2. **Google-Bewertungen live** — Gesamtwertung + Anzahl (Stand Juli 2026 real: 4,8★/206, hartkodiert sind 191) + die 5 relevantesten Reviews via **Places API (New)**, 1×/Tag serverseitig gecacht. Wartet auf: Google-Cloud-Konto + API-Key vom Betreiber.
3. **Instagram live** — bestehende Update-Route ist funktionslos (blockierter Scraping-Endpoint, schreibt in flüchtiges Container-FS). Ablösung durch **Instagram Graph API**: @_almweiss_ muss Business/Creator-Konto sein, Meta-App + long-lived Token (Env-Var in Coolify, Auto-Refresh), Abruf mit ISR-Cache.
4. **360°-Rundgang: echtes Material** — aktuell CC0-Demo-Panoramen (Poly Haven). Entschiedener Weg: **Matterport im Selbst-Scan** (360°-Kamera ~400-600 € einmalig, Free-Plan = 1 aktiver Space bzw. Starter ~10 €/Monat; Location dekoriert/eingedeckt scannen!). Danach: Matterport-iframe hinter das bestehende Cookie-Consent-Gate (Muster: YouTube-Hero), ersetzt den PSV-Demo-Viewer. Alternative bleibt Google-Street-View-Fotograf (Tour landet zusätzlich im Google-Business-Profil). Die 360°-Kamera kann beides liefern + Panoramen für den PSV-Fallback.
5. **almweiss.de-Umzug** — siehe Domains.
6. **Bewertungszahl aktualisieren** — bis Punkt 2 umgesetzt ist, `totalReviews`/JSON-LD gelegentlich manuell nachziehen (`Services.tsx`, `layout.tsx`).

## Secrets / Zugänge

Keine Secrets im Repo. Coolify-Token liegt auf werkstatt (`/root/.cooltok`), Cloudflare-Token ebenfalls auf werkstatt (siehe zentrale 2Brands-Doku). Künftige API-Keys (Places, Instagram) ausschließlich als Env-Vars in Coolify hinterlegen, nie committen.
