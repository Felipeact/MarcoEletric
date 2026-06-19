import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use the system's TLS certificates so next/font can self-host Google Fonts
  // reliably during the build (avoids TLS failures in sandboxed/CI environments).
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
