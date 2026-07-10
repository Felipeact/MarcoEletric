import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use the system's TLS certificates so next/font can self-host Google Fonts
  // reliably during the build (avoids TLS failures in sandboxed/CI environments).
  experimental: {
    turbopackUseSystemTlsCerts: true,
    // Fotos de celular podem passar de 1MB (padrão do Next para Server Actions).
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
