import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers on every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "DENY" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy",   value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://us-assets.i.posthog.com; connect-src 'self' https://toll-fighter-production.up.railway.app https://us.i.posthog.com https://us-assets.i.posthog.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'" },
        ],
      },
    ];
  },
};

export default nextConfig;
