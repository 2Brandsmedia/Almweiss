# syntax=docker/dockerfile:1
# Almweiss (Next.js, pnpm). Angelegt 2026-07-28 beim Umbau auf
# "ein Build, ein Statuslicht" — vorher baute Coolify dieses Projekt per
# nixpacks direkt aus Git, ohne Pruefung und ohne Rueckkanal zu GitHub.
#
# BEWUSST OHNE `output: 'standalone'`: das muesste in next.config gesetzt werden
# und wuerde auch den nixpacks-Pfad aendern (standalone startet `node server.js`,
# nixpacks startet `next start`). Solange Coolify als Rueckfall noch nixpacks
# bauen koennen soll, bleibt der Start identisch — der Preis ist ein groesseres
# Image, weil node_modules mitwandert.

# ---------- deps ----------
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=almweiss-pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && pnpm install --frozen-lockfile

# ---------- builder ----------
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# .next/cache als BuildKit-Cache-Mount: Next.js kompiliert inkrementell statt
# bei jedem Build das ganze Projekt neu.
RUN --mount=type=cache,id=almweiss-next,target=/app/.next/cache pnpm build

# ---------- runner ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 TZ=Europe/Berlin
# curl fuer den Health-Check (alpine hat es nicht von Haus aus)
RUN apk add --no-cache curl && corepack enable \
 && addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/ >/dev/null || exit 1
CMD ["pnpm", "start"]
