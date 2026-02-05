import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Bildoptimierung
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Kompression aktivieren
  compress: true,

  // X-Powered-By Header entfernen (Security)
  poweredByHeader: false,

  // Strikte Mode für React aktivieren
  reactStrictMode: true,

  // Trailing Slashes für konsistente URLs
  trailingSlash: false,
};

export default withBundleAnalyzer(nextConfig);
