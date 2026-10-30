import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The site is plain static files (the forms post straight to Forminit), so it is exported to
  // ./out and served from Cloudflare's static assets. See wrangler.jsonc.
  output: "export",
  // No image optimizer without a server. The images in public/ are already compressed WebP.
  images: { unoptimized: true },
  // Redirects (/about, /contact) live in public/_redirects: next.config redirects need a server.
};

export default nextConfig;
